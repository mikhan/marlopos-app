<script lang="ts">
  import type { PageData } from './$types'
  import FeaturedPackages from '$lib/components/featured-packages.svelte'
  import ContactForm from '$lib/components/contact-form.svelte'
  // import Theme from '$core/components/theme.svelte'

  export let data: PageData
</script>

<FeaturedPackages packages={data.featuredPackages} />
<ContactForm />

<div class="h-screen">
  <!-- <Theme /> -->
</div>
