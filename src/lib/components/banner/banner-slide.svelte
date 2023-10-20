<script lang="ts">
  import { page } from '$app/stores'
  import type { Api } from '$lib/api'
  import { languageStore } from '$lib/stores/language.store'
  import { getLocalizedUrl } from '$lib/utils/language'
  import BannerImage from './banner-image.svelte'

  export let data: Api.Banner
  export let index: number

  const makeRelative = (url: URL) => url.toString().substring(url.origin.length)
  $: href = makeRelative(getLocalizedUrl(new URL(`/packages/${data.id}`, $page.url), $languageStore.code))
</script>

<div class="banner-slide">
  <BannerImage
    id={data.cover.id}
    title={data.cover.title}
    width={data.cover.width}
    height={data.cover.height}
    blurhash={data.cover.blurhash}
    color={data.cover.color}
    priority={index === 0} />
  <div class="_content">
    <div class="_title">{data.name}</div>
    <p class="_description">{data.description}</p>
    <a {href} class="mt-8 button button-primary button-filled" data-sveltekit-preload-data>Más información</a>
  </div>
</div>

<style lang="postcss">
  .banner-slide {
    display: grid;
    align-items: end;
    position: relative;
    isolation: isolate;
    padding-inline: theme('spacing.4');
  }

  ._content {
    color: theme('colors.surface-2.fg');
    padding-inline: var(--slide-control-size);
    padding-bottom: max(10vh, theme('spacing.12'));
    user-select: none;
    z-index: 1;
    text-align: center;

    @media (min-width: theme('screens.sm')) {
      text-align: left;
    }
  }

  ._title {
    font-family: theme('fontFamily.display');
    font-size: theme('fontSize.4xl-fluid[0]');
    line-height: theme('fontSize.4xl-fluid[1]');
    text-wrap: balance;
    max-width: theme('maxWidth.prose');
    text-shadow: 0 0 4px theme('colors.canvas.bg');
    /* text-shadow: 0 0 12px theme('colors.canvas.bg/50%'), 0 0 64px theme('colors.canvas.bg/50%'); */
  }

  ._description {
    font-size: theme('fontSize.xl[0]');
    line-height: theme('fontSize.xl[1]');
    margin-top: theme('spacing.2');
    text-wrap: balance;
    max-width: theme('maxWidth.prose');
    text-shadow: 0 0 4px theme('colors.canvas.bg');
    /* text-shadow: 0 0 3px theme('colors.canvas.bg'), 0 0 6px theme('colors.canvas.bg/75%'),
      0 0 32px theme('colors.canvas.bg/75%'); */
  }
</style>
