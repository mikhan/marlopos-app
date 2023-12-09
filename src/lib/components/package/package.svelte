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
  <PackageHeader title={data.name} description={data.description}>
    <svelte:fragment slot="background">
      <CoverImage data={data.cover} priority={true} />
    </svelte:fragment>
    <svelte:fragment slot="toolbar">
      <ShareMenu />
    </svelte:fragment>
  </PackageHeader>

  <div class="layout-lg relative -mt-4">
    <div class="flex flex-col gap-y-4 gap-x-8 lg:flex-row">
      <div class="flex flex-col gap-4 grow">
        <PackageContent {data} />
        <PackageNotes {data} />
      </div>
      <div class="flex flex-col gap-4">
        <PackageDetails {data} />
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
