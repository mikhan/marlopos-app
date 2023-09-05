<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { isAbsoluteURL } from '$core/utils/url'

  export let src: string
  export let alt: string
  export let width: number
  export let height: number
  export let sizes: string | null = null
  export let priority: boolean = false
  export let breakpoints: number[] = []
  export let fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' = 'fill'
  export let color: string | null = null

  let className = ''
  export { className as class }

  const dispatch = createEventDispatcher<{
    load: HTMLImageElement
  }>()

  const loading = priority ? 'eager' : 'lazy'
  let loaded = false

  function onLoad(event: Event) {
    loaded = true
    dispatch('load', event.currentTarget as HTMLImageElement)
  }

  function getAspectRatio(w: string | null, h: string | null) {
    const width = Number.parseInt(w ?? '')
    const height = Number.parseInt(h ?? '')

    if (!Number.isFinite(width)) return {}
    else if (Number.isFinite(height)) return { width, height, aspectRatio: height / width }
    else return { width }
  }

  function rewriteURL(url: URL, width: number, aspectRatio?: number) {
    const resizedURL = new URL(url)
    resizedURL.searchParams.set('w', width.toString())

    if (aspectRatio) resizedURL.searchParams.set('h', Math.round(width * aspectRatio).toString())

    return `${resizedURL.href.replace('http://localhost', '')} ${width}w`
  }

  const sortNumbers = (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0)

  function getImageSrcset(src: string, breakpoints: ReadonlyArray<number>): string | null {
    if (!breakpoints.length) return null
    if (isAbsoluteURL(src)) return null

    const srcset: Set<string> = new Set()
    const widths = new Set(breakpoints)
    const url = new URL(src, 'http://localhost')
    const { width, aspectRatio } = getAspectRatio(url.searchParams.get('w'), url.searchParams.get('h'))

    if (width) widths.add(width)

    for (const width of [...widths].sort(sortNumbers)) {
      srcset.add(rewriteURL(url, width, aspectRatio))
    }

    return Array.from(srcset).join(', ') || null
  }

  $: srcset = getImageSrcset(src, breakpoints)
  $: showCover = $$slots.default
</script>

<svelte:head>
  {#if priority}
    <link rel="preload" as="image" href={src} imagesrcset={srcset} imagesizes={sizes} />
  {/if}
</svelte:head>

<div class={'_wrapper ' + className} style:background-color={color}>
  {#if showCover}
    <div class="_overlay">
      <slot {loaded} />
    </div>
  {/if}
  <img
    class="_image"
    style:object-fit={fit}
    style:opacity={showCover && !loaded ? 0 : 1}
    {loading}
    {src}
    {width}
    {height}
    {alt}
    {srcset}
    sizes={srcset && sizes}
    {...$$restProps}
    on:load={onLoad} />
</div>

<style lang="postcss">
  ._wrapper {
    contain: content;
    position: relative;
  }

  ._image {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    opacity: 0;
    transition: opacity 500ms;
  }

  ._overlay {
    contain: strict;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
</style>
