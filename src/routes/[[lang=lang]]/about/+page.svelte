<script lang="ts">
  import about1 from '$lib/assets/about1.jpg'
  import about2 from '$lib/assets/about2.jpg'
</script>

<div class="layout-container grow">
  <section class="layout-lg">
    <div class="">
      <img class="w-full h-full rounded-3xl object-cover" src={about1} alt="" width={600} height={400} />
    </div>
    <div class="elevation-low">
      <img class="w-full h-full rounded-3xl object-cover" src={about2} alt="" width={450} height={600} />
    </div>
    <div class="p-8 rounded-3xl bg-neutral-100 text-neutral-100-fg elevation-hight">
      <h1 class="pb-8 text-xl-fluid">Misión</h1>

      <p class="text-lg tracking-wider">
        Viajes Marlopos, S.A. de C.V. es una empresa mexicana establecida hace más de 15 años y sus directivos, así como
        su personal cuentan con experiencia que la consolidan en su ramo y nuestra misión consiste en la operación,
        programación y comercialización de todo tipo de servicios turísticos. La excelencia en el servicio es el motor
        que nos mueve, puesto que nuestra principal preocupación es la plena satisfacción de nuestros clientes, y es,
        precisamente esto, lo que nos distingue ante nuestros competidores.
      </p>
    </div>
  </section>
</div>

<style lang="postcss">
  section {
    display: grid;
    grid-template-columns: 0.75fr 0.25fr 0.3fr 1fr 0.2fr;
    grid-template-rows: 0.2fr 0.4fr 1fr;
    margin-inline: auto;
    width: 100%;
    padding-block: 2rem;

    & > :nth-child(1) {
      grid-column: 2 / 6;
      grid-row: 1 / 4;
      aspect-ratio: 6/4;
      z-index: 1;
    }

    & > :nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 2 / 4;
      aspect-ratio: 3/4;
      z-index: 2;
    }

    & > :nth-child(3) {
      min-width: theme('screens.sm');
      grid-column: 4 / 5;
      grid-row: 3 / 5;
      z-index: 3;
    }
  }
</style>
