export function renderMarketplace() {
  const page = document.createElement('div');

  const plugins = [
    { name: 'Photo Journal', icon: '📸', desc: 'Visual timeline with AI-powered image analysis and plant growth tracking.', author: 'CRTX', downloads: 342, verified: true },
    { name: 'Sensor Bridge', icon: '📡', desc: 'MQTT and GPIO sensor integration for real-time environmental monitoring.', author: 'CRTX', downloads: 189, verified: true },
    { name: 'Knowledge Graph', icon: '🔮', desc: 'Interactive 3D graph visualization for semantic note relationships.', author: 'CRTX', downloads: 256, verified: true },
    { name: 'Terminal Plus', icon: '💻', desc: 'Advanced multi-tab terminal with SSH, Docker, and session persistence.', author: 'Community', downloads: 521, verified: false },
    { name: 'Audio Visualizer', icon: '🎵', desc: 'Real-time audio spectrum analyzer with multiple rendering modes.', author: 'Community', downloads: 143, verified: false },
    { name: 'Git Dashboard', icon: '🔀', desc: 'Git repository manager with visual branching and commit history.', author: 'CRTX', downloads: 98, verified: true },
    { name: 'Weather Station', icon: '🌤', desc: 'Local weather monitoring with historical data and forecasts.', author: 'Community', downloads: 67, verified: false },
    { name: 'Task Scheduler', icon: '⏰', desc: 'Cron-like task scheduling with visual workflow builder.', author: 'CRTX', downloads: 234, verified: true },
    { name: 'PDF Toolkit', icon: '📄', desc: 'Create, merge, split, and annotate PDF documents locally.', author: 'Community', downloads: 412, verified: false },
    { name: 'Network Scanner', icon: '🌐', desc: 'Local network discovery, port scanning, and device fingerprinting.', author: 'CRTX', downloads: 176, verified: true },
  ];

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Extensions</div>
          <h1 class="display-2">Plugin Marketplace</h1>
          <p class="body-large">Extend your ecosystem with community and official plugins. All plugins run locally — no cloud dependencies.</p>
        </div>

        <div style="margin-bottom:32px;">
          <input id="pluginSearch" type="text" placeholder="Search plugins..." style="width:100%;max-width:480px;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-primary);font-size:16px;">
        </div>

        <div id="pluginGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">
          ${plugins.map(p => `
            <div class="card card-glow plugin-card" style="position:relative;padding:24px;">
              ${p.verified ? '<div style="position:absolute;top:16px;right:16px;font-size:12px;padding:3px 10px;border-radius:9999px;background:rgba(0,255,156,0.1);color:#00ff9c;border:1px solid rgba(0,255,156,0.2);">✓ Verified</div>' : ''}
              <div style="font-size:32px;margin-bottom:12px;">${p.icon}</div>
              <h3 style="font-size:17px;font-weight:600;margin-bottom:4px;">${p.name}</h3>
              <p style="font-size:13px;color:var(--text-tertiary);margin-bottom:4px;">by ${p.author}</p>
              <p style="font-size:14px;color:var(--text-secondary);line-height:1.6;">${p.desc}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid var(--border-subtle);">
                <span style="font-size:13px;color:var(--text-tertiary);">${p.downloads} downloads</span>
                <button class="btn btn-primary" style="padding:6px 18px;font-size:13px;">Install</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Search
  page.querySelector('#pluginSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    page.querySelectorAll('.plugin-card').forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      card.style.display = (name.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  });

  // Install buttons
  page.querySelectorAll('.plugin-card .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.textContent = '✓ Installed';
      this.style.background = 'rgba(0,255,156,0.1)';
      this.style.color = '#00ff9c';
      this.style.border = '1px solid rgba(0,255,156,0.2)';
      this.style.boxShadow = 'none';
    });
  });

  return page;
}
