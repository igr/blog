import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import sitemap from '@astrojs/sitemap';
import remarkFlexibleContainers from 'remark-flexible-containers';
import {pagefind} from "./src/integrations/pagefind.ts";

// https://astro.build/config
export default defineConfig({
  site: 'https://oblac.rs',
  integrations: [
    mdx(),
    sitemap(),
    pagefind()
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
