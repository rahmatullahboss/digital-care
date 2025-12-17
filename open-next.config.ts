import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
    incrementalCache: {
        loader: "dummy", // In-memory cache for now (Durable Objects recommended for prod)
    },
});
