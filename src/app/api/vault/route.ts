import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, VaultDocumentCreateSchema, VaultDocumentUpdateSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const docs = await prisma.vaultDocument.findMany({
      where: { userId: auth.sub, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    return jsonResponse(successResponse(docs));
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

    const validation = validate(VaultDocumentCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const created = await prisma.vaultDocument.create({
      data: { userId: auth.sub, ...validation.data },
    });

    return jsonResponse(successResponse(created, 'Document added to vault'), 201);
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

    const { id, ...data } = body;
    if (!id) return jsonResponse(errorResponse('Document id is required'), 400);

    const existing = await prisma.vaultDocument.findFirst({
      where: { id, userId: auth.sub, deletedAt: null },
    });
    if (!existing) return jsonResponse(errorResponse('Document not found'), 404);

    const validation = validate(VaultDocumentUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const updated = await prisma.vaultDocument.update({
      where: { id },
      data: { ...validation.data, updatedAt: new Date() },
    });

    return jsonResponse(successResponse(updated, 'Document updated'));
  } catch {
    return serverError();
  }
}
