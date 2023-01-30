<swatches class="swatches">
  <swatch class="bg-primary-50 text-primary-50-fg">50</swatch>
  <swatch class="bg-primary-100 text-primary-100-fg">100</swatch>
  <swatch class="bg-primary-200 text-primary-200-fg">200</swatch>
  <swatch class="bg-primary-300 text-primary-300-fg">300</swatch>
  <swatch class="bg-primary-400 text-primary-400-fg">400</swatch>
  <swatch class="bg-primary-500 text-primary-500-fg">500</swatch>
  <swatch class="bg-primary-600 text-primary-600-fg">600</swatch>
  <swatch class="bg-primary-700 text-primary-700-fg">700</swatch>
  <swatch class="bg-primary-800 text-primary-800-fg">800</swatch>
  <swatch class="bg-primary-900 text-primary-900-fg">900</swatch>
</swatches>

<swatches class="swatches">
  <swatch class="bg-neutral-50 text-neutral-50-fg">50</swatch>
  <swatch class="bg-neutral-100 text-neutral-100-fg">100</swatch>
  <swatch class="bg-neutral-200 text-neutral-200-fg">200</swatch>
  <swatch class="bg-neutral-300 text-neutral-300-fg">300</swatch>
  <swatch class="bg-neutral-400 text-neutral-400-fg">400</swatch>
  <swatch class="bg-neutral-500 text-neutral-500-fg">500</swatch>
  <swatch class="bg-neutral-600 text-neutral-600-fg">600</swatch>
  <swatch class="bg-neutral-700 text-neutral-700-fg">700</swatch>
  <swatch class="bg-neutral-800 text-neutral-800-fg">800</swatch>
  <swatch class="bg-neutral-900 text-neutral-900-fg">900</swatch>
</swatches>

<style lang="scss" global>
  swatches {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 0.5rem;
    margin: 1rem;
    height: 2rem;

    & > swatch {
      display: grid;
      place-content: center;
      border-radius: 4px;
      font-weight: bolder;
      color: transparent;
    }
  }
</style>
