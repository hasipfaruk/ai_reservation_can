import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Direct connection to the database
const prisma = new PrismaClient();

// Define table configurations
const tableConfigs = [
  { number: 1, capacity: 2, location: "window" },
  { number: 2, capacity: 2, location: "window" },
  { number: 3, capacity: 4, location: "center" },
  { number: 4, capacity: 4, location: "center" },
  { number: 5, capacity: 6, location: "center" },
  { number: 6, capacity: 6, location: "patio" },
  { number: 7, capacity: 8, location: "patio" },
  { number: 8, capacity: 8, location: "private" },
  { number: 9, capacity: 10, location: "private" },
  { number: 10, capacity: 12, location: "party" },
];

export async function GET() {
  try {
    // First verify the connection to the database
    console.log("Attempting to connect to database...");
    await prisma.$queryRaw`SELECT 1+1 AS result`;
    console.log("Database connection successful");
    
    // First check if Table model exists in the schema
    try {
      // Try to access the table model
      console.log("Checking if Table model exists...");
      const checkSchema = await prisma.$queryRaw`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Table'
      `;
      
      console.log("Schema check result:", checkSchema);
      
      if (!Array.isArray(checkSchema) || checkSchema.length === 0) {
        return NextResponse.json({ 
          success: false, 
          error: "Table model does not exist in the database schema",
          details: "Please run 'npx prisma migrate dev' to create the Table model first"
        }, { status: 500 });
      }
    } catch (schemaError) {
      console.error("Error checking schema:", schemaError);
      return NextResponse.json({ 
        success: false, 
        error: "Could not verify database schema",
        details: schemaError instanceof Error ? schemaError.message : String(schemaError)
      }, { status: 500 });
    }
    
    // Now proceed with table operations
    
    // Check if tables already exist
    let existingTables = [];
    try {
      existingTables = await prisma.table.findMany();
      console.log(`Found ${existingTables.length} existing tables`);
    } catch (findError) {
      console.error("Error finding tables:", findError);
      return NextResponse.json({ 
        success: false, 
        error: "Error accessing tables",
        details: findError instanceof Error ? findError.message : String(findError)
      }, { status: 500 });
    }
    
    // Delete all existing tables if any exist
    if (existingTables.length > 0) {
      try {
        await prisma.table.deleteMany({});
        console.log("Deleted existing tables");
      } catch (deleteError) {
        console.error("Error deleting tables:", deleteError);
        return NextResponse.json({ 
          success: false, 
          error: "Failed to delete existing tables",
          details: deleteError instanceof Error ? deleteError.message : String(deleteError)
        }, { status: 500 });
      }
    }
    
    // Create all tables
    const tables = [];
    for (const config of tableConfigs) {
      try {
        console.log(`Creating table ${config.number}...`);
        const table = await prisma.table.create({
          data: {
            number: config.number,
            capacity: config.capacity,
            location: config.location || "",
            description: `Table ${config.number} in ${config.location}`,
            isAvailable: true
          }
        });
        tables.push(table);
        console.log(`Created table ${table.number}`);
      } catch (error) {
        console.error(`Error creating table ${config.number}:`, error);
      }
    }
    
    if (tables.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to create any tables",
        details: "See server logs for details"
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${tables.length} tables created`, 
      tables 
    });
  } catch (error) {
    console.error("Error creating tables:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to create tables",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 