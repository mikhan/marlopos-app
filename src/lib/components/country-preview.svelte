<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getBlurhashAverageColor } from '$core/utils/image'

  export let data: {
    name: string
    cover: Database.Image
    destinations: number
    packages: number
  }

  $: imageSrc = `/api/assets/${data.cover.id}`
  $: averageColor = getBlurhashAverageColor(data.cover.blurhash)
</script>

<li class="wrapper" style:--average-color={averageColor}>
  <picture class="cover">
    <Blurhash class="w-full h-full" hash={data.cover.blurhash}>
      <Image
        class="w-full h-full object-cover"
        src={imageSrc}
        alt={data.cover.title}
        width={data.cover.width}
        height={data.cover.height}
        sizes="33vw" />
    </Blurhash>
  </picture>
  <div class="content">
    <a class="text-xl font-serif tracking-wider" href="/">{data.name}</a>
    <div class="text-sm opacity-75">
      <span class="whitespace-nowrap">{data.packages} paquetes</span><span class="whitespace-nowrap hidden md:inline"
        >{data.destinations} destinos</span>
    </div>
  </div>
</li>

<style lang="scss">
  .wrapper {
    --is-hover: 0;
    --color: theme('colors.neutral.100');
    --average-color: ;
    display: grid;
    position: relative;
    outline: 1px solid transparent;
    contain: content;
    border-radius: theme('borderRadius.2xl');
    // box-shadow: theme('boxShadow.md');
    transition: box-shadow 150ms ease-in;
    outline: 1px solid theme('colors.neutral.500 / 10%');

    &:first-child::before {
      content: '';
      display: block;
      width: 100%;
      aspect-ratio: 1/1;
    }

    &:is(:hover, :focus-within) {
      --is-hover: 1;
      --color: theme('colors.primary.500-fg');
      // box-shadow: theme('boxShadow.xl');

      .cover {
        transform: scale(1.1);
      }
    }

    &:focus-within {
      outline: 2px solid theme('colors.primary.500');
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
      background-image: linear-gradient(to top, theme('colors.neutral.900 / 50%'), 4rem, transparent 12rem),
        linear-gradient(45deg, theme('colors.neutral.900 / 75%'), 2rem, transparent 12rem);
    }

    &::after {
      opacity: var(--is-hover);
      background-image: linear-gradient(
        to top,
        theme('colors.primary.700 / 90%'),
        3rem,
        theme('colors.primary.700 / 50%') 12rem
      );
    }
  }

  a {
    outline: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
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
      background-image: linear-gradient(to top, var(--average-color) 1rem, 5rem, transparent 8rem);
    }
  }
</style>
