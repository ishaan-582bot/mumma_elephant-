import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, MoodEntrySchema, SelfCareGoalUpdateSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const [moods, goals] = await Promise.all([
      prisma.moodEntry.findMany({
        where: { userId: auth.sub },
        orderBy: { id: 'desc' },
        take: 30,
      }),
      prisma.selfCareGoal.findMany({
        where: { userId: auth.sub },
      }),
    ]);

    return jsonResponse(successResponse({ moods, goals }));
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(MoodEntrySchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const created = await prisma.moodEntry.create({
      data: {
        userId: auth.sub,
        ...validation.data,
        date: 'Today',
      },
    });

    return jsonResponse(successResponse(created, 'Mood entry recorded'), 201);
  } catch {
    return serverError();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const { goalId, ...data } = body;
    if (!goalId) return jsonResponse(errorResponse('goalId is required'), 400);

    const validation = validate(SelfCareGoalUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await prisma.selfCareGoal.findFirst({
      where: { id: goalId, userId: auth.sub },
    });
    if (!existing) return jsonResponse(errorResponse('Goal not found'), 404);

    const updated = await prisma.selfCareGoal.update({
      where: { id: goalId },
      data: validation.data,
    });

    return jsonResponse(successResponse(updated, 'Goal updated'));
  } catch {
    return serverError();
  }
}
