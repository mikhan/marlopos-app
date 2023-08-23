<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { panning, type PanEvent } from '$core/actions/pan'
  import { useKeyboardNavigation, type KeyboardNavigation } from '../actions/keyboard-navigation'
  import { IndexManagerStore } from '../stores/index-manager-store'
  import { IntervalPlayer } from '../types/interval-player'
  import { documentVisibilityState } from '../stores/document-visibility-state'

  type T = $$Generic

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

  function onIndexChange(newIndex: number) {
    index = newIndex

    if (intervalPlayer.state === 'playing') {
      intervalPlayer.restart()
    }

    dispatch('change', { index: newIndex })
  }

  let indexLoop: IndexManagerStore
  let unsubscribeIndexLoop: () => void
  function createIndexLoop(size: number, loop: boolean) {
    if (unsubscribeIndexLoop) unsubscribeIndexLoop()

    indexLoop = new IndexManagerStore(size, { index, loop })
    unsubscribeIndexLoop = indexLoop.subscribe(onIndexChange)
  }

  let rotation: [number, number, number]
  $: createIndexLoop(slides.length, loop)
  $: rotation = [index === 0 ? indexLoop.size - 1 : index - 1, index, index === indexLoop.size - 1 ? 0 : index + 1]
  $: $documentVisibilityState === 'visible' ? resume() : pause()

  let displace = 0

  function onPanMove(event: PanEvent) {
    displace = event.detail.deltaX

    if (Math.abs(displace) < 250) return
    if (displace < 0) next()
    if (displace > 0) previous()

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
  on:mouseenter={pause}
  on:mouseleave={resume}
  on:focusin={() => (intervalPlayer.enabled = false)}
  on:focusout={() => (intervalPlayer.enabled = true)}>
  <ul
    class="slides"
    aria-live="polite"
    style:--displace={displace + 'px'}
    use:panning
    on:panmove={onPanMove}
    on:panstop={onPanStop}>
    {#each slides as slide, slideIndex (slideIndex)}
      <li
        class="slide"
        class:panning={displace !== 0}
        class:slide-prev={slideIndex === rotation[0]}
        class:slide-current={slideIndex === rotation[1]}
        class:slide-next={slideIndex === rotation[2]}
        inert={slideIndex === rotation[1] ? null : true}
        aria-roledescription="slide"
        aria-hidden={rotation.includes(slideIndex) === false}>
        <slot name="slide" {slides} {index} {slide} {slideIndex} />
      </li>
    {/each}
  </ul>
  <slot name="controls" {slides} {index} />
</section>

<style lang="scss">
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
    overflow: hidden;
    touch-action: none;
  }

  .slide {
    isolation: isolate;
    position: absolute;
    inset: 0;

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
