<script lang="ts">
  import UiNavigationProgress from '$core/components/shell/ui-navigation-progress.svelte'
  import UiTopbar from '$core/components/shell/ui-topbar.svelte'
  import logotipo from '$lib/assets/logotipo.png'
  import AppTopbarLink from './app-topbar-link.svelte'

  let y: number
  const opacityOffset = 250

  $: opacity = Math.min(y / opacityOffset, 1)
</script>

<svelte:window bind:scrollY={y} />

<UiNavigationProgress class="z-10" />
<header class="app-topbar" style:--opacity={opacity}>
  <UiTopbar height={64}>
    <div class="flex items-center w-full">
      <a class="flex items-center gap-2 mr-auto max-sm:ml-auto" href="/">
        <img class="w-auto h-8" src={logotipo} width="84" height="84" alt="Viajes Marlopos logo" />
        <span class="font-bold tracking-wider">Viajes Marlopos</span>
      </a>
      <div class="hidden h-full gap-4 sm:flex">
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
      background-color: theme('colors.canvas.bg / 60%');
      background-clip: content-box;
      border-bottom: 1px solid theme('colors.canvas.border');
      backdrop-filter: saturate(50%) blur(8px);
      opacity: var(--opacity, 0);
      z-index: -1;
    }
  }
</style>
