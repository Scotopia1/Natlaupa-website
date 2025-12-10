import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function GET() {
  try {
    // Fetch from server API
    const response = await fetch(`${API_URL}/analytics/insights`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch insights from server');
    }

    const data = await response.json();

    // Return the insights data from server
    return NextResponse.json(data.data || {
      searchTrend: '+0%',
      topSearch: 'Maldives',
      avgStay: '5 nights'
    });
  } catch (error) {
    console.error('Error fetching insights:', error);

    // Return default values on error
    return NextResponse.json({
      searchTrend: '+0%',
      topSearch: 'Maldives',
      avgStay: '5 nights'
    }, { status: 200 }); // Return 200 with defaults instead of 500
  }
}
