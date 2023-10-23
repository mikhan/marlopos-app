<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import IconButton from '$core/components/icon-button.svelte'
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
      <IconButton
        icon={menuExpanded ? faTimes : faBars}
        title={menuExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        on:click={() => (menuExpanded = !menuExpanded)}
        aria-haspopup="true"
        aria-expanded={menuExpanded}
        aria-controls={navigationMenuId} />
    {/if}
    <a class="app-topbar-logo" href="/" data-sveltekit-preload-data>
      <picture>
        <source srcset={logotipoWebp} type="image/webp" />
        <img src={logotipo} width="32" height="32" alt="Viajes Marlopos logo" />
      </picture>
      <span>Viajes Marlopos</span>
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

    &.__expanded {
      height: 100dvh;

      &::after {
        background-color: theme('colors.surface-1.bg');
      }
    }
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
    display: grid;
    grid-template-columns: theme('spacing.8') max-content;
    gap: 8px;
    align-items: center;
    text-wrap: nowrap;
    flex-shrink: 0;
    width: 200px;
    outline: none;
    border-radius: theme('borderRadius.DEFAULT');
    font-weight: theme('fontWeight.bold');
    letter-spacing: theme('letterSpacing.wider');
    text-transform: uppercase;
    opacity: 1;
    @apply focusable-visible focusable-ring;
    transition-property: outline-color, outline-offset, width, opacity;
    transition-duration: 150ms, 250ms, 250ms, 250ms;

    span {
      opacity: 1;
      transition: opacity 250ms;
    }

    .app-topbar.__search-active & {
      @media (width < theme('screens.md')) {
        width: 0;
        opacity: 0;
        margin-right: calc(theme('spacing.4') * -1);
      }
      @media (min-width: theme('screens.md')) {
        width: theme('spacing.8');

        span {
          opacity: 0;
        }
      }
    }
  }

  .app-topbar-search {
    width: theme('spacing.10');
    transition: width 250ms ease-in-out;

    @media (min-width: theme('screens.md')) {
      width: theme('spacing.44');
    }

    .app-topbar.__search-active & {
      width: 100%;
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
