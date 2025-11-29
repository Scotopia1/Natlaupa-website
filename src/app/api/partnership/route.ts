import { NextRequest, NextResponse } from 'next/server';
import { createPartnershipApplication } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, companyName, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !companyName || !message) {
      return NextResponse.json(
        { error: 'First name, last name, email, company name, and message are required' },
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
    const application = await createPartnershipApplication({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      companyName,
      message,
    });

    return NextResponse.json(
      { success: true, id: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Partnership application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit partnership application' },
      { status: 500 }
    );
  }
}
