<script lang="ts">
  import ChevronLeft from '$core/icons/angle-left.svg?component'
  import ChevronRight from '$core/icons/angle-right.svg?component'
  import Blurhash from '$core/components/blurhash.svelte'
  import Carousel from '$core/components/carousel.svelte'
  import { layoutStore } from '$lib/stores/layout-store'
  import { followFocus } from '$lib/actions/follow-focus'
  import { page } from '$app/stores'
  import { getLocalizedUrl } from '$lib/utils/language'
  import { languageStore } from '$lib/stores/language-store'
  import type { FeaturedPackage } from 'src/routes/[[lang]]/+page.server'

  export let packages: FeaturedPackage[]

  let index = 0
  let carousel: Carousel<FeaturedPackage>
  const url = $page.url
  const language = $languageStore
  $: marginTop = `${$layoutStore.topbar.height * -1}px`

  const getPackageUrl = (slug: string) => getLocalizedUrl(new URL(`/packages/${slug}`, url), language.code)
</script>

<svelte:head>
  {#if packages.length}
    <link rel="preload" as="image" href={packages[0]?.cover.url} />
    <!-- <link rel="preload" as="image" href="" imagesrcset="" imagesizes="" /> -->
  {/if}
</svelte:head>

<div class="wrapper layout-fullbleed" style:margin-top={marginTop}>
  <Carousel bind:this={carousel} slides={packages} loop={true} bind:index autoplay={true}>
    <svelte:fragment slot="slide" let:slideIndex let:slide>
      <div class="slide">
        <picture class="slide-background">
          <Blurhash blurhash={slide.cover.blurhash} />
          <img loading={slideIndex === 0 ? 'eager' : 'lazy'} src={`/assets/${slide.cover.id}?key=cover`} alt="" />
        </picture>
        <div class="slide-content layout">
          <div>
            <div class="slide-title">{slide.name}</div>
            <div class="slide-desc mt-2">{@html slide.description.split('.')[0]}</div>
            <a class="button mt-6" href={getPackageUrl(slide.slug).toString()}>More</a>
          </div>
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
    --shadow-color: theme('colors.base');
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

    @media (min-width: theme('screens.lg')) {
      --slide_content_px: theme('spacing.36');
      --slide_title_size: theme('fontSize.4xl');
      --slide_desc_size: theme('fontSize.xl');
    }

    @media (min-height: theme('spacing.80')) and (pointer: fine) {
      --slide_indicators_display: flex;
    }

    display: grid;
    width: 100%;
    min-height: min(40rem, 75vh);
    max-height: min(40rem, 100vh);
    aspect-ratio: 4/3;

    &:hover,
    &:focus-within {
      --slide_button_opacity: 1;
    }
  }

  .slide {
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
      --px: calc(var(--slide_button_w) - var(--layout-padding));
      position: absolute;
      inset: auto 0 0 0;
      padding: 2rem var(--px) var(--slide_content_py) var(--px);
      background-image: linear-gradient(to top, var(--shadow-color), transparent);
    }

    &-title {
      font-family: theme('fontFamily.serif');
      font-size: var(--slide_title_size);
      font-weight: var(--slide_title_weight);
      letter-spacing: theme('letterSpacing.widest');
    }

    &-desc {
      font-size: var(--slide_desc_size);
    }
  }

  .control {
    --background: theme('colors.neutral.300');
    --color: theme('colors.neutral.300-fg');
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
    &:focus {
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
