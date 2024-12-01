// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/webhook') {
    const ip = request.ip ?? '127.0.0.1';
    const count = rateLimit.get(ip) ?? 0;
    
    if (count > 10) { // Max 10 requests per minute
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
    
    rateLimit.set(ip, count + 1);
    setTimeout(() => rateLimit.delete(ip), 60000); // Reset after 1 minute
  }
}