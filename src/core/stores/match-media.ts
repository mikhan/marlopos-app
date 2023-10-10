import { readable } from 'svelte/store'

export const matchMedia = (media: string, initialValue = false) => {
  const isSupported = globalThis && 'matchMedia' in globalThis

  if (!isSupported) return readable(initialValue)

  return readable<boolean>(initialValue, (set) => {
    const onChange = ({ matches }: MediaQueryListEvent) => set(matches)
    const mediaQueryList = globalThis.matchMedia(media)
    mediaQueryList.addEventListener('change', onChange)
    set(mediaQueryList.matches)

    return () => mediaQueryList.removeEventListener('change', onChange)
  })
}
