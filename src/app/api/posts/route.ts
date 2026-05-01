import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson, rateLimit
} from '@/lib/api-utils';
import { successResponse, errorResponse, PostCreateSchema, PaginationSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { searchParams } = new URL(req.url);
    const pagination = validate(PaginationSchema, {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    });

    const page = pagination.success ? pagination.data.page : 1;
    const limit = pagination.success ? pagination.data.limit : 20;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { userId: auth.sub, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.post.count({ where: { userId: auth.sub, deletedAt: null } }),
    ]);

    const data = posts.map((p: typeof posts[0]) => ({
      id: p.id,
      thumbnail: p.thumbnail,
      caption: p.caption,
      privacy: p.privacy,
      createdAt: p.createdAt.toISOString().split('T')[0],
    }));

    return jsonResponse(successResponse({
      posts: data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    }));
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`posts:${ip}`, 20, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many posts. Please try again later.'), 429);
    }

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(PostCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const { caption, privacy, thumbnail } = validation.data;

    const post = await prisma.post.create({
      data: {
        userId: auth.sub,
        caption,
        privacy,
        thumbnail: thumbnail || '',
      },
    });

    return jsonResponse(successResponse({
      id: post.id,
      thumbnail: post.thumbnail,
      caption: post.caption,
      privacy: post.privacy,
      createdAt: post.createdAt.toISOString().split('T')[0],
    }, 'Post created successfully'), 201);
  } catch {
    return serverError();
  }
}
