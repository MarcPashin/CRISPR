import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import prisma from '@/lib/db';
import { BlogPost } from '@/lib/blog-service';

// Updated PageProps to match what Next.js expects
interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Posts tagged "${decodeURIComponent(resolvedParams.tag)}" | BioCurious CRISPR Project`,
    description: `Browse all our blog posts about ${decodeURIComponent(resolvedParams.tag)}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const { tag } = resolvedParams;
    const decodedTag = decodeURIComponent(tag);
    
    // Direct database query for server component
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        tags: {
          some: {
            name: decodedTag,
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            bio: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!posts || posts.length === 0) {
      notFound();
    }

    // Format the posts
    const formattedPosts = posts.map((post: any) => ({
      ...post,
      tags: post.tags.map((tag: { name: string }) => tag.name),
      date: post.date.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    })) as unknown as BlogPost[];

    return (
      <div className="bg-dark-surface min-h-screen pb-20 text-dark-primary">
        {/* Header */}
        <div className="bg-gradient-to-r from-dark-surface-light to-dark-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Posts tagged "{decodedTag}"
            </h1>
            <p className="text-xl text-dark-secondary max-w-3xl mx-auto">
              Browse all our content about {decodedTag}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back navigation */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="flex items-center text-dark-secondary hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all posts
            </Link>
          </div>

          {/* Blog Post Grid */}
          {formattedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formattedPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-surface-light rounded-lg shadow-dark border border-dark-border/40">
              <h3 className="text-xl font-medium text-dark-primary mb-2">No posts found</h3>
              <p className="text-dark-secondary">Check back soon for content about {decodedTag}!</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading tag page:', error);
    notFound();
  }
}