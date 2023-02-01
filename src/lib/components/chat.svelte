<script lang="ts" context="module">
  declare global {
    interface Window {
      Tawk_API: unknown
      Tawk_LoadStart: Date
    }
  }
</script>

<script lang="ts">
  export let id: string
</script>

<svelte:head>
  <script src={id} async crossorigin="*"></script>
</svelte:head>
