import { getAllApps, getStatusClass } from '../data/apps.js';
import { navigate } from '../router.js';
import { api, isLoggedIn, getStoredUser } from '../api.js';

export function renderMarketplace() {
  const page = document.createElement('div');

  const apps = getAllApps();

  const communityPlugins = [
    { id: 'terminal-plus', name: 'Terminal Plus', icon: '💻', desc: 'Advanced multi-tab terminal with SSH, Docker, and session persistence.', author: 'Community', downloads: 521, url: '#/plugin/terminal-plus', verified: false },
    { id: 'audio-visualizer', name: 'Audio Visualizer', icon: '🎵', desc: 'Real-time audio spectrum analyzer with FFT rendering and waveform display.', author: 'Community', downloads: 143, url: '#/plugin/audio-visualizer', verified: false },
    { id: 'weather-station', name: 'Weather Station', icon: '🌤', desc: 'Local weather monitoring with 7-day forecasts and historical charts.', author: 'Community', downloads: 67, url: '#/plugin/weather-station', verified: false },
    { id: 'pdf-toolkit', name: 'PDF Toolkit', icon: '📄', desc: 'Merge, split, compress, and annotate PDFs entirely offline.', author: 'Community', downloads: 412, url: '#/plugin/pdf-toolkit', verified: false },
    { id: 'network-scanner', name: 'Network Scanner', icon: '🌐', desc: 'LAN device discovery, port scanning, and service fingerprinting.', author: 'Community', downloads: 176, url: '#/plugin/network-scanner', verified: false },
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

        <!-- Plugin Request Section -->
        <div style="margin-top:80px;padding-top:48px;border-top:1px solid var(--border-subtle);">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
            <div>
              <div class="tag tag-accent">Request</div>
              <h2 class="heading-1" style="margin-top:12px;">Request a Plugin</h2>
              <p class="body-large" style="margin-top:8px;">Don't see what you need? Submit a plugin request and the community can build it.</p>
              <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;">
                <input id="reqName" type="text" placeholder="Plugin name" style="width:100%;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:10px;color:var(--text-primary);font-size:15px;">
                <input id="reqDesc" type="text" placeholder="Brief description" style="width:100%;padding:12px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:10px;color:var(--text-primary);font-size:15px;">
                <div style="display:flex;gap:8px;">
                  <button id="submitRequest" class="btn btn-primary">Submit Request</button>
                  <div id="reqStatus" style="display:none;font-size:14px;color:var(--accent-text);align-self:center;"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="heading-3" style="margin-bottom:16px;">Requested Plugins</h3>
              <div id="requestedList" style="display:flex;flex-direction:column;gap:8px;">
                <div style="text-align:center;padding:40px;color:var(--text-tertiary);font-size:14px;">Loading requests...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Load requested plugins
  async function loadRequests() {
    const list = page.querySelector('#requestedList');
    try {
      const data = await api.getRequests();
      if (data.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-tertiary);font-size:14px;">No plugin requests yet. Be the first!</div>';
        return;
      }
      list.innerHTML = data.slice().reverse().map(r => `
        <div style="padding:14px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:10px;">
          <h4 style="font-size:15px;font-weight:500;">${r.name}</h4>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:2px;">${r.desc}</p>
          <p style="font-size:11px;color:var(--text-tertiary);margin-top:4px;">by ${r.author} · ${r.date}</p>
        </div>
      `).join('');
    } catch {
      list.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-tertiary);font-size:14px;">Log in to submit and view requests</div>';
    }
  }

  // Submit request
  page.querySelector('#submitRequest').addEventListener('click', async () => {
    const name = page.querySelector('#reqName').value.trim();
    const desc = page.querySelector('#reqDesc').value.trim();
    const status = page.querySelector('#reqStatus');

    if (!name || !desc) {
      status.style.display = 'block';
      status.style.color = '#ff6b6b';
      status.textContent = 'Name and description required';
      return;
    }

    try {
      await api.createRequest(name, desc);
      status.style.display = 'block';
      status.style.color = 'var(--accent-text)';
      status.textContent = '✓ Request submitted!';
      page.querySelector('#reqName').value = '';
      page.querySelector('#reqDesc').value = '';
      setTimeout(() => { status.style.display = 'none'; }, 3000);
      loadRequests();
    } catch (e) {
      status.style.display = 'block';
      status.style.color = '#ff6b6b';
      status.textContent = e.message;
    }
  });

  loadRequests();

  let currentFilter = 'all';
  let searchQuery = '';

  function renderGrid() {
    const grid = page.querySelector('#pluginGrid');
    const combined = [
      ...apps.filter(a => a.hasPackage).map(a => ({
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

    // Click card to navigate to detail page
    grid.querySelectorAll('.plugin-card').forEach(card => {
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
