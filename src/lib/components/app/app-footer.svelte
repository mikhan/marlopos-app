<script lang="ts">
  // import { PUBLIC_TAWK_PROPERTY_ID, PUBLIC_TAWK_CHAT_ID } from '$env/static/public'
  // import Chat from '$lib/components/chat.svelte'
  import type { Information } from '$lib/database/information'
  import { browser } from '$app/environment'
  import { faFacebook } from '@fortawesome/free-brands-svg-icons'
  import Fa from 'svelte-fa'

  export let data: Information

  const currentYear = new Date().getFullYear()
  const networks = {
    facebook: { name: 'Facebook', icon: faFacebook },
  }

  const isLighthouseAudit = 'navigator' in globalThis && navigator.userAgent.includes('Chrome-Lighthouse')
</script>

<footer class="pt-8 pb-4 mt-auto text-sm border-t layout text-canvas-fg/75 border-t-canvas-border">
  <div class="flex items-end gap-2">
    <div class="flex flex-col items-start md:items-center md:flex-row justify-between gap-2 min-h-[60px] grow">
      <div>© {currentYear} VIAJES MARLOPOS SA DE CV.</div>
      {#each data.networks as network}
        <a
          class="transition-all rounded-full hover:text-canvas-fg focus:text-canvas-fg focusable-visible"
          href={network.value}>
          <Fa icon={networks[network.type].icon} size="2x" />
          <span class="sr-only">{networks[network.type].name}</span>
        </a>
      {/each}
    </div>

    {#if browser && !isLighthouseAudit}
      <!-- <Chat propertyId={PUBLIC_TAWK_PROPERTY_ID} chatId={PUBLIC_TAWK_CHAT_ID} /> -->
    {/if}
  </div>
</footer>
