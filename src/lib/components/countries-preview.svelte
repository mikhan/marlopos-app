<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'

  export let data: any[] = []
</script>

<section class="layout layout-fullbleed gap-8 py-16 my-16 bg-neutral-50">
  <h1 class="text-4xl text-center font-serif">Destinos principales</h1>
  <ul>
    {#each data as item}
      <li>
        <picture class="image">
          <Blurhash blurhash={item.cover.blurhash} />
          <Image src={item.cover.src} sizes="33vw" decoding="async" alt="" fit="cover" />
        </picture>
        <div>
          <div class="text-xl font-serif tracking-wider">{item.name}</div>
          <div class="text-sm">
            <span class="whitespace-nowrap">{item.packages} paquetes</span><span
              class="whitespace-nowrap hidden md:inline">{item.destinations} destinos</span>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  section {
    --app-layout-content: theme('screens.lg');
  }

  ul {
    --grid_gap: 1rem;
    --grid_size: calc(calc(100% - calc(var(--grid_gap) * 2)) / 3);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    gap: var(--grid_gap);

    @media (min-width: theme('screens.sm')) {
      grid-template-columns: repeat(3, 1fr);

      li {
        &:first-child {
          grid-row: span 2;
          padding-top: var(--grid_gap);

          &::before {
            margin-top: 100%;
          }
        }

        &:nth-child(2) {
          grid-column: span 2;
        }

        &:nth-child(3):last-child {
          grid-column: span 2;
        }

        &:nth-child(3n + 5):last-child {
          grid-column: span 3;
        }

        &:nth-child(3n + 6):last-child {
          grid-column: span 2;
        }
      }
    }
  }

  li {
    display: grid;
    position: relative;
    outline: 1px solid transparent;
    contain: content;

    &:first-child::before {
      content: '';
      display: block;
      width: 100%;
      aspect-ratio: 1/1;
    }

    &:is(:hover, :focus-within) {
      picture {
        transform: scale(1.3);
        // filter: blur(1px);
      }
    }

    &:focus-within {
      outline: 2px solid theme('colors.primary.500');
      outline-offset: 2px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: absolute;
      inset: 0;
      padding: 1rem;
      background-image: linear-gradient(to top, theme('colors.neutral.100 / 90%'), transparent);
    }
  }

  a {
    outline: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }
  }

  span + span::before {
    content: '・';
  }

  picture {
    position: absolute;
    inset: 0;
    z-index: -1;
    isolation: isolate;
    transform: scale(1) translate3d(0, 0, 0);
    transition: transform 500ms ease-in-out;

    :global(img) {
      // image-rendering: optimizeQuality;
    }
  }
</style>
