<script lang="ts">
  import FeaturedPackages from '$lib/components/featured-packages.svelte'
  import ContactForm from '$lib/components/contact-form.svelte'
  import { metadataStore } from '$lib/stores/metadata.store'
  import type { PageData } from './$types'
  import CountriesPreview from '$lib/components/countries-preview.svelte'
  import InformationMap from '$lib/components/information-map.svelte'

  export let data: PageData

  $: metadataStore.set(data.meta)
</script>

<svelte:head>
  <link rel="preconnect" href="https://ik.imagekit.io" />
</svelte:head>

<main class="layout">
  <FeaturedPackages packages={data.featured} />
  <CountriesPreview data={data.countriesPreview} />
  <ContactForm />
  <InformationMap data={data.information} />
</main>
