<script lang="ts">
  import { page } from '$app/stores'
  import ErrorPage from '$lib/components/common/error-page.svelte'
</script>

<ErrorPage code={$page.status} title={$page.error?.message || 'Error'}>
  <a href="/">Regresar al inicio</a>
</ErrorPage>
