<script lang="ts" generics="T extends SvelteComponent">
  import type { ComponentType, SvelteComponent } from 'svelte'
  import { viewport } from '$core/actions/viewport'

  type SvelteModule = { default: ComponentType<T> }

  let loadComponent: () => Promise<SvelteModule>
  export { loadComponent as this }

  let isShowingComponent = false
  let componentPromise: Promise<SvelteModule>
</script>

{#if isShowingComponent}
  {#await componentPromise}
    <slot name="loading" />
  {:then { default: Component }}
    <slot {Component} />
  {/await}
{:else}
  <div
    use:viewport
    on:viewportenter={() => {
      componentPromise = loadComponent()
      isShowingComponent = true
    }} />
{/if}
