import { createClient, type PostgrestError } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_TOKEN } from '$env/static/private'
import { DEFAULT_LANGUAGE, getLocalizedUrl, LANGUAGE_CODES } from '$lib/utils/language'
import type { Database } from './database'

export type ApiResponseBase = { status: number; statusText: string }
export type ApiResponseError = { data: null; error: PostgrestError } & ApiResponseBase
export type ApiResponseSuccess<T> = { data: T; error: null } & ApiResponseBase
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export const api = createClient<Database>(SUPABASE_URL, SUPABASE_TOKEN)

export function getPageLinks(url: URL, lang = ''): Api.Link[] {
  const links: Api.Link[] = []

  // console.log('getPageLinks', { url: url.toString(), lang })

  for (const code of LANGUAGE_CODES) {
    if (code === lang && code === DEFAULT_LANGUAGE.code) {
      links.push({ rel: 'canonical', href: getLocalizedUrl(url).toString() })
      continue
    }

    if (code === (lang || DEFAULT_LANGUAGE.code)) continue

    const href = getLocalizedUrl(url, code).toString()
    links.push({ rel: 'alternate', href, hreflang: code })
  }

  // console.log(links)

  return links
}
