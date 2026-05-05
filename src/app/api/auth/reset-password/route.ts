import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { jsonResponse, badRequest, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';
import { z } from 'zod';
import { validate, parseJson } from '@/lib/api-utils';

const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`reset:${ip}`, 5, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many requests. Please try again later.'), 429);
    }

    const body = await parseJson(req);
    if (!body) return badRequest('Invalid JSON body');

    const validation = validate(ResetPasswordSchema, body);
    if (!validation.success) return badRequest(validation.error);

    const { token, password } = validation.data;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return jsonResponse(errorResponse('Invalid or expired reset token'), 400);
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return jsonResponse(successResponse(null, 'Password reset successfully'));
  } catch {
    return serverError();
  }
}
