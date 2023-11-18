<script lang="ts">
  import { page } from '$app/stores'
  import Dialog from '$core/components/dialog/ui-dialog.svelte'

  let open = false
</script>

<button type="button" on:click={() => (open = true)} title="Page data" />

<Dialog title="Page Data" bind:open>
  {#each Object.entries($page.data) as [key, value]}
    <details class="my-2">
      <summary class="px-4 py-2 -mx-4 cursor-pointer hover:bg-surface-2-hover">{key}</summary>
      <pre class="p-2 text-sm"><code>{JSON.stringify(value, null, 2)}</code></pre>
    </details>
  {/each}
</Dialog>

<style lang="postcss">
  button[title='Page data'] {
    --size: 24px;
    position: fixed;
    top: calc(var(--size) * -1);
    right: calc(var(--size) * -1);
    outline: none;

    &::after {
      display: block;
      transform: rotate(45deg) scale(0.25);
      transition: transform 150ms;
      background-color: red;
      width: calc(var(--size) * 2);
      height: calc(var(--size) * 2);
      pointer-events: none;
      content: '';
    }

    &:hover::after,
    &:focus::after {
      transform: rotate(45deg) scale(1);
    }
  }
</style>
