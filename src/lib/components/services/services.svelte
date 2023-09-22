<script>
  //   import SectionHeader from '../common/section-header.svelte'
  import Image from '$core/components/image.svelte'
  import background from '$lib/assets/services-1.jpg'
</script>

<section class="relative grid w-full isolate place-content-center px-12 py-[10%]">
  <!-- <div>
    <SectionHeader>Con nosotros encontrarás</SectionHeader>
  </div> -->
  <picture>
    <Image src={background} alt="" class="w-full h-full" fit="cover" width={900} height={300} />
  </picture>
  <div class="max-w-screen-md mx-auto">
    <p class="leading-relaxed text-center text-white text-balance text-xl-fluid font-display">
      Contamos con más de <strong class="bg-[hsl(172_38%_46%)] px-3 py-1 rounded whitespace-nowrap"
        >15 años de experiencia</strong> en la operación, programación y comercialización de todo tipo de servicios turísticos.
    </p>
  </div>
</section>

<style lang="postcss">
  section {
    aspect-ratio: 4/3;
    max-height: 512px;
    /* height: 50%; */
  }

  picture {
    position: absolute;
    inset: 0;
    z-index: -1;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.7;
      background-color: theme('colors.canvas.bg/75%');
      background-image: radial-gradient(rgb(0 0 0 / 75%) 1px, transparent 1px);
      background-size: 4px 4px;
      mix-blend-mode: multiply;
    }
  }
</style>
