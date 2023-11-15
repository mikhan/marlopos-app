<script lang="ts">
  import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { isExternalURL } from '$core/utils/predicate'

  export let href: string
  export let title: string | undefined = undefined
  export let text: string

  $: external = isExternalURL(href)
</script>

<a class="flex items-center gap-2" {href} {title}>
  {text}
  {#if external}
    <Fa icon={faExternalLink} />
  {/if}
</a>
