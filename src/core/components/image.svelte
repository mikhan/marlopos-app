<script lang="ts" context="module">
  const origins = new Set()

  function preconnect(href: string): string | undefined {
    if (!href.startsWith('http')) return

    const url = new URL(href)

    if (origins.has(url.origin)) return

    origins.add(url.origin)

    return url.origin
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { transformURL } from '$core/services/resource-provider'
  import { sortNumberArray } from '$core/utils/array'
  import { coerceToNumber } from '$core/utils/coerce'
  import { getImageSize } from '$core/utils/image'
  import { isAbsoluteURL } from '$core/utils/predicate'

  type Srcset = { w: number; h?: number; q?: number }

  export let src: string
  export let alt: string
  export let width: number
  export let height: number
  export let srcset: Srcset[] = []
  export let sizes: string | null = null
  export let priority = false
  export let fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' = 'fill'
  export let color: string | null = null

  let image: HTMLImageElement
  let className = ''
  export { className as class }

  const dispatch = createEventDispatcher<{
    load: HTMLImageElement
  }>()

  const loading = priority ? 'eager' : 'lazy'
  let loaded = false

  function onLoad(image: HTMLImageElement) {
    image.classList.remove('_reveal')
    loaded = true
    dispatch('load', image)
  }

  function getImageSizeFromURL(url: URL) {
    return getImageSize(url.searchParams.get('w'), url.searchParams.get('h'), url.searchParams.get('ar'))
  }

  function getImageSrcset(src: string, srcset: ReadonlyArray<Srcset>): string | null {
    if (!srcset.length || isAbsoluteURL(src)) return null

    const absoluteURL = isAbsoluteURL(src)
    const url = new URL(src, 'http://localhost')
    const result = new Map<number, string>()
    const srcsetWidths = srcset.map(({ w }) => w)
    const srcsetParams = Object.fromEntries(srcset.map(({ w, ...params }) => [w, params]))

    const width = coerceToNumber(url.searchParams.get('w'))
    if (width && !srcsetWidths.includes(width)) srcsetWidths.push(width)

    for (const width of srcsetWidths.sort(sortNumberArray)) {
      const newURL = new URL(url)
      const params = Object.assign(srcsetParams[width] ?? {}, { w: width.toString() })

      for (const [name, value] of Object.entries(params)) {
        newURL.searchParams.set(name, String(value))
      }

      const { aspectRatio } = getImageSizeFromURL(newURL)
      if (aspectRatio) newURL.searchParams.set('h', Math.round(width * aspectRatio).toString())

      let src = newURL.href
      if (!absoluteURL) src = src.replace(newURL.origin, '')
      result.set(width, transformURL(src))
    }

    return (
      Array.from(result)
        .map(([width, src]) => `${src} ${width}w`)
        .join(', ') || null
    )
  }

  $: _src = transformURL(src)
  $: _srcset = getImageSrcset(src, srcset)
  $: _sizes = _srcset && sizes
  $: showCover = $$slots.default
  $: origin = preconnect(_src)

  onMount(() => {
    if (image.complete) {
      onLoad(image)
    } else {
      if (showCover) image.classList.add('_reveal')
      image.addEventListener('load', () => onLoad(image), { once: true })
    }
  })
</script>

<svelte:head>
  {#if origin}
    <link rel="preconnect" href={origin} />
  {/if}
  {#if priority}
    <link rel="preload" as="image" href={_src} imagesrcset={_srcset} imagesizes={sizes} />
  {/if}
</svelte:head>

<div class={'_wrapper ' + className} style:background-color={color}>
  {#if showCover}
    <div class="_overlay">
      <slot {loaded} />
    </div>
  {/if}
  <img
    bind:this={image}
    style:object-fit={fit}
    {loading}
    src={_src}
    {width}
    {height}
    {alt}
    srcset={_srcset}
    sizes={_sizes}
    decoding="async"
    {...$$restProps} />
</div>

<style lang="postcss">
  ._wrapper {
    contain: content;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    opacity: 1;
    transition: opacity 500ms;

    &._reveal {
      transition-duration: 0ms;
      opacity: 0;
    }
  }

  ._overlay {
    contain: strict;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
</style>
