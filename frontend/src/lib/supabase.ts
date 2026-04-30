import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
    if (!_client) {
        _client = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
        );
    }
    return _client;
}

// Lazy proxy — defers createClient() until first property access at runtime,
// avoiding "supabaseUrl is required" errors during Next.js build.
export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop: string | symbol) {
        return (getClient() as any)[prop];
    },
});
