import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get all blog posts
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
    interface Author {
        name: string;
        image: string | null;
        bio: string | null;
    }

    interface Tag {
        name: string;
    }

    interface Post {
        id: number;
        title: string;
        content: string;
        published: boolean;
        date: Date;
        author: Author;
        tags: Tag[];
    }

    const formattedPosts: { id: number; title: string; content: string; published: boolean; date: Date; author: Author; tags: string[] }[] = posts.map((post: Post) => ({
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