import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, MilestoneUpdateSchema } from '@/lib/shared-types';

async function getChildOwner(childId: string, userId: string) {
  return prisma.child.findFirst({ where: { id: childId, userId, deletedAt: null } });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    const milestones = await prisma.milestone.findMany({ where: { childId: id } });
    return jsonResponse(successResponse(milestones));
  } catch {
    return serverError();
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const { milestoneId, ...data } = body;
    if (!milestoneId) return jsonResponse(errorResponse('milestoneId is required'), 400);

    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    const existing = await prisma.milestone.findFirst({
      where: { id: milestoneId, childId: id },
    });
    if (!existing) return jsonResponse(errorResponse('Milestone not found'), 404);

    const validation = validate(MilestoneUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const updated = await prisma.milestone.update({
      where: { id: milestoneId },
      data: validation.data,
    });

    return jsonResponse(successResponse(updated, 'Milestone updated'));
  } catch {
    return serverError();
  }
}
