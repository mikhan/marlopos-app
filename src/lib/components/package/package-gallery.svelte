<script lang="ts">
  import { faChevronLeft, faChevronRight, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { dismiss } from '$core/actions/dismiss'
  import { showModal } from '$core/actions/showModal'
  import IconButton from '$core/components/icon-button.svelte'
  import Image from '$core/components/image.svelte'
  import UiScroller from '$core/components/scroller/ui-scroller.svelte'
  import { isAbsoluteURL } from '$core/utils/predicate'
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'
  import Video from '../common/video.svelte'

  type Thumbnail = Api.PackageThumbnail & { src: string }

  export let data: Api.Package
  let uiScroller: UiScroller
  let showPrevious = false
  let showNext = false
  let current: Thumbnail | null = null

  $: thumbnails = data.gallery.map(getThumbnail).filter((e): e is Thumbnail => e !== null)

  function onScroll() {
    const container = uiScroller.getContainer()
    showPrevious = container.scrollLeft > 0
    showNext = container.scrollWidth - container.scrollLeft - container.clientWidth > 0
  }

  function getThumbnail(thumbnail: Api.PackageThumbnail): Thumbnail | null {
    if (thumbnail.type === 'image') {
      return { ...thumbnail, src: `${thumbnail.id}?w=256&h=144` }
    } else if (thumbnail.type === 'video') {
      let videoId: string | null = null

      if (!isAbsoluteURL(thumbnail.id)) {
        videoId = thumbnail.id
      } else {
        const url = new URL(thumbnail.id)

        if (url.host === 'www.youtube.com') {
          videoId = url.searchParams.get('v')
        } else if (url.host === 'youtu.be') {
          videoId = url.pathname.substring(1)
        }
      }

      if (!videoId) return null

      return { ...thumbnail, id: videoId, src: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` }
    } else {
      return null
    }
  }

  onMount(() => {
    onScroll()
  })
</script>

{#if current}
  <dialog
    class="flex items-center justify-center w-full h-full bg-black backdrop:bg-neutral-900/75 backdrop:pointer-events-none"
    use:showModal
    use:dismiss
    on:dismiss={() => (current = null)}>
    {#if current.type === 'video'}
      <Video class="w-full max-w-screen-xl max-h-full aspect-video" id={current.id} autoPlay />
    {:else}
      <Image src={`${current.id}?w=1280`} alt={current.title} fit="contain" />
    {/if}
    <IconButton
      class="absolute top-4 right-4 bg-surface-1-bg text-surface-1-fg"
      on:click={() => (current = null)}
      icon={faTimes}
      title="Cerrar" />
  </dialog>
{/if}

<section class="layout-container">
  <SectionHeader class="px-4 mb-8 layout-lg">Galería</SectionHeader>

  <div class="_scroller">
    <IconButton
      class="_button-previous"
      type="button"
      disabled={!showPrevious}
      on:click={uiScroller.previous}
      icon={faChevronLeft}
      title="Anterior" />
    <UiScroller bind:this={uiScroller} on:scroll={onScroll}>
      {#each thumbnails as thumbnail (thumbnail.id)}
        <button class="_preview" type="button" on:click={() => (current = thumbnail)}>
          <Image src={thumbnail.src} alt={thumbnail.title} fit="cover" />
          {#if thumbnail.type === 'video'}
            <div class="absolute inset-0 grid place-content-center">
              <div class="grid w-16 h-16 bg-black rounded-full place-content-center">
                <Fa icon={faPlay} size="2x" />
              </div>
            </div>
          {/if}
        </button>
      {/each}
    </UiScroller>
    <IconButton
      class="_button-next"
      type="button"
      disabled={!showNext}
      on:click={uiScroller.next}
      icon={faChevronRight}
      title="Siguiente" />
  </div>
</section>

<style lang="postcss">
  ._preview {
    position: relative;
    box-shadow: theme('elevation.low');
    border-radius: theme('borderRadius.DEFAULT');
    width: 256px;
    height: 144px;
    overflow: hidden;
  }

  ._scroller {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-width: 0;

    & > :global([data-component='ui-scroller']) {
      grid-auto-columns: theme('spacing.64');
      gap: 1rem;
      padding-inline-start: calc(
        var(--layout-padding) + var(--layout-col-3xl) + var(--layout-col-2xl) + var(--layout-col-xl)
      );
      padding-inline-end: var(--layout-padding);
    }

    & > :global([data-component='ui-icon-button']) {
      position: absolute;
      z-index: 1;
      box-shadow: theme('elevation.low');
      background-color: theme('colors.surface-2.bg');
      color: theme('colors.surface-2.fg');

      &:not([disabled]):hover {
        background-color: theme('colors.surface-2.hover');
      }

      @media (pointer: coarse) {
        display: none;
      }
    }

    & > :global([data-component='ui-icon-button']._button-previous) {
      left: calc(var(--layout-padding) + theme('spacing.2'));
    }

    & > :global([data-component='ui-icon-button']._button-next) {
      right: calc(var(--layout-padding) + theme('spacing.2'));
    }
  }
</style>
