import { navigate } from '../router.js';
import { setState, getState } from '../store.js';

const navLinks = [
  { label: 'Ecosystem', href: '#/ecosystem' },
  { label: 'Marketplace', href: '#/marketplace' },
  { label: 'Roadmap', href: '#/roadmap' },
  { label: 'Status', href: '#/status' },
  { label: 'Neural', href: '#/neural' },
  { label: 'CIE', href: '#/cie' },
  { label: 'Architecture', href: '#/architecture' },
  { label: 'Downloads', href: '#/downloads' },
  { label: 'Docs', href: '#/docs' },
  { label: 'Blog', href: '#/blog' },
];

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  let lastScroll = 0;
  let ticking = false;

  const onScroll = () => {
    lastScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('hidden', lastScroll > 120 && lastScroll > 50);
        ticking = false;
      });
      ticking = true;
    }
  };

  const render = () => {
    const path = window.location.hash.slice(1) || '/';

    header.innerHTML = `
      <div class="header-logo" data-nav="/">
        <svg viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
          <circle cx="14" cy="14" r="6" fill="currentColor" class="glow-text"/>
          <circle cx="14" cy="14" r="3" fill="var(--bg-base)"/>
        </svg>
        <span>Synapse<span class="accent-dot">.</span></span>
      </div>
      <nav class="header-nav${window.innerWidth <= 768 && header.dataset.mobileOpen === 'true' ? ' open' : ''}">
        ${navLinks.map(l => `
          <a href="${l.href}" class="${path.startsWith(l.href.slice(1)) ? 'active' : ''}">${l.label}</a>
        `).join('')}
      </nav>
      <div class="header-actions">
        <button class="btn-icon hide-mobile" data-action="auth" aria-label="Account" style="font-size:16px;">
          ${localStorage.getItem('synapse_token') ? '👤' : '🔐'}
        </button>
        <button class="btn-icon hide-mobile" data-action="search" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button class="btn-icon hide-mobile" data-action="github" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </button>
        <button class="header-mobile-toggle" data-action="mobile-toggle" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
          </svg>
        </button>
      </div>
    `;

    header.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        header.dataset.mobileOpen = 'false';
        navigate(el.dataset.nav);
      });
    });

    header.querySelectorAll('.header-nav a').forEach(el => {
      el.addEventListener('click', () => {
        header.dataset.mobileOpen = 'false';
        render();
      });
    });

    header.querySelector('[data-action="auth"]')?.addEventListener('click', () => {
      navigate(localStorage.getItem('synapse_token') ? '/login' : '/login');
    });

    header.querySelector('[data-action="search"]')?.addEventListener('click', () => {
      setState('searchOpen', true);
    });

    header.querySelector('[data-action="github"]')?.addEventListener('click', () => {
      window.open('https://github.com/CortexIAC', '_blank');
    });

    header.querySelector('[data-action="mobile-toggle"]')?.addEventListener('click', () => {
      header.dataset.mobileOpen = header.dataset.mobileOpen === 'true' ? 'false' : 'true';
      render();
    });
  };

  render();
  window.addEventListener('scroll', onScroll);

  const cleanup = () => {
    window.removeEventListener('scroll', onScroll);
  };

  return { element: header, cleanup };
}
