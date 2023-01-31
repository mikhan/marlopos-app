<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import { page } from '$app/stores'
  import { getLocalizedUrl } from '$lib/utils/language'
  import { languageStore } from '$lib/stores/language-store'
  import { getImageSrc, getImageSrcset } from '$core/services/image-loader'
  import type { FeaturedPackage } from 'src/routes/[[lang]]/+page.server'

  export let data: FeaturedPackage
  export let index: number

  const imagePath = data.cover.id + '/' + encodeURI(data.cover.title.replace(/ /g, '-'))
  const imageSrc = getImageSrc({ src: imagePath })
  const imageSrcset = getImageSrcset({ src: imagePath })

  $: href = getLocalizedUrl(new URL(`/packages/${data.slug}`, $page.url), $languageStore.code).toString()
</script>

<svelte:head>
  {#if index === 0}
    <link rel="preload" as="image" href={imageSrc} imagesrcset={imageSrcset} />
  {/if}
</svelte:head>

<picture class="slide-background">
  <Blurhash blurhash={data.cover.blurhash} />
  <img loading={index === 0 ? 'eager' : 'lazy'} decoding="async" src={imageSrc} srcset={imageSrcset} alt="" />
</picture>
<div class="slide-content layout">
  <div>
    <div class="slide-title">{data.name}</div>
    <div class="slide-desc mt-2">{@html data.description.split('.')[0]}</div>
    <a class="button mt-6" {href}>More</a>
  </div>
</div>

<style lang="scss">
  .slide {
    &-background {
      position: absolute;
      inset: 0;
      display: grid;
      background-size: cover;

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
      text-shadow: 0 0 8px black;
      letter-spacing: theme('letterSpacing.wider');
    }

    &-desc {
      font-size: var(--slide_desc_size);
      text-shadow: 0 0 8px black;
    }
  }
</style>
