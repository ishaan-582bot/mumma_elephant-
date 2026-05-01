import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';
import { LoginSchema } from '@/lib/shared-types';
import { validate, parseJson, jsonResponse, badRequest, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(`login:${ip}`, 10, 60_000);
  if (!limit.allowed) {
    return jsonResponse(errorResponse('Too many login attempts. Please try again later.'), 429);
  }

  const body = await parseJson(req);
  if (!body) return badRequest('Invalid JSON body');

  const validation = validate(LoginSchema, body);
  if (!validation.success) return badRequest(validation.error);

  const { email, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return jsonResponse(errorResponse('Invalid email or password'), 401);
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return jsonResponse(errorResponse('Invalid email or password'), 401);
    }

    const token = await createToken(user.id, user.email);
    await setAuthCookie(token);

    return jsonResponse(successResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      motherhoodStage: user.motherhoodStage,
      profileCompletion: user.profileCompletion,
    }, 'Logged in successfully'));
  } catch {
    return serverError('Failed to log in');
  }
}
