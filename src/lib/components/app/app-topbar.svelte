<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { getUiShellContext } from '$core/components/shell/ui-shell.svelte'
  import { disableDocumentScrolling, enableDocumentScrolling } from '$core/services/popup'
  import { matchMedia } from '$core/stores/match-media'
  import { generateUID } from '$core/utils/element'
  import logotipo from '$lib/assets/logotipo.png?w=32&h=32&as=url'
  import logotipoWebp from '$lib/assets/logotipo.png?w=32&h=32&format=webp&as=url'
  import AppNavigationProgress from '$lib/components/app/app-navigation-progress.svelte'
  import Omnibox from '../search/omnibox.svelte'
  import AppTopbarLink from './app-topbar-link.svelte'

  const { layoutTopbarHeight } = getUiShellContext()

  const collapsed = matchMedia('(width < 768px)')
  const navigationMenuId = generateUID()
  let container: HTMLElement
  let opacityOffset = 0
  let searchActive = false
  let menuExpanded = false
  let height: number
  let y: number

  $: opacity = menuExpanded || !opacityOffset ? 1 : Math.min(y / opacityOffset, 1)
  $: menuExpanded = $collapsed && menuExpanded
  $: if (menuExpanded) {
    disableDocumentScrolling()
  } else {
    enableDocumentScrolling()
  }

  const sections = [
    { name: 'Calendario', href: '/calendar' },
    { name: 'Nosotros', href: '/about' },
  ]

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === document.documentElement) {
          opacityOffset = Math.min(250, document.documentElement.scrollHeight - window.innerHeight)
        } else if (entry.target === container) {
          layoutTopbarHeight.set(entry.contentRect.height)
        }
      }
    })

    observer.observe(document.documentElement)
    observer.observe(container)

    return () => observer.disconnect()
  })

  afterNavigate(() => (menuExpanded = false))
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={height} />

<header
  class="app-topbar layout-container"
  style:--opacity={opacity}
  class:__search-active={searchActive}
  class:__expanded={menuExpanded}
  bind:this={container}>
  <div class="app-topbar-content layout-lg">
    {#if $collapsed}
      <button
        class="app-topbar-menu-button"
        on:click={() => (menuExpanded = !menuExpanded)}
        title={menuExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        aria-haspopup="true"
        aria-expanded={menuExpanded}
        aria-controls={navigationMenuId}>
        <Fa icon={menuExpanded ? faTimes : faBars} />
      </button>
    {/if}
    <a class="app-topbar-logo" href="/" data-sveltekit-preload-data>
      <picture>
        <source srcset={logotipoWebp} type="image/webp" />
        <img class="w-8 h-8" src={logotipo} width="32" height="32" alt="Viajes Marlopos logo" />
      </picture>
      <span class="font-bold tracking-wider uppercase">Viajes Marlopos</span>
    </a>
    <div class="ml-auto app-topbar-search">
      <Omnibox bind:expanded={searchActive} />
    </div>
    <nav class="app-topbar-sections">
      <ul class="flex h-full gap-4">
        {#each sections as { name, href }}
          <li>
            <AppTopbarLink {href}>{name}</AppTopbarLink>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  {#if menuExpanded}
    <nav class="flex flex-col" id={navigationMenuId}>
      <ul>
        {#each sections as { name, href }}
          <li>
            <AppTopbarLink {href}>{name}</AppTopbarLink>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>
<div class="fixed top-0 left-0 z-10 w-full">
  <AppNavigationProgress />
</div>

<style lang="postcss">
  .app-topbar {
    --opacity: 0;
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
      opacity: calc(1 - var(--opacity));
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
      transition: opacity 150ms, background-color 250ms;
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

    &.__expanded {
      height: 100dvh;

      &::after {
        background-color: theme('colors.surface-1.bg');
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
    isolation: isolate;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: theme('spacing.32');
      max-width: theme('screens.xl');
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateZ(0);
      pointer-events: none;
      background-image: linear-gradient(to right, #a87ffb, #25a6e9);
      filter: blur(128px);
      opacity: calc(var(--opacity) * 0.75);
      transition: opacity 250ms;
      z-index: -1;
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
    border-radius: theme('borderRadius.DEFAULT');
    @apply focusable-visible focusable-ring;
  }

  .app-topbar-search {
    width: theme('spacing.10');
    transition: width 250ms 250ms ease-in-out;

    @media (min-width: theme('screens.md')) {
      width: theme('spacing.44');
    }
  }

  .app-topbar-sections {
    display: none;
    height: 100%;

    @media (min-width: theme('screens.md')) {
      display: block;
    }
  }
</style>
