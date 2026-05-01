import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError, validate, parseJson } from '@/lib/api-utils';
import { successResponse, errorResponse, UserProfileUpdateSchema } from '@/lib/shared-types';

function calculateProfileCompletion(user: {
  name: string;
  avatar: string | null;
  occupation: string;
  country: string;
  location: string;
  email: string;
  phone: string;
  motherhoodStage: string;
}) {
  const criteria = [
    !!user.name?.trim(),
    !!user.avatar,
    !!user.occupation?.trim(),
    !!user.country?.trim(),
    !!user.location?.trim(),
    !!user.email?.trim(),
    !!user.phone?.trim(),
    !!user.motherhoodStage,
  ];
  const filledCount = criteria.filter(Boolean).length;
  return Math.round((filledCount / criteria.length) * 100);
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const user = await prisma.user.findUnique({
      where: { id: auth.sub },
      include: {
        posts: { where: { deletedAt: null }, orderBy: { createdAt: 'desc' } },
        tips: { where: { deletedAt: null }, orderBy: { createdAt: 'desc' } },
        children: {
          where: { deletedAt: null },
          include: {
            weight: true,
            height: true,
            vaccinations: true,
            milestones: true,
            photoTimeline: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        vaultDocuments: { where: { deletedAt: null }, orderBy: { createdAt: 'desc' } },
        privacyLogs: { orderBy: { id: 'desc' }, take: 20 },
        connectionsInitiated: { where: { status: 'accepted' } },
        connectionsReceived: { where: { status: 'accepted' } },
        badges: true,
        gratitudeReceived: true,
        moodEntries: true,
        selfCareGoals: true,
        journeyEvents: { orderBy: { date: 'desc' } },
        legacyLetters: true,
        historicalMemories: true,
      },
    });

    if (!user) return jsonResponse(errorResponse('User not found'), 404);

    const postsCount = user.posts.length;
    const tipsCount = user.tips.length;
    const childrenCount = user.children.length;

    const profileCompletion = calculateProfileCompletion(user);

    // Update profile completion if it changed
    if (profileCompletion !== user.profileCompletion) {
      await prisma.user.update({
        where: { id: user.id },
        data: { profileCompletion },
      });
    }

    const response = {
      ...user,
      postsCount,
      tipsCount,
      childrenCount,
      profileCompletion,
      posts: user.posts.map((p: typeof user.posts[0]) => ({
        id: p.id,
        thumbnail: p.thumbnail,
        caption: p.caption,
        privacy: p.privacy,
        createdAt: p.createdAt.toISOString().split('T')[0],
      })),
      tips: user.tips.map((t: typeof user.tips[0]) => ({
        id: t.id,
        text: t.text,
        tags: t.tags,
        helpfulPercent: t.helpfulPercent,
        upvotes: t.upvotes,
        downvotes: t.downvotes,
        date: t.createdAt.toISOString().split('T')[0],
        views: t.views,
      })),
      children: user.children.map((c: typeof user.children[0]) => ({
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
      })),
      vaultDocuments: user.vaultDocuments.map((d: typeof user.vaultDocuments[0]) => ({
        id: d.id,
        name: d.name,
        category: d.category,
        owner: d.owner,
        type: d.type,
        size: d.size,
        date: d.date,
        note: d.note,
        isOffline: d.isOffline,
      })),
    };

    return jsonResponse(successResponse(response));
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

    const validation = validate(UserProfileUpdateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const existing = await prisma.user.findUnique({ where: { id: auth.sub } });
    if (!existing) return jsonResponse(errorResponse('User not found'), 404);

    const updateData = validation.data;

    const merged = {
      ...existing,
      ...updateData,
    };

    const profileCompletion = calculateProfileCompletion(merged);

    const updated = await prisma.user.update({
      where: { id: auth.sub },
      data: {
        ...updateData,
        profileCompletion,
        updatedAt: new Date(),
      },
    });

    return jsonResponse(successResponse({
      id: updated.id,
      name: updated.name,
      avatar: updated.avatar,
      motherhoodStage: updated.motherhoodStage,
      motherhoodMonths: updated.motherhoodMonths,
      occupation: updated.occupation,
      country: updated.country,
      countryFlag: updated.countryFlag,
      location: updated.location,
      email: updated.email,
      phone: updated.phone,
      isVerified: updated.isVerified,
      verificationStatus: updated.verificationStatus,
      profileCompletion,
    }, 'Profile updated successfully'));
  } catch {
    return serverError();
  }
}
