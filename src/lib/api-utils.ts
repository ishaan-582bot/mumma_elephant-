import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { errorResponse, successResponse, ApiResponse } from './shared-types';

export function jsonResponse<T>(body: ApiResponse<T>, status = 200) {
  return NextResponse.json(body, { status });
}

export function badRequest(message: string) {
  return jsonResponse(errorResponse(message), 400);
}

export function unauthorized(message = 'Unauthorized') {
  return jsonResponse(errorResponse(message), 401);
}

export function notFound(message = 'Not found') {
  return jsonResponse(errorResponse(message), 404);
}

export function serverError(message = 'Internal server error') {
  return jsonResponse(errorResponse(message), 500);
}

export function validate<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (e) {
    if (e instanceof ZodError) {
      const first = e.errors[0];
      return { success: false, error: `${first.path.join('.')}: ${first.message}` };
    }
    return { success: false, error: 'Invalid input' };
  }
}

export async function parseJson(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, maxRequests = 10, windowMs = 60_000) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}
