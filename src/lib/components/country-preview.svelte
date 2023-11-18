<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'

  export let data: Api.CountryPreview

  $: imageSrc = getResourceHref(data.cover.id, { w: 256, h: 384, name: data.cover.title })
</script>

<li>
  <div class="image">
    <Image src={imageSrc} alt={data.cover.title} width={256} height={384} color={data.cover.color}>
      <Blurhash class="object-cover w-full h-full" hash={data.cover.blurhash} width={256} height={384} />
    </Image>
  </div>
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
    transition: box-shadow 150ms ease-in;
    transition-duration: 150ms, 250ms;
    transition-property: outline-color, outline-offset;
    contain: content;
    outline: 2px solid transparent;
    outline-offset: -8px;
    box-shadow: theme('elevation.low');
    border-radius: theme('borderRadius.DEFAULT');
    aspect-ratio: 2/3;
    width: 50vw;
    max-width: theme('spacing.64');
    max-height: calc(100vh - var(--layout-topbar-height));
    user-select: none;

    &:is(:hover) {
      .image {
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
    position: absolute;
    flex-direction: column;
    justify-content: flex-end;
    transition: color 150ms ease-in-out;
    inset: 0;
    padding: 1rem;
    color: var(--color);
  }

  a {
    outline: none;

    &::after {
      position: absolute;
      z-index: 1;
      inset: 0;
      content: '';
    }
  }

  span + span::before {
    content: '・';
  }

  .image {
    position: absolute;
    transform: scale(1) translate3d(0, 0, 0);
    z-index: -1;
    transition: transform 250ms ease-in-out;
    inset: 0;

    &::after {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at left bottom, theme('colors.canvas.bg / 60%'), 30%, transparent 50%),
        linear-gradient(0deg, theme('colors.canvas.bg / 60%'), transparent 12rem),
        linear-gradient(0deg, theme('colors.canvas.bg / 60%'), transparent 6rem);
      pointer-events: none;
      content: '';
    }
  }
</style>
