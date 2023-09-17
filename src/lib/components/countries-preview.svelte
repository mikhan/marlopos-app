<script lang="ts">
  import { mouseScroll } from '$core/actions/mouse-scroll'
  import { matchMedia } from '$core/stores/match-media'
  import { createConditionalAction } from '$core/utils/actions'
  import SectionHeader from './common/section-header.svelte'
  import CountryPreview from './country-preview.svelte'

  export let data: any[] = []

  const mouseScrollIf = createConditionalAction(matchMedia('(pointer: fine)'), mouseScroll)
</script>

<div class="py-12 layout-container layout-padding bg-primary-800 text-primary-800-fg">
  <div class="layout-lg">
    <SectionHeader class="mb-8">Destinos principales</SectionHeader>
  </div>

  <ul use:mouseScrollIf>
    {#each data as item}
      <CountryPreview data={item} />
    {/each}
  </ul>
</div>

<style lang="postcss">
  ul {
    --padding: var(--layout-padding);
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    gap: 1rem;
    overflow: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem var(--padding);
    scroll-behavior: smooth;
    padding: 1rem var(--padding);
    margin: -1rem 0;

    @media (pointer: fine) {
      overflow: hidden;
      cursor: grab;
    }

    & > :global(*) {
      scroll-snap-stop: always;
      scroll-snap-align: start;
    }
  }
</style>
