import { NextRequest, NextResponse } from 'next/server';
import { createHotelInquiry } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { hotelId, hotelName, name, email, phone, message } = body;

    // Validate required fields
    if (!hotelId || !hotelName || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Hotel ID, hotel name, name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create inquiry in database
    const inquiry = await createHotelInquiry({
      hotelId,
      hotelName,
      name,
      email,
      phone: phone || undefined,
      message,
    });

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Hotel inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
