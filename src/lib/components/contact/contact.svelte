<script lang="ts">
  import type { Api } from '$lib/api'
  import SectionHeader from '../common/section-header.svelte'
  import ContactCard from './contact-card.svelte'
  import ContactForm from './contact-form.svelte'

  export let data: Api.Information
</script>

<section class="py-24 layout-container">
  <SectionHeader class="px-4 mb-8 layout-lg">Contacto</SectionHeader>

  <div class="grid grid-cols-1 layout-lg items-stretch justify-between gap-8 md:grid-cols-[1fr,auto] md:items-start">
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
