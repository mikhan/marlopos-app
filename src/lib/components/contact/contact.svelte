<script lang="ts">
  import SectionHeader from '../common/section-header.svelte'
  import ContactCard from './contact-card.svelte'
  import ContactForm from './contact-form.svelte'

  export let data: Api.Information
</script>

<section class="h-full gap-8 py-16 mx-auto layout-lg md:layout-contain max-md:max-w-screen-sm">
  <div class="mx-auto mb-8">
    <SectionHeader>Contacto</SectionHeader>
  </div>
  <div class="flex flex-col justify-between gap-8 mx-auto md:flex-row md:items-start">
    <ContactForm />
    <ContactCard {data} />
  </div>
</section>
