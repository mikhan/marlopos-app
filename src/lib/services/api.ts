import { createClient, type PostgrestError } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_TOKEN } from '$env/static/private'
import { DEFAULT_LANGUAGE, getLocalizedUrl, LANGUAGE_CODES } from '$lib/utils/language'

export type ApiResponse<T> = { data: T; error: null } | { data: null; error: PostgrestError }

export const api = createClient(SUPABASE_URL, SUPABASE_TOKEN)

export function getPageLinks(url: URL, lang = ''): Api.Link[] {
  const links: Api.Link[] = []

  console.log('getPageLinks', { url: url.toString(), lang })

  for (const code of LANGUAGE_CODES) {
    if (code === lang && code === DEFAULT_LANGUAGE.code) {
      links.push({ rel: 'canonical', href: getLocalizedUrl(url).toString() })
      continue
    }

    if (code === (lang || DEFAULT_LANGUAGE.code)) continue

    const href = getLocalizedUrl(url, code).toString()
    links.push({ rel: 'alternate', href, hreflang: code })
  }

  console.log(links)

  return links
}
