<script lang="ts">
  import Icon from '$core/components/icon.svelte'
  import Image from '$core/components/image.svelte'
  import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let data: Api.Information

  type MapConfig = { lon: number; lat: number; zoom: number; width: number; height: number }

  function getMap({ lon, lat, zoom, width, height }: MapConfig) {
    const searchParams = new URLSearchParams()
    searchParams.set('z', zoom.toString())
    searchParams.set('w', width.toString())
    searchParams.set('h', height.toString())

    return `/api/map/${lon},${lat}?${searchParams.toString()}`
  }

  function getScheduleStatus(schedule?: Api.InformationSchedule) {
    if (!schedule) return 'Cerrado'

    return `Abierto hasta las ${schedule.end.toLocaleString('es', { timeStyle: 'short' })}`
  }

  const [lon, lat] = data.coordinates
  const mapConfig = { lon, lat, zoom: 14, width: 320, height: 240 }
  const mapSrc = getMap(mapConfig)

  const today = new Date()
  const todaySchedule = data.schedule.find(({ start, end }) => start < today && today < end)
  const scheduleStatus = getScheduleStatus(todaySchedule)
</script>

<section
  class="border rounded elevation-low md:max-w-sm bg-surface-2-bg text-surface-2-fg border-surface-1-border overflow-clip min-w-min">
  <a class="map-link" target="_blank" rel="noreferrer" href="https://goo.gl/maps/ReoWcHB4Ae6swoeHA">
    <Image src={mapSrc} width={mapConfig.width} height={mapConfig.height} alt="" fit="cover" />
    <span class="sr-only">Mapa de ubicación</span>
  </a>

  <div class="flex flex-col gap-4 p-4">
    <div class="sm:gap-4 sm:flex">
      <Icon class="max-sm:hidden"><Fa fw icon={faLocationDot} /></Icon>
      <div class="text-sm opacity-50 sm:sr-only">Ubicación</div>
      <div class="grow">
        <div>{data.address}</div>
      </div>
    </div>

    <div class="sm:gap-4 sm:flex">
      <Icon class="max-sm:hidden"><Fa fw icon={faPhone} /></Icon>
      <div class="text-sm opacity-50 sm:sr-only">Teléfono</div>
      <div class="grow">
        {#each data.contact.filter(({ type }) => type === 'phone') as contact}
          <div>
            <a class="link" href={'tel:+52' + contact.value}>+52 {contact.value}</a>
          </div>
        {/each}
      </div>
    </div>

    <div class="sm:gap-4 sm:flex">
      <Icon class="max-sm:hidden"><Fa fw icon={faEnvelope} /></Icon>
      <div class="text-sm opacity-50 sm:sr-only">Correo</div>
      <div class="grow">
        {#each data.contact.filter(({ type }) => type === 'email') as contact}
          <div>
            <a class="link" href={'mail:' + contact.value}>{contact.value}</a>
          </div>
        {/each}
      </div>
    </div>
    <div class="sm:gap-4 sm:flex">
      <Icon class="max-sm:hidden"><Fa fw icon={faClock} /></Icon>
      <div class="text-sm opacity-50 sm:sr-only">Horario</div>
      <div class="grow">
        <div>{scheduleStatus}</div>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  .map-link {
    display: block;
    outline: 2px solid transparent;
    outline-offset: -8px;
    transition-property: outline-color, outline-offset;
    transition-duration: 150ms, 250ms;
    isolation: isolate;

    & > :global(*) {
      z-index: -1;
    }

    &:focus-visible {
      outline-color: theme('colors.ring');
      outline-offset: -2px;
    }
  }
</style>