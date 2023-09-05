<script lang="ts">
  import { fly } from 'svelte/transition'
  import { autofocus } from '../actions/autofocus'
  import Fa from 'svelte-fa'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'

  let dialog: HTMLDialogElement

  export let open = false
  export let title = ''

  onMount(() => {
    if (open) dialog.showModal()
  })
</script>

<dialog class="_container" bind:this={dialog} transition:fly|global={{ y: 100, duration: 250 }} on:close on:cancel>
  <header class="_dialog-header">
    <div class="grow">
      <slot name="header">
        <h1 class="text-2xl font-light">{title}</h1>
      </slot>
    </div>
    <button class="w-8 h-8 button" use:autofocus on:click={() => dialog.close()}>
      <Fa icon={faTimes} />
    </button>
  </header>
  <div class="px-8 pt-4 pb-8 grow">
    <p>
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
    <p class="mt-4">
      Machu Picchu es el nombre contemporáneo que se da a una llacta —antiguo poblado incaico andino— construida antes
      del Siglo XV, ubicada en la Cordillera Oriental del sur del Perú, en la cadena montañosa de Los Andes a 2430
      metros sobre el nivel del mar.&nbsp;
    </p>
  </div>
  <footer class="_dialog-footer">
    <slot name="footer" />
    <button class="button button-primary button-filled">Aceptar</button>
  </footer>
</dialog>

<style lang="postcss">
  ._container[open] {
    /* display: grid;
    grid-template-rows: auto 1fr auto; */
    max-width: min(theme('maxWidth.prose'), calc(100vw - calc(theme('spacing.4') * 2)));
    max-height: min(30lh, calc(100vh - calc(theme('spacing.4') * 2)));
    background-color: theme('colors.surface-2.bg');
    color: theme('colors.surface-2.fg');
    border: 1px solid theme('colors.surface-2.border');
    border-radius: theme('borderRadius.DEFAULT');
    box-shadow: theme('elevation.hight');
    /* overflow-y: auto; */

    &::backdrop {
      background-color: theme('colors.canvas.bg / 50%');
    }
  }

  ._dialog-header {
    display: flex;
    gap: theme('spacing.4');
    padding: theme('spacing.8') theme('spacing.8') 0 theme('spacing.8');
    position: sticky;
    top: 0;
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
  }

  ._dialog-footer {
    display: flex;
    gap: theme('spacing.4');
    padding: 0 theme('spacing.8') theme('spacing.4') theme('spacing.8');
    position: sticky;
    bottom: 0;
    background-color: inherit;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: theme('spacing.8');
      left: 0;
      top: 0;
      translate: 0 -100%;
      z-index: -1;
      background-image: linear-gradient(to top, theme('colors.surface-2.bg'), 75%, transparent);
    }
  }
</style>
