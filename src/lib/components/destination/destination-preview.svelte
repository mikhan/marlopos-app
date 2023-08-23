<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import ItemPreview from '../common/item-preview.svelte'

  export let data: {
    name: string
    cover: {
      id: string
      title: string
      blurhash: string
    }
  }
</script>

<button
  class="aspect-video w-full h-full grid place-items-stretch rounded-md overflow-hidden border border-neutral-200">
  <ItemPreview>
    <picture slot="image">
      <Blurhash hash={data.cover.blurhash}>
        <img
          class="w-full h-full object-cover"
          src={`/api/assets/${data.cover.id}?w=320&h=180?q=50`}
          width="320"
          height="180"
          alt={data.cover.title} />
      </Blurhash>
    </picture>
    <div class="px-3 py-2 text-left">
      <div>
        {data.name}
      </div>
    </div>
  </ItemPreview>
</button>

<style lang="scss">
</style>
