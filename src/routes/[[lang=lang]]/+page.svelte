<script lang="ts">
  import AppContent from '$lib/components/app/app-content.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import Banner from '$lib/components/banner/banner.svelte'
  import Contact from '$lib/components/contact/contact.svelte'
  import CountriesPreview from '$lib/components/countries-preview.svelte'
  import Services from '$lib/components/services/services.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<AppContent className="max-w-screen-2xl mx-auto">
  <Banner slides={data.featured} />
  <CountriesPreview data={[...data.countriesPreview, ...data.countriesPreview, ...data.countriesPreview]} />
  <Services />
  <Contact data={data.information} />
  <AppFooter data={data.information} />
</AppContent>
