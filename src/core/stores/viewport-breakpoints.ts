import { type Readable, readable } from 'svelte/store'

const isSupported = globalThis && 'matchMedia' in globalThis

type BreakpointMatch = { breakpoint: number }

export function viewportBreakpoints(breakpoints: number[]): Readable<BreakpointMatch> {
  breakpoints = [...breakpoints].sort((a, b) => a - b)
  const initialValue: BreakpointMatch = { breakpoint: 0 }

  if (!isSupported) return readable(initialValue)

  return readable<BreakpointMatch>(initialValue, (set) => {
    const abortController = new AbortController()
    const mediaQueryLists: { breakpoint: number; media: MediaQueryList }[] = []

    for (const breakpoint of breakpoints) {
      const media = globalThis.matchMedia(`(min-width: ${breakpoint}px)`)
      media.addEventListener('change', onChange, { signal: abortController.signal })
      mediaQueryLists.push({ breakpoint, media })
    }

    function onChange() {
      const breakpoint = mediaQueryLists.findLast(({ media }) => media.matches)?.breakpoint ?? 0
      set({ breakpoint })
    }

    onChange()

    return () => abortController.abort()
  })
}
