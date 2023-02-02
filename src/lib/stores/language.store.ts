import { browser } from '$app/environment'
import { DEFAULT_LANGUAGE, setUrlLocale, type Language, type LanguageCode } from '$lib/utils/language'
import { derived, writable, type Updater } from 'svelte/store'
import { goto } from '$app/navigation'
// import { metadataStore } from './metadata.store'
import { alternateLanguagesStore } from './alternate-languages.store'

const store = writable<Language>(DEFAULT_LANGUAGE)

// async function changeLocale(to: LanguageCode) {
//   if (!browser) return

//   const url = new URL(window.location.href)
//   const localizedUrl = setUrlLocale(url, to).toString()

//   if (window.location.href === localizedUrl) return

//   await goto(localizedUrl)
// }

export const languageStore = {
  subscribe: store.subscribe,
  set(newLang: Language) {
    store.update((lang) => {
      if (lang.code === newLang.code) return lang

      // changeLocale(newLang.code)

      return newLang
    })
  },
  update(updater: Updater<Language>) {
    store.update((lang) => {
      const newLang = updater(lang)

      if (lang.code === newLang.code) return lang

      // changeLocale(newLang.code)

      return newLang
    })
  },
}

// const langRedirectStore = derived([languageStore, alternateLanguagesStore], ([language, alternateLanguages]) => {
//   return alternateLanguages.find((link) => link.hreflang === language.code)?.href
// })

// if (browser) {
//   langRedirectStore.subscribe((href) => {
//     if (href) goto(href)
//   })
// }
