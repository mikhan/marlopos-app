<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import Carousel from '$core/components/carousel/carousel.svelte'
  import { followFocus } from '$lib/actions/follow-focus'
  import type { Api } from '$lib/api'
  import BannerSlide from './banner-slide.svelte'

  export let slides: Api.Banner[]

  let index = 0
  let carousel: Carousel<Api.Banner>

  function previous() {
    carousel.stop()
    carousel.previous()
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

<article>
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
    position: relative;
    outline: var(--debug) solid #0ff9;
    outline-offset: calc(var(--debug) * -1);
    height: 864px;
    max-height: 100svh;

    &:hover,
    &:focus-within {
      --slide-control-icon-opacity: 1;
    }
  }

  .control {
    display: none;
    position: absolute;
    place-content: center;
    z-index: 2;
    cursor: pointer;
    outline: none;
    outline: var(--debug) dashed #00f9;
    outline-offset: calc(var(--debug) * -1);
    padding: 0;
    width: var(--slide-control-size);

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
    opacity: var(--slide-control-icon-opacity);
    transition-duration: theme('transitionDuration.150');
    transition-property: opacity, background-color, color;
    transition-timing-function: theme('transitionTimingFunction.in-out');
    outline: var(--slide-control-icon-outline);
    border-radius: 100%;
    background-color: var(--slide-control-icon-background);
    aspect-ratio: 1;
    width: var(--slide-control-icon-size);
    color: var(--slide-control-icon-color);
  }

  .indicators {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%);
    z-index: 2;
    outline: var(--debug) solid #0f09;
    outline-offset: calc(var(--debug) * -1);
    padding-inline: var(--layout-padding);
    padding-block: theme('spacing.2');
    height: theme('spacing.12');

    @media (pointer: coarse) {
      justify-content: stretch;
      align-items: flex-end;
      width: 100%;
      max-width: calc(theme('screens.lg') + calc(var(--layout-padding) * 2));
      pointer-events: none;
    }
  }

  .indicator {
    display: grid;
    flex-grow: 1;
    justify-content: stretch;
    align-items: center;
    opacity: 0.5;
    transition:
      min-width 250ms ease-in-out,
      opacity 250ms ease-in-out;
    cursor: pointer;
    outline: none;
    padding: theme('spacing.1');
    min-width: theme('spacing.3');
    min-height: theme('spacing.3');

    @media (pointer: fine) {
      padding: theme('spacing.2');
      min-width: theme('spacing.6');
      min-height: theme('spacing.6');

      &[aria-selected='true'] {
        min-width: theme('spacing.12');
      }
    }

    &:focus-visible::before {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }

    &:hover,
    &[aria-selected='true'] {
      opacity: 1;
    }

    &::before {
      display: block;
      transition-duration: 150ms, 250ms;
      transition-property: outline-color, outline-offset;
      transition-timing-function: ease-in;
      outline: 2px solid transparent;
      outline-offset: 8px;
      border-radius: theme('spacing[1.5]');
      background-color: theme('colors.surface-2.fg');
      width: 100%;
      height: 100%;
      content: '';
    }
  }
</style>
