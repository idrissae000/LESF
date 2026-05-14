import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

function makeRedis(): Redis | null {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

const redis = makeRedis()

function makeLimiter(requests: number): Ratelimit | null {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, '1 h'),
    analytics: false,
  })
}

export const applyLimiter      = makeLimiter(5)
export const mentorshipLimiter = makeLimiter(10)
export const sponsorLimiter    = makeLimiter(10)
export const contactLimiter    = makeLimiter(20)

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip')?.trim() ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  )
}

export async function checkRateLimit(
  limiter: Ratelimit | null,
  request: NextRequest,
): Promise<NextResponse | null> {
  if (!limiter) return null
  const ip = getClientIp(request)
  const { success } = await limiter.limit(ip)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }
  return null
}
