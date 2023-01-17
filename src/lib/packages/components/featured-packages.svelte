<script lang="ts">
  import ChevronLeft from '$lib/core/icons/angle-left.svg?component'
  import ChevronRight from '$lib/core/icons/angle-right.svg?component'
  import Blurhash from '$lib/core/components/blurhash.svelte'
  import Carousel from '$lib/core/components/carousel.svelte'
  import type { FeaturedPackage } from '$lib/directus/getFeaturedPackages'

  export let packages: FeaturedPackage[]
</script>

<svelte:head>
  {#if packages.length}
    <link rel="preload" as="image" href={packages[0]?.cover.url} />
    <!-- <link rel="preload" as="image" href="" imagesrcset="" imagesizes="" /> -->
  {/if}
</svelte:head>

<div class="wrapper">
  <Carousel slides={packages}>
    <svelte:fragment slot="slide" let:index let:slide>
      <div class="slide">
        <picture class="slide-background">
          <Blurhash blurhash={slide.cover.blurhash} />
          <img
            loading={index === 0 ? 'eager' : 'lazy'}
            src={slide.cover.url}
            alt={slide.cover.title}
            width={slide.cover.width}
            height={slide.cover.height} />
        </picture>
        <div class="slide-content">
          <div class="text-xl font-bold">{slide.name}</div>
          <div>{@html slide.description}</div>
          <a href={slide.url}>More</a>
        </div>
      </div>
    </svelte:fragment>

    <svelte:fragment slot="controls" let:controller>
      <button type="button" class="control prev" on:click={controller.previous}>
        <div>
          <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span class="sr-only">Previous</span>
        </div>
      </button>

      <button type="button" class="control next" on:click={controller.next}>
        <div>
          <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span class="sr-only">Next</span>
        </div>
      </button>

      <ul class="indicators">
        {#each packages as item, index}
          <li>
            <button
              type="button"
              class="indicator"
              class:selected={index === controller.currentIndex}
              aria-current={index === controller.currentIndex}
              aria-label={item.name}
              on:click={() => controller.set(index)} />
          </li>
        {/each}
      </ul>
    </svelte:fragment>
  </Carousel>
</div>

<style lang="scss">
  .wrapper {
    aspect-ratio: 16/9;
    display: grid;
    max-height: 100vh;
    width: 100%;
  }

  .slide {
    display: block;
    --shadow-color: theme('colors.slate.900 / 60%');

    &-background {
      position: absolute;
      inset: 0;
      display: grid;

      & > img {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        object-fit: cover;
        transition: opacity 250ms ease-in;
      }

      &::after {
        display: block;
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to top, var(--shadow-color), transparent),
          linear-gradient(to right, var(--shadow-color), transparent 20%),
          linear-gradient(to left, var(--shadow-color), transparent 20%);
      }
    }

    &-content {
      position: absolute;
      inset: auto 0 0 0;
      padding: theme('spacing.8') theme('spacing.16');
      background-image: linear-gradient(to top, theme('colors.stone.900'), transparent);
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
    position: absolute;

    &.prev {
      inset: 0 auto 0 0;
    }

    &.next {
      inset: 0 0 0 auto;
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
      transition-property: background-color;
      transition-duration: theme('transitionDuration.150');
      transition-timing-function: theme('transitionTimingFunction.in-out');

      @media (min-width: theme('screens.sm')) {
        padding: theme('spacing.2');
      }
    }
  }

  .indicators {
    display: flex;
    padding-bottom: theme('spacing.3');
    place-self: center;
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    .indicator {
      --color: theme('colors.slate.100 / 30%');
      --outline: none;
      display: grid;
      place-content: center;
      cursor: pointer;
      outline: none;
      padding: theme('spacing.2');

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
        width: theme('spacing.2');
        height: theme('spacing.2');
        border-radius: 100%;
        background-color: var(--color);
        outline: var(--outline);
        outline-offset: 2px;
        transition-property: background-color;
        transition-duration: theme('transitionDuration.150');
        transition-timing-function: theme('transitionTimingFunction.in-out');
      }
    }
  }
</style>
