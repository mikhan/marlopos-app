<script lang="ts">
  import { t } from '$translations/translations'
</script>

<h1 class="text-4xl text-center font-serif">Contacto</h1>
<form class="flex flex-col items-start gap-8 py-8 w-full max-w-md mx-auto">
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
    <div class="form-label">{$t('contactForm.field.subject.label')}</div>
    <input
      class="form-input"
      type="text"
      name="subject"
      placeholder={$t('contactForm.field.subject.placeholder')}
      required />
  </label>
  <label class="form-field">
    <div class="form-label">{$t('contactForm.field.message.label')}</div>
    <textarea class="form-input" name="message" rows="6" placeholder={$t('contactForm.field.message.placeholder')} />
  </label>
  <button class="button" type="submit">{$t('contactForm.button.send')}</button>
</form>
