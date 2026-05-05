import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, notFound, serverError, rateLimit, badRequest, parseJson } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';
import { z } from 'zod';
import { validate } from '@/lib/api-utils';

const CommentCreateSchema = z.object({
  content: z.string().min(1).max(1000),
  isAnonymous: z.boolean().default(false),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id, deletedAt: null },
    });

    if (!post) return notFound('Post not found');

    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { name: true, avatar: true },
        },
      },
    });

    const data = comments.map((c) => ({
      id: c.id,
      content: c.content,
      isAnonymous: c.isAnonymous,
      authorName: c.isAnonymous ? null : c.author?.name || null,
      authorAvatar: c.isAnonymous ? null : c.author?.avatar || null,
      createdAt: c.createdAt.toISOString(),
    }));

    return jsonResponse(successResponse(data));
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;

    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`comment:${ip}`, 15, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many comments. Please try again later.'), 429);
    }

    // Check post exists
    const post = await prisma.post.findUnique({
      where: { id, deletedAt: null },
    });
    if (!post) return notFound('Post not found');

    const body = await parseJson(req);
    if (!body) return badRequest('Invalid JSON body');

    const validation = validate(CommentCreateSchema, body);
    if (!validation.success) return badRequest(validation.error);

    const { content, isAnonymous } = validation.data;

    const comment = await prisma.comment.create({
      data: {
        content,
        isAnonymous: isAnonymous || false,
        authorId: auth.sub,
        postId: id,
      },
      include: {
        author: {
          select: { name: true, avatar: true },
        },
      },
    });

    return jsonResponse(successResponse({
      id: comment.id,
      content: comment.content,
      isAnonymous: comment.isAnonymous,
      authorName: comment.isAnonymous ? null : comment.author?.name || null,
      authorAvatar: comment.isAnonymous ? null : comment.author?.avatar || null,
      createdAt: comment.createdAt.toISOString(),
    }, 'Comment added'), 201);
  } catch {
    return serverError();
  }
}
