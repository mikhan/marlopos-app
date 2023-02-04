<script lang="ts">
  import '@fontsource/merriweather'
  import '@fontsource/inter/variable.css'
  import '../../app.scss'
</script>

<div class="app-shell"><slot /></div>

<style lang="scss">
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
</style>
