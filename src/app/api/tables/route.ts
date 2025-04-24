import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Get all tables
export async function GET() {
  try {
    // Check if Table model is available
    if (!prisma.table) {
      return NextResponse.json({ 
        success: false, 
        message: 'Table model not available. Please regenerate Prisma client.',
      }, { status: 500 });
    }
    
    try {
      const tables = await prisma.table.findMany({
        include: {
          reservations: true
        }
      });
      
      return NextResponse.json({ success: true, tables });
    } catch (error) {
      console.error('Error querying tables:', error);
      // Return empty tables array as fallback
      return NextResponse.json({ success: true, tables: [] });
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch tables',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Update table availability
export async function PUT(request: Request) {
  try {
    // Check if Table model is available
    if (!prisma.table) {
      return NextResponse.json({ 
        success: false, 
        message: 'Table model not available. Please regenerate Prisma client.',
      }, { status: 500 });
    }
    
    const body = await request.json();
    const { id, isAvailable } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Table ID is required' },
        { status: 400 }
      );
    }
    
    try {
      const updatedTable = await prisma.table.update({
        where: { id: parseInt(id.toString()) },
        data: { 
          isAvailable: isAvailable !== undefined ? isAvailable : true
        }
      });
      
      return NextResponse.json({ success: true, table: updatedTable });
    } catch (error) {
      console.error('Error updating table:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to update table',
          details: error instanceof Error ? error.message : String(error)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error handling table update:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process table update',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 