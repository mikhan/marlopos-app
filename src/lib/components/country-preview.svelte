<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'

  export let data: Api.CountryPreview

  $: imageSrc = `/api/assets/${data.cover.id}?w=320&h=320`
</script>

<li class="wrapper">
  <picture class="cover">
    <Image
      class="w-full h-full"
      src={imageSrc}
      alt={data.cover.title}
      width={data.cover.width}
      height={data.cover.height}
      color={data.cover.color}
      fit="cover">
      <Blurhash
        class="object-cover w-full h-full"
        hash={data.cover.blurhash}
        width={data.cover.width}
        height={data.cover.height} />
    </Image>
  </picture>
  <div class="content">
    <a class="text-2xl font-display" href="/">{data.name}</a>
    <div class="text-sm truncate opacity-75">
      <span class="whitespace-nowrap">{data.packages} paquetes</span><span class="whitespace-nowrap"
        >{data.destinations} destinos</span>
    </div>
  </div>
</li>

<style lang="postcss">
  .wrapper {
    --is-hover: 0;
    --color: theme('colors.surface-1.fg');
    display: grid;
    position: relative;
    outline: 1px solid transparent;
    contain: content;
    border-radius: theme('borderRadius.DEFAULT');
    transition: box-shadow 150ms ease-in;
    border: 1px solid theme('colors.surface-1.border');
    outline: 2px solid transparent;
    outline-offset: 8px;
    transition-property: outline-color, outline-offset;
    transition-duration: 150ms, 250ms;

    &:first-child::before {
      content: '';
      display: block;
      width: 100%;
      aspect-ratio: 2/1;

      @media (min-width: theme('screens.sm')) {
        aspect-ratio: 1/1;
      }
    }

    &:is(:hover) {
      --is-hover: 1;
      --color: theme('colors.surface-primary.fg');
      border: 1px solid theme('colors.surface-primary.border');

      .cover {
        transform: scale(1.1);
      }
    }

    &:has(:focus-visible) {
      outline-color: theme('colors.ring');
      outline-offset: 2px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    inset: 0;
    padding: 1rem;
    color: var(--color);
    transition: color 250ms ease-in-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      transition: opacity 250ms ease-in-out;
      z-index: -1;
    }

    &::before {
      opacity: calc(var(--is-hover) + 1);
      background-image: radial-gradient(circle at left bottom, theme('colors.canvas.bg / 50%'), 30%, transparent 50%),
        linear-gradient(0deg, theme('colors.canvas.bg / 50%'), transparent 12rem),
        linear-gradient(0deg, theme('colors.canvas.bg / 50%'), transparent 6rem);
    }

    &::after {
      opacity: var(--is-hover);
      background-image: linear-gradient(
        to top,
        theme('colors.surface-primary.bg / 90%'),
        3rem,
        theme('colors.surface-primary.bg / 50%') 12rem
      );
    }
  }

  a {
    outline: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }

  span + span::before {
    content: '・';
  }

  .cover {
    position: absolute;
    inset: 0;
    z-index: -1;
    isolation: isolate;
    transform: scale(1) translate3d(0, 0, 0);
    transition: transform 250ms ease-in-out;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }
  }
</style>
