import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a direct prisma client
const directPrisma = new PrismaClient();

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
    // Check if tables exist - use direct SQL query
    const tableCount = await directPrisma.$queryRaw`SELECT COUNT(*) as count FROM Table`;
    console.log("Table count result:", tableCount);
    
    if (Array.isArray(tableCount) && tableCount.length > 0 && tableCount[0].count > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Tables already exist', 
        count: tableCount[0].count
      });
    }

    // Create all tables
    let tables = [];
    for (const config of tableConfigs) {
      try {
        const table = await directPrisma.table.create({
          data: {
            number: config.number,
            capacity: config.capacity,
            location: config.location,
            isAvailable: true
          }
        });
        tables.push(table);
      } catch (error) {
        console.error(`Error creating table ${config.number}:`, error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `${tables.length} tables created successfully`, 
      tables 
    });
  } catch (error) {
    console.error('Error seeding tables:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed tables',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 