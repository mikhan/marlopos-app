<script lang="ts">
  import { page } from '$app/stores'
  import ErrorPage from '$lib/components/common/error-page.svelte'
</script>

<ErrorPage code={$page.status} title={$page.error?.message || 'Error'}>
  <p>No se encontró el paquete "{$page.params['id']}"</p>
</ErrorPage>
