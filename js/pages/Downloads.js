import { getAllApps, getStatusClass } from '../data/apps.js';
import { navigate } from '../router.js';

export function renderDownloads() {
  const page = document.createElement('div');

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Download</div>
          <h1 class="display-2">Download Center</h1>
          <p class="body-large">Every Synapse application is open source and available for your platform. All downloads are direct — no accounts, no telemetry.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px;">
          ${getAllApps().map(app => {
            const statusClass = getStatusClass(app.developmentStatus);
            return `
              <div class="download-card" data-app="${app.id}">
                <div class="download-card-header">
                  <div class="dc-icon">${app.icon}</div>
                  <div class="dc-info">
                    <h3>${app.name}</h3>
                    <div class="version">${app.currentVersion} · <span class="status-pill ${statusClass}" style="font-size:11px;padding:2px 10px;">${app.developmentStatus}</span></div>
                  </div>
                </div>
                <div class="dc-platforms">
                  ${Object.entries(app.downloads).map(([platform, info]) => {
                    const icon = platform === 'windows' ? '⊞' : platform === 'linux' ? '🐧' : platform === 'macos' ? '🍎' : platform === 'raspi' ? '🍓' : '📦';
                    return `
                      <div class="dc-platform" data-platform="${platform}" data-url="${app.github}/archive/refs/heads/main.zip" title="${info.filename}">
                        ${icon} ${platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </div>
                    `;
                  }).join('')}
                </div>
                <div class="dc-meta">
                  <span>🔗 ${app.language.join(', ')}</span>
                  <span>📋 ${app.dependencies.join(', ')}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  page.querySelectorAll('.download-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.dc-platform')) {
        const platformEl = e.target.closest('.dc-platform');
        window.open(platformEl.dataset.url, '_blank');
        return;
      }
      navigate(`#/app/${card.dataset.app}`);
    });
  });

  return page;
}
