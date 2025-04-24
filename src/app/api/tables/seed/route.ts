import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    // Check if Table model is available
    if (!prisma.table) {
      return NextResponse.json({ 
        success: false, 
        message: 'Table model not available. Please regenerate Prisma client.',
      }, { status: 500 });
    }
    
    // Check if tables already exist to avoid duplication
    try {
      const existingTables = await prisma.table.count();
      
      if (existingTables > 0) {
        return NextResponse.json({ 
          success: true, 
          message: 'Tables already exist', 
          count: existingTables 
        });
      }
    } catch (error) {
      console.error('Error checking existing tables:', error);
      // Continue with creation attempt
    }

    // Create all tables
    try {
      const tables = await Promise.all(
        tableConfigs.map(config => 
          prisma.table.create({
            data: {
              number: config.number,
              capacity: config.capacity,
              location: config.location,
              isAvailable: true
            }
          })
        )
      );

      return NextResponse.json({ 
        success: true, 
        message: 'Tables created successfully', 
        tables 
      });
    } catch (error) {
      console.error('Error creating tables:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Error creating tables. Schema may need migration.',
        error: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
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