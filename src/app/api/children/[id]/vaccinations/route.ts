import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, VaccinationCreateSchema, VaccinationUpdateSchema } from '@/lib/shared-types';

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

    const vaccinations = await prisma.vaccination.findMany({ where: { childId: id } });
    return jsonResponse(successResponse(vaccinations));
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

    const validation = validate(VaccinationCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const created = await prisma.vaccination.create({
      data: { childId: id, ...validation.data },
    });

    return jsonResponse(successResponse(created, 'Vaccination record added'), 201);
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

    const { vaccinationId, ...data } = body;
    if (!vaccinationId) return jsonResponse(errorResponse('vaccinationId is required'), 400);

    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    const existing = await prisma.vaccination.findFirst({
      where: { id: vaccinationId, childId: id },
    });
    if (!existing) return jsonResponse(errorResponse('Vaccination not found'), 404);

    const validation = validate(VaccinationUpdateSchema, data);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const updated = await prisma.vaccination.update({
      where: { id: vaccinationId },
      data: validation.data,
    });

    return jsonResponse(successResponse(updated, 'Vaccination updated'));
  } catch {
    return serverError();
  }
}
