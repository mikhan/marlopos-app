<form>
  <label class="form-field">
    <div class="form-label">Your email</div>
    <input class="form-input" type="email" name="email" placeholder="name@flowbite.com" required />
  </label>
  <label class="form-field">
    <div class="form-label">Subject</div>
    <input class="form-input" type="text" name="subject" placeholder="Let us know how we can help you" required />
  </label>
  <label class="form-field">
    <div class="form-label">Your message</div>
    <textarea class="form-input" name="message" rows="6" placeholder="Leave a comment..." />
  </label>
  <button class="button" type="submit">Send message</button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: theme('spacing.8');
    padding: theme('spacing.8') 0;
  }
</style>
