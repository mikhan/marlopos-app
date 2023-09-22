<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import Carousel from '$core/components/carousel.svelte'
  import { followFocus } from '$lib/actions/follow-focus'
  import BannerSlide from './banner-slide.svelte'

  export let slides: Api.Banner[]

  let index = 0
  let carousel: Carousel<Api.Banner>
  const loop = true
  const autoplay = false
</script>

<div class="wrapper">
  <Carousel bind:this={carousel} bind:index {slides} {loop} {autoplay}>
    <svelte:fragment slot="slide" let:slideIndex let:slide>
      <BannerSlide data={slide} index={slideIndex} />
    </svelte:fragment>

    <svelte:fragment slot="controls">
      <button class="control prev" type="button" tabindex="-1" on:click={carousel.previous}>
        <div class="control-icon">
          <Fa size="lg" icon={faChevronLeft} />
          <span class="sr-only">Previous</span>
        </div>
      </button>

      <button class="control next" type="button" tabindex="-1" on:click={carousel.next}>
        <div class="control-icon">
          <Fa size="lg" icon={faChevronRight} />
          <span class="sr-only">Next</span>
        </div>
      </button>

      <ul class="indicators" use:followFocus>
        {#each slides as item, i (item.id)}
          <li>
            <button
              type="button"
              class="indicator"
              tabindex={i === index ? 0 : -1}
              class:selected={i === index}
              aria-current={i === index}
              aria-label={item.name}
              on:click={() => (index = i)} />
          </li>
        {/each}
      </ul>
    </svelte:fragment>
  </Carousel>
</div>

<style lang="postcss">
  .wrapper {
    --debug: 0px;
    --slide-indicators-size: theme('spacing.6');
    --slide-control-visibility: hidden;
    --slide-control-size: var(--layout-padding);
    --slide-control-icon-opacity: 0;
    --slide-control-icon-size: theme('spacing.7');
    --slide-control-icon-background: theme('colors.canvas.bg');
    --slide-control-icon-color: theme('colors.canvas.fg');
    --slide-control-icon-outline: none;

    @media (min-width: theme('screens.md')) {
      --slide-control-visibility: visible;
      --slide-control-size: theme('spacing.16');
      --slide-control-icon-size: theme('spacing.10');
    }

    @media (min-width: theme('screens.lg')) {
      --slide-control-size: max(theme('spacing.16'), calc((calc(100% - theme('screens.lg')) / 2)));
      --slide-control-icon-size: theme('spacing.12');
    }

    @media (pointer: coarse) {
      /* --slide-indicators-size: theme('spacing.12'); */
      --slide-control-visibility: hidden;
      --slide-control-size: max(var(--layout-padding), calc((calc(100% - theme('screens.lg')) / 2)));
      .indicators {
        pointer-events: none;
      }
    }

    display: grid;
    width: 100%;
    max-width: theme('screens.2xl');
    min-height: min(40rem, 75vh);
    max-height: min(40rem, 100vh);
    aspect-ratio: 4/3;
    margin: 0 auto;
    outline: var(--debug) solid #0ff9;
    outline-offset: calc(var(--debug) * -1);

    &:hover,
    &:focus-within {
      --slide-control-icon-opacity: 1;
    }
  }

  .control {
    display: grid;
    visibility: var(--slide-control-visibility);
    place-content: center;
    cursor: pointer;
    outline: none;
    padding: 0;
    width: var(--slide-control-size);
    z-index: 2;
    position: absolute;
    outline: var(--debug) dashed #00f9;
    outline-offset: calc(var(--debug) * -1);

    &.prev {
      inset: 0 auto 0 0;
    }

    &.next {
      inset: 0 0 0 auto;
    }

    &:hover,
    &:active {
      --slide-control-icon-background: theme('colors.canvas.fg');
      --slide-control-icon-color: theme('colors.canvas.bg');
    }

    &:focus-visible {
      --slide-control-icon-outline: 2px solid theme('colors.ring');
    }
  }

  .control-icon {
    display: grid;
    place-content: center;
    width: var(--slide-control-icon-size);
    aspect-ratio: 1;
    border-radius: 100%;
    color: var(--slide-control-icon-color);
    background-color: var(--slide-control-icon-background);
    outline: var(--slide-control-icon-outline);
    opacity: var(--slide-control-icon-opacity);
    transition-property: opacity, background-color, color;
    transition-duration: theme('transitionDuration.150');
    transition-timing-function: theme('transitionTimingFunction.in-out');

    & > :global(*) {
      width: 100%;
      height: 100%;
    }
  }

  .indicators {
    outline: var(--debug) solid #0f09;
    outline-offset: calc(var(--debug) * -1);
    display: flex;
    align-items: center;
    height: theme('spacing.12');
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .indicator {
    display: grid;
    place-content: center;
    cursor: pointer;
    outline: none;
    width: var(--slide-indicators-size);
    aspect-ratio: 1/1;

    &:hover::before {
      width: theme('spacing[2.5]');
    }

    &.selected::before {
      width: theme('spacing.3');
    }

    &:focus-visible::before {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }

    &::before {
      display: block;
      content: '';
      width: theme('spacing.1');
      aspect-ratio: 1/1;
      border-radius: 100%;
      background-color: theme('colors.surface-2.fg');
      outline: 2px solid transparent;
      outline-offset: 8px;
      transition-property: width, background-color, outline-color, outline-offset;
      transition-duration: 150ms, 150ms, 150ms, 250ms;
      transition-timing-function: theme('transitionTimingFunction.in');
    }
  }
</style>
