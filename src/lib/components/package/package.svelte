<script lang="ts">
  import type { Api } from '$lib/api'
  import CoverImage from '../common/cover-image.svelte'
  import ShareMenu from '../share/share-menu.svelte'
  import PackageAttachments from './package-attachments.svelte'
  import PackageContent from './package-content.svelte'
  import PackageDestinations from './package-destinations.svelte'
  import PackageDetails from './package-details.svelte'
  import PackageGallery from './package-gallery.svelte'
  import PackageHeader from './package-header.svelte'
  import PackageNotes from './package-notes.svelte'

  export let data: Api.Package
</script>

<section class="layout-container">
  <div class="relative h-[54rem] max-h-[100svh] -mb-[min(54rem,100svh)]">
    <CoverImage data={data.cover} />
  </div>

  <div class="layout-lg relative z-[1]">
    <div class="px-4 h-[54rem] max-h-[100svh] grid content-end -mb-24">
      <PackageHeader {data} />
      <div class="pt-12 pb-[max(10vh,3rem)] mt-8" />
    </div>
    <div class="flex flex-col gap-y-4 gap-x-8 lg:flex-row">
      <div class="flex flex-col gap-4">
        <PackageContent {data} />
        <PackageNotes {data} />
      </div>
      <div class="flex flex-col gap-4">
        <PackageDetails {data} />
        <ShareMenu />
      </div>
    </div>
  </div>
</section>

{#if data.gallery.length}
  <PackageGallery {data} />
{/if}

{#if data.destinations.length}
  <PackageDestinations data={data.destinations} />
{/if}

{#if data.attachments.length}
  <PackageAttachments {data} />
{/if}
