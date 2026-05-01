import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { jsonResponse, unauthorized, serverError } from '@/lib/api-utils';
import { successResponse, errorResponse } from '@/lib/shared-types';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req);
    if (!auth) return unauthorized();

    const user = await prisma.user.findUnique({
      where: { id: auth.sub },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        motherhoodStage: true,
        motherhoodMonths: true,
        occupation: true,
        country: true,
        countryFlag: true,
        location: true,
        phone: true,
        isVerified: true,
        verificationStatus: true,
        profileCompletion: true,
        createdAt: true,
      },
    });

    if (!user) {
      return jsonResponse(errorResponse('User not found'), 404);
    }

    return jsonResponse(successResponse(user));
  } catch {
    return serverError();
  }
}
