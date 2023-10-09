import { type Readable, derived } from 'svelte/store'
import { languageStore } from '$lib/stores/language.store'
import type { LanguageCode } from '$lib/utils/language'
import en from './en'
import es, { type Translations } from './es'

export type TranslationKey = keyof Translations

function translate(translations: Translations, key: TranslationKey, vars?: Record<string, string>) {
  let text: string = translations[key]

  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      const regex = new RegExp(`{{${key}}}`, 'g')
      text = text.replace(regex, value)
    }
  }

  return text
}

type TranslateFnc = (key: TranslationKey, vars?: Record<string, string>) => string

const translations: Record<LanguageCode, Translations> = { es, en }

export function createTranslateFnc(translations: Translations): TranslateFnc {
  return (key, vars) => translate(translations, key, vars)
}

export const t: Readable<TranslateFnc> = derived(languageStore, ({ code }) => createTranslateFnc(translations[code]))
