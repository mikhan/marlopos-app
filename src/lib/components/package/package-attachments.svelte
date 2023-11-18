<script lang="ts">
  import { type IconDefinition, faFile, faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { transformURL } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'

  export let data: Api.Package

  const types: Record<string, IconDefinition> = {
    'image/jpeg': faImage,
    'application/pdf': faFilePdf,
  }

  function getFileIcon(type: string) {
    if (type in types) return types[type]
    else return faFile
  }

  function getFileHref(id: string, filename: string) {
    return transformURL(`${id}?name=${filename.replace(/\.[^.]+$/, '')}`)
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

<section class="layout-container">
  <SectionHeader class="px-4 mb-8 layout-lg">Más información</SectionHeader>

  <ul class="layout-lg">
    {#each data.attachments as attachment (attachment.id)}
      <li>
        <a href={getFileHref(attachment.id, attachment.filename)} target="_blank">
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
</section>

<style lang="postcss">
  ul {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.4');

    @media (min-width: theme('screens.md')) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  li {
    @media (min-width: theme('screens.md')) {
      max-width: theme('width.96');
    }
  }

  a {
    display: grid;
    grid-template-columns: theme('spacing.16') 1fr;
    align-items: center;
    box-shadow: theme('elevation.low');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-1.bg');
    overflow: hidden;
    color: theme('colors.surface-1.fg');
  }
</style>
