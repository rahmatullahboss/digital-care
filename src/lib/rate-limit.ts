import { NextRequest } from "next/server";

// Stub for DurableObjectNamespace
interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

interface DurableObjectId {
  toString(): string;
}

interface DurableObjectStub {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export interface RateLimitConfig {
  limit: number;
  window: number; // in seconds
}

export async function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<{ success: boolean; reset: number; remaining: number }> {
    // Access rate limiter binding from global scope
    const rateLimiter = (globalThis as any).RATE_LIMITER as DurableObjectNamespace | undefined;

    // Use header fallback for IP if .ip is missing
    const ip = (req as any).ip || req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!rateLimiter) {
        console.warn("Rate Limiting: RATE_LIMITER binding not found. Falling back to allow.");
        // If DO binding is missing, fail open.
        return { success: true, reset: 0, remaining: 1000 };
    }
    
    try {
        // ID from IP ensures all requests from this IP go to the same DO instance
        const id = rateLimiter.idFromName(ip);
        const stub = rateLimiter.get(id);
        
        // Pass limit config via query params
        const url = `http://do/limit?limit=${config.limit}&window=${config.window}`;
        
        const response = await stub.fetch(url);
        
        if (response.ok) {
            const data = await response.json() as any;
            return { 
                success: true, 
                reset: Math.floor(data.reset * 1000), // DO returns seconds or ms? Implementation used ms for reset key but returned seconds * 1000 for reset
                remaining: data.remaining 
            };
        } else if (response.status === 429) {
            const data = await response.json() as any;
             return { 
                success: false, 
                reset: Math.floor(data.reset * 1000), // DO returned ms
                remaining: 0 
            };
        }
        
        // Fallback for other errors
        return { success: true, reset: 0, remaining: 1000 };

    } catch (error) {
        console.error("Rate Limiting DO Error:", error);
        // Fail open
        return { success: true, reset: 0, remaining: 1000 };
    }
}
