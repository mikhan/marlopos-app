<script lang="ts">
  import type { PageData } from './$types'
  import FeaturedPackages from '$lib/app/components/featured-packages.svelte'
  import Topbar from '$lib/core/components/topbar.svelte'
  import ContactForm from '$lib/app/components/contact-form.svelte'
  // import Theme from '$lib/core/components/theme.svelte'

  export let data: PageData
</script>

<Topbar>
  <h1>Viajes Marlopos</h1>
</Topbar>
<FeaturedPackages packages={data.featuredPackages} />
<ContactForm />

<div class="h-screen">
  <!-- <Theme /> -->
</div>
