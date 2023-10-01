<script lang="ts" context="module">
  export type NewTicket = {
    name: string
    email: string
    message: string
  }
</script>

<script lang="ts">
  import { t } from '$translations/translations'

  let data: NewTicket = {
    name: '',
    email: '',
    message: '',
  }
</script>

<form class="flex flex-col items-start w-full gap-4 grow lg:max-w-prose" method="POST">
  <label class="form-field">
    <div class="form-label">{$t('contactForm.field.name.label')}</div>
    <input
      class="form-input"
      type="text"
      name="name"
      bind:value={data.name}
      placeholder={$t('contactForm.field.name.placeholder')}
      autocomplete="name"
      required />
  </label>
  <label class="form-field">
    <div class="form-label">{$t('contactForm.field.email.label')}</div>
    <input
      class="form-input"
      type="email"
      name="email"
      bind:value={data.email}
      placeholder={$t('contactForm.field.email.placeholder')}
      autocomplete="email"
      required />
  </label>
  <label class="form-field">
    <div class="form-label">{$t('contactForm.field.message.label')}</div>
    <textarea
      class="form-input"
      name="message"
      bind:value={data.message}
      rows="6"
      placeholder={$t('contactForm.field.message.placeholder')} />
  </label>
  <button class="button button-primary button-filled" type="submit">{$t('contactForm.button.send')}</button>
</form>
