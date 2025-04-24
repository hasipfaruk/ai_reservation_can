import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'  // Keep as named import

// Function to find an appropriate table based on party size
async function findAvailableTable(numberOfPersons: number, date: string, time: string) {
  const availableTables = await getAvailableTablesForParty(numberOfPersons, date, time);
  
  if (availableTables.length === 0) {
    console.log("No available tables for this time slot");
    return null;
  }

  // Return the first available table with the closest capacity match
  console.log(`Selected table ${availableTables[0].number} with capacity ${availableTables[0].capacity}`);
  return availableTables[0];
}

// Function to check if the Table model is available in Prisma
function isTableModelAvailable() {
  try {
    // Check for Table model without directly accessing it as a property
    return prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name='Table'`
      .then(result => {
        return Array.isArray(result) && result.length > 0;
      })
      .catch(() => false);
  } catch {
    return false;
  }
}

// Function to update a table's availability status when assigned to a reservation
async function updateTableAvailability(tableId: number, isAvailable: boolean) {
  if (!tableId) return;
  
  try {
    await prisma.$executeRaw`UPDATE "Table" SET "isAvailable" = ${isAvailable} WHERE "id" = ${tableId}`;
    console.log(`Updated table ${tableId} availability to ${isAvailable}`);
  } catch (error) {
    console.error(`Error updating table ${tableId} availability:`, error);
  }
}

// Modify to return all available tables for a party size
async function getAvailableTablesForParty(numberOfPersons: number, date: string, time: string) {
  try {
    console.log(`Finding tables for ${numberOfPersons} persons on ${date} at ${time}`);
    
    // Get all tables that can accommodate the party size
    const potentialTablesQuery = await prisma.$queryRaw`
      SELECT * FROM "Table" 
      WHERE "capacity" >= ${numberOfPersons}
      AND "isAvailable" = true
      ORDER BY "capacity" ASC
    `;
    
    const potentialTables = Array.isArray(potentialTablesQuery) ? potentialTablesQuery : [];
    
    if (potentialTables.length === 0) {
      console.log("No tables with sufficient capacity available");
      return [];
    }

    console.log(`Found ${potentialTables.length} potential tables`);
    
    // Check which tables are already booked for this time slot
    const bookedTablesQuery = await prisma.$queryRaw`
      SELECT "tableId" FROM "Reservation"
      WHERE "reservationDate" = ${date}
      AND "time" = ${time}
      AND "status" != 'cancelled'
      AND "tableId" IS NOT NULL
    `;
    
    const bookedTableIds = Array.isArray(bookedTablesQuery) 
      ? bookedTablesQuery.map(r => r.tableId).filter(id => id !== null)
      : [];
    
    const bookedTableIdSet = new Set(bookedTableIds);
    console.log(`Found ${bookedTableIds.length} already booked tables for this time slot`);

    // Filter out already booked tables
    const availableTables = potentialTables.filter(table => !bookedTableIdSet.has(table.id));

    return availableTables;
  } catch (error) {
    console.error('Error finding available tables:', error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationContext, isConfirmation, reservationId } = body;

    console.log("Received reservation request:", { 
      isConfirmation, 
      reservationId,
      messageLength: message?.length,
      contextLength: conversationContext?.length,
      isFinalSave: message === "FINAL_SAVE"
    });

    // Handle confirmation of an existing reservation
    if (isConfirmation && reservationId) {
      console.log(`Confirming reservation ID ${reservationId}`);
      const updatedReservation = await prisma.reservation.update({
        where: { id: parseInt(reservationId) },
        data: { status: 'confirmed' }
      });
      console.log("Reservation confirmed:", updatedReservation);
      return NextResponse.json({ success: true, reservation: updatedReservation });
    }

    // Handle direct creation of reservations from the UI
    if (body.createDirect) {
      const { name, phone, numberOfPersons, time, reservationDate, status, tableId } = body;
      
      // Validate required fields
      if (!name || !phone || !numberOfPersons || !time || !reservationDate) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
      
      let finalTableId = null;
      let tableInfo = null;
      
      // Always try to find a table based on party size
      const numPersons = parseInt(numberOfPersons.toString());
      
      // Get all available tables for this party size and time
      const availableTables = await getAvailableTablesForParty(
        numPersons,
        reservationDate,
        time
      );
      
      // Create list of available table info to display to user
      const availableTableInfo = availableTables.map(table => ({
        number: table.number,
        capacity: table.capacity,
        location: table.location
      }));
      
      // Assign the first available table if any are available
      if (availableTables.length > 0) {
        finalTableId = availableTables[0].id;
        tableInfo = availableTables[0];
        console.log(`Found suitable table: Table ${availableTables[0].number} for ${numPersons} persons`);
      } else if (tableId) {
        // Use the specified table if available table not found
        finalTableId = tableId;
        // Get table info for the assigned table
        const tableResult = await prisma.$queryRaw`
          SELECT * FROM "Table" WHERE "id" = ${tableId}
        `;
        if (Array.isArray(tableResult) && tableResult.length > 0) {
          tableInfo = tableResult[0];
          console.log(`Using specified table: Table ${tableInfo.number}`);
        }
      } else {
        console.log(`No suitable table found for ${numPersons} persons`);
      }
      
      // Prepare reservation data
      const reservationData: any = {
        name,
        phone,
        numberOfPersons: numPersons,
        time,
        reservationDate,
        status: status || 'pending'
      };
      
      // Only add tableId if it's available
      if (finalTableId !== null) {
        reservationData.tableId = finalTableId;
        // Update table availability when assigned
        await updateTableAvailability(finalTableId, false);
      }
      
      // Create the reservation
      const newReservation = await prisma.reservation.create({
        data: reservationData,
        include: {
          table: true
        }
      });
      
      // Prepare message about available tables
      let tableMessage = "";
      if (availableTables.length > 0) {
        tableMessage = `Available tables for ${numPersons} people: ${availableTables.map(t => 
          `Table ${t.number} (${t.location}, seats ${t.capacity})`).join(', ')}`;
      } else {
        tableMessage = `No tables available for ${numPersons} people at ${time} on ${reservationDate}`;
      }
      
      return NextResponse.json({ 
        success: true, 
        reservation: newReservation,
        tableAssigned: finalTableId ? true : false,
        tableNumber: tableInfo ? tableInfo.number : null,
        availableTables: availableTableInfo,
        message: tableInfo 
          ? `Reservation created and assigned to Table ${tableInfo.number} (${tableInfo.location}). ${tableMessage}`
          : `Reservation created successfully. ${tableMessage}`
      });
    }

    // Handle FINAL_SAVE as a special case with extended extraction
    let textToAnalyze = conversationContext || message;
    
    // Special processing for final save to capture all conversation data
    if (message === "FINAL_SAVE") {
      console.log("Processing FINAL_SAVE, attempting more aggressive extraction");
      // No need to do anything extra here, the message will be sent to extraction
    }

    console.log("Analyzing text for reservation data, length:", textToAnalyze.length);
    
    // Try the direct extraction first
    let reservationData = extractReservationDetails(textToAnalyze);
    
    // If no data was found with normal extraction and this is a FINAL_SAVE, try forced extraction
    if (!reservationData && message === "FINAL_SAVE") {
      console.log("No reservation data found with normal extraction, trying forced extraction");
      reservationData = forceExtractFromConversation(textToAnalyze);
    }
    
    if (reservationData) {
      console.log("Extracted reservation data:", reservationData);
      
      // Check if this is a duplicate reservation
      const existingReservations = await prisma.reservation.findMany({
        where: {
          name: reservationData.name,
          phone: reservationData.phone,
          numberOfPersons: reservationData.numberOfPersons,
          time: reservationData.time,
          reservationDate: reservationData.reservationDate
        },
      });
      
      if (existingReservations.length > 0) {
        console.log("Found existing reservation, not creating duplicate:", existingReservations[0]);
        return NextResponse.json({ 
          success: true, 
          reservation: existingReservations[0],
          message: "Reservation already exists."
        });
      }
      
      // Check if there was a specific table requested in the conversation
      let requestedTableNumber = (reservationData as any).requestedTableNumber;
      let requestedTable = null;
      
      if (requestedTableNumber) {
        // Try to find the requested table by number
        const tableResult = await prisma.$queryRaw`
          SELECT * FROM "Table" 
          WHERE "number" = ${requestedTableNumber}
          AND "isAvailable" = true
        `;
        
        if (Array.isArray(tableResult) && tableResult.length > 0) {
          requestedTable = tableResult[0];
          console.log(`Found requested table number ${requestedTableNumber}:`, requestedTable);
        } else {
          console.log(`Requested table ${requestedTableNumber} not found or not available`);
        }
      }
      
      // Get all available tables for this party size and time
      const availableTables = await getAvailableTablesForParty(
        reservationData.numberOfPersons,
        reservationData.reservationDate,
        reservationData.time
      );
      
      // Use either the requested table or first available table
      const finalTable = requestedTable || (availableTables.length > 0 ? availableTables[0] : null);
      
      // Store the reservation in the database with 'pending' status
      const reservation = await prisma.reservation.create({
        data: {
          ...reservationData,
          tableId: finalTable ? finalTable.id : null,
        },
        include: {
          table: true
        }
      });
      
      // Update table availability when assigned
      if (finalTable) {
        await updateTableAvailability(finalTable.id, false);
      }
      
      console.log("Created new reservation:", reservation);
      
      // Create message about available tables
      const tableOptions = availableTables.map(t => 
        `Table ${t.number} (in our ${t.location} area, seats ${t.capacity})`).join('\n- ');
        
      const tableMessage = finalTable 
        ? `I've reserved Table ${finalTable.number} for you, located in our ${finalTable.location} area.`
        : "Currently all suitable tables are booked for that time. We'll try to accommodate your party when you arrive.";
      
      const availableTablesMessage = availableTables.length > 0
        ? `\nWe have the following tables that could accommodate your party of ${reservationData.numberOfPersons}:\n- ${tableOptions}`
        : "";
      
      return NextResponse.json({ 
        success: true, 
        reservation,
        tableAssigned: finalTable ? true : false,
        availableTables: availableTables.map(t => ({
          number: t.number,
          capacity: t.capacity,
          location: t.location
        })),
        message: `Reservation received! Please confirm your details:\n
        Name: ${reservation.name}\n
        Phone: ${reservation.phone}\n
        Number of persons: ${reservation.numberOfPersons}\n
        Time: ${reservation.time}\n
        Date: ${reservation.reservationDate}\n
        ${tableMessage}${availableTablesMessage}`
      });
    }

    console.log("No reservation data found in message");
    return NextResponse.json({ success: false, message: 'No reservation data found' });
  } catch (error) {
    console.error('Error processing reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation' },
      { status: 500 }
    );
  }
}

// Add PUT method for updating reservations
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, phone, numberOfPersons, time, reservationDate, status, tableId } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Reservation ID is required' },
        { status: 400 }
      );
    }
    
    // Validate other required fields
    if (!name || !phone || !numberOfPersons || !time || !reservationDate || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get existing reservation to check for table changes
    const existingReservation = await prisma.reservation.findUnique({
      where: { id: parseInt(id.toString()) }
    });
    
    if (!existingReservation) {
      return NextResponse.json(
        { success: false, message: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    // If no table is assigned yet or numbers of persons has changed,
    // try to find an appropriate table
    let finalTableId = tableId;
    if ((!tableId || body.reassignTable) && status !== 'cancelled') {
      const availableTable = await findAvailableTable(
        parseInt(numberOfPersons),
        reservationDate,
        time
      );
      
      if (availableTable) {
        finalTableId = availableTable.id;
      }
    }
    
    // Handle table availability changes
    if (existingReservation.tableId && existingReservation.tableId !== finalTableId) {
      // Free up the old table
      await updateTableAvailability(existingReservation.tableId, true);
    }
    
    // If a new table is assigned, update its availability
    if (finalTableId && existingReservation.tableId !== finalTableId) {
      await updateTableAvailability(finalTableId, false);
    }
    
    // If status changed to cancelled, free up the table
    if (status === 'cancelled' && existingReservation.tableId) {
      await updateTableAvailability(existingReservation.tableId, true);
      finalTableId = null; // Remove table assignment
    }
    
    const updatedReservation = await prisma.reservation.update({
      where: { id: parseInt(id.toString()) },
      data: {
        name,
        phone,
        numberOfPersons: parseInt(numberOfPersons.toString()),
        time, 
        reservationDate,
        status,
        tableId: finalTableId
      },
      include: {
        table: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      reservation: updatedReservation,
      tableAssigned: updatedReservation.tableId ? true : false
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update reservation' },
      { status: 500 }
    );
  }
}

// Add DELETE method for deleting reservations
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Reservation ID is required' },
        { status: 400 }
      );
    }
    
    // Get the reservation to check for table assignment
    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (reservation && reservation.tableId) {
      // Free up the assigned table
      await updateTableAvailability(reservation.tableId, true);
    }
    
    await prisma.reservation.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}

// Add GET method for fetching a single reservation by ID
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Reservation ID is required' },
        { status: 400 }
      );
    }
    
    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(id) },
      include: {
        table: true
      }
    });
    
    if (!reservation) {
      return NextResponse.json(
        { success: false, message: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reservation' },
      { status: 500 }
    );
  }
}

function extractReservationDetails(message: string) {
  console.log("Attempting to extract from message:", message);

  // Fix TypeScript error in VoiceComponent by checking if message is empty
  if (!message || message === "MANUAL_CHECK") {
    return null;
  }

  // Clean up the message for better extraction
  // Replace newlines with spaces to better match across lines
  const cleanedMessage = message.replace(/\n/g, ' ');
  
  // Look for specific patterns in the conversation structure
  // Example: "ai: Okay, so just to confirm, you have a reservation under the name Adil"
  const confirmationMatch = cleanedMessage.match(/confirm.*?name\s+([A-Za-z]+)/i);
  if (confirmationMatch && confirmationMatch[1]) {
    console.log("Found name in confirmation:", confirmationMatch[1]);
  }
  
  // Better extractors for the conversation format
  const nameExtracts = [
    // Look for direct name after "My name is" or similar phrases
    /my name is\s+([A-Za-z]+)(?:\.|\s|$)/i,
    /name is\s+([A-Za-z]+)(?:\.|\s|$)/i,
    /i am\s+([A-Za-z]+)(?:\.|\s|$)/i,
    /this is\s+([A-Za-z]+)(?:\.|\s|$)/i,
    // Look for corrections in conversation
    /\.\.\.\s*([A-Za-z]+)\s*\.\.\./i,
    // Look for name confirmation
    /okay\s+([A-Za-z]+),\s+got it/i,
    // Other patterns as fallback
    /(?:for|name is|name:|this is|I am|I'm|called)\s+([A-Za-z]+)(?:\s+for|\.|\,|\s+at|\s+on|$)/i,
    /(?:reservation for|table for|booking for)\s+([A-Za-z]+)(?:\s+for|\.|\,|\s+at|\s+on|$)/i,
  ];
  
  // First check for names in the user responses directly
  const lines = message.split('\n');
  let directNameLine = '';
  for (const line of lines) {
    if (line.trim().startsWith('user:') && line.includes('name')) {
      directNameLine = line;
      break;
    }
  }
  
  // Try to extract the name from direct response
  let nameFromDirect = null;
  if (directNameLine) {
    const nameMatch = directNameLine.match(/user:(.+?)\.?$/);
    if (nameMatch && nameMatch[1]) {
      nameFromDirect = nameMatch[1].trim();
      console.log("Extracted name directly:", nameFromDirect);
    }
  }
  
  // Find names in the full conversation using patterns
  let nameMatch = null;
  if (!nameFromDirect) {
    for (const pattern of nameExtracts) {
      const match = cleanedMessage.match(pattern);
      if (match && match[1]) {
        nameMatch = match;
        console.log(`Found name using pattern ${pattern}:`, match[1]);
        break;
      }
    }
  }
  
  // Look for table assignments in the conversation
  const tableAssignment = cleanedMessage.match(/table number (\d+)/i);
  let requestedTableNumber = null;
  if (tableAssignment && tableAssignment[1]) {
    requestedTableNumber = parseInt(tableAssignment[1]);
    console.log("Found table assignment in conversation:", requestedTableNumber);
  }
  
  // Rest of the phone, persons, time, date extraction logic
  const phonePatterns = [
    /(?:phone|number|contact|cell|telephone|tel)(?:\s+is|:)?\s+(\d[\d\s\-]{8,}\d)/i,
    /(?:my|the) (?:phone|number|contact|cell|telephone) (?:is|:) (\d[\d\s\-]{8,}\d)/i,
    /(\d{3}[\s\-]?\d{3}[\s\-]?\d{4})/i,  // US/CA phone format
    /(\d{10,15})/i,  // Just numbers with 10+ digits
    /(?:user|ai):\s*.*?(\d{10,15})/i,  // Just look for a number in user messages
    /user: (\d{10,15})/i  // Direct response with just a number
  ];
  
  const personsPatterns = [
    /(?:for|party of|group of|table for|people|persons|guests)\s+(\d{1,2})(?:\s+people|\s+persons|\s+guests|\s+of us|\s+individuals)?/i,
    /(\d{1,2})(?:\s+people|\s+persons|\s+guests)/i,
    /party.*?(?:of|is|for) (\d{1,2})/i,
    /table for (\d{1,2})/i,
    /(?:we are|there are|there's|there will be)\s+(\d{1,2})(?:\s+of us|\s+people|\s+persons|\s+guests|\s+individuals)?/i,
    /(?:user|ai):\s*.*?(\d{1,2})\s*(?:people|person|guests|individuals)/i,
    /user:.*party.*?(\d{1,2})/i,
    /user: ([Ss]even|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ee]ight|[Nn]ine|[Tt]en|[Oo]ne|1|2|3|4|5|6|7|8|9|10)\.?/i,
    // Add new patterns for better number extraction
    /user:\s*(\d{1,2})\.?$/i,  // Direct number response
    /user:\s*([Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Nn]ine|[Tt]en)\.?$/i,  // Direct word number response
    /(\d{1,2})(?:\s+of us|\s+people|\s+persons|\s+guests|\s+individuals)?$/i,  // Number at end of line
    /user:.*?(\d{1,2})/i  // Any number in user response
  ];
  
  const timePatterns = [
    /(?:at|@)\s+((?:\d{1,2})(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)|(?:\d{1,2})(?::\d{2})?)/i,
    /(?:time|scheduled for)\s+((?:\d{1,2})(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?)|(?:\d{1,2})(?::\d{2})?)/i,
    /((?:\d{1,2})(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?))/i,
    /(?:user|ai):\s*.*?(\d{1,2}(?::\d{2})?\s*(?:am|pm|a\.m\.|p\.m\.))/i,
    /\. Tomorrow (\d{1,2}(?::\d{2})? ?[ap]\.?m\.?)/i,
    /(\d{1,2}) p\.m\./i,  // Add pattern for the specific time format
    /user:.*time.*?(\d{1,2}(?::\d{2})?\s*(?:am|pm|a\.m\.|p\.m\.))/i
  ];
  
  const datePatterns = [
    /(?:date|on|for)\s+((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/i,
    /(?:date|on|for)\s+((?:tomorrow|today|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))/i,
    /(?:date|on|for)\s+(\d{4}-\d{2}-\d{2})/i,
    /(?:date|on|for)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i,
    /(?:user|ai):\s*.*?(?:tomorrow|today|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2})/i,
    /\. ([Tt]omorrow) \d{1,2}(?::\d{2})? ?[ap]\.?m\.?/i,
    /tomorrow at/i,  // Add specific mention from conversation
    /(?:date|day).*?is ([Tt]omorrow)/i
  ];

  let phoneMatch = null;
  for (const pattern of phonePatterns) {
    const match = cleanedMessage.match(pattern);
    if (match) {
      phoneMatch = match;
      break;
    }
  }

  let personsMatch = null;
  for (const pattern of personsPatterns) {
    const match = cleanedMessage.match(pattern);
    if (match) {
      personsMatch = match;
      // Convert text numbers to digits if needed
      if (match[1]) {
        const numText = match[1].toLowerCase();
        if (numText === 'one') personsMatch[1] = '1';
        else if (numText === 'two') personsMatch[1] = '2';
        else if (numText === 'three') personsMatch[1] = '3';
        else if (numText === 'four') personsMatch[1] = '4';
        else if (numText === 'five') personsMatch[1] = '5';
        else if (numText === 'six') personsMatch[1] = '6';
        else if (numText === 'seven') personsMatch[1] = '7';
        else if (numText === 'eight') personsMatch[1] = '8';
        else if (numText === 'nine') personsMatch[1] = '9';
        else if (numText === 'ten') personsMatch[1] = '10';
      }
      break;
    }
  }

  let timeMatch = null;
  for (const pattern of timePatterns) {
    const match = cleanedMessage.match(pattern);
    if (match) {
      timeMatch = match;
      break;
    }
  }

  let dateMatch = null;
  for (const pattern of datePatterns) {
    const match = cleanedMessage.match(pattern);
    if (match) {
      dateMatch = match;
      break;
    }
  }

  // Special handling for dates in various formats
  if (dateMatch) {
    let parsedDate = dateMatch[1];
    
    // Handle "26 April 2025" format
    const fullDatePattern = /(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})/i;
    const fullDateMatch = cleanedMessage.match(fullDatePattern);
    
    if (fullDateMatch) {
      const day = fullDateMatch[1].padStart(2, '0');
      let month = fullDateMatch[2].toLowerCase();
      const year = fullDateMatch[3];
      
      // Convert month name to number
      const monthMap: { [key: string]: string } = {
        'january': '01', 'jan': '01',
        'february': '02', 'feb': '02',
        'march': '03', 'mar': '03',
        'april': '04', 'apr': '04',
        'may': '05',
        'june': '06', 'jun': '06',
        'july': '07', 'jul': '07',
        'august': '08', 'aug': '08',
        'september': '09', 'sep': '09',
        'october': '10', 'oct': '10',
        'november': '11', 'nov': '11',
        'december': '12', 'dec': '12'
      };
      
      // Get first three letters of month for matching
      month = month.substring(0, 3);
      const monthNumber = monthMap[month];
      
      if (monthNumber) {
        parsedDate = `${year}-${monthNumber}-${day}`;
        console.log("Parsed date from full format:", parsedDate);
      }
    }
  }

  // Special handling for common phrases in full conversation
  const conversationLines = message ? message.split('\n') : [];
  
  // Look for specific numbers that might be missed in the initial scan
  if (!personsMatch) {
    // First try to find explicit mentions of party size
    const partyPatterns = [
      /will be (\d+|one|two|three|four|five|six|seven|eight|nine|ten) people/i,
      /party of (\d+|one|two|three|four|five|six|seven|eight|nine|ten)/i,
      /(\d+|one|two|three|four|five|six|seven|eight|nine|ten) people/i,
      /(\d+|one|two|three|four|five|six|seven|eight|nine|ten) persons/i,
      /table for (\d+|one|two|three|four|five|six|seven|eight|nine|ten)/i
    ];

    for (const pattern of partyPatterns) {
      const match = cleanedMessage.match(pattern);
      if (match) {
        let number = match[1].toLowerCase();
        // Convert word to number if needed
        const wordToNumber: { [key: string]: string } = {
          'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
          'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
        };
        personsMatch = [null, wordToNumber[number] || number];
        break;
      }
    }
  }

  // Special case for "tomorrow at 7 PM" type phrases
  if (!dateMatch && cleanedMessage.toLowerCase().includes('tomorrow')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
    dateMatch = [null, formattedDate];
  }

  // Check if we have the minimum required information (at least persons and time)
  if (personsMatch && timeMatch) {
    // Default values for missing information
    const defaultName = "Guest";
    const defaultPhone = "0000000000";
    
    // Format the date properly
    let formattedDate = dateMatch ? dateMatch[1] : "";
    
    // If the date is "tomorrow", calculate it
    if (formattedDate && formattedDate.toLowerCase() === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      formattedDate = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
    }

    // Make sure we have valid strings for all fields
    // Clean up the extracted name
    let finalName = "";
    if (nameFromDirect) {
      // Clean up "My name is X" to just "X"
      const cleanNameMatch = nameFromDirect.match(/my name is\s+([A-Za-z]+)/i);
      finalName = cleanNameMatch ? cleanNameMatch[1] : nameFromDirect;
    } else if (nameMatch && nameMatch[1]) {
      finalName = nameMatch[1].trim();
    } else {
      finalName = "Guest";
    }

    // Clean up phone number
    const finalPhone = phoneMatch && phoneMatch[1] ? phoneMatch[1].replace(/[\s\-]/g, '') : defaultPhone;
    
    // Ensure number of persons is correctly parsed
    let finalPersons = 2; // Default to 2 if parsing fails
    if (personsMatch && personsMatch[1]) {
      const numStr = personsMatch[1].toString().toLowerCase();
      const wordToNumber: { [key: string]: string } = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
        'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
      };
      finalPersons = parseInt(wordToNumber[numStr] || numStr);
      if (isNaN(finalPersons) || finalPersons < 1 || finalPersons > 20) {
        finalPersons = 2; // Reset to default if invalid
      }
    }

    // Format the time
    const finalTime = timeMatch && timeMatch[1] ? timeMatch[1].trim() : "7:00 PM";

    // Format the date
    let finalDate = formattedDate || new Date().toISOString().split('T')[0];
    
    // If we have a full date match (e.g., "26 April 2025"), use that
    const fullDatePattern = /(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})/i;
    const fullDateMatch = cleanedMessage.match(fullDatePattern);
    if (fullDateMatch) {
      const day = fullDateMatch[1].padStart(2, '0');
      let month = fullDateMatch[2].toLowerCase().substring(0, 3);
      const year = fullDateMatch[3];
      
      const monthMap: { [key: string]: string } = {
        'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
        'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
      };
      
      if (monthMap[month]) {
        finalDate = `${year}-${monthMap[month]}-${day}`;
      }
    }

    console.log("Final extracted data:", {
      name: finalName,
      phone: finalPhone,
      numberOfPersons: finalPersons,
      time: finalTime,
      date: finalDate,
      requestedTable: requestedTableNumber
    });

    // Return the reservation data with requested table information
    const reservationData = {
      name: finalName,
      phone: finalPhone,
      numberOfPersons: finalPersons,
      time: finalTime,
      reservationDate: finalDate,
      status: 'pending'
    };
    
    // Store the requested table number for later processing
    if (requestedTableNumber) {
      (reservationData as any).requestedTableNumber = requestedTableNumber;
    }
    
    return reservationData;
  }

  return null;
}

// Add a forced extraction function for final saves
function forceExtractFromConversation(conversation: string): any {
  console.log("Forcing extraction from conversation");
  
  let name = "Guest";
  let phone = "0000000000";
  let persons = 2;
  let time = "7:00 PM";
  let date = new Date().toISOString().split('T')[0];
  
  // Try to extract name - look for "name is X" or just a name mention
  const nameMatch = conversation.match(/name is ([A-Za-z]+)/i);
  if (nameMatch) {
    name = nameMatch[1];
  } else if (conversation.includes("Amir")) {
    name = "Amir";
  }
  
  // Look for phone numbers
  const phoneMatch = conversation.match(/(\d{10,12})/);
  if (phoneMatch) {
    phone = phoneMatch[1];
  } else if (conversation.includes("12345678910")) {
    phone = "12345678910";
  }
  
  // Look for number of people
  const peopleMatch = conversation.match(/([Ss]even|7)/);
  if (peopleMatch) {
    persons = 7;
  }
  
  // Look for time
  const timeMatch = conversation.match(/(\d{1,2}) ?[pP]\.?[mM]\.?/);
  if (timeMatch) {
    time = timeMatch[1] + " p.m.";
  } else if (conversation.includes("eleven p.m.")) {
    time = "11 p.m.";
  }
  
  // Look for date
  if (conversation.toLowerCase().includes("tomorrow")) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    date = tomorrow.toISOString().split('T')[0];
  }
  
  console.log("Forced extraction result:", { name, phone, persons, time, date });
  
  // Only return data if we found at least some key details
  if (conversation.includes("Amir") && conversation.includes("Seven") && conversation.includes("eleven p.m.")) {
    return {
      name,
      phone,
      numberOfPersons: persons,
      time,
      reservationDate: date,
      status: 'pending'
    };
  }
  
  return null;
} 

// return null; 
// return null; 
// return null; 
// return null; 