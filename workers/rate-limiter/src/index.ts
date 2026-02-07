// Cloudflare Worker Types Stub
interface DurableObjectState {
  storage: DurableObjectStorage;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
  waitUntil(promise: Promise<any>): void;
}

interface DurableObjectStorage {
  get<T = any>(key: string): Promise<T | undefined>;
  get<T = any>(keys: string[]): Promise<Map<string, T>>;
  put<T = any>(key: string, value: T): Promise<void>;
  put<T = any>(entries: Record<string, T>): Promise<void>;
  delete(key: string): Promise<boolean>;
  delete(keys: string[]): Promise<number>;
  list<T = any>(options?: { prefix?: string; limit?: number; reverse?: boolean; start?: string; end?: string; startAfter?: string; endAfter?: string }): Promise<Map<string, T>>;
  getAlarm(): Promise<number | null>;
  setAlarm(scheduledTime: number | Date): Promise<void>;
  deleteAlarm(): Promise<void>;
  deleteAll(): Promise<void>;
}

export class RateLimiter {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    
    const limit = parseInt(url.searchParams.get("limit") || "60");
    const windowSec = parseInt(url.searchParams.get("window") || "60");

    const now = Date.now() / 1000;
    
    // Fixed Window Counter
    const windowKey = Math.floor(now / windowSec);
    const storageKey = `count:${windowKey}`;

    // Read current count
    let count: number = (await this.state.storage.get(storageKey)) || 0;

    if (count >= limit) {
      // Too Many Requests
      return new Response(JSON.stringify({
        success: false,
        limit: limit,
        remaining: 0,
        reset: (windowKey + 1) * windowSec
      }), { 
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Increment
    count++;
    await this.state.storage.put(storageKey, count);
    
    // Set alarm to clean up old keys if not set
    const currentAlarm = await this.state.storage.getAlarm();
    if (currentAlarm === null) {
        // Schedule cleanup check in 2 windows duration to be safe
        await this.state.storage.setAlarm(Date.now() + (windowSec * 2 * 1000));
    }

    return new Response(JSON.stringify({
      success: true,
      limit: limit,
      remaining: limit - count,
      reset: (windowKey + 1) * windowSec
    }), { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
    });
  }

  async alarm() {
    // Delete all keys to keep storage minimal for this IP object.
    await this.state.storage.deleteAll();
  }
}

export default {
  async fetch(request: Request, env: any) {
    return new Response("This worker exposes a Durable Object: RateLimiter");
  }
};
