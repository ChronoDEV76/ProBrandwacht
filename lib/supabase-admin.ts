import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase admin credentials are missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).')
  }
  cachedClient = createClient(url, key)
  return cachedClient
}
