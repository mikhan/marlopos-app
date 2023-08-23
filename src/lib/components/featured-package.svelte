<script lang="ts">
  import { page } from '$app/stores'
  import { getLocalizedUrl } from '$lib/utils/language'
  import { languageStore } from '$lib/stores/language.store'
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getBlurhashAverageColor } from '$core/utils/image'

  export let data: Database.Package
  export let index: number

  const src = `/api/assets/seo/${data.cover.id.replace(/(?=\.[a-z]+$)/, '/' + data.cover.title.replace(/ /g, '-'))}`
  // + '/' + encodeURI(data.cover.title.replace(/ /g, '-'))
  const makeRelative = (url: URL) => url.toString().substring(url.origin.length)

  let imageLoaded = false
  let imageOpacity = 1

  $: href = makeRelative(getLocalizedUrl(new URL(`/packages/${data.id}`, $page.url), $languageStore.code))
  $: averageColor = getBlurhashAverageColor(data.cover.blurhash)
</script>

<a class="slide" {href} style:--average-color={averageColor} style:--image-opacity={imageOpacity}>
  <picture class="image">
    <Blurhash class="w-full h-full" hash={data.cover.blurhash} on:load={() => (imageOpacity = imageLoaded ? 1 : 0)}>
      <Image
        class="w-full h-full object-cover"
        {src}
        alt={data.cover.title}
        width={data.cover.width}
        height={data.cover.height}
        priority={index === 0}
        on:load={() => (imageLoaded = true)}
        on:load={() => (imageOpacity = 1)} />
    </Blurhash>
  </picture>
  <div class="content">
    <div class="text">
      <div class="title">{data.name}</div>
      <div class="description">{@html data.description.split('.')[0]}</div>
    </div>
  </div>
</a>

<style lang="scss">
  .slide {
    --average-color: var(--app_surface_color);
    --image-opacity: 0;
    position: absolute;
    inset: 0 0 var(--slide_content_py) 0;
  }

  .image {
    position: absolute;
    inset: 0 0 2rem 0;
    background-color: var(--average-color);
    z-index: -1;

    @container carousel (width > theme('screens.lg')) {
      inset: 0 0 0 auto;
      width: theme('screens.lg');
    }

    & > :global(img) {
      opacity: var(--image-opacity);
      transition: opacity 250ms ease-in;
    }
  }

  .content {
    --px: calc(var(--slide_button_w) - var(--layout-padding));
    display: grid;
    height: 100%;
    padding: 0 var(--slide_button_w);
    user-select: none;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to bottom, theme('colors.neutral.100 / 50%'), transparent 30%),
        linear-gradient(to bottom, var(--average-color), transparent 30%);
      z-index: -1;
    }

    @container carousel (width > theme('screens.lg')) {
      width: 100%;
      min-width: theme('screens.sm');
      padding: 0 50% 0 0;

      &::before {
        background-image: radial-gradient(
            circle farthest-side at left center,
            theme('colors.neutral.100 / 50%') 30%,
            transparent 75%
          ),
          linear-gradient(to bottom, theme('colors.neutral.100 / 50%'), transparent 30%),
          linear-gradient(to bottom, var(--average-color), transparent 30%),
          linear-gradient(to right, var(--average-color) calc(100% - theme('screens.lg')), transparent);
      }
    }

    .text {
      padding: var(--layout-padding);
      width: 100%;
      max-width: theme('screens.sm');
      margin: auto auto 0 auto;

      background-color: theme('colors.neutral.50');
      box-shadow: theme('boxShadow.md');
      border-radius: theme('borderRadius.DEFAULT');

      @container carousel (width > 1024px) {
        margin: auto 0 auto auto;
        padding: 2rem var(--slide_button_w);
        background-color: transparent;
        box-shadow: none;
      }
    }

    .title {
      font-family: theme('fontFamily.serif');
      font-size: var(--slide_title_size);
      font-weight: var(--slide_title_weight);
      letter-spacing: theme('letterSpacing.wider');

      &:hover {
        text-decoration: underline;
      }
    }

    .description {
      font-size: var(--slide_desc_size);
      margin-top: 0.5em;
    }
  }
</style>
