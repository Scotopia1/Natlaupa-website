import { NextRequest, NextResponse } from 'next/server';
import { createAngelApplication } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      currentPosition,
      yearsInHospitality,
      motivation
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !currentPosition || !yearsInHospitality || !motivation) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Create application in database
    const application = await createAngelApplication({
      firstName,
      lastName,
      email,
      phone,
      currentPosition,
      yearsInHospitality,
      motivation,
    });

    return NextResponse.json(
      { success: true, id: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Angel application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit angel application' },
      { status: 500 }
    );
  }
}
