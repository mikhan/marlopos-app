<script lang="ts">
  import { type IconDefinition, faFile, faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { transformURL } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'

  export let data: Api.Package

  const types: Record<string, IconDefinition> = {
    'image/jpeg': faImage,
    'application/pdf': faFilePdf,
  }

  function getFileIcon(type: string) {
    if (type in types) return types[type]
    else return faFile
  }

  function getFileHref(id: string) {
    return transformURL(id)
  }

  function getFileThumbnail(id: string) {
    return transformURL(`${id}?w=64&h=64`)
  }

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
</script>

<ul>
  {#each data.attachments as attachment}
    <li>
      <a href={getFileHref(attachment.id)} target="_blank">
        <div class="grid place-content-center aspect-square bg-surface-2-bg">
          {#if attachment.type.startsWith('image/')}
            <img src={getFileThumbnail(attachment.id)} alt="" />
          {:else}
            <Fa icon={getFileIcon(attachment.type)} size="2x" />
          {/if}
        </div>
        <div class="px-4 py-2 truncate">
          <div class="font-bold truncate">{attachment.title}</div>
          <div>
            <small class="text-sm">{formatBytes(attachment.filesize)}</small>
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>

<style lang="postcss">
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: theme('spacing.4');
  }

  li {
    max-width: theme('width.96');
  }

  a {
    display: grid;
    grid-template-columns: theme('spacing.16') 1fr;
    align-items: center;
    background-color: theme('colors.surface-1.bg');
    color: theme('colors.surface-1.fg');
    border-radius: theme('borderRadius.DEFAULT');
    box-shadow: theme('elevation.low');
    overflow: hidden;
  }
</style>
