import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// First check if we have DATABASE_URL before initializing Prisma
let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  try {
    prisma =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  } catch (error) {
    console.warn('Failed to initialize Prisma client:', error);
    // Create a mock PrismaClient for build time
    prisma = {
      // Add minimal implementations needed for build
      post: {
        findMany: async () => [],
        findUnique: async () => null,
      },
      tag: {
        findMany: async () => [],
      },
      user: {
        findUnique: async () => null,
      },
    } as unknown as PrismaClient;
  }
} else {
  console.warn('DATABASE_URL not found. Using mock Prisma client.');
  // Create a mock PrismaClient for build time
  prisma = {
    // Add minimal implementations needed for build
    post: {
      findMany: async () => [],
      findUnique: async () => null,
    },
    tag: {
      findMany: async () => [],
    },
    user: {
      findUnique: async () => null,
    },
  } as unknown as PrismaClient;
}

export default prisma;