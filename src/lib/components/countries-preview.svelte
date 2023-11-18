<script lang="ts">
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import IconButton from '$core/components/icon-button.svelte'
  import UiScroller from '$core/components/scroller/ui-scroller.svelte'
  import type { Api } from '$lib/api'
  import CountryPreview from './country-preview.svelte'

  export let data: Api.CountryPreview[] = []
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

<article class="layout-container">
  <div class="_content">
    <header>
      <h2 class="mb-4 text-2xl-fluid font-display">¡Viaja con nosotros!</h2>
      <p class="text-xl leading-relaxed">
        Conoce todos nuestros destinos y los paquetes especiales que tenemos para ti.
      </p>
    </header>
    <div class="_scroller">
      <IconButton
        class="_button _button-previous"
        type="button"
        disabled={!showPrevious}
        on:click={uiScroller.previous}
        icon={faChevronLeft}
        title="Anterior" />
      <UiScroller bind:this={uiScroller} on:scroll={onScroll}>
        {#each data as item (item.id)}
          <CountryPreview data={item} />
        {/each}
      </UiScroller>
      <IconButton
        class="_button _button-next"
        type="button"
        disabled={!showNext}
        on:click={uiScroller.next}
        icon={faChevronRight}
        title="Siguiente" />
    </div>
  </div>
</article>

<style lang="postcss">
  article {
    background-color: theme('colors.primary.800');
    padding-inline-end: 0;
    padding-block: theme('spacing.24');
    color: theme('colors.primary.800-fg');
  }

  ._content {
    display: grid;
    gap: theme('spacing.8');

    @media (min-width: theme('screens.md')) {
      grid-template-columns: auto 1fr;
      grid-column-start: _lg-start;
    }
  }

  ._scroller {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-width: 0;

    & > :global([data-component='ui-scroller']) {
      gap: theme('spacing.4');
      margin-block: -1rem;
      padding-inline: var(--layout-padding) calc(100% + var(--layout-padding) - theme('spacing.64'));
      padding-block: 1rem;

      @media (min-width: theme('screens.md')) {
        padding-inline: 0 calc(100% - theme('spacing.64'));
      }
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
      left: theme('spacing.6');
    }

    & > :global([data-component='ui-icon-button']._button-previous) {
      @media (min-width: theme('screens.md')) {
        left: 0;
        transform: translateX(-50%);
        margin: 0;
      }
    }

    & > :global([data-component='ui-icon-button']._button-next) {
      right: theme('spacing.6');
    }
  }

  header {
    padding-inline: calc(var(--layout-padding) + theme('spacing.4'));
    text-align: center;
    text-wrap: balance;

    @media (min-width: theme('screens.md')) {
      padding-inline: 0;
      width: theme('spacing.72');
      text-align: left;
    }
  }
</style>
