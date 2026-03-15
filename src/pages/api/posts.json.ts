import type {APIContext} from 'astro';
import {getCollection} from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((post) => ({
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      date: post.data.date,
    }));

  return new Response(JSON.stringify(posts), {
    headers: {'Content-Type': 'application/json'},
  });
}
