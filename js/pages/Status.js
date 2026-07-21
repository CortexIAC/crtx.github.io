import { getStoredUser } from '../api.js';

const GITHUB_ORG = 'CortexIAC';
const REPOS = ['SynapseCore', 'synapse-cie', 'Cortex-Studio', 'Cortex-Horizon', 'FloraNode', 'NexusHub', 'Cortex-VoiceLab', 'Cortex-Arsenal', 'Cortex-Service', 'crtx.github.io'];

export async function renderStatus() {
  const page = document.createElement('div');
  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Live</div>
          <h1 class="display-2">Status Dashboard</h1>
          <p class="body-large">Real-time ecosystem health, recent activity, and build status across all CortexIAC repositories.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:40px;">
          <div class="card card-glow" style="padding:24px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:var(--accent-text);" id="totalRepos">-</div>
            <div style="font-size:14px;color:var(--text-tertiary);margin-top:4px;">Repositories</div>
          </div>
          <div class="card card-glow" style="padding:24px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:var(--accent-text);" id="totalCommits">-</div>
            <div style="font-size:14px;color:var(--text-tertiary);margin-top:4px;">Recent Commits</div>
          </div>
          <div class="card card-glow" style="padding:24px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#00d4ff;" id="totalLanguages">-</div>
            <div style="font-size:14px;color:var(--text-tertiary);margin-top:4px;">Languages</div>
          </div>
          <div class="card card-glow" style="padding:24px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#9b51e0;" id="totalContributors">-</div>
            <div style="font-size:14px;color:var(--text-tertiary);margin-top:4px;">Contributors</div>
          </div>
        </div>

        <h2 class="heading-1" style="margin-bottom:24px;">Recent Activity</h2>
        <div id="activityFeed" style="display:flex;flex-direction:column;gap:8px;">
          <div style="text-align:center;padding:40px;color:var(--text-tertiary);">Loading GitHub activity...</div>
        </div>

        <h2 class="heading-1" style="margin:48px 0 24px;">Repositories</h2>
        <div id="repoList" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;">
        </div>
      </div>
    </section>
  `;

  // Fetch GitHub data
  try {
    const headers = { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'crtx-dashboard' };

    // Fetch repos
    let allRepos = [];
    let pageNum = 1;
    while (pageNum < 5) {
      const r = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=30&page=${pageNum}&sort=updated`, { headers });
      const data = await r.json();
      if (!data.length) break;
      allRepos = allRepos.concat(data);
      pageNum++;
    }

    // Or use user repos since CortexIAC is a user
    if (allRepos.length === 0) {
      const r = await fetch(`https://api.github.com/users/${GITHUB_ORG}/repos?per_page=30&sort=updated`, { headers });
      allRepos = await r.json();
    }

    // Stats
    document.getElementById('totalRepos').textContent = allRepos.length;
    const allLangs = new Set();
    allRepos.forEach(r => { if (r.language) allLangs.add(r.language); });
    document.getElementById('totalLanguages').textContent = allLangs.size;

    // Fetch recent commits across repos
    let allCommits = [];
    const commitPromises = allRepos.slice(0, 10).map(async repo => {
      try {
        const r = await fetch(`https://api.github.com/repos/${GITHUB_ORG}/${repo.name}/commits?per_page=5`, { headers });
        const data = await r.json();
        if (Array.isArray(data)) {
          data.forEach(c => allCommits.push({ ...c, repo: repo.name }));
        }
      } catch {}
    });
    await Promise.all(commitPromises);

    document.getElementById('totalCommits').textContent = allCommits.length;

    const contributors = new Set();
    allCommits.forEach(c => { if (c.author?.login) contributors.add(c.author.login); });
    document.getElementById('totalContributors').textContent = contributors.size || 1;

    // Activity feed
    const feed = document.getElementById('activityFeed');
    feed.innerHTML = '';
    allCommits.sort((a, b) => new Date(b.commit?.author?.date) - new Date(a.commit?.author?.date));
    allCommits.slice(0, 30).forEach(c => {
      const item = document.createElement('div');
      item.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:10px;font-size:14px;';
      const date = c.commit?.author?.date ? new Date(c.commit.author.date).toLocaleDateString() : '';
      const msg = c.commit?.message?.split('\n')[0] || '';
      const repo = c.repo || '';
      item.innerHTML = `
        <div style="width:28px;height:28px;border-radius:50%;background:var(--bg-glass);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">💻</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${msg}</div>
          <div style="font-size:12px;color:var(--text-tertiary);">${c.commit?.author?.name || c.author?.login || 'Unknown'} · ${repo} · ${date}</div>
        </div>
      `;
      feed.appendChild(item);
    });

    if (allCommits.length === 0) {
      feed.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-tertiary);">No recent activity or rate limited. Try again later.</div>';
    }

    // Repo list
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = allRepos.slice(0, 20).map(r => `
      <a href="${r.html_url}" target="_blank" style="display:block;padding:16px 20px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:10px;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(0,255,156,0.2)'" onmouseout="this.style.borderColor=''">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:500;color:var(--text-primary);">${r.name}</h3>
          <span style="font-size:13px;color:var(--text-tertiary);">${r.language || ''}</span>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${r.description || 'No description'}</p>
        <div style="display:flex;gap:16px;margin-top:8px;font-size:12px;color:var(--text-tertiary);">
          <span>⭐ ${r.stargazers_count}</span>
          <span>⑂ ${r.forks_count}</span>
          <span>${new Date(r.updated_at).toLocaleDateString()}</span>
        </div>
      </a>
    `).join('');

  } catch (e) {
    document.getElementById('activityFeed').innerHTML = `<div style="text-align:center;padding:40px;color:#ff6b6b;">Failed to load: ${e.message}</div>`;
  }

  return page;
}
