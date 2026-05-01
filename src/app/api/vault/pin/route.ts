import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, VaultPinSchema } from '@/lib/shared-types';
import { hashPassword, verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(VaultPinSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const pinHash = await hashPassword(validation.data.pin);

    await prisma.user.update({
      where: { id: auth.sub },
      data: {}, // We store pin per document instead for flexibility
    });

    // Set PIN on the most recently accessed or all documents
    await prisma.vaultDocument.updateMany({
      where: { userId: auth.sub, deletedAt: null },
      data: { pinHash },
    });

    return jsonResponse(successResponse(null, 'Vault PIN set successfully'));
  } catch {
    return serverError();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const validation = validate(VaultPinSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const doc = await prisma.vaultDocument.findFirst({
      where: { userId: auth.sub, deletedAt: null },
    });

    if (!doc || !doc.pinHash) {
      return jsonResponse(errorResponse('No PIN set'), 400);
    }

    const valid = await verifyPassword(validation.data.pin, doc.pinHash);
    if (!valid) {
      return jsonResponse(errorResponse('Incorrect PIN'), 403);
    }

    return jsonResponse(successResponse(null, 'PIN verified'));
  } catch {
    return serverError();
  }
}
