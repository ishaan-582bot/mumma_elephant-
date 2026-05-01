import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError, parseJson } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const body = await parseJson(req);
    if (!body) return jsonResponse(errorResponse('Invalid JSON body'), 400);

    const { label, icon, desc, color } = body;
    if (!label || !desc) {
      return jsonResponse(errorResponse('label and desc are required'), 400);
    }

    // Auto award logic: count tips and determine badge
    const tipsCount = await prisma.tip.count({ where: { userId: auth.sub, deletedAt: null } });
    const gratitudeCount = await prisma.gratitudeMessage.count({ where: { fromId: auth.sub } });
    const connectionsCount = await prisma.connection.count({
      where: {
        OR: [
          { initiatorId: auth.sub, status: 'accepted' },
          { receiverId: auth.sub, status: 'accepted' },
        ],
      },
    });

    let badgeLabel = label;
    let badgeIcon = icon || '🏅';
    let badgeDesc = desc;
    let badgeColor = color || 'var(--blush)';

    if (tipsCount >= 50 && label === 'Wisdom Sharer') {
      badgeDesc = `Shared ${tipsCount}+ helpful tips`;
    } else if (connectionsCount >= 10 && label === 'First Responder') {
      badgeDesc = `Supported ${connectionsCount}+ mums in need`;
    } else if (gratitudeCount >= 100 && label === 'Supportive Sister') {
      badgeDesc = `Sent ${gratitudeCount}+ hugs & messages`;
    }

    const existing = await prisma.communityBadge.findFirst({
      where: { userId: auth.sub, label: badgeLabel },
    });

    if (existing) {
      return jsonResponse(errorResponse('Badge already awarded'), 409);
    }

    const created = await prisma.communityBadge.create({
      data: {
        userId: auth.sub,
        label: badgeLabel,
        icon: badgeIcon,
        desc: badgeDesc,
        color: badgeColor,
      },
    });

    return jsonResponse(successResponse(created, 'Badge awarded'), 201);
  } catch {
    return serverError();
  }
}
