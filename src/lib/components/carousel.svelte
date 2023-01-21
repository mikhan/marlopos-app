<script lang="ts" context="module">
  export interface CarouselController {
    prev(): void
    next(): void
    goTo(index: number): void
  }
</script>

<script lang="ts">
  import type { FeaturedPackage } from '$lib/interfaces/featured-package'
  import { mod } from '$lib/utils/math'

  let items: FeaturedPackage[] = []
  let currentIndex = 0
  let rotation: [number, number, number]

  const controller: CarouselController = {
    prev() {
      currentIndex = mod(currentIndex - 1, items.length)
    },
    next() {
      currentIndex = mod(currentIndex + 1, items.length)
    },
    goTo(index: number) {
      currentIndex = index
    },
  }

  $: rotation = [
    currentIndex === 0 ? items.length - 1 : currentIndex - 1,
    currentIndex,
    currentIndex === items.length - 1 ? 0 : currentIndex + 1,
  ]

  function handleKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home':
        controller.goTo(0)
        event.preventDefault()
        break
      case 'End':
        controller.goTo(items.length - 1)
        event.preventDefault()
        break
      case 'ArrowLeft':
        controller.prev()
        event.preventDefault()
        break
      case 'ArrowRight':
        controller.next()
        event.preventDefault()
        break
    }
  }

  export { items, currentIndex, controller }
</script>

<section class="wrapper" aria-roledescription="carousel" tabindex="-1" on:keyup={(event) => handleKeyup(event)}>
  <ul class="slides" aria-live="polite">
    {#each items as item, index}
      <li
        class="slide"
        class:prev={index === rotation[0]}
        class:current={index === rotation[1]}
        class:next={index === rotation[2]}
        inert={index === currentIndex ? null : true}
        role="group"
        aria-roledescription="slide"
        aria-hidden={rotation.includes(index) === false}>
        <slot name="slide" {item} {index} />
      </li>
    {/each}
  </ul>
  <slot name="controls" {controller} {currentIndex} />
</section>

<style lang="scss">
  .wrapper {
    display: inline-block;
    contain: strict;
    outline: none;
    contain-intrinsic-size: auto 300px auto 150px;
    content-visibility: auto;
  }

  .slides {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;
  }

  .slide {
    display: grid;
    position: absolute;
    inset: 0;
    transition-property: transform;
    transition-duration: theme('transitionDuration.700');
    transition-timing-function: theme('transitionTimingFunction.in-out');

    &.prev {
      transform: translateX(-100%);
    }

    &.current {
      transform: translateX(0);
      z-index: 2;
    }

    &.next {
      transform: translateX(100%);
    }

    &[aria-hidden='true'] {
      display: none;
    }
  }
</style>
