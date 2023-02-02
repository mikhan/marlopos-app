<script lang="ts">
  import FeaturedPackages from '$lib/components/featured-packages.svelte'
  import ContactForm from '$lib/components/contact-form.svelte'
  import type { PageData } from './$types'
  import { metadataStore } from '$lib/stores/metadata.store'

  // import Theme from '$core/components/theme.svelte'

  export let data: PageData

  $: metadataStore.set(data.meta)
</script>

<FeaturedPackages packages={data.featured} />
<ContactForm />

<!-- <div class="h-screen"><Theme /></div> -->
