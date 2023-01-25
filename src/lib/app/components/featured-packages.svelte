<script lang="ts">
  import ChevronLeft from '$lib/core/icons/angle-left.svg?component'
  import ChevronRight from '$lib/core/icons/angle-right.svg?component'
  import Blurhash from '$lib/core/components/blurhash.svelte'
  import Carousel from '$lib/core/components/carousel.svelte'
  import type { FeaturedPackage } from '$lib/directus/getFeaturedPackages'

  export let packages: FeaturedPackage[]

  let index = 0
  let carousel: Carousel<FeaturedPackage>

  function followFocus(element: HTMLElement) {
    const mutationObserver = new MutationObserver((records) => {
      for (const { target } of records) {
        if (target instanceof HTMLElement && target.getAttribute('tabindex') === '0') {
          target.focus()
          break
        }
      }
    })

    const focusIn = (element: HTMLElement) =>
      mutationObserver.observe(element, {
        attributes: true,
        attributeFilter: ['tabindex'],
        subtree: true,
      })

    const focusout = () => mutationObserver.disconnect()

    const abortController = new AbortController()
    const { signal } = abortController
    element.addEventListener('focusin', () => focusIn(element), { signal })
    element.addEventListener('focusout', () => focusout(), { signal })

    return { destroy: () => abortController.abort() }
  }
</script>

<svelte:head>
  {#if packages.length}
    <link rel="preload" as="image" href={packages[0]?.cover.url} />
    <!-- <link rel="preload" as="image" href="" imagesrcset="" imagesizes="" /> -->
  {/if}
</svelte:head>

<div class="wrapper">
  <Carousel bind:this={carousel} slides={packages} loop={true} bind:index autoplay={false}>
    <svelte:fragment slot="slide" let:slideIndex let:slide>
      <div class="slide">
        <picture class="slide-background">
          <Blurhash blurhash={slide.cover.blurhash} />
          <img loading={slideIndex === 0 ? 'eager' : 'lazy'} src={slide.cover.url} alt="" />
        </picture>
        <div class="slide-content">
          <div class="slide-title">{slide.name}</div>
          <div class="slide-desc">{@html slide.description.split('.')[0]}</div>
          <a class="button" href={slide.url}>More</a>
        </div>
      </div>
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
        {#each packages as item, i}
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
    --shadow-color: var(--app_surface_color);
    --slide_content_py: theme('spacing.6');
    --slide_content_px: theme('spacing.8');
    --slide_title_size: theme('fontSize.xl');
    --slide_title_weight: theme('fontWeight.bold');
    --slide_desc_size: theme('fontSize.base');
    --slide_button_w: theme('spacing.10');
    --slide_button_icon_s: theme('spacing.7');
    --slide_indicators_display: flex;
    --slide_indicators_h: theme('spacing.8');

    @media (min-width: theme('screens.sm')) {
      --slide_content_py: theme('spacing.9');
      --slide_content_px: theme('spacing.12');
      --slide_button_w: theme('spacing.16');
      --slide_button_icon_s: theme('spacing.10');
    }

    @media (min-width: theme('screens.md')) {
      --slide_content_py: theme('spacing.12');
      --slide_content_px: theme('spacing.16');
      --slide_title_size: theme('fontSize.3xl');
      --slide_title_weight: theme('fontWeight.normal');
      --slide_desc_size: theme('fontSize.lg');
      --slide_indicators_h: theme('spacing.12');
    }

    @media (min-width: theme('screens.lg')) {
      --slide_content_py: theme('spacing.20');
      --slide_content_px: theme('spacing.36');
      --slide_title_size: theme('fontSize.4xl');
      --slide_desc_size: theme('fontSize.xl');
      --slide_indicators_h: theme('spacing.20');
    }

    @media (pointer: coarse) and (hover: none) {
      --slide_indicators_display: none;
      --slide_indicators_h: 0px;
    }
    aspect-ratio: 16/9;
    display: grid;
    max-height: min(640px, 100vh);
    width: 100%;
  }

  .slide {
    display: block;

    &-background {
      position: absolute;
      inset: 0;
      display: grid;

      &::after {
        display: block;
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to top, rgb(0 0 0 / 50%), rgb(0 0 0 / 10%)),
          linear-gradient(to right, rgb(0 0 0 / 50%), transparent 20%),
          linear-gradient(to left, rgb(0 0 0 / 50%), transparent 20%);
      }

      & > img {
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        object-fit: cover;
        transition: opacity 250ms ease-in;
      }
    }

    &-content {
      position: absolute;
      inset: auto 0 0 0;
      background-image: linear-gradient(to top, var(--shadow-color), transparent);
      padding: max(var(--slide_content_py), var(--slide_indicators_h))
        max(var(--slide_button_w), var(--slide_content_px));
    }

    &-title {
      font-family: theme('fontFamily.serif');
      font-size: var(--slide_title_size);
      font-weight: var(--slide_title_weight);
    }

    &-desc {
      font-size: var(--slide_desc_size);
      margin: 0.5em 0;
    }
  }

  .control {
    --background: theme('colors.neutral.300 / 50%');
    --outline: none;
    display: grid;
    place-content: center;
    cursor: pointer;
    outline: none;
    padding: 0;
    width: var(--slide_button_w);
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
      --background: theme('colors.neutral.300');
    }

    &:focus-visible {
      --outline: 2px solid theme('focusable.primary.color');
    }

    &-button {
      width: var(--slide_button_icon_s);
      padding: 20%;
      aspect-ratio: 1;
      border-radius: 100%;
      color: theme('colors.neutral.900');
      background-color: var(--background);
      outline: var(--outline);
      // outline-offset: theme('focusable.offset');
      transition-property: background-color;
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
    height: var(--slide_indicators_h);
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
