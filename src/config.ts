export const site = {
    title: "Oblac",
    description: "Oblac blog : stav | razvoj | lično",
    author: "Igor",
}

import { z, defineCollection } from "astro:content";
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        slug: z.optional(z.string())
    })
});
export const collections = {
    posts: postsCollection,
};
