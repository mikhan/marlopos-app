<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import Carousel from '$core/components/carousel.svelte'
  import { followFocus } from '$lib/actions/follow-focus'
  import type { Api } from '$lib/api'
  import BannerSlide from './banner-slide.svelte'

  export let slides: Api.Banner[]

  let index = 0
  let carousel: Carousel<Api.Banner>

  function previous() {
    carousel.stop()
    carousel.next()
  }

  function next() {
    carousel.stop()
    carousel.next()
  }

  function goTo(index: number) {
    carousel.stop()
    carousel.goTo(index)
  }
</script>

<article class="h-[54rem] max-h-[100svh]">
  <Carousel bind:this={carousel} bind:index {slides} loop={true} autoplay={false} speed={5000}>
    <svelte:fragment slot="slide" let:slideIndex let:slide>
      <BannerSlide data={slide} index={slideIndex} />
    </svelte:fragment>

    <svelte:fragment slot="controls" let:index>
      <button class="control prev" type="button" tabindex="-1" on:click={previous}>
        <div class="control-icon">
          <Fa size="lg" icon={faChevronLeft} />
          <span class="sr-only">Previous</span>
        </div>
      </button>

      <button class="control next" type="button" tabindex="-1" on:click={next}>
        <div class="control-icon">
          <Fa size="lg" icon={faChevronRight} />
          <span class="sr-only">Next</span>
        </div>
      </button>

      <div class="indicators" use:followFocus role="tablist" aria-label="Slides">
        {#each slides as item, i (item.id)}
          <button
            type="button"
            class="indicator"
            role="tab"
            tabindex={i === index ? 0 : -1}
            aria-selected={i === index}
            aria-label={`Slide ${item.name}`}
            aria-controls=""
            on:click={() => goTo(i)} />
        {/each}
      </div>
    </svelte:fragment>
  </Carousel>
</article>

<style lang="postcss">
  article {
    --debug: 0px;
    --slide-control-size: var(--layout-padding);
    --slide-control-icon-opacity: 0;
    --slide-control-icon-size: theme('spacing.7');
    --slide-control-icon-background: theme('colors.canvas.bg');
    --slide-control-icon-color: theme('colors.canvas.fg');
    --slide-control-icon-outline: none;

    @media (min-width: theme('screens.md')) {
      --slide-control-size: theme('spacing.16');
      --slide-control-icon-size: theme('spacing.10');
    }

    @media (min-width: theme('screens.lg')) {
      --slide-control-size: max(theme('spacing.16'), calc((calc(100% - theme('screens.lg')) / 2)));
      --slide-control-icon-size: theme('spacing.12');
    }

    @media (pointer: coarse) {
      --slide-control-size: max(var(--layout-padding), calc((calc(100% - theme('screens.lg')) / 2)));
    }

    display: grid;
    outline: var(--debug) solid #0ff9;
    outline-offset: calc(var(--debug) * -1);
    position: relative;

    &:hover,
    &:focus-within {
      --slide-control-icon-opacity: 1;
    }
  }

  .control {
    display: none;
    place-content: center;
    cursor: pointer;
    outline: none;
    padding: 0;
    width: var(--slide-control-size);
    z-index: 2;
    position: absolute;
    outline: var(--debug) dashed #00f9;
    outline-offset: calc(var(--debug) * -1);

    @media (min-width: theme('screens.md')) and (pointer: fine) {
      display: grid;
    }

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
      /* width: 100%;
      height: 100%; */
    }
  }

  .indicators {
    outline: var(--debug) solid #0f09;
    outline-offset: calc(var(--debug) * -1);
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: theme('spacing.6');
    align-items: center;
    justify-content: center;
    width: 100%;
    height: theme('spacing.12');
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-inline: var(--layout-padding);
    padding-block: theme('spacing.2');

    @media (pointer: coarse) {
      gap: theme('spacing.1');
      grid-auto-columns: 1fr;
      align-items: flex-end;
      pointer-events: none;
      max-width: calc(theme('screens.lg') + calc(var(--layout-padding) * 2));
    }
  }

  .indicator {
    display: grid;
    place-items: center;
    cursor: pointer;
    outline: none;
    width: 100%;
    height: theme('spacing.1');

    @media (pointer: fine) {
      width: theme('spacing.6');
      height: theme('spacing.6');
    }

    &:hover::before {
      opacity: 1;
    }

    &:focus-visible::before {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }

    &::before {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: theme('spacing[1.5]');
      background-color: theme('colors.surface-2.fg');
      outline: 2px solid transparent;
      outline-offset: 8px;
      transition-property: scale, opacity, outline-color, outline-offset;
      transition-duration: 150ms, 150ms, 150ms, 250ms;
      transition-timing-function: theme('transitionTimingFunction.in');
      opacity: 0.2;

      @media (pointer: fine) {
        width: theme('spacing.3');
        height: theme('spacing.3');
        scale: 0.5;
        opacity: 0.5;
      }
    }

    &[aria-selected='true'] {
      &::before {
        scale: 1;
        opacity: 1;
      }
    }
  }
</style>
