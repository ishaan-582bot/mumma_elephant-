import { clearAuthCookie } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';
import { successResponse } from '@/lib/shared-types';

export async function POST() {
  await clearAuthCookie();
  return jsonResponse(successResponse(null, 'Logged out successfully'));
}
