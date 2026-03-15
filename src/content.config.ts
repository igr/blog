import {defineCollection} from "astro:content";
import {z} from "astro/zod";
import {glob} from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({entry, data}) => {
      if (data.slug) return data.slug as string;
      return entry.replace(/\/index\.md$/, '').replace(/\.md$/, '');
    }
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    slug: z.optional(z.string()),
    lang: z.optional(z.string())
  })
});
const apothegmsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/apothegms',
  }),
  schema: z.object({
    title: z.string()
  })
});

export const collections = {
  posts: postsCollection,
  apothegms: apothegmsCollection
};
