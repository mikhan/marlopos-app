<script lang="ts">
  import { page } from '$app/stores'
  import { languageStore } from '$lib/stores/language.store'
  import { getLocalizedUrl } from '$lib/utils/language'
  import BannerImage from './banner-image.svelte'

  export let data: Api.Banner
  export let index: number

  const makeRelative = (url: URL) => url.toString().substring(url.origin.length)
  $: href = makeRelative(getLocalizedUrl(new URL(`/packages/${data.id}`, $page.url), $languageStore.code))
</script>

<div class="_wrapper">
  <BannerImage
    id={data.cover.id}
    title={data.cover.title}
    width={data.cover.width}
    height={data.cover.height}
    blurhash={data.cover.blurhash}
    color={data.cover.color}
    priority={index === 0} />
  <div class="_content">
    <div class="_text">
      <div class="_title">{data.name}</div>
      <p class="_description">{@html data.description}</p>
      <a {href} class="mt-8 button button-primary button-filled" data-sveltekit-preload-data>Más información</a>
    </div>
  </div>
</div>

<style lang="postcss">
  ._wrapper {
    position: absolute;
    inset: 0;
  }

  ._content {
    display: grid;
    height: 100%;
    padding-inline: var(--slide-control-size);
    padding-bottom: theme('spacing.24');
    user-select: none;
    outline: var(--debug) solid #ff09;
    outline-offset: calc(var(--debug) * -1);

    @container carousel (width > theme('screens.lg')) {
      width: 100%;
      min-width: theme('screens.sm');
    }
  }

  ._text {
    width: 100%;
    max-width: theme('screens.md');
    margin: auto auto 0 0;
    color: hsl(0 0% 100% / 75%);
    outline: var(--debug) solid #f009;
    outline-offset: calc(var(--debug) * -1);
  }

  ._title {
    font-family: theme('fontFamily.display');
    font-size: theme('fontSize.4xl-fluid[0]');
    line-height: theme('fontSize.4xl-fluid[1]');
    text-shadow: 0 0 12px theme('colors.canvas.bg/50%'), 0 0 64px theme('colors.canvas.bg/50%');
    text-wrap: balance;
  }

  ._description {
    font-size: theme('fontSize.xl[0]');
    line-height: theme('fontSize.xl[1]');
    margin-top: theme('spacing.2');
    text-shadow: 0 0 12px theme('colors.canvas.bg/50%'), 0 0 64px theme('colors.canvas.bg/50%');
    text-wrap: balance;
  }
</style>
