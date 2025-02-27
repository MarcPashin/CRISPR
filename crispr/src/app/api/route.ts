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

    // Define interfaces for the Prisma return type
    interface Author {
        name: string;
        image: string | null;
        bio: string | null;
    }

    interface Tag {
        name: string;
    }

    // Interface for what Prisma actually returns
    interface PrismaPost {
        id: string; // Prisma returns IDs as strings
        title: string;
        content: string;
        date: Date;
        published: boolean;
        author: Author;
        tags: Tag[];
        // other fields returned by Prisma...
    }

    // Interface for the formatted output
    interface FormattedPost {
        id: string;
        title: string;
        content: string;
        date: Date;
        published: boolean;
        author: Author;
        tags: string[]; // This is now string[] instead of Tag[]
    }

    // Format the posts with correct typing
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