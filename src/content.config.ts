import {z, defineCollection} from "astro:content";

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    slug: z.optional(z.string()),
    lang: z.optional(z.string())
  })
});
const apothegmsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
});

export const collections = {
  posts: postsCollection,
  apothegms: apothegmsCollection
};
