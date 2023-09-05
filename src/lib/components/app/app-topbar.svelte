<script lang="ts">
  import AppTopbarLink from './app-topbar-link.svelte'

  import UiTopbar from '$core/components/shell/ui-topbar.svelte'
  import logo from '$lib/assets/logotipo.webp'

  let y: number
  const opacityOffset = 250

  $: opacity = Math.min(y / opacityOffset, 1)
</script>

<svelte:window bind:scrollY={y} />

<header class="app-topbar" style:--opacity={opacity}>
  <UiTopbar height={64}>
    <div class="flex items-center w-full">
      <a class="bg-[white] rounded shrink-0 hidden sm:block mr-4" href="/">
        <img class="app-topbar-logo" src={logo} width="105" height="105" alt="" />
        <span class="sr-only">Inicio</span>
      </a>
      <div class="text-xl tracking-wider">Viajes Marlopos</div>
      <div class="grow" />
      <div class="hidden h-full md:flex">
        <AppTopbarLink href="/contact">Contacto</AppTopbarLink>
        <AppTopbarLink href="/about">Nosotros</AppTopbarLink>
      </div>
    </div>
  </UiTopbar>
</header>

<style lang="postcss">
  .app-topbar {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 2;
    color: theme('colors.surface-2.fg');
    height: 64px;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 6rem;
      z-index: -1;
      pointer-events: none;
      opacity: calc(1 - var(--opacity, 0));
      background-image: linear-gradient(180deg, theme('colors.canvas.bg / 50%'), transparent 100%),
        linear-gradient(180deg, theme('colors.canvas.bg / 50%'), transparent 66%),
        linear-gradient(180deg, theme('colors.canvas.bg / 50%'), transparent 33%);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: theme('colors.surface-2.bg / 60%');
      background-clip: content-box;
      border-bottom: 1px solid theme('colors.surface-2.fg / 15%');
      backdrop-filter: saturate(50%) blur(8px);
      opacity: var(--opacity, 0);
      z-index: -1;
    }
  }

  .app-topbar-logo {
    width: theme('spacing.12');
    aspect-ratio: 1/1;
  }
</style>
