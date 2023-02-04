<script lang="ts">
  // import LanguageWwitch from './language-switch.svelte'
  import Topbar from '$core/components/topbar.svelte'
  import { layoutStore } from '$lib/stores/layout.store'
  import logo from '../assets/logotipo.webp'

  let y: number
  const opacityOffset = 250

  $: opacity = Math.min(y / opacityOffset, 1)
  $: height = `${$layoutStore.topbar.height * -1}px`
</script>

<svelte:window bind:scrollY={y} />

<header class="app-topbar" style:--opacity={opacity} style:height>
  <Topbar>
    <div class="flex items-center gap-4 w-full">
      <img class="app-topbar-logo" src={logo} width="105" height="105" alt="" />
      <h1 class="text-xl font-serif tracking-wider">Inicio</h1>
      <!-- <LanguageWwitch /> -->
    </div>
  </Topbar>
</header>

<style lang="scss">
  .app-topbar {
    --height: theme('spacing.16');
    --opacity: 0;
    display: grid;
    position: sticky;
    top: 0;
    z-index: 2;
    height: var(--height);
    background-image: linear-gradient(to bottom, theme('colors.base'), transparent);

    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: theme('colors.neutral.200 / 50%');
      background-clip: content-box;
      border-bottom: 1px solid theme('colors.neutral.300 / 50%');
      backdrop-filter: saturate(50%) blur(4px);
      opacity: var(--opacity);
      z-index: -1;
    }

    &-logo {
      height: theme('spacing.12');
      width: auto;
    }
  }
</style>
