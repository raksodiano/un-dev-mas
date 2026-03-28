import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

const parser = new MarkdownIt();

export async function GET(context) {
	const blogPosts = await getCollection('blog');
	const writings = await getCollection('writings');
	const allPosts = [...blogPosts, ...writings];

	const siteUrl = context.site.href;

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		trailingSlash: false,
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom'
		},
		customData: `<atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml"/>`,
		items: allPosts.map((post) => {
			const contentHtml = parser.render(post.body || '');
			const absoluteContent = contentHtml.replace(/src="\.\//g, `src="${siteUrl}`);

			const coverImage = post.data.coverImage;
			const coverUrl = coverImage
				? `${siteUrl}${coverImage.src.replace(/^\//, '')}`
						.replace(/\.png$/i, '.webp')
						.replace(/\.jpg$/i, '.webp')
						.replace(/\.jpeg$/i, '.webp')
				: undefined;

			return {
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/${post.id}/`,
				content: sanitizeHtml(absoluteContent, {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code']),
					allowedAttributes: {
						...sanitizeHtml.defaults.allowedAttributes,
						'*': ['class', 'style']
					}
				}),
				enclosure: coverUrl
					? {
							url: coverUrl,
							length: 0,
							type: 'image/jpeg'
						}
					: undefined
			};
		})
	});
}
