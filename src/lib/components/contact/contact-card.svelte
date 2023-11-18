<script lang="ts">
  import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import Icon from '$core/components/icon.svelte'
  import type { Api } from '$lib/api'
  import { type CreateMapOptions, getStaticMapURL } from '$lib/services/map'

  export let data: Api.Information

  function getScheduleStatus(schedules: Api.InformationSchedule[]) {
    schedules = [...schedules].sort((a, b) => a.start.getTime() - b.start.getTime())
    const today = new Date()
    const schedule = schedules.find(({ start, end }) => start < today && today < end)

    if (!schedule) {
      const schedule = schedules.find(({ start }) => start > today)
      const weekday = schedule?.start.toLocaleString('es', { weekday: 'long' })
      const time = schedule?.start.toLocaleString('es', { timeStyle: 'short', hour12: true })

      return 'Cerrado' + (weekday && time ? `, abre el ${weekday} a las ${time}` : '')
    }

    return `Abierto hasta las ${schedule.end.toLocaleString('es', { timeStyle: 'short', hour12: true })}`
  }

  const [lon, lat] = data.coordinates
  const mapConfig: CreateMapOptions = {
    center: { lon, lat, zoom: 14 },
    width: 480,
    height: 360,
    markers: [{ lon, lat, label: 'circle', color: '8471b1' }],
  }
  const mapSrc = getStaticMapURL(mapConfig).href
  const scheduleStatus = getScheduleStatus(data.schedule)
</script>

<section
  class="max-w-screen-sm overflow-hidden border rounded elevation-low md:max-w-xs bg-surface-2-bg text-surface-2-fg border-surface-1-border min-w-min">
  <a class="map-link" target="_blank" rel="noreferrer" href="https://goo.gl/maps/ReoWcHB4Ae6swoeHA">
    <img
      class="object-none w-full h-full"
      src={mapSrc}
      width={mapConfig.width}
      height={mapConfig.height}
      alt=""
      loading="lazy" />
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
    transition-duration: 150ms, 250ms;
    transition-property: outline-color, outline-offset;
    outline: 2px solid transparent;
    outline-offset: -8px;
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
