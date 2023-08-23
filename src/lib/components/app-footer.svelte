<script lang="ts">
  import FacebookIcon from '$lib/icons/facebook.svg?component'
  import type { Information } from '$lib/database/information'

  export let data: Information

  const currentYear = new Date().getFullYear()
  const networkIcons = {
    facebook: FacebookIcon,
  }
</script>

<footer class="layout mt-auto pt-8 pb-16 text-neutral-400 text-sm border-t border-t-neutral-100">
  <div class="flex justify-between items-center">
    <div>
      © {currentYear} VIAJES MARLOPOS SA DE CV.
    </div>
    {#each data.networks as network}
      <a class="transition-colors hover:text-neutral-600" href={network.value}>
        <svelte:component this={networkIcons[network.type]} aria-hidden="true" width="24" height="24" />
      </a>
    {/each}
  </div>
</footer>
