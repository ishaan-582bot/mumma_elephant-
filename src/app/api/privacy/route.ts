import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, PrivacyUpdateSchema, PrivacyLogCreateSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const [user, logs] = await Promise.all([
      prisma.user.findUnique({
        where: { id: auth.sub },
        select: {
          id: true,
          isVerified: true,
          verificationStatus: true,
        },
      }),
      prisma.privacyLog.findMany({
        where: { userId: auth.sub },
        orderBy: { id: 'desc' },
        take: 20,
      }),
    ]);

    if (!user) return jsonResponse(errorResponse('User not found'), 404);

    return jsonResponse(successResponse({
      user,
      logs,
    }));
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

    const validation = validate(PrivacyUpdateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const { preset, fieldVisibility } = validation.data;

    // Create a privacy log entry for the preset change
    if (preset) {
      await prisma.privacyLog.create({
        data: {
          userId: auth.sub,
          action: 'Preset Applied',
          date: 'Just now',
          details: `${preset} Privacy mode activated`,
        },
      });
    }

    return jsonResponse(successResponse({ preset, fieldVisibility }, 'Privacy settings updated'));
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

    const validation = validate(PrivacyLogCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const created = await prisma.privacyLog.create({
      data: {
        userId: auth.sub,
        ...validation.data,
        date: 'Just now',
      },
    });

    return jsonResponse(successResponse(created, 'Log entry created'), 201);
  } catch {
    return serverError();
  }
}
