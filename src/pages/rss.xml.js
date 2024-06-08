import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import {site} from '../config';

export async function GET(context) {
  const blog = await getCollection('posts');
  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    trailingSlash: false,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
    customData: `<language>sr-RS</language>`,
  });
}
