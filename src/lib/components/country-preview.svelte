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

  .image {
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
