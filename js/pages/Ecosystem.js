import { createAppCard } from '../components/AppCard.js';
import { getAllApps } from '../data/apps.js';

export function renderEcosystem() {
  const page = document.createElement('div');

  const section = document.createElement('section');
  section.style.paddingTop = '120px';

  const container = document.createElement('div');
  container.className = 'container';

  const apps = getAllApps().filter(a => a.hasPackage);

  container.innerHTML = `
    <div class="section-header">
      <div class="tag tag-accent">Explore</div>
      <h1 class="display-2">Ecosystem Explorer</h1>
      <p class="body-large">Synapse applications with downloadable packages. More apps coming as they reach marketplace condition.</p>
    </div>
    ${apps.length === 0 ? '<div style="text-align:center;padding:60px 0;color:var(--text-tertiary);">No downloadable apps yet. Check back soon.</div>' : ''}
    <div class="app-preview-strip animate-stagger" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));"></div>
  `;

  section.appendChild(container);
  page.appendChild(section);

  requestAnimationFrame(() => {
    const grid = page.querySelector('.app-preview-strip');
    if (grid && apps.length > 0) {
      apps.forEach((app, i) => {
        const card = createAppCard(app);
        card.style.animationDelay = `${i * 80}ms`;
        grid.appendChild(card);
      });
    }
  });

  return page;
}
