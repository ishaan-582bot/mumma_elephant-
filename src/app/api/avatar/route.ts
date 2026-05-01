import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`avatar:${ip}`, 10, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many upload attempts'), 429);
    }

    const formData = await req.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return jsonResponse(errorResponse('No avatar file provided'), 400);
    }

    // For demo purposes, convert to base64 data URL
    // In production, upload to S3/Cloudinary and store the URL
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const avatarUrl = `data:${mimeType};base64,${base64}`;

    const updated = await prisma.user.update({
      where: { id: auth.sub },
      data: { avatar: avatarUrl, updatedAt: new Date() },
    });

    return jsonResponse(successResponse({ avatarUrl: updated.avatar }, 'Avatar updated successfully'));
  } catch {
    return serverError();
  }
}
