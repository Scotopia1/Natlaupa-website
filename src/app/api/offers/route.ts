import { NextRequest, NextResponse } from 'next/server';
import { getTrendingOffers, getFeaturedOffers, getOffersByExperienceType, getAllOffers } from '@/lib/db';

type OfferType = 'seasonal' | 'trending' | 'for-you';

// Determine current season
function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

// Map seasons to experience types
function getSeasonalExperienceType(): string {
  const season = getCurrentSeason();
  const mapping: Record<string, string> = {
    winter: 'Wellness',
    spring: 'Cultural',
    summer: 'Adventure',
    autumn: 'Romantic',
  };
  return mapping[season] || 'Adventure';
}

// GET - Get offer recommendations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const type = (searchParams.get('type') || 'trending') as OfferType;
    const limit = parseInt(searchParams.get('limit') || '10');

    let offers;

    switch (type) {
      case 'seasonal':
        // Get offers matching current season's experience type
        const experienceType = getSeasonalExperienceType();
        offers = await getOffersByExperienceType(experienceType, limit);
        break;

      case 'trending':
        // Get trending offers
        offers = await getTrendingOffers(limit);
        break;

      case 'for-you':
        // For now, return featured offers
        // TODO: Implement personalized logic based on user preferences
        offers = await getFeaturedOffers(limit);
        break;

      default:
        // Default to trending
        offers = await getTrendingOffers(limit);
    }

    // If no offers found, fallback to all offers
    if (!offers || offers.length === 0) {
      offers = await getAllOffers();
      offers = offers.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      type,
      count: offers.length,
      offers: offers.map(offer => ({
        id: offer.id,
        title: offer.title,
        tagline: offer.tagline,
        description: offer.description,
        duration: offer.duration,
        imageUrl: offer.imageUrl,
        galleryImages: offer.galleryImages,
        experienceType: offer.experienceType,
        isTrending: offer.isTrending,
        isFeatured: offer.isFeatured,
        hotel: {
          id: offer.hotel.id,
          name: offer.hotel.name,
          location: offer.hotel.location,
          country: offer.hotel.country,
          rating: offer.hotel.rating,
          category: offer.hotel.category,
        },
        activities: offer.activities.map(activity => ({
          id: activity.id,
          name: activity.name,
          duration: activity.duration,
          category: activity.category,
        })),
      }))
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}
