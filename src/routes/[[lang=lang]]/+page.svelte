<script lang="ts">
  import AppContent from '$lib/components/app/app-content.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import Banner from '$lib/components/banner/banner.svelte'
  import Contact from '$lib/components/contact/contact.svelte'
  import CountriesPreview from '$lib/components/countries-preview.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div>
  <div class="grid h-32 grid-cols-10">
    <div class="bg-primary-50" />
    <div class="bg-primary-100" />
    <div class="bg-primary-200" />
    <div class="bg-primary-300" />
    <div class="bg-primary-400" />
    <div class="bg-primary-500" />
    <div class="bg-primary-600" />
    <div class="bg-primary-700" />
    <div class="bg-primary-800" />
    <div class="bg-primary-900" />
  </div>
  <div class="grid h-32 grid-cols-10">
    <div class="bg-neutral-50" />
    <div class="bg-neutral-100" />
    <div class="bg-neutral-200" />
    <div class="bg-neutral-300" />
    <div class="bg-neutral-400" />
    <div class="bg-neutral-500" />
    <div class="bg-neutral-600" />
    <div class="bg-neutral-700" />
    <div class="bg-neutral-800" />
    <div class="bg-neutral-900" />
  </div>
</div>
<AppContent className="gap-y-8 max-w-screen-2xl mx-auto" pageId={data.href}>
  <Banner slides={data.featured} />
  <CountriesPreview data={data.countriesPreview} />
  <Contact data={data.information} />
  <AppFooter data={data.information} />
</AppContent>
