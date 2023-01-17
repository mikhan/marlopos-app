<script lang="ts">
  import type { FeaturedPackage } from '$lib/interfaces/featured-package'
  import { mod } from '$lib/utils/math'
  import ChevronLeft from '$lib/icons/angle-left.svg?component'
  import ChevronRight from '$lib/icons/angle-right.svg?component'
  import { decodeBlurHash } from 'fast-blurhash'

  let items: FeaturedPackage[] = []
  let currentIndex = 0
  let rotation: [number, number, number]

  $: rotation = [
    currentIndex === 0 ? items.length - 1 : currentIndex - 1,
    currentIndex,
    currentIndex === items.length - 1 ? 0 : currentIndex + 1,
  ]

  const prev = () => (currentIndex = mod(currentIndex - 1, items.length))
  const next = () => (currentIndex = mod(currentIndex + 1, items.length))
  const goTo = (index: number) => (currentIndex = index)

  function blurhash(canvas: HTMLCanvasElement, blurhash: string) {
    const pixels = decodeBlurHash(blurhash, 32, 32)
    const imageData = new ImageData(pixels, 32, 32)
    canvas.getContext('2d')!.putImageData(imageData, 0, 0)

    return {}
  }

  function fadeIn(image: HTMLImageElement) {
    if (image.complete) return

    image.style.setProperty('opacity', '0')
    image.style.setProperty('transition', 'opacity 1s ease-in')
    image.addEventListener('load', () => image.style.removeProperty('opacity'))
  }

  function handleKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        prev()
        break
      case 'ArrowRight':
        next()
        break
    }
  }

  export { items, currentIndex }
</script>

<section
  class="wrapper"
  aria-roledescription="carousel"
  tabindex="-1"
  on:keyup|preventDefault={(event) => handleKeyup(event)}>
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
        <picture class="slide-background">
          <canvas use:blurhash={item.cover.blurhash} width="32" height="32" />
          <img
            src={item.cover.url}
            alt={item.cover.title}
            width={item.cover.width}
            height={item.cover.height}
            loading="lazy"
            use:fadeIn />
        </picture>
        <div class="slide-content">
          <div class="text-xl font-bold">{item.name}</div>
          <div>{@html item.description}</div>
          <a href={item.url}>More</a>
        </div>
      </li>
    {/each}
  </ul>

  <button type="button" class="control prev" on:click={prev}>
    <div>
      <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      <span class="sr-only">Previous</span>
    </div>
  </button>
  <button type="button" class="control next" on:click={next}>
    <div>
      <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      <span class="sr-only">Next</span>
    </div>
  </button>

  <ul class="indicators">
    {#each items as item, index}
      <li>
        <button
          type="button"
          class="indicator"
          class:selected={index === currentIndex}
          aria-current={index === currentIndex}
          aria-label={item.name}
          on:click={() => goTo(index)} />
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .wrapper {
    --shadow-color: theme('colors.slate.900 / 60%');
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    background-color: theme('colors.slate.600');
    isolation: isolate;
    aspect-ratio: 16 / 9;
    max-height: 100vh;
    outline: none;
  }

  .slides {
    grid-area: 1 / 1 / 3 / 4;
    position: relative;
    overflow: hidden;
    z-index: -1;
    background: black;
  }

  .slide {
    display: block;
    position: absolute;
    inset: 0;
    transition-duration: theme('transitionDuration.700');
    transition-timing-function: theme('transitionTimingFunction.in-out');

    &::after {
    }

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

    & > .slide-background {
      position: absolute;
      inset: 0;

      &::after {
        display: block;
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to top, var(--shadow-color), transparent),
          linear-gradient(to right, var(--shadow-color), transparent 20%),
          linear-gradient(to left, var(--shadow-color), transparent 20%);
      }

      & > * {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      & > img {
        object-fit: cover;
        min-width: 0;
        min-height: 0;
      }
    }

    & > .slide-content {
      position: absolute;
      inset: 0;
      padding: theme('spacing.8') theme('spacing.16');
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  .control {
    --background: theme('colors.slate.700 / 50%');
    --outline: none;
    display: grid;
    place-content: center;
    cursor: pointer;
    outline: none;
    padding: theme('spacing.4');
    z-index: 2;

    &.prev {
      grid-area: 1 / 1 / 3 / 2;
    }

    &.next {
      grid-area: 1 / 3 / 3 / 4;
    }

    &:hover,
    &:focus {
      --background: theme('colors.slate.700 / 90%');
    }

    &:focus-visible {
      --outline: 2px solid theme('colors.slate.100');
    }

    & > div {
      padding: theme('spacing.1');
      border-radius: 100%;
      color: theme('colors.slate.100');
      background-color: var(--background);
      outline: var(--outline);

      @media (min-width: theme('screens.sm')) {
        padding: theme('spacing.2');
      }
    }
  }

  .indicators {
    grid-area: 2 / 1 / 3 / 4;
    display: flex;
    padding-bottom: theme('spacing.3');
    place-self: center;
    z-index: 2;

    .indicator {
      display: grid;
      place-content: center;
      cursor: pointer;
      outline: none;
      padding: theme('spacing.2');
      --color: theme('colors.slate.100 / 30%');
      --outline: none;

      &:focus-visible {
        --outline: 2px solid theme('colors.slate.100');
      }

      &:hover,
      &:focus {
        --color: theme('colors.slate.100 / 60%');
      }

      &.selected {
        --color: theme('colors.slate.100');
      }

      &::before {
        display: block;
        content: '';
        width: theme('spacing.3');
        height: theme('spacing.3');
        border-radius: 100%;
        background-color: var(--color);
        outline: var(--outline);
        outline-offset: 2px;
      }
    }
  }
</style>
