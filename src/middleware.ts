import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "./lib/rate-limit";

// Define protected routes and their limits
const RATE_LIMITS = {
  "/api/chat": { limit: 10, window: 60 }, // 10 requests per minute
  "/api/contact": { limit: 5, window: 60 }, // 5 contact submissions per minute
  "/api/admin": { limit: 100, window: 60 }, // Admin fetches
  "default": { limit: 60, window: 60 } // Default 60 requests per minute
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Only rate limit API routes
  if (pathname.startsWith("/api")) {
    let config = RATE_LIMITS["default"];
    
    if (pathname.startsWith("/api/chat")) {
      config = RATE_LIMITS["/api/chat"];
    } else if (pathname.startsWith("/api/contact")) {
      config = RATE_LIMITS["/api/contact"];
    } else if (pathname.startsWith("/api/admin")) {
        config = RATE_LIMITS["/api/admin"];
    }

    const result = await checkRateLimit(req, config);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests", retryAfter: result.reset }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Add rate limit headers
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", config.limit.toString());
    response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
