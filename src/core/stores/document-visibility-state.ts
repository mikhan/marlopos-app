import { browser } from '$app/environment'
import { readable } from 'svelte/store'

export const documentVisibilityState = readable<DocumentVisibilityState>('hidden', (set) => {
  const onVisibilityChange = () => set(document.visibilityState)

  if (!browser) return () => undefined

  document.addEventListener('visibilitychange', onVisibilityChange)
  set(document.visibilityState)

  return () => document.removeEventListener('visibilitychange', onVisibilityChange)
})
