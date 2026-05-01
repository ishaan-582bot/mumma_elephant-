import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, TipUpdateSchema, TipVoteSchema } from '@/lib/shared-types';

async function getTipOwner(tipId: string, userId: string) {
  return prisma.tip.findFirst({
    where: { id: tipId, userId, deletedAt: null },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const voteValidation = validate(TipVoteSchema, body);
    if (voteValidation.success) {
      const existing = await getTipOwner(id, auth.sub);
      if (!existing) return jsonResponse(errorResponse('Tip not found'), 404);

      const isUp = voteValidation.data.vote === 'up';
      const updated = await prisma.tip.update({
        where: { id },
        data: {
          upvotes: isUp ? { increment: 1 } : existing.upvotes,
          downvotes: !isUp ? { increment: 1 } : existing.downvotes,
          helpfulPercent: Math.round(
            ((isUp ? existing.upvotes + 1 : existing.upvotes) /
              Math.max(1, existing.upvotes + existing.downvotes + 1)) * 100
          ),
          views: { increment: 1 },
          updatedAt: new Date(),
        },
      });

      return jsonResponse(successResponse({
        id: updated.id,
        text: updated.text,
        tags: updated.tags,
        helpfulPercent: updated.helpfulPercent,
        upvotes: updated.upvotes,
        downvotes: updated.downvotes,
        date: updated.createdAt.toISOString().split('T')[0],
        views: updated.views,
      }, 'Tip updated successfully'));
    }

    const updateValidation = validate(TipUpdateSchema, body);
    if (!updateValidation.success) return jsonResponse(errorResponse(updateValidation.error), 400);

    const existing = await getTipOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Tip not found'), 404);

    const updated = await prisma.tip.update({
      where: { id },
      data: {
        ...updateValidation.data,
        updatedAt: new Date(),
      },
    });

    return jsonResponse(successResponse({
      id: updated.id,
      text: updated.text,
      tags: updated.tags,
      helpfulPercent: updated.helpfulPercent,
      upvotes: updated.upvotes,
      downvotes: updated.downvotes,
      date: updated.createdAt.toISOString().split('T')[0],
      views: updated.views,
    }, 'Tip updated successfully'));
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const existing = await getTipOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Tip not found'), 404);

    await prisma.tip.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return jsonResponse(successResponse(null, 'Tip deleted successfully'));
  } catch {
    return serverError();
  }
}
