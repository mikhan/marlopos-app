<script lang="ts">
  import CountryPreview from './country-preview.svelte'
  import SectionHeader from './common/section-header.svelte'

  export let data: any[] = []
</script>

<section class="flex flex-col gap-8 py-16 layout-lg md:layout-contain">
  <SectionHeader>Destinos principales</SectionHeader>
  <ul>
    {#each data as item}
      <CountryPreview data={item} />
    {/each}
  </ul>
</section>

<style lang="postcss">
  section {
    --app-layout-content: theme('screens.lg');
  }

  ul {
    --grid_gap: 0.5rem;
    display: grid;
    grid-auto-rows: 1fr;
    gap: var(--grid_gap);

    @media (min-width: theme('screens.sm')) {
      --grid_gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    }

    @media (theme('screens.md') < width < theme('screens.lg')) {
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

    @media (min-width: theme('screens.lg')) {
      grid-template-columns: repeat(4, 1fr);

      :global(li) {
        & {
          grid-column: span 1;
          grid-row: span 2;
          padding-top: var(--grid_gap);

          &::before {
            margin-top: 100%;
          }
        }
      }
    }
  }
</style>
