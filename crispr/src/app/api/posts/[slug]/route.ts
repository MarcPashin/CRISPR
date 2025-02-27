// src/app/api/posts/[slug]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Using the simplest approach possible
export async function GET(
  _request: Request,
  { params }: any
) {
  const slug = params.slug;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
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
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Format the post
    const formattedPost = {
      ...post,
      tags: post.tags.map((tag: { name: string }) => tag.name),
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}