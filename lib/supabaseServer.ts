// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = () =>
  createClient(
    process.env.SUPABASE_URL!,               // server env
    process.env.SUPABASE_SERVICE_ROLE_KEY!,  // server env (keep on server only)
    { auth: { persistSession: false } }
  );

