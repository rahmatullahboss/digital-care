interface CloudflareEnv {
    DB: D1Database;
    AI?: {
        run: (model: string, options: unknown) => Promise<{ response?: string }>;
    };
}

declare global {
    interface CloudflareEnv {
        DB: D1Database;
        AI?: {
            run: (model: string, options: unknown) => Promise<{ response?: string }>;
        };
    }
}

export { };
