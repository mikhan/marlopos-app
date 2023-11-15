<div class="prose">
  <slot />
</div>

<style lang="postcss">
  .prose {
    display: contents;
    line-height: theme('lineHeight.relaxed');

    :global {
      & > *:first-child {
        margin-top: 0;
      }

      h1 {
        font-size: theme('fontSize.3xl[0]');
        line-height: theme('fontSize.3xl[0]');
        text-wrap: balance;
      }

      h2 {
        font-size: theme('fontSize.2xl[0]');
        line-height: theme('fontSize.2xl[0]');
        text-wrap: balance;
      }

      h3 {
        font-size: theme('fontSize.xl[0]');
        line-height: theme('fontSize.xl[0]');
        text-wrap: balance;
      }

      p {
        margin-top: theme('spacing.5');
        text-wrap: pretty;
      }

      blockquote {
        margin-top: theme('spacing.5');
        border-inline-start: theme('spacing[1.5]') solid theme('colors.neutral.500');
        padding-block: theme('spacing.2');
        padding-inline: theme('spacing.6');
        background-color: theme('colors.neutral.700');
        color: theme('colors.neutral.700-fg');
        border-radius: theme('borderRadius.DEFAULT');
      }

      ul {
        list-style-type: disc;
        margin-top: theme('spacing.5');
        padding-left: theme('spacing.6');
      }

      li {
        padding-left: theme('spacing[1.5]');
        margin-block: theme('spacing.2');

        &::marker {
          opacity: 0.75;
        }
      }

      a[href] {
        @apply link;
      }
    }
  }
</style>
