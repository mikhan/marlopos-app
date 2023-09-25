<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'

  export let data: Api.CountryPreview

  $: imageSrc = getResourceHref(data.cover.id, { width: 320, aspectRatio: '2-3' })
</script>

<li>
  <picture>
    <Image
      class="w-full h-full"
      src={imageSrc}
      alt={data.cover.title}
      width={data.cover.width}
      height={data.cover.height}
      color={data.cover.color}
      srcset={[{ w: 280 }, { w: 320 }, { w: 480 }]}
      sizes="(min-width: 768px) 280px, (min-width: 480px) 320px, 480px"
      fit="cover">
      <Blurhash
        class="object-cover w-full h-full"
        hash={data.cover.blurhash}
        width={data.cover.width}
        height={data.cover.height} />
    </Image>
  </picture>
  <div class="content">
    <a class="sm:text-xl" href="/">{data.name}</a>
    <div class="text-sm truncate opacity-75">
      <span class="whitespace-nowrap">{data.packages} paquetes</span><span class="whitespace-nowrap"
        >{data.destinations} destinos</span>
    </div>
  </div>
</li>

<style lang="postcss">
  li {
    --color: theme('colors.surface-2.fg');
    display: grid;
    position: relative;
    contain: content;
    border-radius: theme('borderRadius.DEFAULT');
    transition: box-shadow 150ms ease-in;
    outline: 2px solid transparent;
    outline-offset: -8px;
    transition-property: outline-color, outline-offset;
    transition-duration: 150ms, 250ms;
    width: 50vw;
    max-width: theme('spacing.64');
    aspect-ratio: 2/3;
    max-height: calc(100vh - var(--layout-topbar-height));
    user-select: none;
    box-shadow: theme('elevation.low');

    &:is(:hover) {
      picture {
        transform: scale(1.1);
      }
    }

    &:has(:focus-visible) {
      outline-color: theme('colors.ring');
      outline-offset: -2px;
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
    transition: color 150ms ease-in-out;
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

  picture {
    position: absolute;
    inset: 0;
    z-index: -1;
    transform: scale(1) translate3d(0, 0, 0);
    transition: transform 250ms ease-in-out;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(circle at left bottom, theme('colors.canvas.bg / 60%'), 30%, transparent 50%),
        linear-gradient(0deg, theme('colors.canvas.bg / 60%'), transparent 12rem),
        linear-gradient(0deg, theme('colors.canvas.bg / 60%'), transparent 6rem);
    }
  }
</style>
