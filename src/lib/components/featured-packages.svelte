<script lang="ts">
  import FeaturedPackageComponent from './featured-package.svelte'
  import ChevronLeft from '$core/icons/angle-left.svg?component'
  import ChevronRight from '$core/icons/angle-right.svg?component'
  import Carousel from '$core/components/carousel.svelte'
  import { layoutStore } from '$lib/stores/layout.store'
  import { followFocus } from '$lib/actions/follow-focus'

  export let packages: Database.Package[]

  let index = 0
  let carousel: Carousel<Database.Package>
  const marginTop = `${$layoutStore.topbar.height * -1}px`
  const loop = true
  const autoplay = false
</script>

<div class="wrapper layout-fullbleed" style:margin-top={marginTop}>
  <Carousel bind:this={carousel} bind:index slides={packages} {loop} {autoplay}>
    <svelte:fragment slot="slide" let:slideIndex let:slide>
      <FeaturedPackageComponent data={slide} index={slideIndex} />
    </svelte:fragment>

    <svelte:fragment slot="controls">
      <button class="control prev focusable" type="button" on:click={carousel.previous}>
        <div class="control-button">
          <ChevronLeft class="control-icon" aria-hidden="true" />
          <span class="sr-only">Previous</span>
        </div>
      </button>

      <button class="control next focusable" type="button" on:click={carousel.next}>
        <div class="control-button">
          <ChevronRight class="control-icon" aria-hidden="true" />
          <span class="sr-only">Next</span>
        </div>
      </button>

      <ul class="indicators" use:followFocus>
        {#each packages as item, i (item.id)}
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

<style lang="scss">
  .wrapper {
    --shadow-color: theme('colors.base/0.5');
    --slide_content_py: min(theme('spacing.16'), 10vh);
    --slide_content_px: theme('spacing.8');
    --slide_title_size: theme('fontSize.xl');
    --slide_title_weight: theme('fontWeight.bold');
    --slide_desc_size: theme('fontSize.base');
    --slide_button_w: theme('spacing.10');
    --slide_button_opacity: 0;
    --slide_button_icon_s: theme('spacing.7');
    --slide_indicators_display: none;

    @media (min-width: theme('screens.sm')) {
      --slide_content_px: theme('spacing.12');
      --slide_button_w: theme('spacing.16');
      --slide_button_icon_s: theme('spacing.10');
    }

    @media (min-width: theme('screens.md')) {
      --slide_content_px: theme('spacing.16');
      --slide_title_size: theme('fontSize.3xl');
      --slide_title_weight: theme('fontWeight.normal');
      --slide_desc_size: theme('fontSize.lg');
    }

    // @media (min-width: theme('screens.lg')) {
    //   --slide_content_px: theme('spacing.36');
    //   --slide_title_size: theme('fontSize.4xl');
    //   --slide_desc_size: theme('fontSize.xl');
    // }

    @media (min-height: theme('spacing.80')) and (pointer: fine) {
      --slide_indicators_display: flex;
    }

    display: grid;
    width: 100%;
    min-height: min(40rem, 75vh);
    max-height: min(40rem, 100vh);
    aspect-ratio: 4/3;
    max-width: theme('screens.2xl');
    margin: 0 auto;

    &:hover,
    &:focus-within {
      --slide_button_opacity: 1;
    }
  }

  .control {
    --background: theme('colors.neutral.200');
    --color: theme('colors.neutral.200-fg');
    --outline: none;
    display: grid;
    place-content: center;
    cursor: pointer;
    outline: none;
    padding: 0;
    width: var(--slide_button_w);
    z-index: 2;
    position: absolute;
    opacity: var(--slide_button_opacity);
    transition: opacity theme('transitionDuration.150') ease-in;

    &.prev {
      inset: 0 auto 0 0;
    }

    &.next {
      inset: 0 0 0 auto;
    }

    &:hover,
    &:active {
      --background: theme('colors.neutral.400');
      --color: theme('colors.neutral.400-fg');
    }

    &:focus-visible {
      --outline: 2px solid theme('colors.neutral.400-fg');
    }

    &-button {
      width: var(--slide_button_icon_s);
      padding: 20%;
      aspect-ratio: 1;
      border-radius: 100%;
      color: var(--color);
      background-color: var(--background);
      outline: var(--outline);
      transition-property: background-color, color;
      transition-duration: theme('transitionDuration.150');
      transition-timing-function: theme('transitionTimingFunction.in-out');

      & > :global(*) {
        width: 100%;
        height: 100%;
      }
    }
  }

  .indicators {
    display: var(--slide_indicators_display);
    align-items: center;
    height: var(--slide_content_py);
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    .indicator {
      --color: theme('colors.neutral.900 / 30%');
      --outline: none;
      display: grid;
      place-content: center;
      cursor: pointer;
      outline: none;
      padding: theme('spacing.2');

      &:focus-visible {
        --outline: 2px solid theme('colors.neutral.900');
      }

      &:hover,
      &:focus {
        --color: theme('colors.neutral.900 / 60%');
      }

      &.selected {
        --color: theme('colors.neutral.900');
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
