import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';
import { RegisterSchema } from '@/lib/shared-types';
import { validate, parseJson, jsonResponse, badRequest, serverError, rateLimit } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(`register:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return jsonResponse(errorResponse('Too many registration attempts. Please try again later.'), 429);
  }

  const body = await parseJson(req);
  if (!body) return badRequest('Invalid JSON body');

  const validation = validate(RegisterSchema, body);
  if (!validation.success) return badRequest(validation.error);

  const { email, password, name } = validation.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return jsonResponse(errorResponse('Email already registered'), 409);
    }

    const passwordHash = await hashPassword(password);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        profileCompletion: 25, // name + email
        verifyToken,
        verifyTokenExpiry,
      },
    });

    // Log verification link in dev
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    console.log(`[DEV] Verify email link: ${baseUrl}/verify-email?token=${verifyToken}`);

    const token = await createToken(user.id, user.email);
    await setAuthCookie(token);

    return jsonResponse(successResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      motherhoodStage: user.motherhoodStage,
      profileCompletion: user.profileCompletion,
    }, 'Registered successfully'), 201);
  } catch {
    return serverError('Failed to register user');
  }
}
