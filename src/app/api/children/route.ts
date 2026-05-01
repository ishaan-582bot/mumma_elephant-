import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, ChildCreateSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const children = await prisma.child.findMany({
      where: { userId: auth.sub, deletedAt: null },
      include: {
        weight: true,
        height: true,
        vaccinations: true,
        milestones: true,
        photoTimeline: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const data = children.map((c: typeof children[0]) => ({
      id: c.id,
      name: c.name,
      photo: c.photo,
      dateOfBirth: c.dateOfBirth,
      sex: c.sex,
      isPregnancy: c.isPregnancy,
      dueDate: c.dueDate,
      publicFields: c.publicFields,
      weight: c.weight.map((w: typeof c.weight[0]) => ({ date: w.date, value: w.value })),
      height: c.height.map((h: typeof c.height[0]) => ({ date: h.date, value: h.value })),
      vaccinations: c.vaccinations.map((v: typeof c.vaccinations[0]) => ({
        id: v.id,
        name: v.name,
        date: v.date,
        isDue: v.isDue,
        dueDate: v.dueDate,
      })),
      milestones: c.milestones.map((m: typeof c.milestones[0]) => ({
        id: m.id,
        label: m.label,
        achieved: m.achieved,
        achievedDate: m.achievedDate,
      })),
      photoTimeline: c.photoTimeline.map((pt: typeof c.photoTimeline[0]) => ({
        date: pt.date,
        photo: pt.photo,
        note: pt.note,
      })),
      allergies: c.allergies,
      medicalNotes: c.medicalNotes,
    }));

    return jsonResponse(successResponse(data));
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

    const validation = validate(ChildCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const data = validation.data;

    const child = await prisma.child.create({
      data: {
        userId: auth.sub,
        name: data.name,
        photo: data.photo,
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        isPregnancy: data.isPregnancy,
        dueDate: data.dueDate,
        publicFields: data.publicFields,
        allergies: data.allergies,
        medicalNotes: data.medicalNotes,
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
      id: child.id,
      name: child.name,
      photo: child.photo,
      dateOfBirth: child.dateOfBirth,
      sex: child.sex,
      isPregnancy: child.isPregnancy,
      dueDate: child.dueDate,
      publicFields: child.publicFields,
      weight: child.weight,
      height: child.height,
      vaccinations: child.vaccinations,
      milestones: child.milestones,
      photoTimeline: child.photoTimeline,
      allergies: child.allergies,
      medicalNotes: child.medicalNotes,
    }, 'Child created successfully'), 201);
  } catch {
    return serverError();
  }
}
