<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'
  import { getResourceHref } from '$core/services/resource-provider'
  import type { Api } from '$lib/api'
  import ItemPreview from '../common/item-preview.svelte'

  export let data: Api.Destination
</script>

<button
  class="grid w-full h-full overflow-hidden border rounded aspect-video place-items-stretch border-surface-1-border"
  on:click
  on:mouseover
  on:mouseout
  on:focus
  on:blur>
  <ItemPreview>
    <picture slot="image">
      <Image
        class="w-full h-full"
        src={getResourceHref(data.cover.id, { width: 320, height: 180, quality: 50 })}
        width={320}
        height={180}
        fit="cover"
        color={data.cover.color}
        alt={data.cover.title}>
        <Blurhash hash={data.cover.blurhash} width={320} height={180} />
      </Image>
    </picture>
    <div class="px-3 py-2 text-left">
      <div>
        {data.name}
      </div>
    </div>
  </ItemPreview>
</button>
