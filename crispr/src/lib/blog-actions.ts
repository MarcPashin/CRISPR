// src/lib/blog-actions.ts
'use server'

import prisma from '@/lib/db';
import { BlogPost, Tag } from './blog-service';

export async function getAllPostsServerAction(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
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

    // Format the posts
    const formattedPosts = posts.map((post: any) => ({
      ...post,
      tags: post.tags.map((tag: { name: string }) => tag.name),
      // Convert dates to ISO strings
      date: post.date.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
    
    return formattedPosts as unknown as BlogPost[];
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}

export async function getPostBySlugServerAction(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
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
    });

    if (!post) {
      return null;
    }

    // Format the post
    const formattedPost = {
      ...post,
      tags: post.tags.map((tag: { name: string }) => tag.name),
      // Convert dates to ISO strings
      date: post.date.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    return formattedPost as unknown as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }
}

export async function getAllTagsServerAction(): Promise<Tag[]> {
  try {
    // Get all tags and count posts for each tag
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true,
              },
            },
          },
        },
      },
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
    });

    // Format the tags with their post counts
    const formattedTags = tags.map((tag: { name: string; _count: { posts: number } }) => ({
      name: tag.name,
      count: tag._count.posts,
    }));

    return formattedTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
}