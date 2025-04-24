import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    console.log("API: Fetching all reservations");
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        table: true
      }
    });
    
    console.log(`API: Found ${reservations.length} reservations`);
    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
} 