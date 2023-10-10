<script lang="ts">
  import type { Action } from 'svelte/action'
  import backgroundLgJpeg from './services-1-lg.jpg?format=jpg&as=url'
  import backgroundLgWebp from './services-1-lg.jpg?format=webp&as=url'
  import backgroundSmJpeg from './services-1-sm.jpg?format=jpg&as=url'
  import backgroundSmWebp from './services-1-sm.jpg?format=webp&as=url'

  const parallax: Action<HTMLElement> = (element) => {
    const abortController = new AbortController()
    let active = false

    function onScroll() {
      const limit = element.clientHeight + window.innerHeight
      const offset = window.scrollY - (element.offsetTop - window.innerHeight)
      const position = offset / limit
      element.style.setProperty('--parallax-position', position.toFixed(2))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || active === entry.isIntersecting) return

        active = entry.isIntersecting

        if (active) {
          window.addEventListener('scroll', onScroll, { signal: abortController.signal, passive: true })
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: [0, 1] },
    )

    observer.observe(element)
    abortController.signal.onabort = () => {
      observer.disconnect()
    }

    onScroll()

    return {
      destroy: () => abortController.abort(),
    }
  }
</script>

<article use:parallax>
  <picture class="block sm:hidden">
    <source srcset={backgroundSmWebp} type="image/webp" />
    <img src={backgroundSmJpeg} alt="" class="object-cover w-full h-full" loading="lazy" />
  </picture>
  <picture class="hidden sm:block">
    <source srcset={backgroundLgWebp} type="image/webp" />
    <img src={backgroundLgJpeg} alt="" class="object-cover w-full h-full" loading="lazy" />
  </picture>
  <p class="leading-relaxed text-center text-white text-balance text-xl-fluid font-display">
    Contamos con más de <strong class="bg-[hsl(172_38%_46%)] px-3 py-1 rounded whitespace-nowrap"
      >15 años de experiencia</strong> en la operación, programación y comercialización de todo tipo de servicios turísticos.
  </p>
</article>

<style lang="postcss">
  article {
    --parallax-offset: calc(720px - theme('screens.sm'));
    --parallax-position: 0px;
    position: relative;
    display: grid;
    place-content: center;
    width: 100%;
    height: theme('screens.sm');
    padding-inline: theme('spacing.4');
    overflow: hidden;
  }

  picture {
    --offset: calc(var(--parallax-offset) * var(--parallax-position));
    position: absolute;
    inset: 0;
    top: calc(var(--parallax-offset) * -1);
    transform: translateY(var(--offset));
    transition: transform 50ms linear;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.7;
      background-color: theme('colors.canvas.bg/75%');
      background-image: radial-gradient(rgb(0 0 0 / 75%) 1px, transparent 1px);
      background-size: 4px 4px;
      mix-blend-mode: multiply;
      pointer-events: none;
    }
  }

  p {
    max-width: theme('screens.md');
    z-index: 1;
  }
</style>
