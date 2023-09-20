<script lang="ts">
  import UiScroller from '$core/components/scroller/ui-scroller.svelte'
  import CountryPreview from './country-preview.svelte'

  export let data: any[] = []
</script>

<section class="pr-0 _container layout-container layout-padding">
  <div class="_scroller">
    <div class="_header">
      <h2 class="text-2xl-fluid font-display">¡Viaja con nosotros!</h2>
      <p class="text-xl leading-relaxed">
        Conoce todos nuestros destinos y los paquetes especiales que tenemos para ti.
      </p>
      <p class="mt-4 text-sm opacity-50 layout-lg">Los precios y disponibilidad pueden variar.</p>
    </div>
    <UiScroller>
      {#each data as item}
        <CountryPreview data={item} />
      {/each}
    </UiScroller>
  </div>
</section>

<style lang="postcss">
  ._container {
    padding-block: theme('spacing.24');
    background-color: theme('colors.primary.800');
    color: theme('colors.primary.800-fg');
  }

  ._scroller {
    display: grid;
    gap: theme('spacing.8');

    @media (min-width: theme('screens.md')) {
      grid-template-columns: auto 1fr;
      grid-column-start: _lg-start;

      & :global([data-part='ui-scroller-previous-button']) {
        margin-left: -50%;
      }
    }

    & :global([data-component='ui-scroller']) {
      padding-right: max(var(--layout-padding), theme('spacing.8'));
      padding-block: 1rem;
      margin-block: -1rem;
      gap: theme('spacing.4');
    }
  }

  ._header {
    padding-inline: var(--layout-padding);
    text-align: center;
    text-wrap: balance;

    @media (min-width: theme('screens.md')) {
      padding-inline: 0;
      text-align: left;
      width: theme('spacing.72');
    }
  }
</style>
