<script lang="ts">
  import { getImageSrc, getImageSrcset } from '$core/services/image-loader'

  export let src: string
  export let alt: string
  export let width: number | undefined = undefined
  export let height: number | undefined = undefined
  export let fit: 'cover' | 'contain' | null = null
  export let sizes: string | null = null
  export let priority: boolean = false

  const loading = priority ? 'eager' : 'lazy'

  $: if (fit && (typeof width !== 'undefined' || typeof height !== 'undefined')) {
    throw new Error('Remove size attributes when using "fit" mode.')
  } else if (!fit && typeof width === 'undefined') {
    throw new Error('Missing attribute "width".')
  } else if (!fit && typeof height === 'undefined') {
    throw new Error('Missing attribute "height".')
  }

  $: imageSrc = getImageSrc({ src })
  $: srcset = getImageSrcset({ src })
</script>

<!-- <svelte:head>
  {#if priority && !browser}
    <link rel="preload" as="image" href={imageSrc} imagesrcset={srcset} imagesizes={sizes} />
  {/if}
</svelte:head> -->

<img {loading} src={imageSrc} {alt} {width} {height} {srcset} {sizes} data-fit={fit} {...$$restProps} />

<style>
  img[data-fit] {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0px;
  }

  img[data-fit='cover'] {
    object-fit: cover;
  }

  img[data-fit='contain'] {
    object-fit: contain;
  }
</style>
