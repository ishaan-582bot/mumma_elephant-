import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, JourneyEventCreateSchema, LegacyLetterUpdateSchema, HistoricalMemoryCreateSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const [events, memories, letters] = await Promise.all([
      prisma.journeyEvent.findMany({
        where: { userId: auth.sub },
        orderBy: { date: 'desc' },
      }),
      prisma.historicalMemory.findMany({
        where: { userId: auth.sub },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.legacyLetter.findMany({
        where: { userId: auth.sub },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return jsonResponse(successResponse({ events, memories, letters }));
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

    const { type } = body;

    if (type === 'journey') {
      const validation = validate(JourneyEventCreateSchema, body);
      if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

      const created = await prisma.journeyEvent.create({
        data: { userId: auth.sub, ...validation.data },
      });
      return jsonResponse(successResponse(created, 'Journey event added'), 201);
    }

    if (type === 'memory') {
      const validation = validate(HistoricalMemoryCreateSchema, body);
      if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

      const created = await prisma.historicalMemory.create({
        data: { userId: auth.sub, ...validation.data },
      });
      return jsonResponse(successResponse(created, 'Memory added'), 201);
    }

    return jsonResponse(errorResponse('Invalid entry type. Use "journey" or "memory"'), 400);
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

    const { letterId, ...data } = body;
    if (!letterId) return jsonResponse(errorResponse('letterId is required'), 400);

    const validation = validate(LegacyLetterUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await prisma.legacyLetter.findFirst({
      where: { id: letterId, userId: auth.sub },
    });
    if (!existing) return jsonResponse(errorResponse('Letter not found'), 404);

    const updated = await prisma.legacyLetter.update({
      where: { id: letterId },
      data: { ...validation.data, updatedAt: new Date() },
    });

    return jsonResponse(successResponse(updated, 'Letter updated'));
  } catch {
    return serverError();
  }
}
