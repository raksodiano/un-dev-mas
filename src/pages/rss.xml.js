import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const blogPosts = await getCollection('blog');
	const writings = await getCollection('writings');
	const allPosts = [...blogPosts, ...writings];
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts.map((post) => ({
			...post.data,
			link: `/${post.id}/`
		}))
	});
}
