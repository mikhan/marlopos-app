import type { Action } from 'svelte/action'

let intersectionObserver: IntersectionObserver | undefined

function getIntersectionObserver(): IntersectionObserver {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const eventName = entry.isIntersecting ? 'viewportenter' : 'viewportexit'
        entry.target.dispatchEvent(new CustomEvent(eventName))
      })
    })
  }

  return intersectionObserver
}

type Attributes = {
  'on:viewportenter': (event: CustomEvent) => void
  'on:viewportexit': (event: CustomEvent) => void
}

export const viewport: Action<HTMLElement, undefined, Attributes> = (element) => {
  const observer = getIntersectionObserver()

  observer.observe(element)

  return {
    destroy() {
      observer.unobserve(element)
    },
  }
}
