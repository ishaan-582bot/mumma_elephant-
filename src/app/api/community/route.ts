import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError } from '@/lib/api-utils';
import { successResponse } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const [connections, badges, gratitude, timeline] = await Promise.all([
      prisma.connection.findMany({
        where: {
          OR: [
            { initiatorId: auth.sub, status: 'accepted' },
            { receiverId: auth.sub, status: 'accepted' },
          ],
        },
        include: {
          initiator: { select: { id: true, name: true, avatar: true, motherhoodStage: true } },
          receiver: { select: { id: true, name: true, avatar: true, motherhoodStage: true } },
        },
      }),
      prisma.communityBadge.findMany({ where: { userId: auth.sub } }),
      prisma.gratitudeMessage.findMany({
        where: { toId: auth.sub },
        include: { from: { select: { name: true } } },
      }),
      prisma.journeyEvent.findMany({
        where: { userId: auth.sub },
        orderBy: { date: 'desc' },
        take: 10,
      }),
    ]);

    const mappedConnections = connections.map((c: typeof connections[0]) => ({
      id: c.id,
      name: c.initiatorId === auth.sub ? c.receiver.name : c.initiator.name,
      avatar: c.initiatorId === auth.sub ? c.receiver.avatar : c.initiator.avatar,
      role: c.initiatorId === auth.sub ? c.receiver.motherhoodStage : c.initiator.motherhoodStage,
    }));

    const mappedGratitude = gratitude.map((g: typeof gratitude[0]) => ({
      id: g.id,
      from: g.from.name,
      text: g.text,
      date: g.date,
    }));

    const mappedTimeline = timeline.map((t: typeof timeline[0]) => ({
      action: t.title,
      date: t.date,
    }));

    return jsonResponse(successResponse({
      connections: mappedConnections,
      badges,
      gratitude: mappedGratitude,
      timeline: mappedTimeline,
    }));
  } catch {
    return serverError();
  }
}
