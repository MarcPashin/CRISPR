import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // You'll need to implement auth

// Get all posts including drafts (admin only)
export async function GET(request: Request) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // In a real implementation, check if user has admin role

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
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
    const formattedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((tag) => tag.name),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Create a new post
export async function POST(request: Request) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // In a real implementation, check if user has admin role

    const data = await request.json();
    const { title, slug, summary, content, image, readingTime, tags, published, authorId } = data;

    // Create or connect tags
    const tagObjects = tags && tags.length > 0
      ? {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        }
      : undefined;

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        summary,
        content,
        image,
        readingTime,
        published,
        author: {
          connect: { id: authorId },
        },
        tags: tagObjects,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    // Format the post
    const formattedPost = {
      ...post,
      tags: post.tags.map((tag) => tag.name),
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    
    // Check for duplicate slug
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}