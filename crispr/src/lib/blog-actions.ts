// src/lib/blog-actions.ts
'use server'

import prisma from '@/lib/db';
import { BlogPost } from './blog-service';

export async function getAllPostsAction(): Promise<BlogPost[]> {
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
    interface Author {
        name: string;
        image: string;
        bio: string;
    }

    interface Tag {
        name: string;
    }

    interface Post {
        id: string;
        title: string;
        content: string;
        date: string;
        published: boolean;
        author: Author;
        tags: Tag[];
        slug: string;
        summary: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface FormattedPost extends Omit<Post, 'tags'> {
        tags: string[];
    }

    const formattedPosts: FormattedPost[] = posts.map((post: Post) => ({
        ...post,
        id: post.id.toString(),
        tags: post.tags.map((tag: Tag) => tag.name),
        slug: post.slug,
        summary: post.summary,
        date: post.date, // Date is already a string
        createdAt: post.createdAt.toISOString(), // Convert Date to string
        updatedAt: post.updatedAt.toISOString(), // Convert Date to string
    }));
    
    return formattedPosts as unknown as BlogPost[];
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}