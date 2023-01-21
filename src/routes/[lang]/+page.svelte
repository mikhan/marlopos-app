<script lang="ts">
  import type { PageData } from './$types'
  import Carousel from '$lib/components/carousel.svelte'
  import ChevronLeft from '$lib/icons/angle-left.svg?component'
  import ChevronRight from '$lib/icons/angle-right.svg?component'
  import Blurhash from '$lib/components/blurhash.svelte'
  import { fadeIn } from '$lib/animations/fade-in'

  export let data: PageData
</script>

<div class="wrapper">
  <Carousel items={data.featuredPackages}>
    <svelte:fragment slot="slide" let:item>
      <div class="slide">
        <picture class="slide-background">
          <Blurhash blurhash={item.cover.blurhash} />
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
      </div>
    </svelte:fragment>

    <svelte:fragment slot="controls" let:controller let:currentIndex>
      <button type="button" class="control prev" on:click={() => controller.prev()}>
        <div>
          <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span class="sr-only">Previous</span>
        </div>
      </button>

      <button type="button" class="control next" on:click={() => controller.next()}>
        <div>
          <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span class="sr-only">Next</span>
        </div>
      </button>

      <ul class="indicators">
        {#each data.featuredPackages as item, index}
          <li>
            <button
              type="button"
              class="indicator"
              class:selected={index === currentIndex}
              aria-current={index === currentIndex}
              aria-label={item.name}
              on:click={() => controller.goTo(index)} />
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
