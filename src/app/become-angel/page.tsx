'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Star, Users, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const perks = [
  {
    icon: Gift,
    title: 'Exclusive Rewards',
    description: 'Earn generous commissions and exclusive travel credits for every successful referral.'
  },
  {
    icon: Star,
    title: 'VIP Access',
    description: 'Get early access to new properties, special rates, and members-only experiences.'
  },
  {
    icon: Crown,
    title: 'Elite Status',
    description: 'Join an exclusive community of travel connoisseurs and hospitality enthusiasts.'
  }
];

const steps = [
  { number: '01', title: 'Apply', description: 'Submit your application to join our angel program' },
  { number: '02', title: 'Get Approved', description: 'Our team reviews and approves qualified applicants' },
  { number: '03', title: 'Share', description: 'Share Natlaupa with your network using your unique code' },
  { number: '04', title: 'Earn', description: 'Receive rewards for every booking made through your referrals' }
];

export default function BecomeAngel() {
  return (
    <>
      <main className="bg-deepBlue min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Sparkles className="text-gold" size={28} />
              <span className="text-gold text-sm uppercase tracking-[0.3em]">Angel Program</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-white mb-8"
            >
              Become a Natlaupa Angel
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-300 font-light leading-relaxed mb-12"
            >
              Join our exclusive ambassador program and help others discover extraordinary stays
              while earning exceptional rewards for yourself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold text-deepBlue px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Perks Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-white text-center mb-16"
            >
              Angel Benefits
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {perks.map((perk, index) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 border border-white/10 rounded-sm hover:border-gold/30 transition-colors"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <perk.icon className="text-gold" size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-4">{perk.title}</h3>
                  <p className="text-slate-400">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-white text-center mb-16"
            >
              How It Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 border border-white/10 rounded-sm"
                >
                  <span className="font-serif text-4xl text-gold/30">{step.number}</span>
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center"
            >
              <Users className="text-gold" size={36} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-white mb-6"
            >
              Join the Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 mb-8"
            >
              Connect with fellow angels, share travel stories, and be part of an exclusive network
              that shapes the future of luxury travel.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gold hover:text-deepBlue transition-colors"
              >
                Start Your Journey
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
