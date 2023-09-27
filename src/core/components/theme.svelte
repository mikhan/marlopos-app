<script lang="ts">
  import { type Shades, generateShades } from './theme/palette'
  import Swatch from './theme/swatch.svelte'

  interface Palette {
    name: string
    shades: Shades<[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]>
  }

  const config = [
    { name: 'Primary', color: 'hsl(254, 66%, 52%)' },
    { name: 'Neutral', color: '#6b7280' },
  ]

  let palettes: Palette[]

  $: palettes = config.map(({ name, color }) => ({
    name,
    shades: generateShades({
      color,
      shade: 500,
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    }),
  }))
</script>

{#each palettes as swatch}
  {swatch.name}
  <swatches class="swatches">
    {#each Object.entries(swatch.shades) as [name, shade]}
      <Swatch {name} bg={shade.background} fg={shade.foreground} />
    {/each}
  </swatches>
{/each}

<style lang="postcss" global>
  swatches {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    margin: 1rem;
  }
</style>
