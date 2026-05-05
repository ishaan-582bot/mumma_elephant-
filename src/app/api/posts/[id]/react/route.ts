import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, notFound, serverError } from '@/lib/api-utils';
import { successResponse } from '@/lib/shared-types';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;

    // Check post exists
    const post = await prisma.post.findUnique({
      where: { id, deletedAt: null },
    });
    if (!post) return notFound('Post not found');

    // Check if user already reacted
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId: auth.sub,
          postId: id,
        },
      },
    });

    if (existingReaction) {
      // Remove reaction (toggle off)
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      });
      return jsonResponse(successResponse({ reacted: false }));
    }

    // Add reaction
    await prisma.reaction.create({
      data: {
        userId: auth.sub,
        postId: id,
        type: 'heart',
      },
    });

    return jsonResponse(successResponse({ reacted: true }));
  } catch {
    return serverError();
  }
}
