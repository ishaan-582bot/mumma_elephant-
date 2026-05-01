import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, PostUpdateSchema } from '@/lib/shared-types';

async function getPostOwner(postId: string, userId: string) {
  const post = await prisma.post.findFirst({
    where: { id: postId, userId, deletedAt: null },
  });
  return post;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(PostUpdateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await getPostOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Post not found'), 404);

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...validation.data,
        updatedAt: new Date(),
      },
    });

    return jsonResponse(successResponse({
      id: updated.id,
      thumbnail: updated.thumbnail,
      caption: updated.caption,
      privacy: updated.privacy,
      createdAt: updated.createdAt.toISOString().split('T')[0],
    }, 'Post updated successfully'));
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const existing = await getPostOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Post not found'), 404);

    await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return jsonResponse(successResponse(null, 'Post deleted successfully'));
  } catch {
    return serverError();
  }
}
