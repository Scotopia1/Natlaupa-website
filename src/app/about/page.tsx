'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import { Compass, MapPin, Shield, Heart, Sparkles, Quote, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Destination data for the interactive map
const destinations = [
  { id: 1, name: 'Santorini', country: 'Greece', x: 54, y: 38, story: 'Where whitewashed villas meet endless azure horizons.' },
  { id: 2, name: 'Kyoto', country: 'Japan', x: 82, y: 35, story: 'Ancient temples whisper stories of timeless elegance.' },
  { id: 3, name: 'Maldives', country: 'Indian Ocean', x: 68, y: 52, story: 'Overwater sanctuaries floating on crystalline dreams.' },
  { id: 4, name: 'Tuscany', country: 'Italy', x: 51, y: 36, story: 'Rolling vineyards and Renaissance grandeur intertwined.' },
  { id: 5, name: 'Bora Bora', country: 'French Polynesia', x: 5, y: 58, story: 'Paradise perfected in turquoise lagoons.' },
  { id: 6, name: 'Swiss Alps', country: 'Switzerland', x: 50, y: 34, story: 'Majestic peaks where luxury meets adventure.' },
  { id: 7, name: 'Marrakech', country: 'Morocco', x: 46, y: 40, story: 'Exotic riads hidden within ancient medina walls.' },
  { id: 8, name: 'Patagonia', country: 'Argentina', x: 28, y: 82, story: 'Untamed wilderness at the edge of the world.' },
  { id: 9, name: 'Reykjavik', country: 'Iceland', x: 42, y: 22, story: 'Where fire and ice create otherworldly beauty.' },
  { id: 10, name: 'Cape Town', country: 'South Africa', x: 52, y: 72, story: 'Where mountains embrace the meeting of two oceans.' },
];

const testimonials = [
  {
    quote: "Natlaupa didn't just book our honeymoon—they crafted a journey we'll treasure forever.",
    author: "Eleanor & James",
    location: "Maldives Experience",
    image: "https://picsum.photos/100/100?random=201"
  },
  {
    quote: "The attention to detail was extraordinary. Every moment felt personally curated.",
    author: "Marcus Chen",
    location: "Kyoto Retreat",
    image: "https://picsum.photos/100/100?random=202"
  },
  {
    quote: "They understood exactly what we needed before we even knew ourselves.",
    author: "Sofia Andersson",
    location: "Swiss Alps Escape",
    image: "https://picsum.photos/100/100?random=203"
  }
];

const curators = [
  {
    name: "Isabella Fontaine",
    role: "Founder & Chief Curator",
    region: "Europe & Mediterranean",
    image: "https://picsum.photos/400/500?random=301",
    bio: "Former luxury concierge with 15 years crafting bespoke experiences."
  },
  {
    name: "Kenji Nakamura",
    role: "Asia-Pacific Director",
    region: "Japan, SE Asia & Oceania",
    image: "https://picsum.photos/400/500?random=302",
    bio: "Expert in blending traditional hospitality with modern luxury."
  },
  {
    name: "Amara Okonkwo",
    role: "Africa & Middle East Lead",
    region: "Safari & Desert Experiences",
    image: "https://picsum.photos/400/500?random=303",
    bio: "Passionate about sustainable luxury and authentic cultural immersion."
  }
];

const promises = [
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Our curators live where they recommend. Every suggestion comes from genuine, firsthand experience."
  },
  {
    icon: Sparkles,
    title: "Authentic Luxury",
    description: "We seek properties with soul—places where exceptional service meets meaningful experiences."
  },
  {
    icon: Shield,
    title: "Seamless Service",
    description: "From first inquiry to final farewell, we handle every detail so you can simply... arrive."
  }
];

export default function About() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Compass rotation animation
    if (compassRef.current) {
      gsap.to(compassRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
      });
    }

    // Parallax effect on hero
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-bg'), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Map dots pulsing animation
    const dots = document.querySelectorAll('.map-dot');
    dots.forEach((dot, i) => {
      gsap.to(dot, {
        scale: 1.2,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
        ease: "sine.inOut"
      });
    });

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <main className="bg-deepBlue min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="hero-bg absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?random=100)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-deepBlue/80 via-deepBlue/60 to-deepBlue" />
          </div>

          {/* Animated Compass */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg
              ref={compassRef}
              viewBox="0 0 200 200"
              className="w-[600px] h-[600px]"
            >
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gold" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gold" />
              {/* Compass points */}
              <path d="M100 5 L103 20 L100 15 L97 20 Z" fill="currentColor" className="text-gold" />
              <path d="M100 195 L103 180 L100 185 L97 180 Z" fill="currentColor" className="text-gold" />
              <path d="M5 100 L20 97 L15 100 L20 103 Z" fill="currentColor" className="text-gold" />
              <path d="M195 100 L180 97 L185 100 L180 103 Z" fill="currentColor" className="text-gold" />
              {/* Decorative lines */}
              {[...Array(36)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="10"
                  x2="100"
                  y2={i % 3 === 0 ? "25" : "18"}
                  stroke="currentColor"
                  strokeWidth={i % 3 === 0 ? "0.5" : "0.25"}
                  className="text-gold"
                  transform={`rotate(${i * 10} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <Compass className="w-16 h-16 text-gold mx-auto mb-6" strokeWidth={1} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6"
            >
              Where Luxury Meets
              <span className="block text-gold">Discovery</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto mb-12"
            >
              Every destination tells a story. We help you become part of it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="animate-bounce"
            >
              <ChevronDown className="w-8 h-8 text-gold mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section ref={mapRef} className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                Our Global Collection
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Click on any destination to discover its story
              </p>
            </motion.div>

            {/* World Map Container */}
            <div className="relative aspect-[2/1] max-w-5xl mx-auto">
              {/* Stylized World Map SVG */}
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Simple world outline - stylized */}
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Simplified continent shapes */}
                <path
                  d="M15,20 Q20,15 30,18 T40,20 Q45,22 48,25 T45,30 Q40,35 30,32 T20,28 Q15,25 15,20"
                  fill="url(#mapGradient)"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
                <path
                  d="M45,18 Q55,12 65,15 T75,20 Q78,25 75,30 T65,35 Q55,38 48,32 T45,25 Q44,20 45,18"
                  fill="url(#mapGradient)"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
                <path
                  d="M75,25 Q85,20 92,25 T90,35 Q85,40 78,38 T75,30 Q74,27 75,25"
                  fill="url(#mapGradient)"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
                <path
                  d="M48,35 Q55,32 58,38 T55,45 Q50,48 48,42 T48,35"
                  fill="url(#mapGradient)"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
                <path
                  d="M25,35 Q30,38 28,45 T22,48 Q18,45 20,40 T25,35"
                  fill="url(#mapGradient)"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  opacity="0.5"
                />

                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 5 + 5}
                    x2="100"
                    y2={i * 5 + 5}
                    stroke="#D4AF37"
                    strokeWidth="0.05"
                    opacity="0.2"
                  />
                ))}
                {[...Array(20)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 5 + 5}
                    y1="0"
                    x2={i * 5 + 5}
                    y2="50"
                    stroke="#D4AF37"
                    strokeWidth="0.05"
                    opacity="0.2"
                  />
                ))}
              </svg>

              {/* Destination Dots */}
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(selectedDestination?.id === dest.id ? null : dest)}
                  className="map-dot absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                >
                  <span className="block w-3 h-3 bg-gold rounded-full shadow-lg shadow-gold/50 group-hover:scale-150 transition-transform" />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {dest.name}
                  </span>
                </button>
              ))}

              {/* Selected Destination Card */}
              <AnimatePresence>
                {selectedDestination && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-8 bg-midnight/95 backdrop-blur-sm border border-gold/20 rounded-lg p-6 w-80"
                  >
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl text-white font-serif">{selectedDestination.name}</h3>
                        <p className="text-gold text-sm mb-2">{selectedDestination.country}</p>
                        <p className="text-slate-400 text-sm italic">&ldquo;{selectedDestination.story}&rdquo;</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Quote className="w-12 h-12 text-gold mx-auto mb-8 opacity-50" />
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-relaxed mb-8">
                Every pin on our map represents a <span className="text-gold">promise</span>—
                a commitment to experiences that transform, inspire, and endure.
              </h2>
              <div className="w-24 h-px bg-gold mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Three Promises */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl text-white text-center mb-16"
            >
              Our Promise to You
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {promises.map((promise, index) => (
                <motion.div
                  key={promise.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-midnight/50 border border-white/5 rounded-lg p-8 h-full hover:border-gold/30 transition-colors duration-500">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                      <promise.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-xl text-white font-serif mb-4">{promise.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{promise.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 bg-gradient-to-b from-deepBlue via-midnight/50 to-deepBlue">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl text-white text-center mb-16"
            >
              Stories from Our Travelers
            </motion.h2>

            <div className="relative h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="bg-midnight/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12">
                    <Quote className="w-8 h-8 text-gold mb-6 opacity-50" />
                    <p className="text-xl md:text-2xl text-white font-light italic mb-8">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                      />
                      <div>
                        <p className="text-white font-medium">{testimonials[activeTestimonial].author}</p>
                        <p className="text-gold text-sm">{testimonials[activeTestimonial].location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Curators */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                Meet the Curators
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                The passionate experts behind every unforgettable journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {curators.map((curator, index) => (
                <motion.div
                  key={curator.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <img
                      src={curator.image}
                      alt={curator.name}
                      className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-gold text-sm mb-1">{curator.region}</p>
                    </div>
                  </div>
                  <h3 className="text-xl text-white font-serif mb-1">{curator.name}</h3>
                  <p className="text-gold text-sm mb-3">{curator.role}</p>
                  <p className="text-slate-400 text-sm">{curator.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: 'url(https://picsum.photos/1920/800?random=150)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-deepBlue/80 to-deepBlue" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <Heart className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Ready to Begin Your Story?
            </h2>
            <p className="text-slate-300 text-lg mb-10">
              Let us craft an experience as unique as you are.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-deepBlue px-8 py-4 rounded-sm font-medium hover:bg-softGold transition-colors duration-300"
            >
              Start Your Journey
              <Compass className="w-5 h-5" />
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
