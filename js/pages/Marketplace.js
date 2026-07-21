import { getAllApps, getStatusClass } from '../data/apps.js';
import { navigate } from '../router.js';

export function renderMarketplace() {
  const page = document.createElement('div');

  const apps = getAllApps();

  const communityPlugins = [
    { name: 'Terminal Plus', icon: '💻', desc: 'Advanced multi-tab terminal with SSH, Docker, and session persistence.', author: 'Community', downloads: 521, url: 'https://github.com/CortexIAC/crtx.github.io/releases', verified: false },
    { name: 'Audio Visualizer', icon: '🎵', desc: 'Real-time audio spectrum analyzer with FFT rendering and waveform display.', author: 'Community', downloads: 143, url: '#', verified: false },
    { name: 'Weather Station', icon: '🌤', desc: 'Local weather monitoring with 7-day forecasts and historical charts.', author: 'Community', downloads: 67, url: '#', verified: false },
    { name: 'PDF Toolkit', icon: '📄', desc: 'Merge, split, compress, and annotate PDFs entirely offline.', author: 'Community', downloads: 412, url: '#', verified: false },
    { name: 'Network Scanner', icon: '🌐', desc: 'LAN device discovery, port scanning, and service fingerprinting.', author: 'Community', downloads: 176, url: '#', verified: false },
  ];

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Extensions</div>
          <h1 class="display-2">Plugin Marketplace</h1>
          <p class="body-large">Official Synapse applications and community plugins. All software is open source and runs entirely on your hardware.</p>
        </div>

        <div style="margin-bottom:32px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
          <input id="pluginSearch" type="text" placeholder="Search plugins..." style="flex:1;min-width:200px;max-width:400px;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:10px;color:var(--text-primary);font-size:15px;">
          <div style="display:flex;gap:8px;">
            <button class="filter-btn active" data-filter="all" style="padding:8px 16px;border-radius:8px;font-size:13px;background:var(--accent-dim);color:var(--accent-text);border:1px solid var(--border-accent);cursor:pointer;">All</button>
            <button class="filter-btn" data-filter="official" style="padding:8px 16px;border-radius:8px;font-size:13px;background:var(--bg-glass);color:var(--text-secondary);border:1px solid var(--border-subtle);cursor:pointer;">Official</button>
            <button class="filter-btn" data-filter="community" style="padding:8px 16px;border-radius:8px;font-size:13px;background:var(--bg-glass);color:var(--text-secondary);border:1px solid var(--border-subtle);cursor:pointer;">Community</button>
          </div>
        </div>

        <div id="pluginGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;"></div>
      </div>
    </section>
  `;

  let currentFilter = 'all';
  let searchQuery = '';

  function renderGrid() {
    const grid = page.querySelector('#pluginGrid');
    const combined = [
      ...apps.map(a => ({
        id: a.id, name: a.name, icon: a.icon, desc: a.description,
        author: 'CRTX', downloads: 0, url: `#/app/${a.id}`,
        verified: true, version: a.currentVersion, status: a.developmentStatus,
        type: 'official', platforms: a.platform, github: a.github,
      })),
      ...communityPlugins.map(p => ({ ...p, type: 'community', version: '', status: '', platforms: [], github: '' }))
    ];

    const filtered = combined.filter(item => {
      if (currentFilter !== 'all' && item.type !== currentFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      }
      return true;
    });

    grid.innerHTML = filtered.map(item => `
      <div class="card card-glow plugin-card" data-type="${item.type}" style="position:relative;padding:24px;cursor:${item.url.startsWith('#') ? 'pointer' : 'default'};">
        ${item.verified ? '<div style="position:absolute;top:16px;right:16px;font-size:11px;padding:3px 10px;border-radius:9999px;background:rgba(0,255,156,0.1);color:#00ff9c;border:1px solid rgba(0,255,156,0.2);font-weight:500;">✓ Official</div>' : '<div style="position:absolute;top:16px;right:16px;font-size:11px;padding:3px 10px;border-radius:9999px;background:rgba(255,255,255,0.04);color:var(--text-tertiary);border:1px solid var(--border-subtle);">Community</div>'}
        <div style="display:flex;align-items:flex-start;gap:16px;">
          <div style="font-size:36px;line-height:1;flex-shrink:0;">${item.icon}</div>
          <div style="flex:1;min-width:0;">
            <h3 style="font-size:17px;font-weight:600;margin-bottom:2px;">${item.name}</h3>
            <p style="font-size:13px;color:var(--text-tertiary);margin-bottom:4px;">by ${item.author}${item.version ? ' · ' + item.version : ''}</p>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${item.desc}</p>
          </div>
        </div>
        ${item.platforms?.length ? `<div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;">${item.platforms.map(p => `<span style="font-size:11px;padding:2px 8px;background:var(--bg-glass);border-radius:6px;color:var(--text-tertiary);">${p}</span>`).join('')}</div>` : ''}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid var(--border-subtle);">
          <div style="display:flex;gap:8px;align-items:center;">
            ${item.status ? `<span class="status-pill ${getStatusClass(item.status)}" style="font-size:11px;padding:2px 10px;">${item.status}</span>` : ''}
            ${item.github ? `<a href="${item.github}/releases" target="_blank" style="font-size:12px;color:var(--text-tertiary);">↓ v${item.version?.replace(/^v/, '') || '1.0'}</a>` : ''}
          </div>
          <button class="btn btn-primary install-btn" data-url="${item.url}" style="padding:6px 20px;font-size:13px;">${item.url.startsWith('#') ? 'View' : 'Install'}</button>
        </div>
      </div>
    `).join('');

    // Click card to navigate to app detail (for official apps)
    grid.querySelectorAll('.plugin-card[data-type="official"]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.install-btn') || e.target.closest('a')) return;
        const btn = card.querySelector('.install-btn');
        if (btn) navigate(btn.dataset.url);
      });
    });

    // Install/View buttons
    grid.querySelectorAll('.install-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.url;
        if (url.startsWith('#')) {
          navigate(url);
        } else if (url && url !== '#') {
          window.open(url, '_blank');
        } else {
          btn.textContent = '✓ Installed';
          btn.style.background = 'rgba(0,255,156,0.1)';
          btn.style.color = '#00ff9c';
          btn.style.border = '1px solid rgba(0,255,156,0.2)';
        }
      });
    });
  }

  // Search
  page.querySelector('#pluginSearch').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  // Filters
  page.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      page.querySelectorAll('.filter-btn').forEach(b => {
        b.style.background = 'var(--bg-glass)';
        b.style.color = 'var(--text-secondary)';
        b.style.borderColor = 'var(--border-subtle)';
      });
      btn.style.background = 'var(--accent-dim)';
      btn.style.color = 'var(--accent-text)';
      btn.style.borderColor = 'var(--border-accent)';
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  renderGrid();
  return page;
}
