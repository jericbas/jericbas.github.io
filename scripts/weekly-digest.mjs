async function run() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_PAT;
  const username = process.env.GITHUB_USERNAME || 'jericbas';
  const currentRepo = process.env.GITHUB_REPOSITORY || 'jericbas/jericbas.github.io';

  console.log(`Running weekly inspiration generator for @${username}...`);

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'jericbas-weekly-reminder',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Fetch recent public activity/events for user
  const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=100`;
  const eventsRes = await fetch(eventsUrl, { headers });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const highlightsByRepo = new Map();

  if (eventsRes.ok) {
    const events = await eventsRes.json();
    for (const evt of events) {
      const evtDate = new Date(evt.created_at);
      if (evtDate < oneWeekAgo) continue;

      const repoName = evt.repo?.name;
      if (!repoName) continue;

      if (!highlightsByRepo.has(repoName)) {
        highlightsByRepo.set(repoName, []);
      }

      if (evt.type === 'PushEvent' && evt.payload?.commits) {
        for (const commit of evt.payload.commits) {
          const msg = commit.message ? commit.message.split('\n')[0] : 'Commit update';
          highlightsByRepo.get(repoName).push({
            type: 'commit',
            message: msg,
            sha: (commit.sha || '').substring(0, 7),
            url: `https://github.com/${repoName}/commit/${commit.sha}`,
          });
        }
      } else if (evt.type === 'PullRequestEvent') {
        const action = evt.payload?.action || 'updated';
        const title = evt.payload?.pull_request?.title || 'PR update';
        highlightsByRepo.get(repoName).push({
          type: 'pr',
          message: `${action}: ${title}`,
          url: evt.payload?.pull_request?.html_url || `https://github.com/${repoName}/pulls`,
        });
      } else if (evt.type === 'CreateEvent') {
        const refType = evt.payload?.ref_type || 'branch';
        const refName = evt.payload?.ref || '';
        highlightsByRepo.get(repoName).push({
          type: 'create',
          message: `Created ${refType} ${refName}`.trim(),
          url: `https://github.com/${repoName}`,
        });
      }
    }
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const weekStartStr = oneWeekAgo.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  let activityMarkdown = '';
  const activeRepos = Array.from(highlightsByRepo.entries()).filter(([_, items]) => items.length > 0);

  if (activeRepos.length === 0) {
    activityMarkdown = `*No public activity detected in the past 7 days across your GitHub profile. Take a breath, or write about an ongoing offline experiment!*`;
  } else {
    // Sort so user's own repos (jericbas/*) appear first
    activeRepos.sort(([a], [b]) => {
      const aIsOwn = a.toLowerCase().startsWith(username.toLowerCase() + '/');
      const bIsOwn = b.toLowerCase().startsWith(username.toLowerCase() + '/');
      if (aIsOwn && !bIsOwn) return -1;
      if (!aIsOwn && bIsOwn) return 1;
      return a.localeCompare(b);
    });

    for (const [repo, items] of activeRepos) {
      activityMarkdown += `\n#### 📦 [${repo}](https://github.com/${repo})\n`;
      const uniqueItems = items.slice(0, 5); // top 5 per repo
      for (const item of uniqueItems) {
        if (item.url) {
          activityMarkdown += `- [${item.sha || item.type}](${item.url}): ${item.message}\n`;
        } else {
          activityMarkdown += `- ${item.message}\n`;
        }
      }
    }
  }

  const issueTitle = `💡 Weekly Devlog Inspiration: ${weekStartStr} - ${dateStr}`;
  const issueBody = `### 🌟 Your Weekly Engineering Summary

Kamusta Jeric! Here is what you pushed across your public repositories this past week:

${activityMarkdown}

---

### ✍️ Writing Prompts to Spark an Article
1. **The Core Obstacle**: What unexpected edge case or build error consumed the most time this week?
2. **Architecture Choice**: Did you pick a specific Rust pattern, npm strategy, or Vite hook? Why?
3. **Drafting a Post**: You can add a new markdown file in \`src/content/blog/\` on your \`jericbas.github.io\` repo and test it locally anytime with \`bun run dev\`! (Use \`draft: true\` if you want to save thoughts privately without publishing yet).

*This reminder runs automatically every week. Only 1 reminder issue stays open at any time.*`;

  if (!token) {
    console.log('\n[Dry Run] No GitHub token provided. Preview of weekly issue:');
    console.log('Title:', issueTitle);
    console.log('--------------------------------------------------');
    console.log(issueBody);
    console.log('--------------------------------------------------');
    return;
  }

  // Find and close existing open issues with label "weekly-digest"
  console.log(`Checking for prior open reminder issues in ${currentRepo}...`);
  const listIssuesUrl = `https://api.github.com/repos/${currentRepo}/issues?labels=weekly-digest&state=open`;
  const listRes = await fetch(listIssuesUrl, { headers });

  if (listRes.ok) {
    const openIssues = await listRes.json();
    for (const oldIssue of openIssues) {
      console.log(`Closing prior reminder issue #${oldIssue.number}...`);
      await fetch(`https://api.github.com/repos/${currentRepo}/issues/${oldIssue.number}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          state: 'closed',
          state_reason: 'completed',
        }),
      });
    }
  }

  // Create new single reminder issue
  console.log(`Opening new reminder issue in ${currentRepo}...`);
  const createIssueUrl = `https://api.github.com/repos/${currentRepo}/issues`;
  const createRes = await fetch(createIssueUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody,
      labels: ['weekly-digest', 'inspiration'],
    }),
  });

  if (createRes.ok) {
    const created = await createRes.json();
    console.log(`Successfully created issue #${created.number}: ${created.html_url}`);
  } else {
    const err = await createRes.text();
    console.error('Failed to create reminder issue:', err);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
