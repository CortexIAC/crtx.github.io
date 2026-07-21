import { getPlugin } from '../data/plugins.js';
import { navigate } from '../router.js';

export function renderPluginDetail(params) {
  const page = document.createElement('div');
  const plugin = getPlugin(params.id);

  if (!plugin) {
    page.innerHTML = `
      <div style="padding:160px var(--content-pad);text-align:center;">
        <h2 class="display-2">Plugin Not Found</h2>
        <p class="body-large" style="margin:16px 0 32px;">The plugin you're looking for doesn't exist.</p>
        <button class="btn btn-primary" data-nav="/marketplace">Browse Marketplace</button>
      </div>
    `;
    page.querySelector('[data-nav]')?.addEventListener('click', () => navigate('/marketplace'));
    return page;
  }

  const statusClass = plugin.developmentStatus === 'Stable' ? 'stable' : plugin.developmentStatus === 'Beta' ? 'beta' : 'alpha';

  page.innerHTML = `
    <div class="app-detail-hero">
      <div class="app-detail-hero-bg" style="background:${plugin.banner}"></div>
      <div class="container">
        <div class="app-detail-header">
          <div class="app-detail-icon">${plugin.icon}</div>
          <div class="app-detail-meta">
            <h1>${plugin.name}</h1>
            <div class="tagline">${plugin.tagline}</div>
            <div style="display:inline-flex;align-items:center;gap:6px;padding:3px 12px;border-radius:9999px;font-size:12px;font-weight:500;background:rgba(255,255,255,0.04);color:var(--text-tertiary);border:1px solid var(--border-subtle);margin-top:8px;">🌍 Community Plugin</div>
            <div class="tags" style="margin-top:12px;">
              <span class="status-pill ${statusClass}">${plugin.developmentStatus}</span>
              <span class="tag">${plugin.currentVersion}</span>
              ${plugin.platform.map(p => `<span class="tag">${p}</span>`).join('')}
            </div>
          </div>
        </div>
        <p class="app-detail-description">${plugin.description}</p>
      </div>
    </div>

    <div class="container">
      <section class="app-detail-section">
        <h2 class="heading-1">Key Features</h2>
        <div class="features-grid">
          ${plugin.features.map(f => `
            <div class="feature-item">
              <div class="fi-icon">✦</div>
              <div class="fi-text"><h4>${f}</h4></div>
            </div>
          `).join('')}
        </div>
      </section>

      <div class="divider"></div>

      <section class="app-detail-section">
        <h2 class="heading-1">Architecture</h2>
        <p class="body-large" style="max-width:720px;">${plugin.architecture}</p>
      </section>

      <div class="divider"></div>

      <section class="app-detail-section">
        <h2 class="heading-1">Roadmap</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
          ${plugin.roadmap.map(phase => `
            <div class="card card-glow">
              <h3 class="heading-3" style="margin-bottom:12px;">${phase.phase}</h3>
              <ul style="list-style:none;padding:0;">
                ${phase.items.map(item => `
                  <li style="padding:6px 0;font-size:14px;color:var(--text-secondary);display:flex;align-items:flex-start;gap:8px;">
                    <span style="color:var(--accent-text);font-size:12px;">▶</span>${item}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>

      <div class="divider"></div>

      ${plugin.faq ? `
        <section class="app-detail-section">
          <h2 class="heading-1">FAQ</h2>
          <div style="display:flex;flex-direction:column;gap:16px;max-width:720px;">
            ${plugin.faq.map((item, idx) => `
              <div class="card card-glow faq-item" style="cursor:pointer;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <h4 style="font-size:16px;font-weight:500;color:var(--text-primary);">${item.q}</h4>
                  <span class="faq-chevron" style="transition:transform 0.2s;font-size:14px;color:var(--text-tertiary);">▼</span>
                </div>
                <div class="faq-answer" style="max-height:0;overflow:hidden;transition:all 0.3s cubic-bezier(0.22,1,0.36,1);">
                  <p class="body-regular" style="margin-top:16px;">${item.a}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        <div class="divider"></div>
      ` : ''}

      <section class="app-detail-section">
        <h2 class="heading-1">Downloads</h2>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          <div class="card" style="text-align:center;padding:20px 32px;min-width:140px;">
            <div style="font-size:32px;margin-bottom:8px;">📦</div>
            <h4 style="font-size:15px;font-weight:500;">${plugin.name}</h4>
            <p class="body-small">${plugin.downloadSize}</p>
            <a href="/downloads/${plugin.id}.zip" download class="btn btn-primary" style="margin-top:12px;padding:8px 24px;font-size:13px;">Download</a>
          </div>
        </div>
      </section>
    </div>
  `;

  // FAQ toggles
  page.querySelectorAll('.faq-item').forEach(card => {
    card.addEventListener('click', () => {
      const answer = card.querySelector('.faq-answer');
      const chevron = card.querySelector('.faq-chevron');
      if (!answer) return;
      const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
      answer.style.maxHeight = isOpen ? '0px' : `${answer.scrollHeight + 40}px`;
      if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      card.style.borderColor = isOpen ? 'var(--border-subtle)' : 'var(--border-accent)';
    });
  });

  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); navigate(el.dataset.nav); });
  });

  return page;
}
