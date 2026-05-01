import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, TimelineEntrySchema } from '@/lib/shared-types';

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

    const entries = await prisma.photoTimelineEntry.findMany({
      where: { childId: id },
      orderBy: { date: 'asc' },
    });

    return jsonResponse(successResponse(entries));
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(TimelineEntrySchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    // Handle optional image upload (base64)
    const { photo, ...data } = body;
    const created = await prisma.photoTimelineEntry.create({
      data: { childId: id, ...data, photo: photo || '' },
    });

    return jsonResponse(successResponse(created, 'Timeline entry added'), 201);
  } catch {
    return serverError();
  }
}
