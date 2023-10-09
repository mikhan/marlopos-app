<script lang="ts" generics="T">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { type PanEvent, panning } from '$core/actions/pan'
  import { getFocusableElements } from '$core/utils/focus'
  import { type KeyboardNavigation, useKeyboardNavigation } from '../actions/keyboard-navigation'
  import { documentVisibilityState } from '../stores/document-visibility-state'
  import { IndexManagerStore } from '../stores/index-manager-store'
  import { IntervalPlayer } from '../types/interval-player'

  export let slides: T[] = []
  export let index = 0
  export let loop = false
  export let autoplay = false
  export let speed = 0

  export const first = () => indexLoop.first()
  export const last = () => indexLoop.last()
  export const previous = () => indexLoop.previous()
  export const next = () => indexLoop.next()
  export const start = () => intervalPlayer.start()
  export const stop = () => intervalPlayer.stop()
  export const pause = () => intervalPlayer.pause()
  export const resume = () => intervalPlayer.resume()
  export const goTo = (index: number) => (indexLoop.index = index)

  const dispatch = createEventDispatcher()

  const keyboardNavigation: KeyboardNavigation = {
    home: () => first(),
    end: () => last(),
    left: () => previous(),
    right: () => next(),
  }

  $: speed = Number.isFinite(speed) && speed > 0 ? speed : 5000
  $: intervalPlayer = new IntervalPlayer(() => next(), speed)

  const indexStore = writable(index)
  $: $indexStore = index

  function onIndexChange(newIndex: number) {
    index = newIndex

    if (intervalPlayer.state === 'playing') {
      intervalPlayer.restart()
    }

    dispatch('change', { index: newIndex })
  }

  let slidesContainer: HTMLElement | undefined

  function registerSlide(node: HTMLElement, slideIndex: number) {
    indexStore.subscribe((index) => {
      node.toggleAttribute('inert', index !== slideIndex)

      if (index !== slideIndex || !slidesContainer?.matches(':focus-within')) return

      const [focusable] = getFocusableElements(node)
      if (!focusable) return
      focusable?.focus()
    })
  }

  let indexLoop: IndexManagerStore
  let unsubscribeIndexLoop: () => void
  function createIndexLoop(size: number, loop: boolean) {
    if (unsubscribeIndexLoop) unsubscribeIndexLoop()

    indexLoop = new IndexManagerStore(size, { index, loop })
    unsubscribeIndexLoop = indexLoop.subscribe(onIndexChange)
    indexStore.subscribe((index) => (indexLoop.index = index))
  }

  let rotation: [number, number, number]
  $: createIndexLoop(slides.length, loop)
  $: rotation = [index === 0 ? indexLoop.size - 1 : index - 1, index, index === indexLoop.size - 1 ? 0 : index + 1]
  $: $documentVisibilityState === 'visible' ? resume() : pause()

  let displace = 0
  let width = 0

  function onPanStart(event: PanEvent) {
    pause()
    width = (event.target as HTMLElement).clientWidth
    slidesContainer?.style.setProperty('touch-action', 'none')
  }

  function onPanMove(event: PanEvent) {
    const threshold = width / 3
    const deltaX = event.detail.deltaX
    const progress = Math.min(1, Math.abs(deltaX) / threshold)
    displace = Math.round(progress * threshold * Math.sign(deltaX))

    if (progress < 1) return
    if (event.detail.directionX === 'left') next()
    if (event.detail.directionX === 'right') previous()

    event.preventDefault()
    displace = 0
  }

  function onPanStop() {
    resume()
    displace = 0
    slidesContainer?.style.removeProperty('touch-action')
  }

  onMount(() => {
    if (autoplay) intervalPlayer.start()
  })

  onDestroy(() => {
    if (unsubscribeIndexLoop) unsubscribeIndexLoop()
    intervalPlayer.stop()
  })
</script>

<section
  tabindex="-1"
  role="group"
  aria-roledescription="carousel"
  data-component="ui-carousel"
  use:useKeyboardNavigation={keyboardNavigation}
  use:panning
  on:panstart={onPanStart}
  on:panmove={onPanMove}
  on:panstop={onPanStop}
  on:mouseenter={pause}
  on:mouseleave={resume}
  on:focusin={pause}
  on:focusout={resume}>
  <div class="slides" style:--displace={displace + 'px'} bind:this={slidesContainer} aria-live="off">
    {#each slides as slide, slideIndex (slideIndex)}
      <div
        class="slide"
        class:panning={displace !== 0}
        class:hidden={rotation.includes(slideIndex) === false}
        class:slide-prev={slideIndex === rotation[0]}
        class:slide-current={slideIndex === rotation[1]}
        class:slide-next={slideIndex === rotation[2]}
        role="tabpanel"
        aria-roledescription="slide"
        aria-label={`${slideIndex + 1} de ${slides.length}`}
        use:registerSlide={slideIndex}>
        <slot name="slide" {slides} {index} {slide} {slideIndex} />
      </div>
    {/each}
  </div>
  <slot name="controls" {slides} {index} />
</section>

<style lang="postcss">
  :global([data-component='ui-carousel']) {
    position: relative;
    outline: none;
  }

  .slides {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide {
    display: grid;
    position: absolute;
    inset: 0;

    &.panning {
      will-change: transform;
    }

    &:not(.panning) {
      transition-property: transform;
      transition-duration: theme('transitionDuration.700');
      transition-timing-function: theme('transitionTimingFunction.in-out');
    }

    &-prev {
      transform: translateX(calc(-100% + var(--displace, 0px)));
    }

    &-current {
      transform: translateX(calc(0% + var(--displace, 0px)));
      z-index: 2;
    }

    &-next {
      transform: translateX(calc(100% + var(--displace, 0px)));
    }

    &.hidden {
      display: none;
    }
  }
</style>
