import type { Handle } from '@sveltejs/kit'

// import * as LanguageParser from 'accept-language-parser'
// import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
// import {
//   DEFAULT_LANGUAGE,
//   LANGUAGE_CODES,
//   setUrlLocale,
//   isDefaultLanguage as isDefault,
//   isSupportedLanguage as isSupported,
//   type LanguageCode,
// } from '$lib/utils/language'

export const handleLanguage = (({ event, resolve }) => {
  // const clientLanguageCode = getClientLanguage(event.request)
  const lang = 'es' // getUrlLanguage(url, clientLanguageCode)

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  })
}) satisfies Handle

// function getClientLanguage(request: Request): LanguageCode {
//   const acceptLanguage = request.headers.get('Accept-Language')

//   return (acceptLanguage && LanguageParser.pick(LANGUAGE_CODES, acceptLanguage)) || DEFAULT_LANGUAGE.code
// }

// function getUrlLanguage(url: URL, fallbackLocale: LanguageCode): LanguageCode {
//   const fallbackIsDefault = isDefault(fallbackLocale)
//   const locale = url.pathname.match(/^\/([a-z]{2})\//)?.[1]

//   if (!locale && fallbackIsDefault) {
//     return fallbackLocale
//   }

//   if (locale && isSupported(locale) && (!isDefault(locale) || !fallbackIsDefault)) {
//     return locale
//   }

//   const cannonicalUrl = setUrlLocale(url, fallbackIsDefault ? '' : fallbackLocale)

//   throw redirect(302, cannonicalUrl.toString())
// }
