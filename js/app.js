import { register, init } from './router.js';
import { createHeader } from './components/Header.js';
import { createFooter } from './components/Footer.js';
import { createSearch } from './components/Search.js';
import { renderHome } from './pages/Home.js';
import { renderEcosystem } from './pages/Ecosystem.js';
import { renderAppDetail } from './pages/AppDetail.js';
import { renderRoadmap } from './pages/Roadmap.js';
import { renderNeural } from './pages/Neural.js';
import { renderMarketplace } from './pages/Marketplace.js';
import { renderPluginDetail } from './pages/PluginDetail.js';
import { renderStatus } from './pages/Status.js';
import { renderApiDocs } from './pages/ApiDocs.js';
import { renderCIE } from './pages/CIE.js';
import { renderArchitecture } from './pages/Architecture.js';
import { renderDownloads } from './pages/Downloads.js';
import { renderDocs } from './pages/Docs.js';
import { renderBlogIndex, renderBlogPost } from './pages/Blog.js';
import { renderLogin } from './pages/Login.js';
import { renderAdmin } from './pages/Admin.js';
import { renderNotFound } from './pages/NotFound.js';

let headerCleanup = null;
let searchCleanup = null;

function buildLayout() {
  const app = document.getElementById('app');

  // Clean up previous
  if (headerCleanup) { headerCleanup(); headerCleanup = null; }
  if (searchCleanup) { searchCleanup(); searchCleanup = null; }

  app.innerHTML = '';

  // Header
  const { element: header, cleanup: hCleanup } = createHeader();
  app.appendChild(header);
  headerCleanup = hCleanup;

  // Main content container
  const main = document.createElement('main');
  main.id = 'main-content';
  app.appendChild(main);

  // Footer
  app.appendChild(createFooter());

  // Search
  searchCleanup = createSearch();

  return main;
}

function renderPage(renderFn) {
  return async (params) => {
    const main = buildLayout();
    // Show a loading indicator for async pages
    main.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:120px 0;"><div class="spinner"></div></div>';
    const page = await renderFn(params);
    main.innerHTML = '';
    main.appendChild(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
}

function initRoutes() {
  register('/', renderPage(renderHome));
  register('/ecosystem', renderPage(renderEcosystem));
  register('/roadmap', renderPage(renderRoadmap));
  register('/app/:id', renderPage(renderAppDetail));
  register('/neural', renderPage(renderNeural));
  register('/cie', renderPage(renderCIE));
  register('/architecture', renderPage(renderArchitecture));
  register('/marketplace', renderPage(renderMarketplace));
  register('/plugin/:id', renderPage(renderPluginDetail));
  register('/status', renderPage(renderStatus));
  register('/api-docs', renderPage(renderApiDocs));
  register('/downloads', renderPage(renderDownloads));
  register('/docs/:id', renderPage(renderDocs));
  register('/docs', renderPage(() => renderDocs({})));
  register('/blog/:id', renderPage(renderBlogPost));
  register('/blog', renderPage(renderBlogIndex));
  register('/login', renderPage(renderLogin));
  register('/admin', renderPage(renderAdmin));
  register('/*', renderPage(renderNotFound));
}

initRoutes();
init();

// Hide loading screen once app renders
requestAnimationFrame(() => {
  document.getElementById('loading')?.classList.add('hidden');
});
