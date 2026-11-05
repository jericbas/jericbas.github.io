import fs from 'node:fs';
import path from 'node:path';

// Parse frontmatter from markdown files
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const rawYaml = match[1];
  const metadata = {};

  for (const line of rawYaml.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      }
      metadata[key] = val;
    }
  }
  return metadata;
}

async function run() {
  const blogDir = path.resolve('src/content/blog');
  if (!fs.existsSync(blogDir)) {
    console.error('Blog directory not found at', blogDir);
    process.exit(1);
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = [];

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const meta = parseFrontmatter(content);
    if (meta && meta.draft !== true && meta.title && meta.pubDate) {
      const slug = file.replace(/\.(md|mdx)$/, '');
      posts.push({
        slug,
        title: meta.title,
        pubDate: new Date(meta.pubDate),
      });
    }
  }

  // Sort by date descending, pick top 4
  posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  const latestPosts = posts.slice(0, 4);

  console.log(`Found ${latestPosts.length} published posts to sync:`);
  latestPosts.forEach((p) => console.log(` - ${p.title} (${p.slug})`));

  // Build clean, non-crowded markdown snippet
  const listItems = latestPosts
    .map((p) => {
      const formattedDate = p.pubDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `- [**${p.title}**](https://jericbas.github.io/blog/${p.slug}) - *${formattedDate}*`;
    })
    .join('\n');

  const generatedSection = `<!-- BLOG-POSTS:START -->
### 📝 Latest Journey & Devlog Posts
${listItems}

👉 *Read more articles on my [live portfolio & devlog](https://jericbas.github.io)*
<!-- BLOG-POSTS:END -->`;

  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  const targetRepo = process.env.TARGET_REPO || 'jericbas/jericbas';

  if (!token) {
    console.log('\n[Dry Run] No GH_PAT environment variable provided.');
    console.log('Generated content that will sync to your profile README:');
    console.log('--------------------------------------------------');
    console.log(generatedSection);
    console.log('--------------------------------------------------');
    console.log('To sync automatically to github.com/jericbas/jericbas, set GH_PAT secret in GitHub repository settings.');
    return;
  }

  // Fetch current README from target repo via GitHub API
  console.log(`\nConnecting to GitHub API for ${targetRepo}...`);
  const getUrl = `https://api.github.com/repos/${targetRepo}/contents/README.md`;
  const getRes = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jericbas-sync-script',
    },
  });

  if (!getRes.ok) {
    console.error(`Failed to fetch README.md from ${targetRepo}: ${getRes.status} ${getRes.statusText}`);
    return;
  }

  const fileData = await getRes.json();
  const sha = fileData.sha;
  const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');

  let updatedContent = '';
  const startTag = '<!-- BLOG-POSTS:START -->';
  const endTag = '<!-- BLOG-POSTS:END -->';

  if (currentContent.includes(startTag) && currentContent.includes(endTag)) {
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'g');
    updatedContent = currentContent.replace(regex, generatedSection);
  } else {
    // Append at the bottom if markers don't exist yet
    updatedContent = `${currentContent.trim()}\n\n${generatedSection}\n`;
  }

  if (updatedContent === currentContent) {
    console.log('Profile README is already up to date!');
    return;
  }

  // Commit update back to GitHub
  console.log('Updating README.md on jericbas/jericbas...');
  const putRes = await fetch(getUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jericbas-sync-script',
    },
    body: JSON.stringify({
      message: 'docs: sync latest devlog posts from jericbas.github.io [skip ci]',
      content: Buffer.from(updatedContent).toString('base64'),
      sha,
    }),
  });

  if (putRes.ok) {
    console.log('Successfully updated jericbas/jericbas README!');
  } else {
    const errorText = await putRes.text();
    console.error('Failed to update README:', errorText);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
