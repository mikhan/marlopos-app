<script lang="ts">
  import type { Api } from '$lib/api'
  import { getStaticMapURL } from '$lib/services/map'

  export let data: Api.PackageDestination[]

  const firstPoint = (data.length === 1 && data[0]?.coordinates) || null
  const mapCenter = firstPoint ? { lon: firstPoint[0], lat: firstPoint[1], zoom: 12 } : 'auto'
  const mapMarkers = data.map(({ coordinates: [lon, lat] }) => ({ lon, lat, label: 'circle', color: '8471b1' }))

  function getMapHref(size: number) {
    const padding = (size - 480) / 2 + 100
    return getStaticMapURL({ center: mapCenter, width: size, height: size, markers: mapMarkers, padding }).href
  }
</script>

<button class="absolute inset-0 outline-none" on:click>
  <picture>
    <source srcset={getMapHref(480)} media="(max-width: 480px)" />
    <img
      class="object-none w-full h-full"
      src={getMapHref(768)}
      alt="Mapa que muestra los destinos incluídos en el paquete"
      loading="lazy" />
  </picture>
  <span class="sr-only">Mostrar mapa interactivo</span>
</button>
