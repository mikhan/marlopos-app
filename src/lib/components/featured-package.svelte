<script lang="ts">
  import { page } from '$app/stores'
  import { getLocalizedUrl } from '$lib/utils/language'
  import { languageStore } from '$lib/stores/language.store'
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'

  export let data: Database.Package
  export let index: number

  const src = data.cover.id + '/' + encodeURI(data.cover.title.replace(/ /g, '-'))

  $: href = getLocalizedUrl(new URL(`/packages/${data.slug}`, $page.url), $languageStore.code).toString()
</script>

<div class="slide">
  <picture class="image">
    <Blurhash blurhash={data.cover.blurhash} />
    <Image priority={index === 0} {src} sizes="100vw" decoding="async" alt="" fit="cover" />
  </picture>
  <div class="content layout">
    <div>
      <a class="title" {href}>{data.name}</a>
      <div class="description">{@html data.description.split('.')[0]}</div>
    </div>
  </div>
</div>

<style lang="scss">
  .slide {
    position: absolute;
    inset: 0;

    &:hover .title {
      --color-fg: theme('colors.primary.500-fg');
      --color-bg: theme('colors.primary.500');
    }
  }

  .image {
    position: absolute;
    inset: 0;

    &::after {
      display: block;
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to top, rgb(0 0 0 / 50%), rgb(0 0 0 / 10%)),
        linear-gradient(to right, rgb(0 0 0 / 50%), transparent 20%),
        linear-gradient(to left, rgb(0 0 0 / 50%), transparent 20%);
    }

    & > :global(img) {
      transition: opacity 250ms ease-in;
    }
  }

  .content {
    --px: calc(var(--slide_button_w) - var(--layout-padding));
    position: absolute;
    inset: auto 0 0 0;
    padding: 2rem var(--px) var(--slide_content_py) var(--px);
    background-image: linear-gradient(to top, var(--shadow-color), transparent);
    user-select: none;

    .title {
      --color-fg: inherit;
      --color-bg: theme('colors.primary.500 / 0%');
      font-family: theme('fontFamily.serif');
      font-size: var(--slide_title_size);
      font-weight: var(--slide_title_weight);
      // text-shadow: 0 0 8px black;
      letter-spacing: theme('letterSpacing.wider');
      color: var(--color-fg);
      background-color: var(--color-bg);
      transition: background-color theme('transitionDuration.150') ease-in;
      padding: 0.25rem 1rem;
      margin: -0.25rem -1rem;
      border-radius: 4px;

      &:hover {
        text-decoration: underline;
      }
    }

    .description {
      font-size: var(--slide_desc_size);
      text-shadow: 0 0 8px black;
      margin-top: 0.5em;
    }
  }
</style>
