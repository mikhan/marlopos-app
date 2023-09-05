<script lang="ts">
  import Banner from '$lib/components/banner/banner.svelte'
  import Contact from '$lib/components/contact/contact.svelte'
  import type { PageData } from './$types'
  import CountriesPreview from '$lib/components/countries-preview.svelte'
  import { uiShellContext } from '$core/components/shell/ui-shell.svelte'

  export let data: PageData

  const { layoutTopbarHeight } = uiShellContext.get()
  $: marginTop = `${$layoutTopbarHeight * -1}px`
</script>

<main class="layout-container layout-padding" style:margin-top={marginTop}>
  <Banner slides={data.featured} />
  <CountriesPreview data={data.countriesPreview} />
  <Contact data={data.information} />
</main>
