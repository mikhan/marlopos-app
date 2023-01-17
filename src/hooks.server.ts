import type { Handle } from '@sveltejs/kit'
import * as LanguageParser from 'accept-language-parser'
import { DEFAULT_LANG, SUPPORTED_LANGUAGES } from '$lib/constants'

export const handle = (({ event, resolve }) => {
  event.locals.lang = getRequestlang(event.request)

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.lang),
  })
}) satisfies Handle

function getRequestlang(request: Request) {
  const urlLang = getUrlLang(new URL(request.url))

  if (urlLang) return urlLang

  const acceptLanguage = request.headers.get('Accept-Language')
  const lang = acceptLanguage && LanguageParser.pick(SUPPORTED_LANGUAGES, acceptLanguage)

  return lang ?? DEFAULT_LANG
}

const getUrlLangRegexp = new RegExp(`^\/(${SUPPORTED_LANGUAGES.join('|')})(\/|$)`, 'i')
function getUrlLang(url: URL): string | null {
  return url.pathname.match(getUrlLangRegexp)?.[1] ?? null
}
