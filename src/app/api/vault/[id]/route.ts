import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, VaultDocumentUpdateSchema } from '@/lib/shared-types';

async function getDocOwner(docId: string, userId: string) {
  return prisma.vaultDocument.findFirst({
    where: { id: docId, userId, deletedAt: null },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const doc = await getDocOwner(id, auth.sub);
    if (!doc) return jsonResponse(errorResponse('Document not found'), 404);

    return jsonResponse(successResponse(doc));
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

    const existing = await getDocOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Document not found'), 404);

    const validation = validate(VaultDocumentUpdateSchema, body);
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const existing = await getDocOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Document not found'), 404);

    await prisma.vaultDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return jsonResponse(successResponse(null, 'Document deleted'));
  } catch {
    return serverError();
  }
}
