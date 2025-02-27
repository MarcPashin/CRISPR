import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import prisma from '@/lib/db';
import { BlogPost } from '@/lib/blog-service';

interface PageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Posts tagged "${decodeURIComponent(params.tag)}" | BioCurious CRISPR Project`,
    description: `Browse all our blog posts about ${decodeURIComponent(params.tag)}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  try {
    const { tag } = params;
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
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Posts tagged "{decodedTag}"
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Browse all our content about {decodedTag}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back navigation */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="flex items-center text-gray-500 hover:text-crispr-blue"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all posts
            </Link>
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formattedPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading tag page:', error);
    notFound();
  }
}