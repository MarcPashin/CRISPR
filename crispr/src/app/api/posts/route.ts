import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Define interfaces to match Prisma's return types
interface Tag {
  name: string;
}

interface Author {
  name: string;
  image: string | null;
  bio: string | null;
}

// Define the interface to match what Prisma actually returns
interface PrismaPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  published: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  authorId: string;
  author: Author;
  tags: Tag[];
}

// The Post interface that our application uses internally
interface Post {
  id: string;
  title: string;
  content: string;
  date: Date;
  published: boolean;
  author: Author;
  tags: Tag[]; // This stays as Tag[]
}

// Create interface for the formatted posts with string[] tags
interface FormattedPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  published: boolean;
  author: Author;
  tags: string[]; // This is string[]
}

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

    // Format the posts with the correct typing
    const formattedPosts: FormattedPost[] = posts.map((post: PrismaPost) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date,
      published: post.published,
      author: post.author,
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