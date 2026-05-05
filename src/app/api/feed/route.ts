import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse, PaginationSchema } from '@/lib/shared-types';
import { validate } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`feed:${ip}`, 30, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many requests. Please try again later.'), 429);
    }

    const { searchParams } = new URL(req.url);
    const pagination = validate(PaginationSchema, {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });

    const page = pagination.success ? pagination.data.page : 1;
    const pageLimit = pagination.success ? pagination.data.limit : 10;
    const skip = (page - 1) * pageLimit;

    // Get all public posts from all users (community feed)
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          privacy: 'public',
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageLimit,
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
            },
          },
          reactions: {
            where: { userId: auth.sub },
            select: { id: true },
          },
        },
      }),
      prisma.post.count({
        where: {
          privacy: 'public',
          deletedAt: null,
        },
      }),
    ]);

    const data = posts.map((p) => ({
      id: p.id,
      caption: p.caption,
      privacy: p.privacy,
      isAnonymous: false, // Public feed posts show author
      authorName: p.user?.name || null,
      authorAvatar: p.user?.avatar || null,
      createdAt: p.createdAt.toISOString(),
      _count: {
        comments: p._count.comments,
        reactions: p._count.reactions,
      },
      hasReacted: p.reactions.length > 0,
    }));

    return jsonResponse(successResponse({
      posts: data,
      pagination: { page, limit: pageLimit, total, pages: Math.ceil(total / pageLimit) },
    }));
  } catch {
    return serverError();
  }
}
