<script lang="ts">
  let className = ''
  export { className as class }
</script>

<div class="topbar layout {className}">
  <div class="topbar-area layout-start"><slot name="lead" /></div>
  <div class="topbar-area"><slot /></div>
  <div class="topbar-area layout-end"><slot name="trail" /></div>
</div>

<style lang="postcss">
  .topbar {
    cursor: default;
  }

  .topbar-area {
    display: flex;
    align-items: stretch;
  }
</style>
