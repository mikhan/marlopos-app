<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { isAbsoluteURL } from '$core/utils/url'

  const dispatch = createEventDispatcher<{
    load: HTMLImageElement
  }>()

  function onLoad(event: Event) {
    dispatch('load', event.currentTarget as HTMLImageElement)
  }

  export let src: string
  export let alt: string
  export let width: number
  export let height: number
  export let sizes: string | null = null
  export let priority: boolean = false
  export let breakpoints: number[] = [640, 960, 1280, 1600, 1920]

  const loading = priority ? 'eager' : 'lazy'

  function getImageSrcset(src: string, breakpoints: number[]): string | null {
    if (isAbsoluteURL(src)) return null

    const srcset: Set<string> = new Set()

    for (const width of breakpoints) {
      const url = new URL(src, 'http://localhost')
      url.searchParams.set('w', width.toString())
      srcset.add(`${url.href.replace('http://localhost', '')} ${width}w`)
    }

    return Array.from(srcset).join(', ') || null
  }

  $: srcset = getImageSrcset(src, breakpoints.sort().reverse())
</script>

<svelte:head>
  {#if priority}
    <link rel="preload" as="image" href={src} imagesrcset={srcset} imagesizes={sizes} />
  {/if}
</svelte:head>

<img {loading} on:load={onLoad} {src} {width} {height} {alt} {srcset} {sizes} {...$$restProps} />
