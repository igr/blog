import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import remarkFlexibleContainers from 'remark-flexible-containers';

// https://astro.build/config
export default defineConfig({
  site: 'https://oblac.rs',
  integrations: [
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      [remarkFlexibleContainers, {
        containerClassName: '',
      }]
    ],
    shikiConfig: {
      theme: 'dracula-soft',
      wrap: true,
      transformers: [],
    },
  },
});
