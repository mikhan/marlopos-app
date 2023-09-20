<script>
  //   import SectionHeader from '../common/section-header.svelte'
  import Image from '$core/components/image.svelte'
  import background from '$lib/assets/you-cant-put-into-words.webp'
</script>

<section class="relative grid w-full isolate place-content-center px-12 py-[10%]">
  <!-- <div>
    <SectionHeader>Con nosotros encontrarás</SectionHeader>
  </div> -->
  <picture class="absolute inset-0 -z-[1] after:bg-canvas-bg/50 after:absolute after:inset-0 after:content-['']">
    <Image src={background} alt="" class="w-full h-full" fit="cover" width={800} height={600} />
  </picture>
  <div class="max-w-screen-md mx-auto">
    <p class="leading-relaxed text-center text-white text-balance text-xl-fluid font-display">
      Contamos con más de <strong class="bg-[hsl(172_38%_46%)] px-3 py-1 rounded whitespace-nowrap"
        >15 años de experiencia</strong> en la operación, programación y comercialización de todo tipo de servicios turísticos.
    </p>
  </div>
</section>
