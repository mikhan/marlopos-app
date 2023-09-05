<script lang="ts" generics="T">
  import { getFocusableElements } from '$core/utils/focus'

  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { quadOut } from 'svelte/easing'
  import { panning, type PanEvent } from '$core/actions/pan'
  import { useKeyboardNavigation, type KeyboardNavigation } from '../actions/keyboard-navigation'
  import { IndexManagerStore } from '../stores/index-manager-store'
  import { IntervalPlayer } from '../types/interval-player'
  import { documentVisibilityState } from '../stores/document-visibility-state'

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
    width = (event.target as HTMLElement).clientWidth
  }

  function onPanMove(event: PanEvent) {
    const threshold = width / 3
    const deltaX = event.detail.deltaX
    const progress = Math.min(1, Math.abs(deltaX) / threshold)
    displace = Math.round(quadOut(progress) * threshold * Math.sign(deltaX))

    if (progress < 1) return
    if (event.detail.directionX === 'left') next()
    if (event.detail.directionX === 'right') previous()

    event.preventDefault()
    displace = 0
  }

  function onPanStop() {
    displace = 0
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
  class="carousel"
  role="listbox"
  tabindex="-1"
  use:useKeyboardNavigation={keyboardNavigation}
  use:panning
  on:panstart={onPanStart}
  on:panmove={onPanMove}
  on:panstop={onPanStop}
  on:mouseenter={pause}
  on:mouseleave={resume}
  on:focusin={() => (intervalPlayer.enabled = false)}
  on:focusout={() => (intervalPlayer.enabled = true)}>
  <ul class="slides" aria-live="polite" style:--displace={displace + 'px'} bind:this={slidesContainer}>
    {#each slides as slide, slideIndex (slideIndex)}
      <li
        class="slide"
        class:panning={displace !== 0}
        class:slide-prev={slideIndex === rotation[0]}
        class:slide-current={slideIndex === rotation[1]}
        class:slide-next={slideIndex === rotation[2]}
        aria-roledescription="slide"
        aria-hidden={rotation.includes(slideIndex) === false}
        use:registerSlide={slideIndex}>
        <slot name="slide" {slides} {index} {slide} {slideIndex} />
      </li>
    {/each}
  </ul>
  <slot name="controls" {slides} {index} />
</section>

<style lang="postcss">
  .carousel {
    display: inline-block;
    contain: layout size;
    container: carousel / size;
    outline: none;
    contain-intrinsic-size: auto 30rem auto 15rem;
    min-width: 0;
    min-height: 0;
  }

  .slides {
    position: absolute;
    inset: 0;
    overflow: clip;
    touch-action: none;
  }

  .slide {
    contain: strict;
    isolation: isolate;
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

    &[aria-hidden='true'] {
      display: none;
    }
  }
</style>
