<script lang="ts">
  import { writable } from 'svelte/store'

  const sizes = {
    // 'base': { normal: 'text-base', fluid: 'text-base-fluid' },
    'lg': { normal: 'text-lg', fluid: 'text-lg-fluid' },
    'xl': { normal: 'text-xl', fluid: 'text-xl-fluid' },
    '2xl': { normal: 'text-2xl', fluid: 'text-2xl-fluid' },
    '3xl': { normal: 'text-3xl', fluid: 'text-3xl-fluid' },
    '4xl': { normal: 'text-4xl', fluid: 'text-4xl-fluid' },
    '5xl': { normal: 'text-5xl', fluid: 'text-5xl-fluid' },
  }

  let text = 'The quick brown fox jumps over the lazy dog'

  const resize = writable(0)

  const getStyle = (node: HTMLElement) => {
    const style = getComputedStyle(node)
    const fontSize = Number.parseFloat(style.fontSize)
    const lineHeight = Number.parseFloat(style.lineHeight)
    return `${fontSize.toFixed(2)}/${(lineHeight / fontSize).toFixed(2)}`
  }

  function printFontSize(node: HTMLElement, id: string) {
    const target = document.getElementById(id)
    if (!target) return

    const update = () => (node.textContent = getStyle(target))
    update()
    const unsubscribe = resize.subscribe(() => update())
    return { destroy: () => unsubscribe() }
  }

  function setHeight(node: HTMLElement, id: string) {
    const target = document.getElementById(id)
    if (!target) return

    const update = () => (node.style.height = getComputedStyle(node).fontSize)
    update()
    const unsubscribe = resize.subscribe(() => update())
    return { destroy: () => unsubscribe() }
  }
</script>

<svelte:window on:resize={() => $resize++} />
<div class="text-xs" />
<div class="text-sm" />
<div class="text-base" />
<div class="text-lg-fluid" />
<div class="text-xl" />
<div class="text-xl-fluid" />
<div class="text-2xl" />
<div class="text-2xl-fluid" />
<div class="text-3xl" />
<div class="text-3xl-fluid" />
<div class="text-4xl" />
<div class="text-4xl-fluid" />
<div class="text-5xl" />
<div class="text-5xl-fluid" />
<div class="grid gap-4 p-4">
  {#each Object.entries(sizes) as [name, config], i}
    <div class="grid grid-cols-[3ch,1fr,auto] items-baseline gap-2">
      <small class="text-right">
        {name}
      </small>
      <div class="grid items-baseline grid-cols-[1fr,1fr,0] overflow-clip">
        <div
          class="{config.normal} relative truncate outline-1 -outline-offset-1 outline-dotted outline-canvas-fg/25"
          id={`test-normal-${i}`}>
          <span>{text}</span>
          <span
            class="absolute left-0 w-full -translate-y-1/2 top-1/2 bg-canvas-fg/10"
            use:setHeight={`test-normal-${i}`} />
        </div>
        <div
          class="{config.fluid} relative truncate outline-1 -outline-offset-1 outline-dotted outline-canvas-fg/25"
          id={`test-fluid-${i}`}>
          <span>{text}</span>
          <span
            class="absolute left-0 w-full -translate-y-1/2 top-1/2 bg-canvas-fg/10"
            use:setHeight={`test-normal-${i}`} />
        </div>
        <div class="w-screen border-t border-dashed border-canvas-fg/50 -translate-x-[100vw]" />
      </div>
      <div class="self-center font-mono">
        <div use:printFontSize={`test-normal-${i}`} />
        <div use:printFontSize={`test-fluid-${i}`} />
      </div>
    </div>
  {/each}
</div>
