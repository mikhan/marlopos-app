export function loadScript(src: string) {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = '*'
  script.src = src

  const head = document.querySelector('head')
  head?.append(script)
}
