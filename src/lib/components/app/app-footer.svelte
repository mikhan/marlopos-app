<script lang="ts">
  import { faFacebook } from '@fortawesome/free-brands-svg-icons'
  import Fa from 'svelte-fa'
  import type { Api } from '$lib/api'

  export let data: Api.Information

  const currentYear = new Date().getFullYear()
  const networks = {
    facebook: { name: 'Facebook', icon: faFacebook },
  }
</script>

<hr class="border-t-canvas-border" />

<footer class="flex layout-lg col-end-[\_full-end] items-end">
  <div class="flex flex-col gap-4 px-4 py-8 text-sm grow text-canvas-fg/75">
    <div>© {currentYear} VIAJES MARLOPOS SA DE CV.</div>
    <div class="flex gap-2">
      {#each data.networks as network}
        <a
          class="transition-all rounded-full hover:text-canvas-fg focus:text-canvas-fg focusable-visible"
          href={network.value}>
          <Fa icon={networks[network.type].icon} size="2x" />
          <span class="sr-only">{networks[network.type].name}</span>
        </a>
      {/each}
    </div>
  </div>

  <div class="_support" />
</footer>

<style lang="postcss">
  ._support {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin: 16px;
  }
</style>
