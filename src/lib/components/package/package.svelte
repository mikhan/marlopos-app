<script lang="ts">
  import { getUiShellContext } from '$core/components/shell/ui-shell.svelte'
  import DynamicContent from '../common/dynamic-content.svelte'
  import SectionHeader from '../common/section-header.svelte'
  import ShareMenu from '../share/share-menu.svelte'
  import PackageCover from './package-cover.svelte'
  import PackageDestinations from './package-destinations.svelte'
  import PackageSchedule from './package-schedule.svelte'

  export let data: Api.Package

  const { layoutTopbarHeight } = getUiShellContext()
  $: marginTop = `${$layoutTopbarHeight * -1}px`
</script>

<article class="mb-16 -mt-16 layout-container gap-y-4 layout-padding" style:margin-top={marginTop}>
  <div class="w-full mx-auto max-w-screen-2xl">
    <PackageCover data={data.cover} />
  </div>
  <div class="flex flex-col gap-4 layout-md relative z-[1]">
    <header class="text-shadow">
      <h1 class="font-display text-4xl-fluid text-surface-1-fg">{data.name}</h1>
      <div class="text-xl text-surface-1-fg">{data.description}</div>
    </header>
    <ShareMenu />
    <DynamicContent html={data.content} />
  </div>
  <div class="layout-md">
    <SectionHeader class="mt-8">Salidas</SectionHeader>
  </div>
  <div class="relative layout-md">
    <PackageSchedule data={data.schedule} />
  </div>
  <div class="layout-md">
    <SectionHeader class="mt-8" id="destinations-list-header">Destinos incluídos</SectionHeader>
  </div>
  <PackageDestinations data={data.destinations} />
</article>
