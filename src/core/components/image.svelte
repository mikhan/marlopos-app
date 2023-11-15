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
  export let width: number | undefined = undefined
  export let height: number | undefined = undefined
  export let srcset: Srcset[] = []
  export let sizes: string | null = null
  export let priority = false
  export let fit: 'contain' | 'cover' | undefined = undefined
  export let color: string | null = null

  $: if (fit) width = height = undefined

  let image: HTMLImageElement
  let className = ''
  export { className as class }

  const dispatch = createEventDispatcher<{
    load: HTMLImageElement
  }>()

  let loaded = false

  function onLoad(image: HTMLImageElement) {
    image.classList.remove('_reveal')
    loaded = true
    dispatch('load', image)
  }

  function getImageSizeFromURL(url: URL) {
    return getImageSize(url.searchParams.get('w'), url.searchParams.get('h'), url.searchParams.get('ar'))
  }

  function getImageSrc(src: string) {
    return isAbsoluteURL(src) ? src : transformURL(src)
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

  $: _src = getImageSrc(src)
  $: _srcset = getImageSrcset(src, srcset)
  $: _sizes = _srcset && sizes
  const showCover = $$slots.default

  onMount(() => {
    const abortController = new AbortController()

    if (image.complete) {
      onLoad(image)
    } else {
      if (showCover) image.classList.add('_reveal')
      image.addEventListener('load', (event) => onLoad(event.target as HTMLImageElement), {
        once: true,
        signal: abortController.signal,
      })
    }

    return function () {
      abortController.abort()
    }
  })
</script>

<figure class={className} style:--color={color}>
  <picture>
    <slot name="source" />
    <img
      bind:this={image}
      data-fit={fit}
      loading={priority ? undefined : 'lazy'}
      src={_src}
      {width}
      {height}
      {alt}
      srcset={_srcset}
      sizes={_sizes}
      decoding="async"
      {...$$restProps} />
  </picture>
  {#if showCover}
    <div class="_overlay">
      <slot {loaded} />
    </div>
  {/if}
</figure>

<style lang="postcss">
  figure {
    position: relative;
    background-color: var(--color);

    &:has([data-fit]) {
      width: 100%;
      height: 100%;
    }
  }

  img {
    opacity: 1;
    transition: opacity 500ms;

    &._reveal {
      transition-duration: 0ms;
      opacity: 0;
    }

    &[data-fit] {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }

    &[data-fit='cover'] {
      object-fit: cover;
    }

    &[data-fit='contain'] {
      object-fit: contain;
    }
  }

  ._overlay {
    contain: strict;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
</style>
