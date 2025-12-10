"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Loader2, BookOpen } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"publishedAt" | "title">("publishedAt");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch blogs from server
  const { blogs, tags, isLoading } = useBlogs();

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const matchesSearch =
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
          blog.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author.lastName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag =
          !selectedTag || blog.tags.some(tag => tag.name === selectedTag);
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        // Sort by published date (newest first)
        const dateA = a.publishedAt || a.createdAt;
        const dateB = b.publishedAt || b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [blogs, searchQuery, selectedTag, sortBy]);

  return (
    <>
      <main className="bg-deepBlue min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
                Stories & Insights
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Travel Blog
              </h1>
              <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
                Discover inspiring stories, travel tips, and insider insights from our curated collection of luxury destinations.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search articles, authors, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 border border-white/10 text-white hover:border-gold hover:text-gold transition-colors"
                >
                  <SlidersHorizontal size={18} />
                  <span className="text-sm uppercase tracking-widest">
                    Filters
                  </span>
                </button>

                <select
                  title="Sort By"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold focus:outline-none cursor-pointer"
                >
                  <option value="publishedAt">Latest First</option>
                  <option value="title">Title: A to Z</option>
                </select>
              </div>
            </motion.div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white/5 border border-white/10 rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-serif text-lg">
                    Filter by Tag
                  </h3>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-gold text-sm flex items-center gap-1 hover:underline"
                    >
                      <X size={14} />
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTag(
                          selectedTag === tag ? null : tag
                        )
                      }
                      className={`px-4 py-2 text-sm uppercase tracking-widest border transition-colors ${
                        selectedTag === tag
                          ? "bg-gold text-deepBlue border-gold"
                          : "border-white/20 text-white hover:border-gold hover:text-gold"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-400">
                Showing{" "}
                <span className="text-white font-bold">
                  {filteredBlogs.length}
                </span>{" "}
                {filteredBlogs.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-24">
                <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading articles...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-24">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg mb-2">
                  No articles match your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="mt-4 text-gold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
