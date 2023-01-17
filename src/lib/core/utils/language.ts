import * as LanguageParser from 'accept-language-parser'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '$lib/app/constants'

export function getRequestLanguage(request: Request) {
  const url = new URL(request.url)
  let language = getUrlLanguage(url)

  if (language && (isDefaultLanguage(language) || !isValidLanguage(language))) {
    throw removeUrlLanguage(url, language)
  }

  if (!language) {
    language = getClientLanguage(request)

    if (!isDefaultLanguage(language)) {
      throw setUrlLanguage(url, language)
    }
  }

  return language
}

function getUrlLanguage(url: URL): string | undefined {
  const [, language] = url.pathname.split('/')

  return language
}

function getClientLanguage(request: Request) {
  const acceptLanguage = request.headers.get('Accept-Language')
  const lang = acceptLanguage && LanguageParser.pick(SUPPORTED_LANGUAGES, acceptLanguage)

  return lang ?? DEFAULT_LANGUAGE
}

function isDefaultLanguage(language: string) {
  return language === DEFAULT_LANGUAGE
}

function isValidLanguage(language: string) {
  return SUPPORTED_LANGUAGES.includes(language)
}

function setUrlLanguage(url: URL, language: string) {
  url.pathname = '/' + language + url.pathname

  return url
}

function removeUrlLanguage(url: URL, language: string) {
  url.pathname = url.pathname.replace('/' + language, '')

  return url
}
