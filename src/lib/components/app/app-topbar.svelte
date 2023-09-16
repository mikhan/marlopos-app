<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { getUiShellContext } from '$core/components/shell/ui-shell.svelte'
  import UiTopbar from '$core/components/shell/ui-topbar.svelte'
  import { matchMedia } from '$core/stores/match-media'
  import logotipo from '$lib/assets/logotipo.png'
  import AppNavigationProgress from '$lib/components/app/app-navigation-progress.svelte'
  import Omnibox from '../search/omnibox.svelte'
  import AppTopbarLink from './app-topbar-link.svelte'

  const { layoutTopbarHeight } = getUiShellContext()

  const collapsed = matchMedia('(width < 768px)')
  let opacityOffset = 0
  let searchActive = false
  let menuExpanded = false
  let height: number
  let y: number

  $: opacity = menuExpanded || !opacityOffset ? 1 : Math.min(y / opacityOffset, 1)
  $: menuExpanded = $collapsed && menuExpanded

  onMount(() => {
    const observer = new ResizeObserver(() => {
      opacityOffset = Math.min(250, document.documentElement.scrollHeight - window.innerHeight)
    })

    observer.observe(document.documentElement)

    return () => observer.disconnect()
  })

  afterNavigate(() => (menuExpanded = false))
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={height} />

<header
  class="app-topbar"
  style:--opacity={opacity}
  class:__search-active={searchActive}
  bind:clientHeight={$layoutTopbarHeight}>
  <UiTopbar>
    <div class="app-topbar-content">
      {#if $collapsed}
        <button class="app-topbar-menu-button" on:click={() => (menuExpanded = !menuExpanded)}>
          <Fa icon={menuExpanded ? faTimes : faBars} />
        </button>
      {/if}
      <a class="app-topbar-logo" href="/">
        <img class="w-auto h-8" src={logotipo} width="84" height="84" alt="Viajes Marlopos logo" />
        <span class="font-bold tracking-wider">Viajes Marlopos</span>
      </a>
      <div class="ml-auto app-topbar-search">
        <Omnibox bind:expanded={searchActive} />
      </div>
      <nav class="app-topbar-sections">
        <AppTopbarLink href="/calendar">Calendario</AppTopbarLink>
        <AppTopbarLink href="/about">Nosotros</AppTopbarLink>
      </nav>
    </div>
  </UiTopbar>
  {#if menuExpanded}
    <div class="fixed inset-0 -z-[1] bg-canvas-bg/75" />
    <nav class="flex flex-col">
      <a
        class="block p-4 hover:bg-surface-2-hover text-surface-2-fg focusable focusable-inner focusable-ring"
        href="/calendar">Calendario</a>
      <a
        class="block p-4 hover:bg-surface-2-hover text-surface-2-fg focusable focusable-inner focusable-ring"
        href="/about">Nosotros</a>
    </nav>
  {/if}
</header>
<div class="fixed top-0 left-0 z-10 w-full">
  <AppNavigationProgress />
</div>

<style lang="postcss">
  .app-topbar {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 10;
    color: theme('colors.surface-2.fg');

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 6rem;
      z-index: -1;
      pointer-events: none;
      opacity: calc(1 - var(--opacity, 0));
      transition: opacity 150ms;
      background-image: linear-gradient(180deg, theme('colors.neutral.900 / 50%'), transparent 100%),
        linear-gradient(180deg, theme('colors.neutral.900 / 50%'), transparent 66%),
        linear-gradient(180deg, theme('colors.neutral.900 / 50%'), transparent 33%);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: theme('colors.surface-1.bg / 75%');
      background-clip: content-box;
      border-bottom: 1px solid theme('colors.surface-1.border');
      backdrop-filter: blur(8px);
      opacity: var(--opacity, 0);
      z-index: -1;
    }

    &.__search-active {
      .app-topbar-logo,
      .app-topbar-sections,
      .app-topbar-menu-button {
        @media (width < theme('screens.lg')) {
          display: none;
        }
      }

      .app-topbar-search {
        width: 100%;
        transition: width 250ms ease-in-out;
      }
    }
  }

  .app-topbar-menu-button {
    display: grid;
    place-content: center;
    flex: 0 0 auto;
    width: theme('spacing.10');
    height: theme('spacing.10');
  }

  .app-topbar-content {
    display: flex;
    align-items: center;
    gap: theme('spacing.4');
    width: 100%;
    height: theme('spacing.16');

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      max-width: theme('screens.xl');
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      background-image: linear-gradient(to right, #a87ffb, #25a6e9);
      filter: blur(64px);
      opacity: calc(var(--opacity, 0) * 0.5);
    }
  }

  .app-topbar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-wrap: nowrap;
    flex-shrink: 0;
    padding: theme('spacing.2');
    outline: none;

    &:focus-visible {
      background-color: theme('colors.primary.300');
      border-radius: theme('borderRadius.DEFAULT');
    }
  }

  .app-topbar-search {
    width: 40px;
    transition: width 250ms 250ms ease-in-out;
    /* outline: 1px solid red; */
  }

  .app-topbar-sections {
    display: none;

    @media (min-width: theme('screens.md')) {
      display: flex;
      height: 100%;
      gap: theme('spacing.4');
    }
  }
</style>
