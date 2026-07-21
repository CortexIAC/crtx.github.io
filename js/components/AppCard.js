import { navigate } from '../router.js';
import { getStatusClass } from '../data/apps.js';

export function createAppCard(app) {
  const card = document.createElement('div');
  card.className = 'app-card';
  card.style.setProperty('animation-delay', '0s');

  const statusClass = getStatusClass(app.developmentStatus);
  const platformIcons = {
    'Windows': '⊞',
    'Linux': '🐧',
    'macOS': '🍎',
    'Windows (Desktop)': '⊞',
    'macOS (Desktop)': '🍎',
    'Raspberry Pi (OS)': '🍓',
    'Web': '🌐',
  };

  card.innerHTML = `
    <div class="app-card-banner" style="background:${app.banner}"></div>
    <div class="app-card-logo">${app.icon}</div>
    <div class="app-card-body">
      <h3>${app.name}</h3>
      <div class="tagline">${app.tagline}</div>
      <p>${app.description}</p>
    </div>
    <div class="app-card-footer">
      <span class="status-pill ${statusClass}">${app.developmentStatus}</span>
      <div class="tags">
        <span class="tag">v${app.currentVersion.replace(/^v/, '')}</span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    navigate(`#/app/${app.id}`);
  });

  return card;
}
