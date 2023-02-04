<script lang="ts">
  import { getImageSrc, getImageSrcset } from '$core/services/image-loader'

  export let src: string
  export let alt: string
  export let width: number | null = null
  export let height: number | null = null
  export let fit: 'cover' | 'contain' | null = null
  export let sizes: string | null = null
  export let priority: boolean = false

  const loading = priority ? 'eager' : 'lazy'

  $: if (fit && (width !== null || height !== null)) {
    throw new Error('Remove size attributes when using "fit" mode.')
  } else if (!fit && width === null) {
    throw new Error('Missing attribute "width".')
  } else if (!fit && height === null) {
    throw new Error('Missing attribute "height".')
  }

  $: imageSrc = getImageSrc({ src })
  $: imageSrcset = getImageSrcset({ src })
</script>

<!-- <svelte:head>
  {#if priority && !browser}
    <link rel="preload" as="image" href={imageSrc} imagesrcset={srcset} imagesizes={sizes} />
  {/if}
</svelte:head> -->

<img {loading} src={imageSrc} srcset={imageSrcset} {alt} {width} {height} {sizes} data-fit={fit} {...$$restProps} />

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
