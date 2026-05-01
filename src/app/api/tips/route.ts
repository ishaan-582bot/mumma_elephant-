import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import {
  jsonResponse, unauthorized, serverError, validate, parseJson
} from '@/lib/api-utils';
import { successResponse, errorResponse, TipCreateSchema, PaginationSchema } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const { searchParams } = new URL(req.url);
    const pagination = validate(PaginationSchema, {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    });

    const page = pagination.success ? pagination.data.page : 1;
    const limit = pagination.success ? pagination.data.limit : 20;
    const skip = (page - 1) * limit;
    const tag = searchParams.get('tag');

    const where: any = { userId: auth.sub, deletedAt: null };
    if (tag) {
      where.tags = { has: tag };
    }

    const [tips, total] = await Promise.all([
      prisma.tip.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.tip.count({ where }),
    ]);

    const data = tips.map((t: typeof tips[0]) => ({
      id: t.id,
      text: t.text,
      tags: t.tags,
      helpfulPercent: t.helpfulPercent,
      upvotes: t.upvotes,
      downvotes: t.downvotes,
      date: t.createdAt.toISOString().split('T')[0],
      views: t.views,
    }));

    return jsonResponse(successResponse({
      tips: data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    }));
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

    const validation = validate(TipCreateSchema, body);
    if (!validation.success) return jsonResponse(errorResponse(validation.error), 400);

    const { text, tags } = validation.data;

    const tip = await prisma.tip.create({
      data: {
        userId: auth.sub,
        text,
        tags,
      },
    });

    return jsonResponse(successResponse({
      id: tip.id,
      text: tip.text,
      tags: tip.tags,
      helpfulPercent: tip.helpfulPercent,
      upvotes: tip.upvotes,
      downvotes: tip.downvotes,
      date: tip.createdAt.toISOString().split('T')[0],
      views: tip.views,
    }, 'Tip created successfully'), 201);
  } catch {
    return serverError();
  }
}
