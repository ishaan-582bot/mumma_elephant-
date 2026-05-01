import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, ChildUpdateSchema } from '@/lib/shared-types';

async function getChildOwner(childId: string, userId: string) {
  return prisma.child.findFirst({
    where: { id: childId, userId, deletedAt: null },
    include: {
      weight: true,
      height: true,
      vaccinations: true,
      milestones: true,
      photoTimeline: true,
    },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const child = await getChildOwner(id, auth.sub);
    if (!child) return jsonResponse(errorResponse('Child not found'), 404);

    return jsonResponse(successResponse({
      id: child.id,
      name: child.name,
      photo: child.photo,
      dateOfBirth: child.dateOfBirth,
      sex: child.sex,
      isPregnancy: child.isPregnancy,
      dueDate: child.dueDate,
      publicFields: child.publicFields,
      weight: child.weight.map((w: typeof child.weight[0]) => ({ date: w.date, value: w.value })),
      height: child.height.map((h: typeof child.height[0]) => ({ date: h.date, value: h.value })),
      vaccinations: child.vaccinations.map((v: typeof child.vaccinations[0]) => ({
        id: v.id,
        name: v.name,
        date: v.date,
        isDue: v.isDue,
        dueDate: v.dueDate,
      })),
      milestones: child.milestones.map((m: typeof child.milestones[0]) => ({
        id: m.id,
        label: m.label,
        achieved: m.achieved,
        achievedDate: m.achievedDate,
      })),
      photoTimeline: child.photoTimeline.map((pt: typeof child.photoTimeline[0]) => ({
        date: pt.date,
        photo: pt.photo,
        note: pt.note,
      })),
      allergies: child.allergies,
      medicalNotes: child.medicalNotes,
    }));
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

    const validation = validate(ChildUpdateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await getChildOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Child not found'), 404);

    const updated = await prisma.child.update({
      where: { id },
      data: {
        ...validation.data,
        updatedAt: new Date(),
      },
      include: {
        weight: true,
        height: true,
        vaccinations: true,
        milestones: true,
        photoTimeline: true,
      },
    });

    return jsonResponse(successResponse({
      id: updated.id,
      name: updated.name,
      photo: updated.photo,
      dateOfBirth: updated.dateOfBirth,
      sex: updated.sex,
      isPregnancy: updated.isPregnancy,
      dueDate: updated.dueDate,
      publicFields: updated.publicFields,
      weight: updated.weight.map((w: typeof updated.weight[0]) => ({ date: w.date, value: w.value })),
      height: updated.height.map((h: typeof updated.height[0]) => ({ date: h.date, value: h.value })),
      vaccinations: updated.vaccinations,
      milestones: updated.milestones,
      photoTimeline: updated.photoTimeline,
      allergies: updated.allergies,
      medicalNotes: updated.medicalNotes,
    }, 'Child updated successfully'));
  } catch {
    return serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { id } = await params;
    const existing = await getChildOwner(id, auth.sub);
    if (!existing) return jsonResponse(errorResponse('Child not found'), 404);

    await prisma.child.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return jsonResponse(successResponse(null, 'Child deleted successfully'));
  } catch {
    return serverError();
  }
}
