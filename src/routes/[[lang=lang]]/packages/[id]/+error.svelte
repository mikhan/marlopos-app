<script lang="ts">
  import { page } from '$app/stores'

  const online = typeof navigator !== 'undefined' ? navigator.onLine : true
</script>

<svelte:head>
  <title>Error {$page.status}</title>
</svelte:head>

<main class="text-center layout grow place-content-center">
  <div>
    {#if $page.status === 404}
      <h1 class="text-4xl font-extralight">No se encontró el paquete</h1>
      <a href="/">Regresar al inicio</a>
    {:else if online}
      <h1 class="text-4xl font-extralight">{$page.error?.message}</h1>
    {:else}
      <h1 class="text-4xl font-extralight">It looks like you're offline</h1>
      <p>Reload the page once you've found the internet.</p>
    {/if}
  </div>
</main>
