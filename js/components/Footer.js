export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;font-size:18px;font-weight:600;">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
              <circle cx="14" cy="14" r="6" fill="#00ff9c"/>
              <circle cx="14" cy="14" r="3" fill="#000"/>
            </svg>
            Synapse
          </div>
          <p>The Local Intelligence Platform. A unified ecosystem of AI-powered applications that run entirely on your hardware.</p>
        </div>
        <div class="footer-col">
          <h4>Ecosystem</h4>
          <a href="#/ecosystem">Applications</a>
          <a href="#/cie">CIE</a>
          <a href="#/marketplace">Marketplace</a>
          <a href="#/architecture">Architecture</a>
          <a href="#/downloads">Downloads</a>
          <a href="#/status">Status</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="#/docs">Documentation</a>
          <a href="#/api-docs">API Reference</a>
          <a href="#/blog">Blog</a>
          <a href="#/docs/getting-started">Getting Started</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="https://github.com/crtx" target="_blank">GitHub</a>
          <a href="https://github.com/crtx/synapse-core" target="_blank">Synapse Core</a>
          <a href="https://github.com/crtx/cortex-intelligence-engine" target="_blank">CIE</a>
          <a href="https://github.com/crtx/cortex-studio" target="_blank">Cortex Studio</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} CRTX. Built locally. Run locally.</span>
        <span>Open source ecosystem</span>
      </div>
    </div>
  `;

  return footer;
}
