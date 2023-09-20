<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import type { Writable } from 'svelte/store'
  import { mousescroll } from '$core/actions/mousescroll'
  import { matchMedia } from '$core/stores/match-media'
  import { createConditionalAction } from '$core/utils/actions'
  import IconButton from '../icon-button.svelte'

  let container: HTMLUListElement
  let elements: Element[] = []
  let itemsMap = new Map<Element, { target: Element; isVisible: boolean; intersectionRatio: number }>()
  let showPrevious = false
  let showNext = false

  const mousescrollIf = createConditionalAction(matchMedia('(pointer: fine)'), mousescroll)
  let currentElement: HTMLElement | undefined

  function onIntersectionChange(changes: { target: Element; intersectionRatio: number }[]) {
    for (const { target, intersectionRatio } of changes) {
      itemsMap.set(target as HTMLElement, { target, isVisible: intersectionRatio > 0.5, intersectionRatio })
    }

    const items = Array.from(itemsMap.values())
    const firstVisible = items.find(({ isVisible }) => isVisible)
    currentElement = firstVisible?.target as HTMLElement
  }

  function onScroll() {
    showPrevious = container.scrollLeft > 0
    showNext = container.scrollWidth - container.scrollLeft - container.clientWidth > 0
  }

  function scrollSnap(position: Writable<{ top: number; left: number }>) {
    if (!currentElement) return
    if (container.scrollWidth - container.scrollLeft - container.clientWidth === 0) return

    const paddingLeft = getPaddingLeft()
    const offsetLeft = currentElement.offsetLeft
    position.update(({ top }) => ({ top, left: offsetLeft - paddingLeft }))
  }

  function getPaddingLeft() {
    const styleMap = container.computedStyleMap()
    return (styleMap.get('padding-inline-start') as CSSUnitValue).value
  }

  function previous() {
    const currentIndex = elements.findIndex((e) => e === currentElement)
    scrollTo(elements.at(Math.max(currentIndex - 1, 0)) as HTMLElement)
  }

  function next() {
    const currentIndex = elements.findIndex((e) => e === currentElement)
    scrollTo(elements.at(Math.min(currentIndex + 1, elements.length - 1)) as HTMLElement)
  }

  function scrollTo(element: HTMLElement) {
    const paddingLeft = getPaddingLeft()
    container.scrollLeft = element.offsetLeft - paddingLeft
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

    onScroll()

    return () => {
      intersectionObserver?.disconnect()
    }
  })
</script>

<div class="_container">
  <ul
    data-component="ui-scroller"
    {...$$restProps}
    use:mousescrollIf={{ speed: 500 }}
    on:mousescrollend={(event) => scrollSnap(event.detail.position)}
    on:scroll={onScroll}
    bind:this={container}>
    <slot />
  </ul>
  <div class="_controllers">
    <div class:visible={showPrevious}>
      <IconButton
        data-part="ui-scroller-previous-button"
        type="button"
        on:click={previous}
        icon={faChevronLeft}
        title="Anterior" />
    </div>
    <div class:visible={showNext}>
      <IconButton
        data-part="ui-scroller-next-button"
        type="button"
        on:click={next}
        icon={faChevronRight}
        title="Siguiente" />
    </div>
  </div>
</div>

<style lang="postcss">
  ._container {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  ul {
    --scrollbar-size: 0;
    display: grid;
    justify-content: start;
    align-items: stretch;
    grid-auto-flow: column;
    overflow: hidden;
    scroll-behavior: smooth;

    @media (pointer: fine) {
      cursor: grab;
    }
  }

  ._controllers {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    visibility: hidden;

    & :global([data-component='ui-icon-button']) {
      background-color: theme('colors.surface-2.bg');
      color: theme('colors.surface-2.fg');
      box-shadow: theme('elevation.low');
      margin: theme('spacing.4');

      &:hover {
        background-color: theme('colors.surface-2.hover');
      }
    }
  }
</style>
