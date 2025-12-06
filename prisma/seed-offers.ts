import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// ACTIVITY TEMPLATES BY CATEGORY
// ============================================

const ACTIVITIES_BY_CATEGORY: Record<string, any[]> = {
  'Eco-Lodges': [
    { name: 'Guided Nature Walk', description: 'Explore pristine trails with expert naturalist guides who reveal the hidden wonders of the ecosystem.', duration: '3 hours', category: 'Adventure' },
    { name: 'Wildlife Photography Tour', description: 'Capture stunning images of rare species in their natural habitat with professional photography guidance.', duration: 'Full day', category: 'Adventure' },
    { name: 'Organic Farm-to-Table Dinner', description: 'Savor a multi-course meal prepared with ingredients harvested from our sustainable gardens.', duration: '2 hours', category: 'Dining' },
    { name: 'Yoga in the Forest', description: 'Practice mindful movement surrounded by ancient trees and the sounds of nature.', duration: '1.5 hours', category: 'Wellness' },
    { name: 'Stargazing Experience', description: 'Discover constellations and celestial wonders with high-powered telescopes away from city lights.', duration: '2 hours', category: 'Adventure' },
  ],
  'Urban Suites': [
    { name: 'Private City Tour', description: 'Discover hidden gems and iconic landmarks with a local expert who brings the city\'s stories to life.', duration: 'Half day', category: 'Cultural' },
    { name: 'Michelin-Star Dining Experience', description: 'Indulge in an unforgettable culinary journey at one of the city\'s most acclaimed restaurants.', duration: '3 hours', category: 'Dining' },
    { name: 'Personal Shopping Experience', description: 'Explore exclusive boutiques and designer showrooms with a professional style consultant.', duration: '4 hours', category: 'Cultural' },
    { name: 'Rooftop Cocktail Experience', description: 'Enjoy handcrafted cocktails with panoramic city views as the sun sets over the skyline.', duration: '2 hours', category: 'Dining' },
    { name: 'Private Art Gallery Tour', description: 'Access exclusive collections and meet renowned artists in intimate gallery settings.', duration: '3 hours', category: 'Cultural' },
  ],
  'Historic Castles': [
    { name: 'Castle Heritage Tour', description: 'Journey through centuries of history with expert historians who reveal the castle\'s fascinating past.', duration: '2 hours', category: 'Cultural' },
    { name: 'Medieval Banquet Dinner', description: 'Feast like royalty with a lavish multi-course meal served in grand historical dining halls.', duration: '3 hours', category: 'Dining' },
    { name: 'Whisky Tasting Experience', description: 'Sample rare single malts in the castle\'s ancient cellars while learning the art of whisky appreciation.', duration: '2 hours', category: 'Cultural' },
    { name: 'Falconry Demonstration', description: 'Witness the ancient art of falconry and learn to handle these magnificent birds of prey.', duration: '1.5 hours', category: 'Adventure' },
    { name: 'Private Chapel Concert', description: 'Experience classical music performed by renowned musicians in the castle\'s intimate chapel.', duration: '1 hour', category: 'Cultural' },
  ],
  'Overwater Villas': [
    { name: 'Sunset Catamaran Cruise', description: 'Sail across crystal-clear lagoons as the sky transforms into a canvas of vibrant colors.', duration: '3 hours', category: 'Adventure' },
    { name: 'Underwater Dining Experience', description: 'Dine surrounded by marine life in an exclusive underwater restaurant with panoramic ocean views.', duration: '2.5 hours', category: 'Dining' },
    { name: 'Private Snorkeling Adventure', description: 'Explore vibrant coral reefs teeming with tropical fish guided by marine biologists.', duration: 'Half day', category: 'Adventure' },
    { name: 'Couples Spa Ritual', description: 'Indulge in synchronized treatments using indigenous ingredients overlooking the turquoise lagoon.', duration: '2 hours', category: 'Wellness' },
    { name: 'Beach Picnic & Champagne', description: 'Enjoy a gourmet picnic on your own private island complete with premium champagne.', duration: '3 hours', category: 'Dining' },
  ],
  'Mountain Retreats': [
    { name: 'Guided Summit Hike', description: 'Ascend to breathtaking peaks with experienced guides who ensure both safety and unforgettable views.', duration: 'Full day', category: 'Adventure' },
    { name: 'Alpine Spa Experience', description: 'Rejuvenate with mountain-inspired treatments including hot stone massages and herbal baths.', duration: '3 hours', category: 'Wellness' },
    { name: 'Fondue Dinner by Fireplace', description: 'Savor traditional cheese and chocolate fondues in a cozy setting with roaring fires.', duration: '2 hours', category: 'Dining' },
    { name: 'Helicopter Valley Tour', description: 'Soar over majestic peaks and hidden valleys on an exclusive helicopter sightseeing adventure.', duration: '1 hour', category: 'Adventure' },
    { name: 'Morning Yoga with Mountain Views', description: 'Start your day with sunrise yoga sessions overlooking dramatic alpine landscapes.', duration: '1 hour', category: 'Wellness' },
  ],
  'Desert Oasis': [
    { name: 'Camel Caravan at Sunset', description: 'Traverse ancient desert routes on camelback as golden hour transforms the dunes.', duration: '2 hours', category: 'Adventure' },
    { name: 'Bedouin Dinner Under Stars', description: 'Experience authentic cuisine in a traditional desert camp beneath a canopy of stars.', duration: '3 hours', category: 'Dining' },
    { name: 'Dune Bashing Adventure', description: 'Experience thrilling 4x4 rides over towering sand dunes with expert desert drivers.', duration: '2 hours', category: 'Adventure' },
    { name: 'Desert Spa Ritual', description: 'Relax with treatments using desert botanicals and ancient Middle Eastern healing traditions.', duration: '2.5 hours', category: 'Wellness' },
    { name: 'Falconry & Cultural Show', description: 'Witness the majesty of falcons and learn about traditional desert culture and customs.', duration: '1.5 hours', category: 'Cultural' },
  ],
  'Safari Lodges': [
    { name: 'Big Five Game Drive', description: 'Track lions, elephants, rhinos, leopards, and buffalo with expert rangers at dawn and dusk.', duration: 'Half day', category: 'Adventure' },
    { name: 'Bush Dinner Experience', description: 'Dine in the wilderness surrounded by nature\'s sounds with tables set under ancient trees.', duration: '3 hours', category: 'Dining' },
    { name: 'Walking Safari', description: 'Explore the bush on foot, tracking wildlife and learning survival skills from Masai guides.', duration: '3 hours', category: 'Adventure' },
    { name: 'Sundowner Safari Drinks', description: 'Toast to African sunsets with premium spirits at scenic viewpoints across the savanna.', duration: '2 hours', category: 'Dining' },
    { name: 'Village Cultural Visit', description: 'Engage with local communities, learn traditional crafts, and understand indigenous cultures.', duration: 'Half day', category: 'Cultural' },
  ],
  'Ski Chalets': [
    { name: 'Private Ski Instruction', description: 'Master the slopes with Olympic-level instructors providing personalized technique coaching.', duration: 'Full day', category: 'Adventure' },
    { name: 'Après-Ski Hot Chocolate & Pastries', description: 'Warm up with artisanal hot chocolate and fresh-baked treats at exclusive mountain lodges.', duration: '1 hour', category: 'Dining' },
    { name: 'Helicopter Ski Drop', description: 'Access untouched powder on remote peaks via helicopter for the ultimate skiing experience.', duration: 'Half day', category: 'Adventure' },
    { name: 'Alpine Wellness Journey', description: 'Recover from mountain adventures with deep tissue massages and thermal spa experiences.', duration: '2 hours', category: 'Wellness' },
    { name: 'Gourmet Fondue Evening', description: 'Enjoy Swiss raclette and chocolate fondue paired with regional wines in cozy chalet settings.', duration: '2.5 hours', category: 'Dining' },
  ],
  'Tropical Resorts': [
    { name: 'Island Hopping Adventure', description: 'Discover hidden coves and pristine beaches on a private yacht cruise through tropical islands.', duration: 'Full day', category: 'Adventure' },
    { name: 'Beachfront BBQ Dinner', description: 'Feast on fresh seafood grilled to perfection as waves lap at your feet under the stars.', duration: '2.5 hours', category: 'Dining' },
    { name: 'Scuba Diving Excursion', description: 'Explore vibrant underwater worlds with certified instructors leading you to the best dive sites.', duration: 'Half day', category: 'Adventure' },
    { name: 'Coconut Grove Spa Treatment', description: 'Experience tropical-inspired massages using coconut oil, hibiscus, and island botanicals.', duration: '90 minutes', category: 'Wellness' },
    { name: 'Sunset Sailing & Cocktails', description: 'Glide across calm waters on a luxury sailboat with premium cocktails and canapés.', duration: '3 hours', category: 'Dining' },
  ],
  'Wellness Sanctuaries': [
    { name: 'Personalized Wellness Consultation', description: 'Meet with holistic practitioners who design bespoke wellness programs for your needs.', duration: '1 hour', category: 'Wellness' },
    { name: 'Sunrise Meditation Session', description: 'Begin each day with guided meditation in serene gardens as the world awakens.', duration: '1 hour', category: 'Wellness' },
    { name: 'Ayurvedic Treatment Series', description: 'Experience traditional healing with customized Ayurvedic massages and herbal therapies.', duration: '2 hours', category: 'Wellness' },
    { name: 'Organic Detox Cuisine', description: 'Nourish your body with plant-based meals crafted from locally-sourced organic ingredients.', duration: '1.5 hours', category: 'Dining' },
    { name: 'Forest Bathing Experience', description: 'Immerse yourself in nature\'s healing energy through the Japanese practice of Shinrin-yoku.', duration: '2 hours', category: 'Wellness' },
  ],
};

// ============================================
// OFFER TITLES & TAGLINES BY EXPERIENCE TYPE
// ============================================

const OFFER_TEMPLATES = {
  adventure: {
    titles: [
      '{location} Explorer\'s Journey',
      'Ultimate {location} Adventure',
      '{location} Wilderness Expedition',
      'Adrenaline {location} Escape',
      'Discover Wild {location}',
    ],
    taglines: [
      'Where adventure meets luxury',
      'For those who dare to explore',
      'Unforgettable thrills await',
      'Push boundaries in paradise',
      'Epic experiences, unmatched comfort',
    ],
  },
  romantic: {
    titles: [
      '{location} Lovers\' Retreat',
      'Romance in {location}',
      '{location} Honeymoon Bliss',
      'Intimate {location} Escape',
      '{location} for Two',
    ],
    taglines: [
      'Where love stories are written',
      'Moments made for two',
      'Romance redefined',
      'Your perfect love story begins here',
      'Celebrate love in paradise',
    ],
  },
  wellness: {
    titles: [
      '{location} Wellness Journey',
      'Rejuvenate in {location}',
      '{location} Spa & Serenity',
      'Restore Your Soul in {location}',
      '{location} Healing Retreat',
    ],
    taglines: [
      'Find balance, find yourself',
      'Restore. Renew. Revive.',
      'Holistic healing awaits',
      'Nurture mind, body, and spirit',
      'Your wellness sanctuary',
    ],
  },
  cultural: {
    titles: [
      '{location} Cultural Immersion',
      'Discover {location}\'s Heritage',
      '{location} Traditions & Tales',
      'Historic {location} Experience',
      '{location} Cultural Odyssey',
    ],
    taglines: [
      'Where history comes alive',
      'Immerse yourself in local culture',
      'Timeless traditions, modern luxury',
      'Stories of the past, comfort of today',
      'Culture meets sophistication',
    ],
  },
};

// ============================================
// OFFER REVIEW TEMPLATES
// ============================================

const OFFER_REVIEWS = [
  { user: 'Alexandra M.', rating: 5, comment: 'This package exceeded every expectation. The activities were perfectly curated and the hotel was breathtaking.', date: 'Dec 2024' },
  { user: 'James & Catherine', rating: 5, comment: 'Our honeymoon was absolutely magical. Every detail was thoughtfully planned and executed flawlessly.', date: 'Nov 2024' },
  { user: 'Marcus T.', rating: 4, comment: 'Incredible experience overall. The adventure activities were world-class, though weather affected one day.', date: 'Nov 2024' },
  { user: 'Sophia L.', rating: 5, comment: 'Pure luxury from start to finish. The combination of relaxation and exploration was perfect.', date: 'Oct 2024' },
  { user: 'David R.', rating: 5, comment: 'This wasn\'t just a vacation, it was a transformative experience. Highly recommend the wellness package.', date: 'Oct 2024' },
  { user: 'Emily & Tom', rating: 4, comment: 'Beautiful setting and wonderful activities. The cultural tours were particularly memorable.', date: 'Sep 2024' },
  { user: 'Isabella G.', rating: 5, comment: 'Exceptional service and unforgettable experiences. Worth every penny and then some.', date: 'Sep 2024' },
  { user: 'Christopher K.', rating: 5, comment: 'The adventure activities were thrilling yet felt completely safe. Professional guides made all the difference.', date: 'Aug 2024' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getExperienceType(category: string): string {
  const mapping: Record<string, string> = {
    'Eco-Lodges': 'adventure',
    'Urban Suites': 'cultural',
    'Historic Castles': 'cultural',
    'Overwater Villas': 'romantic',
    'Mountain Retreats': 'adventure',
    'Desert Oasis': 'adventure',
    'Safari Lodges': 'adventure',
    'Ski Chalets': 'adventure',
    'Tropical Resorts': 'romantic',
    'Wellness Sanctuaries': 'wellness',
  };
  return mapping[category] || 'adventure';
}

function generateOfferTitle(location: string, experienceType: string): { title: string; tagline: string } {
  const templates = OFFER_TEMPLATES[experienceType as keyof typeof OFFER_TEMPLATES];
  const title = getRandomItem(templates.titles).replace('{location}', location);
  const tagline = getRandomItem(templates.taglines);
  return { title, tagline };
}

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function main() {
  console.log('🌟 Starting offers seeding...\n');

  // Get all hotels from database
  const hotels = await prisma.hotel.findMany({
    include: {
      moodTags: true,
    },
  });

  if (hotels.length === 0) {
    console.log('⚠️  No hotels found in database. Please run the main seed first: npm run db:seed');
    return;
  }

  console.log(`📍 Found ${hotels.length} hotels. Creating offers...\n`);

  let offerCount = 0;
  let activityCount = 0;

  for (const hotel of hotels) {
    // Create 1-2 offers per hotel
    const numOffers = Math.random() > 0.6 ? 2 : 1;

    for (let i = 0; i < numOffers; i++) {
      const experienceType = getExperienceType(hotel.category);
      const { title, tagline } = generateOfferTitle(hotel.location.split(',')[0], experienceType);

      // Duration: 3-7 days
      const duration = Math.floor(Math.random() * 5) + 3;

      // Get activities for this hotel's category
      const categoryActivities = ACTIVITIES_BY_CATEGORY[hotel.category] || ACTIVITIES_BY_CATEGORY['Tropical Resorts'];
      const selectedActivities = getRandomItems(categoryActivities, Math.min(4, Math.floor(Math.random() * 2) + 3));

      // Create the offer
      const offer = await prisma.offer.create({
        data: {
          title,
          tagline,
          description: `Experience the perfect blend of luxury and ${experienceType} in ${hotel.location}. This carefully curated ${duration}-day package combines the exceptional ${hotel.name} with handpicked activities designed to create unforgettable memories.`,
          duration,
          imageUrl: hotel.imageUrl,
          galleryImages: hotel.galleryImages.length > 0 ? getRandomItems(hotel.galleryImages, Math.min(6, hotel.galleryImages.length)) : [hotel.imageUrl],
          hotelId: hotel.id,
          experienceType: experienceType.charAt(0).toUpperCase() + experienceType.slice(1),
          isTrending: Math.random() > 0.7, // 30% trending
          isFeatured: Math.random() > 0.85, // 15% featured

          // Create activities
          activities: {
            create: selectedActivities.map(activity => ({
              name: activity.name,
              description: activity.description,
              duration: activity.duration,
              category: activity.category,
              imageUrl: hotel.imageUrl, // Reuse hotel images for activities
            })),
          },

          // Create 2-3 reviews per offer
          reviews: {
            create: getRandomItems(OFFER_REVIEWS, Math.floor(Math.random() * 2) + 2),
          },
        },
        include: {
          activities: true,
          reviews: true,
        },
      });

      offerCount++;
      activityCount += offer.activities.length;

      console.log(`✅ Created: "${offer.title}" for ${hotel.name} (${offer.activities.length} activities)`);
    }
  }

  console.log(`\n🎉 Seeding completed successfully!`);
  console.log(`📦 Created ${offerCount} offers`);
  console.log(`🎯 Created ${activityCount} activities`);
  console.log(`🏨 ${hotels.length} hotels now have curated experiences\n`);
}

// ============================================
// EXECUTE SEED
// ============================================

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
