import { navigate } from '../router.js';

export function renderNotFound() {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:var(--content-pad);">
      <div>
        <div style="font-size:120px;font-weight:700;color:var(--accent-text);opacity:0.3;margin-bottom:16px;line-height:1;">404</div>
        <h1 class="display-2" style="margin-bottom:16px;">Page Not Found</h1>
        <p class="body-large" style="max-width:480px;margin:0 auto 32px;">The page you're looking for doesn't exist in this ecosystem.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" data-nav="/">Go Home</button>
          <button class="btn btn-secondary btn-large" data-nav="/ecosystem">Explore Ecosystem</button>
        </div>
      </div>
    </div>
  `;

  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.nav);
    });
  });

  return page;
}
