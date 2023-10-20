<script lang="ts">
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import { dismiss } from '$core/actions/dismiss'
  import { showModal } from '$core/actions/showModal'
  import IconButton from '../icon-button.svelte'

  export let open = false
  export let title = ''
</script>

{#if open}
  <dialog
    {...$$restProps}
    data-component="ui-dialog"
    on:close
    on:cancel
    use:showModal={open}
    use:dismiss
    on:dismiss={() => (open = false)}>
    <header class="_dialog-header">
      <div>
        <slot name="header">
          <h1>{title}</h1>
        </slot>
      </div>
      <IconButton size="sm" icon={faTimes} on:click={() => (open = false)} title="Cerrar" />
    </header>
    <section>
      <slot />
    </section>
    {#if $$slots.footer}
      <footer>
        <slot name="footer" />
      </footer>
    {/if}
  </dialog>
{/if}

<style lang="postcss">
  dialog[open] {
    min-width: min(theme('screens.sm'), 90vw);
    max-width: calc(100% - calc(theme('spacing.4') * 2));
    max-height: min(30lh, calc(100vh - calc(theme('spacing.4') * 2)));
    background-color: theme('colors.surface-2.bg');
    color: theme('colors.surface-2.fg');
    border-radius: theme('borderRadius.DEFAULT');
    box-shadow: theme('elevation.hight');
    animation: dialog-show 250ms ease-in;
    @apply scrollbar-thin scrollbar-surface-2-fg scrollbar-track-surface-2-bg;

    &::backdrop {
      background-color: theme('colors.neutral.900 / 75%');
      pointer-events: none;
      animation: backdrop-show 250ms ease-in;
    }

    @keyframes dialog-show {
      from {
        transform: translateY(20%);
        opacity: 0;
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes backdrop-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  header {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: theme('spacing.4');
    padding-block-start: theme('spacing.4');
    margin-block-end: theme('spacing.4');
    background-color: inherit;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: theme('spacing.4');
      left: 0;
      bottom: 0;
      translate: 0 100%;
      z-index: -1;
      background-image: linear-gradient(theme('colors.surface-2.bg'), transparent);
    }

    h1 {
      font-size: theme('fontSize.xl[0]');
      line-height: theme('fontSize.xl[1]');
    }
  }

  section {
    padding-inline: theme('spacing.4');
  }

  footer {
    display: flex;
    gap: theme('spacing.4');
    padding-inline: theme('spacing.4');
    padding-block-end: theme('spacing.4');
    margin-block-start: theme('spacing.4');
    position: sticky;
    bottom: 0;
    left: 0;
    background-color: inherit;
    justify-content: flex-end;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: theme('spacing.4');
      left: 0;
      top: 0;
      translate: 0 -100%;
      z-index: -1;
      background-image: linear-gradient(to top, theme('colors.surface-2.bg'), 75%, transparent);
    }
  }
</style>
