import { createClient, type PostgrestError } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_TOKEN } from '$env/static/private'

export type SupabaseResponse<T> = { data: T; error: null } | { data: null; error: PostgrestError }

export const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN)
