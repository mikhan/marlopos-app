<script lang="ts">
  import Image from '$core/components/image.svelte'
  import EmailIcon from '$lib/icons/email.svg?component'
  import LocationIcon from '$lib/icons/location.svg?component'
  import PhoneIcon from '$lib/icons/phone.svg?component'
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
    const searchParams = new URLSearchParams()
    searchParams.set('zoom', zoom.toString())
    searchParams.set('width', width.toString())
    searchParams.set('height', height.toString())

    // FIXME: Obtener de forma dinámica
    return `http://localhost:5173/api/map/${lon},${lat}?${searchParams.toString()}`
  }

  export let data: Information
</script>

<section class="wrapper layout-fullbleed relative">
  <div class="relative grow">
    <a title="Ubicación" target="_blank" rel="noreferrer" href="https://goo.gl/maps/ReoWcHB4Ae6swoeHA">
      <Image
        class="w-full h-[480px] object-cover"
        src={getMap({ lon: -106.4271, lat: 23.1983, zoom: 18, width: 1280, height: 480 })}
        width={1280}
        height={480}
        alt="" />
    </a>
  </div>
  <div
    class="grid grid-cols-[2rem_1fr] max-w-sm p-8 gap-x-2 gap-y-4 absolute bottom-0 left-0 bg-neutral-50/70 backdrop-blur-sm rounded m-4">
    <div class="grid place-content-center w-7 aspect-square opacity-75">
      <LocationIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Dirección</div> -->
      <div>{data.address}</div>
    </div>
    <div class="grid place-content-center w-7 aspect-square opacity-75">
      <PhoneIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Teléfono</div> -->
      {#each data.contact.filter(({ type }) => type === 'phone') as contact}
        <div>
          <a class="text-primary-700 hover:underline" href={'tel:+52' + contact.value}>+52 {contact.value}</a>
        </div>
      {/each}
    </div>
    <div class="grid place-content-center w-7 aspect-square opacity-75">
      <EmailIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="font-semibold text-xs uppercase tracking-wider text-neutral-600">Email</div> -->
      {#each data.contact.filter(({ type }) => type === 'email') as contact}
        <div>
          <a class="text-primary-700 hover:underline" href={'mail:' + contact.value}>{contact.value}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 480px;
  }
</style>
