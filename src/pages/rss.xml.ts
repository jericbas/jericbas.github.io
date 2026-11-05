import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const siteUrl = context.site ? context.site.toString().replace(/\/$/, '') : 'https://jericbas.github.io';

  const itemsXml = sorted
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${siteUrl}/blog/${post.id}</link>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${post.id}</guid>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jeric Bas | Devlog &amp; Portfolio</title>
    <description>Living developer journal and open-source updates by Jeric Bas.</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
