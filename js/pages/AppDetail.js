import { getApp, getRelatedApps, getStatusClass } from '../data/apps.js';
import { navigate } from '../router.js';
import { createAppCard } from '../components/AppCard.js';

export function renderAppDetail(params) {
  const page = document.createElement('div');
  const app = getApp(params.id);

  if (!app) {
    page.innerHTML = `
      <div style="padding:160px var(--content-pad);text-align:center;">
        <h2 class="display-2">Application Not Found</h2>
        <p class="body-large" style="margin:16px 0 32px;">The application you're looking for doesn't exist.</p>
        <button class="btn btn-primary" data-nav="/ecosystem">Browse Ecosystem</button>
      </div>
    `;
    page.querySelector('[data-nav]')?.addEventListener('click', () => navigate('/ecosystem'));
    return page;
  }

  const statusClass = getStatusClass(app.developmentStatus);

  page.innerHTML = `
    <div class="app-detail-hero">
      <div class="app-detail-hero-bg" style="background:${app.banner}"></div>
      <div class="container">
        <div class="app-detail-header">
          <div class="app-detail-icon">${app.icon}</div>
          <div class="app-detail-meta">
            <h1>${app.name}</h1>
            <div class="tagline">${app.tagline}</div>
            <div class="tags">
              <span class="status-pill ${statusClass}">${app.developmentStatus}</span>
              <span class="tag">v${app.currentVersion.replace(/^v/, '')}</span>
              ${app.platform.map(p => `<span class="tag">${p}</span>`).join('')}
            </div>
          </div>
        </div>
        <p class="app-detail-description">${app.description}</p>
      </div>
    </div>

    <div class="container">
      <!-- Features -->
      <section class="app-detail-section">
        <h2 class="heading-1">Key Features</h2>
        <div class="features-grid">
          ${app.features.map(f => {
            const iconMap = {
              'Ultra': '⚡',
              'Zero': '🔒',
              'Auto': '🤖',
              'Event': '📡',
              'Built': '🛡',
              'Local': '💻',
              'Context': '🧠',
              'Dynamic': '⚙️',
              'Security': '🔐',
              'Flexible': '🔧',
              'Raycast': '🔍',
              'Real': '📊',
              'No': '🎨',
              'Interactive': '🔮',
              'LLM': '📥',
              'WYSIWYG': '✏️',
              'Auto': '🔗',
              'Offline': '💾',
              'Distributed': '🌐',
              'P2P': '🔗',
              'Agent': '🗳️',
              'Dynamic': '📡',
              'Centralized': '📋',
              'Database': '💾',
              'Capability': '🔑',
              'Plugin': '🔧',
              'System': '🔔',
              'Zigbee': '📻',
              'Secure': '🔐',
              'Custom': '🔗',
              'Dynamic': '☁️',
              'Zero': '🔗',
              'Real': '📈',
              'AI': '🌿',
              'Timeline': '📅',
              'Automation': '🤖',
            };
            const icon = Object.entries(iconMap).find(([key]) => f.startsWith(key))?.[1] || '✦';
            return `
              <div class="feature-item">
                <div class="fi-icon">${icon}</div>
                <div class="fi-text">
                  <h4>${f}</h4>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <div class="divider"></div>

      <!-- Architecture -->
      ${app.architecture ? `
        <section class="app-detail-section">
          <h2 class="heading-1">Architecture</h2>
          <p class="body-large" style="max-width:720px;">${app.architecture}</p>
        </section>
        <div class="divider"></div>
      ` : ''}

      <!-- Roadmap -->
      ${app.roadmap ? `
        <section class="app-detail-section">
          <h2 class="heading-1">Roadmap</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
            ${app.roadmap.map(phase => `
              <div class="card card-glow">
                <h3 class="heading-3" style="margin-bottom:12px;">${phase.phase}</h3>
                <ul style="list-style:none;padding:0;">
                  ${phase.items.map(item => `
                    <li style="padding:6px 0;font-size:14px;color:var(--text-secondary);display:flex;align-items:flex-start;gap:8px;">
                      <span style="color:var(--accent-text);font-size:12px;">▶</span>
                      ${item}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </section>
        <div class="divider"></div>
      ` : ''}

      <!-- FAQ -->
      ${app.faq ? `
        <section class="app-detail-section">
          <h2 class="heading-1">FAQ</h2>
          <div style="display:flex;flex-direction:column;gap:16px;max-width:720px;">
            ${app.faq.map(item => `
              <div class="card card-glow" style="cursor:pointer;" onclick="this.querySelector('.faq-answer').classList.toggle('visible');this.querySelector('.faq-chevron').classList.toggle('open')">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <h4 style="font-size:16px;font-weight:500;color:var(--text-primary);">${item.q}</h4>
                  <span class="faq-chevron" style="transition:transform 0.2s;font-size:14px;color:var(--text-tertiary);">▼</span>
                </div>
                <p class="faq-answer body-regular" style="margin-top:0;max-height:0;overflow:hidden;transition:all 0.3s var(--ease-out);">${item.a}</p>
              </div>
            `).join('')}
          </div>
        </section>
        <div class="divider"></div>
      ` : ''}

      <!-- Changelog -->
      ${app.changelog ? `
        <section class="app-detail-section">
          <h2 class="heading-1">Changelog</h2>
          <div style="display:flex;flex-direction:column;gap:16px;max-width:720px;">
            ${app.changelog.map(entry => `
              <div class="card card-glow">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <h4 style="font-size:16px;font-weight:600;">${entry.version}</h4>
                  <span class="body-small">${entry.date}</span>
                </div>
                <ul style="list-style:none;padding:0;">
                  ${entry.logs.map(log => `
                    <li style="padding:4px 0;font-size:14px;color:var(--text-secondary);display:flex;align-items:flex-start;gap:8px;">
                      <span style="color:var(--accent-text);font-size:10px;">●</span>
                      ${log}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </section>
        <div class="divider"></div>
      ` : ''}

      <!-- Future Plans -->
      ${app.futurePlans ? `
        <section class="app-detail-section">
          <h2 class="heading-1">Future Plans</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;">
            ${app.futurePlans.map(plan => `
              <div class="card card-glow" style="padding:20px;">
                <p style="font-size:14px;color:var(--text-secondary);display:flex;gap:10px;align-items:flex-start;">
                  <span style="color:var(--accent-text);font-size:16px;flex-shrink:0;">→</span>
                  ${plan}
                </p>
              </div>
            `).join('')}
          </div>
        </section>
        <div class="divider"></div>
      ` : ''}

      <!-- Downloads -->
      <section class="app-detail-section">
        <h2 class="heading-1">Downloads</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;max-width:640px;">
          ${Object.entries(app.downloads).map(([platform, info]) => `
            <div class="card card-glow" style="text-align:center;cursor:pointer;" onclick="window.open('${app.github}/releases','_blank')">
              <div style="font-size:32px;margin-bottom:8px;">
                ${platform === 'windows' ? '⊞' : platform === 'linux' ? '🐧' : platform === 'macos' ? '🍎' : platform === 'raspi' ? '🍓' : '📦'}
              </div>
              <h4 style="font-size:15px;font-weight:500;margin-bottom:4px;text-transform:capitalize;">${platform}</h4>
              <p class="body-small">${info.size}</p>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:24px;">
          <a href="${app.github}" target="_blank" class="btn btn-secondary">View on GitHub</a>
          ${app.documentation.startsWith('#') ? `
            <button class="btn btn-secondary" style="margin-left:12px;" data-nav="${app.documentation.replace('#', '')}">Documentation</button>
          ` : ''}
        </div>
      </section>
    </div>
  `;

  // Related apps
  const related = getRelatedApps(app.id);
  if (related.length > 0) {
    const container = page.querySelector('.container');
    const relatedSection = document.createElement('section');
    relatedSection.className = 'app-detail-section';
    relatedSection.innerHTML = `<h2 class="heading-1">Related Applications</h2><div class="app-preview-strip animate-stagger"></div>`;

    requestAnimationFrame(() => {
      const grid = relatedSection.querySelector('.app-preview-strip');
      related.forEach(rel => {
        
        grid.appendChild(createAppCard(rel));
      });
    });

    container.appendChild(relatedSection);
  }

  // Navigation
  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.nav);
    });
  });

  // FAQ toggle
  page.querySelectorAll('.faq-answer').forEach(el => {
    el.addEventListener('click', () => {
      // handled by onclick on parent
    });
  });

  return page;
}
