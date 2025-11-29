'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Building2, Castle, Waves } from 'lucide-react';
import { ALL_HOTELS, CATEGORIES } from '@/lib/constants';
import HotelCard from '@/components/HotelCard';
import Footer from '@/components/Footer';
import { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  'Eco-Lodges': Leaf,
  'Urban Suites': Building2,
  'Historic Castles': Castle,
  'Overwater Villas': Waves,
};

const categoryDescriptions: Record<string, string> = {
  'Eco-Lodges': 'Sustainable sanctuaries that harmonize luxury with nature. Experience eco-conscious hospitality without compromising on comfort. Our eco-lodges feature renewable energy, organic gardens, and minimal environmental impact while maintaining the highest standards of service.',
  'Urban Suites': 'Sophisticated city retreats offering the finest in metropolitan living. Prime locations in the world\'s most exciting cities, stunning views, and world-class amenities. Perfect for business travelers and urban explorers seeking refined comfort.',
  'Historic Castles': 'Step into centuries of heritage and aristocratic elegance. These meticulously restored fortresses and manor houses offer a timeless escape where history meets modern luxury. Experience regal living in authentic historical settings.',
  'Overwater Villas': 'Float above crystal-clear waters in these iconic overwater retreats. The ultimate in tropical luxury and seclusion, featuring glass floors, private pools, and direct ocean access. Perfect for honeymoons and romantic getaways.',
};

export default function StylePage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = React.use(params);
  const decodedStyle = decodeURIComponent(style).replace(/-/g, ' ');

  const matchedCategory = CATEGORIES.find(
    c => c.name.toLowerCase() === decodedStyle.toLowerCase()
  );

  const hotels = matchedCategory
    ? ALL_HOTELS.filter(h => h.category.toLowerCase() === matchedCategory.name.toLowerCase())
    : [];

  if (!matchedCategory || hotels.length === 0) {
    return (
      <div className="min-h-screen bg-deepBlue flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-4">Style Not Found</h2>
          <p className="text-slate-400 mb-8">We could not find properties in this category.</p>
          <Link href="/styles" className="text-gold hover:underline">
            Browse All Styles
          </Link>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[matchedCategory.name] || Building2;
  const description = categoryDescriptions[matchedCategory.name] || 'Discover unique properties in this category.';
  const heroImage = hotels[0]?.imageUrl || matchedCategory.imageUrl;
  const avgRating = (hotels.reduce((sum, h) => sum + h.rating, 0) / hotels.length).toFixed(1);

  return (
    <>
      <main className="bg-deepBlue min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={matchedCategory.name}
              className="w-full h-full object-cover grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-deepBlue/50 to-transparent" />
          </div>

          {/* Back Button */}
          <div className="absolute top-28 left-4 md:top-32 md:left-8 z-20">
            <Link href="/styles" className="flex items-center text-white/70 hover:text-gold transition-colors group">
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-widest text-xs font-bold">All Styles</span>
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon className="text-gold" size={20} />
                </div>
                <span className="text-gold text-sm uppercase tracking-widest">
                  {hotels.length} {hotels.length === 1 ? 'Property' : 'Properties'}
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
                {matchedCategory.name}
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                {avgRating} avg. rating
              </p>
            </motion.div>
          </div>
        </div>

        {/* Description Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-white">
                {matchedCategory.name} Collection
              </h2>
              <Link href="/offers" className="text-gold text-sm hover:underline">
                View All Offers
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel, index) => (
                <HotelCard key={hotel.id} hotel={hotel} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Other Styles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-white mb-8">Explore Other Styles</h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.filter(c => c.name !== matchedCategory.name).map(c => (
                <Link
                  key={c.id}
                  href={`/styles/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 border border-white/20 text-white hover:border-gold hover:text-gold transition-colors text-sm uppercase tracking-widest"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
