import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, ConnectionRequestSchema, ConnectionUpdateSchema } from '@/lib/shared-types';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(ConnectionRequestSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const { receiverId } = validation.data;

    if (receiverId === auth.sub) {
      return jsonResponse(errorResponse('Cannot connect with yourself'), 400);
    }

    const existing = await prisma.connection.findFirst({
      where: {
        OR: [
          { initiatorId: auth.sub, receiverId },
          { initiatorId: receiverId, receiverId: auth.sub },
        ],
      },
    });

    if (existing) {
      return jsonResponse(errorResponse('Connection request already exists'), 409);
    }

    const created = await prisma.connection.create({
      data: {
        initiatorId: auth.sub,
        receiverId,
        status: 'pending',
      },
    });

    return jsonResponse(successResponse(created, 'Connection request sent'), 201);
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

    const { connectionId, ...data } = body;
    if (!connectionId) return jsonResponse(errorResponse('connectionId is required'), 400);

    const validation = validate(ConnectionUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await prisma.connection.findFirst({
      where: {
        id: connectionId,
        receiverId: auth.sub,
      },
    });

    if (!existing) {
      return jsonResponse(errorResponse('Connection request not found'), 404);
    }

    const updated = await prisma.connection.update({
      where: { id: connectionId },
      data: { status: validation.data.status },
    });

    return jsonResponse(successResponse(updated, `Connection ${validation.data.status}`));
  } catch {
    return serverError();
  }
}
