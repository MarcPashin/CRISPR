// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
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
        id: number;
        title: string;
        content: string;
        date: Date;
        published: boolean;
        author: Author;
        tags: Tag[];
    }

    const formattedPosts: Post[] = posts.map((post: Post) => ({
        ...post,
        tags: post.tags.map((tag: Tag) => tag.name),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}