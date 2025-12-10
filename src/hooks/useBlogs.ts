'use client';

import { useState, useEffect, useCallback } from 'react';
import { Blog } from '@/lib/types';

interface BlogsFilter {
  search?: string;
  tag?: string;
  limit?: number;
  page?: number;
}

interface UseBlogsResult {
  blogs: Blog[];
  tags: string[];
  isLoading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

// Transform server blog to match client Blog type
function transformServerBlog(serverBlog: Record<string, unknown>): Blog {
  const tags = serverBlog.tags as string[] | { id: string; name: string; blogId: string; createdAt: string }[] | undefined;
  const author = serverBlog.author as { id: string; firstName: string; lastName: string; email?: string } | undefined;
  const featuredImage = serverBlog.featuredImage as string | undefined;
  const coverImage = serverBlog.coverImage as string | undefined;

  return {
    id: serverBlog.id as string,
    title: serverBlog.title as string,
    slug: serverBlog.slug as string,
    content: serverBlog.content as string || '',
    excerpt: serverBlog.excerpt as string | undefined,
    coverImage: featuredImage || coverImage,
    authorId: serverBlog.authorId as string || '',
    author: {
      id: author?.id || '',
      firstName: author?.firstName || 'Anonymous',
      lastName: author?.lastName || '',
      email: author?.email,
    },
    status: serverBlog.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    publishedAt: serverBlog.publishedAt ? new Date(serverBlog.publishedAt as string) : undefined,
    metaTitle: serverBlog.metaTitle as string | undefined,
    metaDescription: serverBlog.metaDescription as string | undefined,
    viewCount: serverBlog.viewCount as number || 0,
    tags: Array.isArray(tags)
      ? tags.map((tag, index) => {
          if (typeof tag === 'string') {
            return {
              id: `${serverBlog.id}-tag-${index}`,
              name: tag,
              blogId: serverBlog.id as string,
              createdAt: new Date(),
            };
          }
          return {
            id: tag.id,
            name: tag.name,
            blogId: tag.blogId,
            createdAt: new Date(tag.createdAt),
          };
        })
      : [],
    createdAt: new Date(serverBlog.createdAt as string),
    updatedAt: serverBlog.updatedAt ? new Date(serverBlog.updatedAt as string) : new Date(),
  };
}

export function useBlogs(filters?: BlogsFilter): UseBlogsResult {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query params
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.tag) params.append('tag', filters.tag);
      if (filters?.limit) params.append('limit', String(filters.limit));
      if (filters?.page) params.append('page', String(filters.page));

      // Fetch blogs
      const response = await fetch(`/api/blogs?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.blogs) {
        const transformedBlogs = data.blogs.map(transformServerBlog);
        setBlogs(transformedBlogs);
        setTotal(data.total || transformedBlogs.length);

        // Extract unique tags
        const allTags = transformedBlogs.flatMap(blog => blog.tags.map(tag => tag.name));
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } else {
        setBlogs([]);
        setTotal(0);
        setError(data.error || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs([]);
      setTags([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [filters?.search, filters?.tag, filters?.limit, filters?.page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    tags,
    isLoading,
    error,
    total,
    refetch: fetchBlogs,
  };
}

// Hook for fetching a single blog by slug
export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();

        if (response.ok && data.blog) {
          setBlog(transformServerBlog(data.blog));
        } else {
          setBlog(null);
          setError(data.error || 'Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setBlog(null);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  return { blog, isLoading, error };
}

// Hook for fetching related blogs
export function useRelatedBlogs(blogId: string, limit: number = 3) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRelatedBlogs() {
      if (!blogId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/blogs?limit=${limit}`);
        const data = await response.json();

        if (response.ok && data.blogs) {
          // Filter out the current blog
          const filteredBlogs = data.blogs
            .filter((blog: Record<string, unknown>) => blog.id !== blogId)
            .slice(0, limit)
            .map(transformServerBlog);
          setBlogs(filteredBlogs);
        } else {
          setBlogs([]);
          setError(data.error || 'Failed to fetch related blogs');
        }
      } catch (err) {
        console.error('Error fetching related blogs:', err);
        setBlogs([]);
        setError(err instanceof Error ? err.message : 'Failed to fetch related blogs');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelatedBlogs();
  }, [blogId, limit]);

  return { blogs, isLoading, error };
}
