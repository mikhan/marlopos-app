<script lang="ts">
  import { onMount } from 'svelte'
  import { type PanEvent, panning } from '$core/actions/pan'
  import { overrideProperties } from '$core/services/element'
  import { debounce } from '$core/utils/async'

  let container: HTMLUListElement
  let elements: Element[] = []
  let itemsMap = new Map<Element, { target: Element; isVisible: boolean; intersectionRatio: number }>()

  const debouncedOnResize = debounce(onResize, 250)
  let currentElement: HTMLElement | undefined

  export function getContainer() {
    return container
  }

  export function previous() {
    const currentIndex = elements.findIndex((e) => e === currentElement)
    scrollTo(elements.at(Math.max(currentIndex - 1, 0)) as HTMLElement)
  }

  export function next() {
    const currentIndex = elements.findIndex((e) => e === currentElement)
    scrollTo(elements.at(Math.min(currentIndex + 1, elements.length - 1)) as HTMLElement)
  }

  export function scrollTo(element: HTMLElement) {
    const firstElement = elements.at(0) as HTMLElement
    const offsetLeft = firstElement.offsetLeft
    container.scrollTo({ left: element.offsetLeft - offsetLeft, behavior: 'smooth' })
  }

  function onResize() {
    if (currentElement) scrollTo(currentElement)
  }

  function onIntersectionChange(changes: { target: Element; intersectionRatio: number }[]) {
    for (const { target, intersectionRatio } of changes) {
      itemsMap.set(target as HTMLElement, { target, isVisible: intersectionRatio > 0.5, intersectionRatio })
    }

    const items = Array.from(itemsMap.values())
    const firstVisible = items.find(({ isVisible }) => isVisible)
    currentElement = firstVisible?.target as HTMLElement
  }

  function scrollSnap() {
    if (container.scrollLeft === container.scrollWidth - container.clientWidth) return
    if (currentElement) scrollTo(currentElement)
  }

  function onPanstart() {
    const scrollLeft = container.scrollLeft
    const abortController = new AbortController()
    const restoreProperties = overrideProperties(container, {
      'scroll-behavior': 'auto',
    })

    container.addEventListener('panmove', onPanmove, { signal: abortController.signal })
    container.addEventListener('panstop', onPanstop, { signal: abortController.signal })

    function onPanmove(event: Event) {
      const { detail } = event as PanEvent
      container.scrollTo({ left: scrollLeft - detail.deltaX })
    }

    function onPanstop() {
      abortController.abort()
      restoreProperties()
      scrollSnap()
    }
  }

  onMount(() => {
    elements = Array.from(container.children)
    const intersectionObserver = new IntersectionObserver(onIntersectionChange, {
      root: container,
      threshold: 0.5,
    })

    for (const target of elements) {
      itemsMap.set(target, { target, isVisible: false, intersectionRatio: 0 })
      intersectionObserver.observe(target)
    }

    return () => {
      intersectionObserver?.disconnect()
    }
  })
</script>

<svelte:window on:resize={debouncedOnResize} />

<ul data-component="ui-scroller" use:panning on:panstart={onPanstart} on:scroll bind:this={container}>
  <slot />
</ul>

<style lang="postcss">
  ul {
    --scrollbar-size: 0;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: stretch;
    overflow: hidden;
    scroll-behavior: smooth;
  }
</style>
