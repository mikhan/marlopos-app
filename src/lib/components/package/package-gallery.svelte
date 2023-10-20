<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import IconButton from '$core/components/icon-button.svelte'
  import Image from '$core/components/image.svelte'
  import UiScroller from '$core/components/scroller/ui-scroller.svelte'
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'

  export let data: Api.Package
  let uiScroller: UiScroller
  let showPrevious = false
  let showNext = false

  function onScroll() {
    const container = uiScroller.getContainer()
    showPrevious = container.scrollLeft > 0
    showNext = container.scrollWidth - container.scrollLeft - container.clientWidth > 0
  }

  onMount(() => {
    onScroll()
  })
</script>

<div class="py-16 gap-y-8 bg-primary-800 layout-container">
  <div class="px-4 layout-lg">
    <SectionHeader id="destinations-list-header">Galería</SectionHeader>
  </div>
  <div class="_scroller">
    <IconButton
      class="_button-previous"
      type="button"
      disabled={!showPrevious}
      on:click={uiScroller.previous}
      icon={faChevronLeft}
      title="Anterior" />
    <UiScroller bind:this={uiScroller} on:scroll={onScroll}>
      {#each data.gallery as image}
        <Image src={`${image.id}?w=256&h=144`} alt="" width={256} height={144} />
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
</div>

<style lang="postcss">
  ._scroller {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    min-width: 0;

    & > :global([data-component='ui-scroller']) {
      grid-auto-columns: theme('spacing.64');
      gap: 1rem;
      padding-inline: var(--layout-padding);
    }

    & > :global([data-component='ui-icon-button']) {
      background-color: theme('colors.surface-2.bg');
      color: theme('colors.surface-2.fg');
      box-shadow: theme('elevation.low');
      position: absolute;
      z-index: 1;

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
