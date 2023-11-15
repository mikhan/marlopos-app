type LoadScriptOptions = {
  defer?: boolean
  async?: boolean
  crossorigin?: string
}

export function loadScript(src: string, options: LoadScriptOptions = {}): Promise<Event> {
  if (typeof window === 'undefined') return Promise.reject('Window is not defined')

  return new Promise((resolve, reject) => {
    const { async = true, defer = true, crossorigin = '*' } = options

    const script = document.createElement('script')
    script.async = async
    script.defer = defer
    script.crossOrigin = crossorigin
    script.src = src
    script.onload = resolve
    script.onerror = reject

    const container = document.querySelector('head') || document.body
    container.append(script)
  })
}
