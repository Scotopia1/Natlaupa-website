import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    // Get interaction counts for trend calculation
    const [recentCount, previousCount] = await Promise.all([
      prisma.userInteraction.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      }),
      prisma.userInteraction.count({
        where: {
          createdAt: {
            gte: fourteenDaysAgo,
            lt: sevenDaysAgo
          }
        }
      })
    ]);

    // Calculate percentage change
    const percentChange = previousCount > 0
      ? Math.round(((recentCount - previousCount) / previousCount) * 100)
      : 0;

    // Get top country from recent hotel/offer views
    const topInteractions = await prisma.userInteraction.groupBy({
      by: ['entityId'],
      where: {
        entityType: 'hotel',
        createdAt: { gte: sevenDaysAgo }
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    // Fetch hotel details to get countries
    let topCountry = 'Maldives'; // Default fallback
    if (topInteractions.length > 0) {
      const hotels = await prisma.hotel.findMany({
        where: { id: { in: topInteractions.map(i => i.entityId) } },
        select: { country: true }
      });

      if (hotels.length > 0) {
        topCountry = hotels[0].country;
      }
    }

    // Calculate average stay from recent inquiries
    const inquiries = await prisma.hotelInquiry.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        stayDuration: { not: null }
      },
      select: { stayDuration: true },
      take: 50
    });

    const avgStay = inquiries.length > 0
      ? Math.round(inquiries.reduce((sum, i) => sum + (i.stayDuration || 5), 0) / inquiries.length)
      : 5;

    return NextResponse.json({
      searchTrend: `${percentChange >= 0 ? '+' : ''}${percentChange}%`,
      topSearch: topCountry,
      avgStay: `${avgStay} nights`
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
