<script lang="ts">
  import { t } from '$translations/translations'
  import SectionHeader from './common/section-header.svelte'
</script>

<section class="flex flex-col gap-8 my-16 bg-neutral-700 text-neutral-700-fg rounded-lg p-8">
  <SectionHeader>Contacto</SectionHeader>
  <form class="flex flex-col items-start gap-4 w-full max-w-md mx-auto">
    <label class="form-field">
      <div class="form-label">{$t('contactForm.field.name.label')}</div>
      <input
        class="form-input"
        type="text"
        name="name"
        placeholder={$t('contactForm.field.name.placeholder')}
        required />
    </label>
    <label class="form-field">
      <div class="form-label">{$t('contactForm.field.email.label')}</div>
      <input
        class="form-input"
        type="email"
        name="email"
        placeholder={$t('contactForm.field.email.placeholder')}
        required />
    </label>
    <label class="form-field">
      <div class="form-label">{$t('contactForm.field.message.label')}</div>
      <textarea class="form-input" name="message" rows="6" placeholder={$t('contactForm.field.message.placeholder')} />
    </label>
    <button class="button" type="submit">{$t('contactForm.button.send')}</button>
  </form>
</section>
