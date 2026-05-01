import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, GrowthEntrySchema } from '@/lib/shared-types';

async function getChildOwner(childId: string, userId: string) {
  return prisma.child.findFirst({
    where: { id: childId, userId, deletedAt: null },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    const [weight, height] = await Promise.all([
      prisma.weightEntry.findMany({ where: { childId: id }, orderBy: { date: 'asc' } }),
      prisma.heightEntry.findMany({ where: { childId: id }, orderBy: { date: 'asc' } }),
    ]);

    return jsonResponse(successResponse({
      weight: weight.map((w: typeof weight[0]) => ({ date: w.date, value: w.value })),
      height: height.map((h: typeof height[0]) => ({ date: h.date, value: h.value })),
    }));
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

    const validation = validate(GrowthEntrySchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const { type, entry } = body as { type: 'weight' | 'height'; entry: { date: string; value: number } };

    if (type === 'weight') {
      const created = await prisma.weightEntry.create({
        data: { childId: id, date: entry.date, value: entry.value },
      });
      return jsonResponse(successResponse({ date: created.date, value: created.value }, 'Weight entry added'));
    }

    if (type === 'height') {
      const created = await prisma.heightEntry.create({
        data: { childId: id, date: entry.date, value: entry.value },
      });
      return jsonResponse(successResponse({ date: created.date, value: created.value }, 'Height entry added'));
    }

    return jsonResponse(errorResponse('Invalid growth type. Use "weight" or "height"'), 400);
  } catch {
    return serverError();
  }
}
