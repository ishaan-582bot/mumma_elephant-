import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { jsonResponse, badRequest, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';
import { z } from 'zod';
import { validate, parseJson } from '@/lib/api-utils';
import crypto from 'crypto';

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(`forgot:${ip}`, 5, 60_000);
    if (!limit.allowed) {
      return jsonResponse(errorResponse('Too many requests. Please try again later.'), 429);
    }

    const body = await parseJson(req);
    if (!body) return badRequest('Invalid JSON body');

    const validation = validate(ForgotPasswordSchema, body);
    if (!validation.success) return badRequest(validation.error);

    const { email } = validation.data;

    // Always return success to prevent user enumeration
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      });

      // In production, send email here
      // For now, log the reset link
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      console.log(`[DEV] Password reset link: ${baseUrl}/reset-password?token=${resetToken}`);
    }

    return jsonResponse(successResponse(null, 'If that email is registered, you will receive a reset link shortly.'));
  } catch {
    return serverError();
  }
}
