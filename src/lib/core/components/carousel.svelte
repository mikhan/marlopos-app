<script lang="ts">
  import { useKeyboardNavigation, type KeyboardNavigation } from '$lib/core/actions/keyboard-navigation'
  import { createIndexLoop } from '$lib/core/stores/index-loop'

  type T = $$Generic

  export let slides: T[] = []
  export let initialIndex = 0
  let rotation: [number, number, number]

  $: controller = createIndexLoop(slides.length, { initialIndex, wrap: false })
  $: currentIndex = $controller
  $: rotation = [
    currentIndex === 0 ? controller.size - 1 : currentIndex - 1,
    currentIndex,
    currentIndex === controller.size - 1 ? 0 : currentIndex + 1,
  ]

  const keyboardNavigation: KeyboardNavigation = {
    home: () => controller.first(),
    end: () => controller.last(),
    left: () => controller.previous(),
    right: () => controller.next(),
  }
</script>

<section class="carousel" aria-roledescription="carousel" tabindex="-1" use:useKeyboardNavigation={keyboardNavigation}>
  <ul class="slides" aria-live="polite">
    {#each slides as slide, index (index)}
      <li
        class="slide"
        class:slide-prev={index === rotation[0]}
        class:slide-current={index === rotation[1]}
        class:slide-next={index === rotation[2]}
        inert={index === rotation[1] ? null : true}
        role="group"
        aria-roledescription="slide"
        aria-hidden={rotation.includes(index) === false}>
        <slot name="slide" {slides} {currentIndex} {controller} {slide} {index} />
      </li>
    {/each}
  </ul>
  <slot name="controls" {slides} {currentIndex} {controller} />
</section>

<style lang="scss">
  .carousel {
    display: inline-block;
    contain: layout size;
    outline: none;
    contain-intrinsic-size: auto 30rem auto 15rem;
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
