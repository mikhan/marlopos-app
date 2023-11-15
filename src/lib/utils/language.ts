export interface Language {
  readonly code: LanguageCode
  readonly name: string
  readonly locale: string
}

export const LANGUAGE_CODES = ['es', 'en'] as const

export type LanguageCode = (typeof LANGUAGE_CODES)[number]

export const LANGUAGES = {
  es: { code: 'es', locale: 'es-MX', name: 'Español' },
  en: { code: 'en', locale: 'en-US', name: 'English' },
} satisfies Record<LanguageCode, Language>

export const DEFAULT_LANGUAGE = LANGUAGES['es'] as Language

export function isDefaultLanguage(code: string): boolean {
  return code === DEFAULT_LANGUAGE.code
}

export function isSupportedLanguage(code: string): code is LanguageCode {
  return code in LANGUAGES
}

export function getLanguage(code?: string): Language {
  if (code) {
    if (!isSupportedLanguage(code)) {
      throw new Error(`Language code '${code}' is not supported`)
    }

    return LANGUAGES[code]
  } else {
    return DEFAULT_LANGUAGE
  }
}

const UrlPathnameLocaleRegexp = /^\/([a-z]{2}(\/|$))?/
export function setUrlLocale(url: URL, locale: string): URL {
  const cannonicalUrl = new URL(url)
  cannonicalUrl.pathname = url.pathname.replace(UrlPathnameLocaleRegexp, `${locale}/`)

  return cannonicalUrl
}

export function getLocalizedUrl(url: URL, code = DEFAULT_LANGUAGE.code): URL {
  return setUrlLocale(url, code === DEFAULT_LANGUAGE.code ? '' : code)
}
