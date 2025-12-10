'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';
import { Blog } from '@/lib/types';

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${blog.slug}`} className="group/blog block">
        <div className="relative overflow-hidden rounded-sm border border-white/10 hover-capable:hover:border-gold/30 transition-colors duration-300 h-full flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img
              src={blog.coverImage || '/placeholder-blog.jpg'}
              alt={blog.title}
              className="w-full h-full object-cover grayscale group-hover/blog:grayscale-0 group-hover/blog:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-transparent to-transparent" />

            {blog.tags && blog.tags.length > 0 && (
              <div className="absolute top-4 left-4 bg-gold text-deepBlue px-3 py-1 text-xs font-bold uppercase tracking-widest">
                {blog.tags[0].name}
              </div>
            )}

            <div className="absolute top-4 right-4 flex items-center bg-deepBlue/80 backdrop-blur-sm px-2 py-1 rounded-sm">
              <Eye className="text-gold" size={12} />
              <span className="ml-1 text-white text-xs font-bold">{blog.viewCount}</span>
            </div>
          </div>

          <div className="p-6 bg-deepBlue flex-grow flex flex-col">
            <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1 text-gold" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1 text-gold" />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>

            <h3 className="font-serif text-xl text-white mb-3 group-hover/blog:text-gold transition-colors line-clamp-2">
              {blog.title}
            </h3>

            {blog.excerpt && (
              <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                {blog.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-center">
                <span className="text-xs text-slate-400">
                  By <span className="text-gold">{blog.author.firstName} {blog.author.lastName}</span>
                </span>
              </div>
              <div className="flex items-center text-white group-hover/blog:text-gold transition-colors">
                <span className="text-xs uppercase tracking-widest mr-2">Read More</span>
                <ArrowRight size={14} className="group-hover/blog:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
