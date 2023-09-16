<script lang="ts">
  import { browser } from '$app/environment'
  import { mouseScroll } from '$core/actions/mouse-scroll'
  import SectionHeader from './common/section-header.svelte'
  import CountryPreview from './country-preview.svelte'

  export let data: any[] = []

  const mouseScrollIf = browser && matchMedia('(pointer: fine)').matches ? mouseScroll : () => {}
</script>

<div class="layout-lg">
  <SectionHeader class="my-8">Destinos principales</SectionHeader>
</div>

<section class="_wrapper">
  <ul class="_list" use:mouseScrollIf>
    {#each data as item}
      <CountryPreview data={item} />
    {/each}
  </ul>
</section>

<style lang="postcss">
  ._wrapper {
    --padding: var(--layout-padding);
    --mask-size: max(var(--padding), 20px);
    /* mask: linear-gradient(to right, transparent, black var(--padding), black calc(100% - var(--padding)), transparent); */
  }

  ._list {
    display: grid;
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
    }

    & > :global(*) {
      scroll-snap-stop: always;
      scroll-snap-align: start;
    }
  }
</style>
