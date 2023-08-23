<script lang="ts">
  import CountryPreview from './country-preview.svelte'
  import SectionHeader from './common/section-header.svelte'

  export let data: any[] = []
</script>

<section class="layout layout-fullbleed gap-8 py-16">
  <SectionHeader>Destinos principales</SectionHeader>
  <ul>
    {#each data as item}
      <CountryPreview data={item} />
    {/each}
  </ul>
</section>

<style lang="scss">
  section {
    --app-layout-content: theme('screens.lg');
  }

  ul {
    --grid_gap: 1rem;
    --grid_size: calc(calc(100% - calc(var(--grid_gap) * 2)) / 3);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--grid_gap);

    @media (min-width: theme('screens.sm')) {
      grid-template-columns: repeat(3, 1fr);

      :global(li) {
        &:first-child {
          grid-row: span 2;
          padding-top: var(--grid_gap);

          &::before {
            margin-top: 100%;
          }
        }

        &:nth-child(2) {
          grid-column: span 2;
        }

        &:nth-child(3):last-child {
          grid-column: span 2;
        }

        &:nth-child(3n + 5):last-child {
          grid-column: span 3;
        }

        &:nth-child(3n + 6):last-child {
          grid-column: span 2;
        }
      }
    }
  }
</style>
