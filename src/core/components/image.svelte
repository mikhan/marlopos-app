<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { sortNumberArray } from '$core/utils/array'
  import { coerceToNumber } from '$core/utils/coerce'
  import { getImageSize } from '$core/utils/image'
  import { isAbsoluteURL } from '$core/utils/predicate'

  type Srcset = Record<string, unknown> & { w: number; h?: number }

  export let src: string
  export let alt: string
  export let width: number
  export let height: number
  export let srcset: Srcset[] = []
  export let sizes: string | null = null
  export let priority = false
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

  function getImageSizeFromURL(url: URL) {
    return getImageSize(url.searchParams.get('w'), url.searchParams.get('h'), url.searchParams.get('ar'))
  }

  function getImageSrcset(src: string, srcset: ReadonlyArray<Srcset>): string | null {
    if (!srcset.length) return null

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
      result.set(width, src)
    }

    return (
      Array.from(result)
        .map(([width, src]) => `${src} ${width}w`)
        .join(', ') || null
    )
  }

  $: _srcset = getImageSrcset(src, srcset)
  $: _sizes = _srcset && sizes
  $: showCover = $$slots.default
</script>

<svelte:head>
  {#if priority}
    <link rel="preload" as="image" href={src} imagesrcset={_srcset} imagesizes={sizes} />
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
    srcset={_srcset}
    sizes={_sizes}
    decoding="async"
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
