import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { jsonResponse, badRequest, serverError } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return jsonResponse(errorResponse('Verification token is required'), 400);
    }

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return jsonResponse(errorResponse('Invalid or expired verification token'), 400);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });

    return jsonResponse(successResponse(null, 'Email verified successfully'));
  } catch {
    return serverError();
  }
}
