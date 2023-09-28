<script lang="ts">
  import { page } from '$app/stores'
  import Image from '$core/components/image.svelte'
  import type { Api } from '$lib/api'
  import EmailIcon from '$lib/icons/email.svg?component'
  import LocationIcon from '$lib/icons/location.svg?component'
  import PhoneIcon from '$lib/icons/phone.svg?component'

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
    const url = new URL(`/api/map/${lon},${lat}`, $page.url.origin)
    url.searchParams.set('zoom', zoom.toString())
    url.searchParams.set('width', width.toString())
    url.searchParams.set('height', height.toString())

    return url.toString()
  }

  export let data: Api.Information
</script>

<section class="relative wrapper layout-fullbleed">
  <div class="relative grow">
    <a class="map-link" title="Ubicación" target="_blank" rel="noreferrer" href="https://goo.gl/maps/ReoWcHB4Ae6swoeHA">
      <Image
        class="w-full h-full -z-10"
        src={getMap({ lon: -106.4271, lat: 23.1983, zoom: 18, width: 1280, height: 480 })}
        width={1280}
        height={480}
        alt=""
        fit="cover" />
    </a>
  </div>
  <div
    class="grid grid-cols-[2rem_1fr] max-w-sm p-8 gap-x-2 gap-y-4 absolute bottom-0 left-0 bg-surface-1-bg/70 text-surface-1-fg backdrop-blur-sm rounded m-4 border border-surface-1-border elevation-low">
    <div class="grid opacity-75 place-content-center w-7 aspect-square">
      <LocationIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="text-xs font-semibold tracking-wider uppercase text-neutral-600">Dirección</div> -->
      <div>{data.address}</div>
    </div>
    <div class="grid opacity-75 place-content-center w-7 aspect-square">
      <PhoneIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="text-xs font-semibold tracking-wider uppercase text-neutral-600">Teléfono</div> -->
      {#each data.contact.filter(({ type }) => type === 'phone') as contact}
        <div>
          <a class="link" href={'tel:+52' + contact.value}>+52 {contact.value}</a>
        </div>
      {/each}
    </div>
    <div class="grid opacity-75 place-content-center w-7 aspect-square">
      <EmailIcon width="20" height="20" />
    </div>
    <div class="grow">
      <!-- <div class="text-xs font-semibold tracking-wider uppercase text-neutral-600">Email</div> -->
      {#each data.contact.filter(({ type }) => type === 'email') as contact}
        <div>
          <a class="link" href={'mail:' + contact.value}>{contact.value}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 480px;
  }

  .map-link {
    display: block;
    height: 480px;
    outline: 2px solid transparent;
    outline-offset: -8px;
    transition-property: outline-color, outline-offset;
    transition-duration: 150ms, 250ms;

    &:focus-visible {
      outline-color: theme('colors.ring');
      outline-offset: -2px;
    }
  }
</style>
