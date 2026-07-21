import { docsData, getDoc } from '../data/docs.js';
import { navigate } from '../router.js';

export function renderDocs(params) {
  const page = document.createElement('div');
  page.className = 'docs-layout';

  // Build sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'docs-sidebar';

  let sidebarHTML = '<h3>Documentation</h3>';
  for (const cat of docsData.categories) {
    sidebarHTML += `<div class="doc-category"><div class="doc-category-title">${cat.title}</div>`;
    for (const item of cat.items) {
      const active = params.id === item.id;
      sidebarHTML += `<a class="doc-link${active ? ' active' : ''}" data-doc="${item.id}">${item.title}</a>`;
    }
    sidebarHTML += '</div>';
  }
  sidebar.innerHTML = sidebarHTML;

  // Build content
  const content = document.createElement('main');
  content.className = 'docs-content';

  function renderDoc(docId) {
    const doc = docId ? getDoc(docId) : null;
    if (!doc && docId) {
      content.innerHTML = `
        <div style="text-align:center;padding:80px 0;">
          <h2 class="heading-1">Document Not Found</h2>
          <p class="body-large" style="margin:16px 0;">The requested documentation page doesn't exist.</p>
        </div>
      `;
      return;
    }
    if (!doc) {
      content.innerHTML = `
        <div style="text-align:center;padding:80px 0;">
          <h1 class="display-2" style="margin-bottom:16px;">Synapse Docs</h1>
          <p class="body-large" style="max-width:560px;margin:0 auto;">Select a topic from the sidebar to get started. The documentation covers everything from getting started to advanced plugin development.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:48px;">
            ${docsData.categories.map(cat => `
              <div class="card card-glow" style="text-align:left;padding:24px;">
                <h3 class="heading-3" style="margin-bottom:12px;">${cat.title}</h3>
                <ul style="list-style:none;padding:0;">
                  ${cat.items.map(item => `
                    <li style="padding:4px 0;">
                      <a data-doc="${item.id}" style="font-size:14px;color:var(--text-secondary);cursor:pointer;transition:color 0.2s;">${item.title}</a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      content.querySelectorAll('[data-doc]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          navigate(`#/docs/${el.dataset.doc}`);
        });
      });
      return;
    }

    // Render markdown content
    let html = doc.content;
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const langLabel = lang || 'code';
      return `<div class="code-block"><div class="code-header"><span>${langLabel}</span><button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div><pre><code>${escapeHtml(code.trim())}</code></pre></div>`;
    });
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = '<p>' + html + '</p>';

    content.innerHTML = html;

    // Clean up wrapping
    let cleaned = content.innerHTML;
    cleaned = cleaned.replace(/<p><h1/g, '<h1').replace(/<\/h1><\/p>/g, '</h1>');
    cleaned = cleaned.replace(/<p><h2/g, '<h2').replace(/<\/h2><\/p>/g, '</h2>');
    cleaned = cleaned.replace(/<p><h3/g, '<h3').replace(/<\/h3><\/p>/g, '</h3>');
    cleaned = cleaned.replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>');
    cleaned = cleaned.replace(/<p><div /g, '<div ').replace(/<\/div><\/p>/g, '</div>');
    cleaned = cleaned.replace(/<p><br><\/p>/g, '');
    content.innerHTML = cleaned;

    // Update active sidebar link
    sidebar.querySelectorAll('.doc-link').forEach(el => {
      el.classList.toggle('active', el.dataset.doc === docId);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  renderDoc(params?.id);

  page.appendChild(sidebar);
  page.appendChild(content);

  // Sidebar navigation
  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.doc-link');
    if (link) {
      e.preventDefault();
      navigate(`#/docs/${link.dataset.doc}`);
    }
  });

  return page;
}
