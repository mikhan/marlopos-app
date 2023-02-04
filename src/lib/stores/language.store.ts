import { DEFAULT_LANGUAGE, type Language } from '$lib/utils/language'
import { writable, type Updater } from 'svelte/store'

const { subscribe, update } = writable<Language>(DEFAULT_LANGUAGE)

export const languageStore = {
  subscribe,
  set(newLang: Language) {
    update((lang) => {
      if (lang.code === newLang.code) return lang

      return newLang
    })
  },
  update(updater: Updater<Language>) {
    update((lang) => {
      const newLang = updater(lang)

      if (lang.code === newLang.code) return lang

      return newLang
    })
  },
}
