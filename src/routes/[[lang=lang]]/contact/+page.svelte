<script lang="ts">
  import Contact from '$lib/components/contact/contact.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<main class="my-auto layout-container">
  <Contact data={data.information} />
</main>
