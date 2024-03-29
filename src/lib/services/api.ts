import { type PostgrestError, createClient } from '@supabase/supabase-js'
import { SUPABASE_TOKEN, SUPABASE_URL } from '$env/static/private'
import { DEFAULT_LANGUAGE, LANGUAGE_CODES, getLocalizedUrl } from '$lib/utils/language'
import type { Database } from '../../supabase'

export type ApiResponseBase = { status: number; statusText: string }
export type ApiResponseError = { data: null; error: PostgrestError } & ApiResponseBase
export type ApiResponseSuccess<T> = { data: T; error: null } & ApiResponseBase
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export const api = createClient<Database>(SUPABASE_URL, SUPABASE_TOKEN, {
  auth: { persistSession: false },
})

export function getPageLinks(url: URL, lang = ''): App.Link[] {
  const links: App.Link[] = []

  for (const code of LANGUAGE_CODES) {
    if (code === lang && code === DEFAULT_LANGUAGE.code) {
      links.push({ rel: 'canonical', href: getLocalizedUrl(url).toString() })
      continue
    }

    if (code === (lang || DEFAULT_LANGUAGE.code)) continue

    const href = getLocalizedUrl(url, code).toString()
    links.push({ rel: 'alternate', href, hreflang: code })
  }

  return links
}

export function getExternalOrigins(hrefs: string[]): string[] {
  const origins: string[] = []

  for (const href of hrefs) {
    const { origin, host } = new URL(href, 'http://localhost')
    if (host === 'localhost' || origins.includes(origin)) continue
    origins.push(origin)
  }

  return origins
}
