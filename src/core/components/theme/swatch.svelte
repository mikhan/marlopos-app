<script lang="ts">
  import chroma from 'chroma-js'

  export let name: string
  export let bg: string
  export let fg: string
  let contrast: number

  $: contrast = +chroma.contrast(bg, fg).toFixed(2)
</script>

<div class="swatch group" style:--bg={bg} style:--fg={fg}>
  <div class="font-bold mb-auto">{name}</div>
  <div class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{bg}</div>
  <div class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{fg}</div>
  <div class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{contrast}</div>
</div>

<style lang="scss">
  .swatch {
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
    color: var(--fg);
    height: 8lh;
    padding: 0.5lh;
  }
</style>
