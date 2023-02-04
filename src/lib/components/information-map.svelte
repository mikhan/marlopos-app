<script lang="ts">
  import Image from '$core/components/image.svelte'
  import type { Information } from '$lib/database/information'

  function getMap({
    lon,
    lat,
    zoom,
    width,
    height,
  }: {
    lon: number
    lat: number
    zoom: number
    width: number
    height: number
  }) {
    const url = new URL(`https://marlopos.netlify.app/api/map/${lon},${lat}`)
    url.searchParams.set('zoom', zoom.toString())
    url.searchParams.set('width', width.toString())
    url.searchParams.set('height', height.toString())

    return url.toString()
  }

  export let data: Information
</script>

<section class="wrapper layout-fullbleed relative">
  <div class="relative grow">
    <a title="Ubicación" target="_blank" rel="noreferrer" href="https://goo.gl/maps/ReoWcHB4Ae6swoeHA">
      <Image src={getMap({ lon: -106.4271, lat: 23.1983, zoom: 18, width: 1280, height: 640 })} fit="cover" alt="" />
    </a>
  </div>
  <div class="flex flex-col max-w-sm p-8 gap-4 absolute bottom-0 left-0 bg-neutral-50/70 backdrop-blur-sm rounded m-4">
    <div class="grow">
      <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Dirección</div>
      <div>{data.address}</div>
    </div>
    <div class="grow">
      <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Teléfono</div>
      {#each data.contact.filter(({ type }) => type === 'phone') as contact}
        <div>
          <a class="text-primary-800" href={'tel:+52' + contact.value}>+52 {contact.value}</a>
        </div>
      {/each}
    </div>
    <div class="grow">
      <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Email</div>
      {#each data.contact.filter(({ type }) => type === 'email') as contact}
        <div>
          <a class="text-primary-800" href={'mail:' + contact.value}>{contact.value}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 640px;
  }

  // .content {
  //   padding: var(--layout-padding);
  // }
</style>
