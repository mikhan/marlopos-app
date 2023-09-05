<script lang="ts">
  let className: string
  export { className as class }
</script>

<div class="grid place-content-center h-[1lh] aspect-square {className}">
  <slot />
</div>
