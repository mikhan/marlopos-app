<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let icon: IconDefinition | undefined = undefined
  export let href: string | URL | undefined = undefined
  export let target: string | undefined = undefined

  let elementTag: 'a' | 'button'
  $: elementTag = href ? 'a' : 'button'
</script>

<li>
  <svelte:element
    this={elementTag}
    href={href && href.toString()}
    target={href && target}
    class="flex items-center w-full p-2 text-sm rounded-md text-surface-2-fg hover:bg-surface-primary-bg hover:text-surface-primary-fg">
    {#if icon}
      <div class="mr-2">
        <Fa fw {icon} />
      </div>
    {/if}
    <slot />
  </svelte:element>
</li>
