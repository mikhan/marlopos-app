<script lang="ts">
  import { breakpoints } from '$core/constants/breakpoints'
  import backgroundLgJpeg from './services-1-lg.png?format=jpg&as=url'
  import backgroundLgWebp from './services-1-lg.png?format=webp&as=url'
  import backgroundSmJpeg from './services-1-sm.png?format=jpg&as=url'
  import backgroundSmWebp from './services-1-sm.png?format=webp&as=url'
</script>

<section>
  <picture>
    <source srcset={backgroundSmWebp} type="image/webp" media="(max-width: {breakpoints.sm}px)" />
    <source srcset={backgroundSmJpeg} type="image/jpeg" media="(max-width: {breakpoints.sm}px)" />
    <source srcset={backgroundLgWebp} type="image/webp" />
    <img src={backgroundLgJpeg} alt="" loading="lazy" />
  </picture>
  <p>
    Contamos con más de <strong>15 años de experiencia</strong> en la operación, programación y comercialización de todo
    tipo de servicios turísticos.
  </p>
</section>

<style lang="postcss">
  section {
    --image-size: 720px;
    --container-size: theme('screens.sm');
    position: relative;
    display: grid;
    grid-template: 'stack' 100% / 100%;
    width: 100%;
    height: var(--container-size);

    & > * {
      grid-area: stack;
    }
  }

  picture {
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

  img {
    width: 100%;
    height: 100%;
    object-fit: none;
    object-position: center;
    animation-timeline: view(y 10%);
    animation-name: parallax;
    animation-fill-mode: both;
    animation-duration: 1ms;
    animation-timing-function: linear;
  }

  @keyframes parallax {
    from {
      /* transform: scaleX(0); */
      object-position: center calc(calc(var(--image-size) - var(--container-size)) * -1);
    }

    to {
      /* transform: scaleX(1); */
      object-position: center 0px;
    }
  }

  p {
    max-width: theme('screens.md');
    place-self: center;
    z-index: 1;
    padding-inline: theme('spacing.4');
    font-family: theme('fontFamily.display');
    font-size: theme('fontSize.xl-fluid[0]');
    line-height: theme('fontSize.xl-fluid[1]');
    text-align: center;
    text-wrap: balance;
    color: hsl(172 20% 90%);

    strong {
      background-color: hsl(172 38% 45%);
      padding-block: theme('spacing.1');
      padding-inline: theme('spacing.3');
      border-radius: theme('borderRadius.DEFAULT');
      white-space: nowrap;
    }
  }
</style>
