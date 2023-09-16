<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'

  export let id: string
  export let title: string
  export let width: number
  export let height: number
  export let blurhash: string
  export let color: string
  export let priority: boolean

  const src = `/api/assets/seo/${id.replace(/(?=\.[a-z]+$)/, '/' + title.replace(/ /g, '-'))}`
  // + '/' + encodeURI(title.replace(/ /g, '-'))
</script>

<div class="_image" style:--color={color}>
  <picture class="_picture">
    <Image
      class="w-full h-full"
      fit="cover"
      {src}
      alt={title}
      {width}
      {height}
      {color}
      {priority}
      srcset={[
        { w: 480, h: 640, q: 50 },
        { w: 960, h: 640, q: 75 },
        { w: 1280, h: 640, q: 100 },
      ]}>
      <Blurhash class="object-cover w-full h-full animate-pulse" hash={blurhash} {width} {height} renderSize={64} />
    </Image>
  </picture>
</div>

<style lang="postcss">
  ._image {
    position: absolute;
    inset: 0;
    background-color: var(--color);
    z-index: -1;
    padding-left: max(0px, calc(100% - theme('screens.2xl')));

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(0deg, theme('colors.canvas.bg / 50%'), 5%, transparent 15%),
        linear-gradient(0deg, theme('colors.canvas.bg / 75%'), transparent 30%),
        linear-gradient(0deg, theme('colors.canvas.bg / 100%'), transparent 45%),
        radial-gradient(circle farthest-side at left bottom, theme('colors.canvas.bg / 50%') 30%, transparent 75%);
    }

    @container carousel (width > theme('screens.xl')) {
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(45deg, theme('colors.canvas.bg / 50%'), transparent 50%),
          linear-gradient(90deg, theme('colors.canvas.bg'), transparent 50%);
      }
    }
  }

  ._picture {
    display: block;
    width: 100%;
    height: 100%;

    @container carousel (width > theme('screens.xl')) {
      mask: linear-gradient(to right, transparent, black 50%);
    }
  }
</style>
