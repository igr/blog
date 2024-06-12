import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import sitemap from '@astrojs/sitemap';
import remarkFlexibleContainers from 'remark-flexible-containers';

// https://astro.build/config
export default defineConfig({
  site: 'https://oblac.rs',
  integrations: [
    mdx(),
    sitemap(),
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
