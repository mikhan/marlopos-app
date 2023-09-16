<script lang="ts">
  let className = ''
  export { className as class }
</script>

<nav class="topbar layout {className}">
  <div class="topbar-area layout-start"><slot name="lead" /></div>
  <div class="topbar-area"><slot /></div>
  <div class="topbar-area layout-end"><slot name="trail" /></div>
</nav>

<style lang="postcss">
  .topbar {
    cursor: default;
  }

  .topbar-area {
    display: flex;
    align-items: stretch;
  }
</style>
