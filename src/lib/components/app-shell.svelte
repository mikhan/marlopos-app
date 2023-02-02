<script lang="ts">
  import AppTopbar from './app-topbar.svelte'
</script>

<main>
  <AppTopbar />
  <div class="layout">
    <slot />
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100dvh;
  }
</style>
