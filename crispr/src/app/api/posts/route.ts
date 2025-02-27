// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  try {
    let posts;

    if (tag) {
      // Get posts filtered by tag
      posts = await prisma.post.findMany({
        where: {
          published: true,
          tags: {
            some: {
              name: tag,
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
    } else {
      // Get all published posts
      posts = await prisma.post.findMany({
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
    }

    // Format the posts
    const formattedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((tag) => tag.name),
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