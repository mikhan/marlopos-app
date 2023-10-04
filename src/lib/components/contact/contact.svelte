<script lang="ts">
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'
  import ContactCard from './contact-card.svelte'
  import ContactForm from './contact-form.svelte'

  export let data: Api.Information
</script>

<section class="h-full gap-8 py-24 layout-lg max-md:layout-sm">
  <div class="px-4 mx-auto mb-8">
    <SectionHeader>Contacto</SectionHeader>
  </div>
  <div class="grid grid-cols-1 items-stretch justify-between gap-8 mx-auto md:grid-cols-[1fr,auto] md:items-start">
    <div class="flex flex-col px-4 w-fit">
      <p class="mb-8 text-lg-fluid text-balance">
        Contáctanos y comprueba por qué somos la mejor
        <strong class="text-2xl">agencia de viajes en Mazatlán</strong>
        para tus viajes grupales e individuales.
      </p>

      <ContactForm />
    </div>
    <div class="grow">
      <ContactCard {data} />
    </div>
  </div>
</section>
