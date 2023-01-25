<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { useKeyboardNavigation, type KeyboardNavigation } from '$lib/core/actions/keyboard-navigation'
  import { IndexManagerStore } from '$lib/core/stores/index-manager-store'
  import { IntervalPlayer } from '../types/interval-player'

  type T = $$Generic

  export let slides: T[] = []
  export let index = 0
  export let loop = false
  export let autoplay = false
  export let interval = 0

  export const first = () => indexLoop.first()
  export const last = () => indexLoop.last()
  export const previous = () => indexLoop.previous()
  export const next = () => indexLoop.next()

  export const start = () => intervalPlayer.start()
  export const stop = () => intervalPlayer.stop()
  export const pause = () => intervalPlayer.pause()
  export const resume = () => intervalPlayer.resume()

  const keyboardNavigation: KeyboardNavigation = {
    home: () => first(),
    end: () => last(),
    left: () => previous(),
    right: () => next(),
  }

  $: interval = Number.isFinite(interval) && interval > 0 ? interval : 1000
  $: intervalPlayer = new IntervalPlayer(() => {
    console.log('tick')
    next()
  }, interval)

  function onIndexChange(newIndex: number) {
    index = newIndex

    if (intervalPlayer.state === 'playing') {
      intervalPlayer.restart()
    }
  }

  let indexLoop: IndexManagerStore
  let unsubscribeIndexLoop: () => void
  function createIndexLoop(size: number, loop: boolean) {
    if (unsubscribeIndexLoop) unsubscribeIndexLoop()

    indexLoop = new IndexManagerStore(size, { index, loop })
    unsubscribeIndexLoop = indexLoop.subscribe(onIndexChange)
  }

  $: createIndexLoop(slides.length, loop)

  let rotation: [number, number, number]
  $: rotation = [index === 0 ? indexLoop.size - 1 : index - 1, index, index === indexLoop.size - 1 ? 0 : index + 1]

  onMount(() => {
    if (autoplay) intervalPlayer.start()
  })

  onDestroy(() => {
    if (unsubscribeIndexLoop) unsubscribeIndexLoop()
    intervalPlayer.stop()
  })

  function test(event: FocusEvent & { currentTarget: HTMLElement & EventTarget }) {
    const { target, currentTarget } = event
    console.log({ target, currentTarget }, target && currentTarget.contains(target as Node))
  }
</script>

<section
  class="carousel"
  aria-roledescription="carousel"
  tabindex="-1"
  use:useKeyboardNavigation={keyboardNavigation}
  on:mouseenter={pause}
  on:mouseleave={resume}
  on:focusin={test}
  on:focusout={test}>
  <ul class="slides" aria-live="polite">
    {#each slides as slide, slideIndex (slideIndex)}
      <li
        class="slide"
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
    outline: none;
    contain-intrinsic-size: auto 30rem auto 15rem;
    min-width: 0;
    min-height: 0;
  }

  .slides {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .slide {
    display: grid;
    position: absolute;
    inset: 0;
    transition-property: transform;
    transition-duration: theme('transitionDuration.700');
    transition-timing-function: theme('transitionTimingFunction.in-out');

    &-prev {
      transform: translateX(-100%);
    }

    &-current {
      transform: translateX(0);
      z-index: 2;
    }

    &-next {
      transform: translateX(100%);
    }

    &[aria-hidden='true'] {
      display: none;
    }
  }
</style>
