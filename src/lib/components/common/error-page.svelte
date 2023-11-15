<script lang="ts">
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let code: number
  export let title: string

  const online = typeof navigator !== 'undefined' ? navigator.onLine : true
</script>

<svelte:head>
  <title>{online ? `Error ${code}: ${title}` : 'Sin conexión'}</title>
</svelte:head>

<main class="layout-container grow place-content-center">
  <div class="layout-md">
    {#if !online}
      <h1 class="pb-8 text-4xl font-extralight">No hay conexión a internet</h1>
      <p>Actualice la página una vez que se haya restablecido el servicio.</p>
    {:else}
      <h1 class="pb-8 text-4xl font-extralight">{title}</h1>
      <slot />
    {/if}
    <a class="mt-4 button" href="/">
      <Fa icon={faChevronLeft} fw />
      <span>Regresar al inicio</span>
    </a>
  </div>
</main>
