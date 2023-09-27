import { type Readable, derived } from 'svelte/store'
import { languageStore } from '$lib/stores/language.store'
import es, { type Translations } from './es'

// import en from './en'

export type TranslationKey = keyof Translations

// export type Translations = Record<TranslationKey, string>

export type TranslationLang = 'es' | 'en'

// const loaders: Record<TranslationLang, () => Promise<Translations>> = {
//   es: async () => (await import('./es')).default,
//   en: async () => (await import('./en')).default,
// }

// function isSupportedLanguage(string: string): string is keyof typeof loaders {
//   return string in loaders
// }

// export async function getKeyTranslation(key: TranslationKey, lang: string): Promise<string> {
//   if (!isSupportedLanguage(lang)) {
//     throw new Error(`Unknown language translation '${lang}'`)
//   }

//   const translations = loaders[lang]

//   return translations[key]
// }

// export async function getKeyTranslations(key: TranslationKey): Promise<Record<TranslationLang, string>> {
//   const result: [string, string][] = []

//   for (const lang of Object.keys(loaders)) {
//     result.push([lang, await getKeyTranslation(key, lang)])
//   }

//   return Object.fromEntries(result) as Record<TranslationLang, string>
// }

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

function createTranslateFnc(translations: Translations): TranslateFnc {
  return (key, vars) => translate(translations, key, vars)
}

// const defaultTranslateFnc: TranslateFnc = () => ''

// export const t: Readable<TranslateFnc> = derived(
//   languageStore,
//   (language, set) => {
//     loaders[language.code]().then((translations) => set(createTranslateFnc(translations)))
//   },
//   defaultTranslateFnc,
// )
export const t: Readable<TranslateFnc> = derived(languageStore, () => createTranslateFnc(es))
