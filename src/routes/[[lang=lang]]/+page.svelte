<script lang="ts">
  import AppContent from '$lib/components/app/app-content.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import Banner from '$lib/components/banner/banner.svelte'
  import Contact from '$lib/components/contact/contact.svelte'
  import CountriesPreview from '$lib/components/countries-preview.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<AppContent className="gap-y-8 max-w-screen-2xl mx-auto" pageId={data.href}>
  <Banner slides={data.featured} />
  <CountriesPreview
    data={[...data.countriesPreview, ...data.countriesPreview, ...data.countriesPreview, ...data.countriesPreview]} />
  <Contact data={data.information} />
  <AppFooter data={data.information} />
</AppContent>
