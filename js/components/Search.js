import { subscribe, setState, getState } from '../store.js';
import { navigate } from '../router.js';
import { getAllApps } from '../data/apps.js';
import { getAllDocs } from '../data/docs.js';
import { blogData } from '../data/blog.js';

export function createSearch() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';

  let currentResults = [];

  function buildResults(query) {
    const q = query.toLowerCase();
    const results = [];

    const apps = getAllApps();
    for (const app of apps) {
      if (app.name.toLowerCase().includes(q) || app.tagline.toLowerCase().includes(q)) {
        results.push({ type: 'App', icon: app.icon, title: app.name, desc: app.tagline, href: `#/app/${app.id}` });
      }
    }

    const docs = getAllDocs();
    for (const doc of docs) {
      if (doc.title.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q)) {
        results.push({ type: 'Doc', icon: '📄', title: doc.title, desc: doc.description, href: `#/docs/${doc.id}` });
      }
    }

    for (const post of blogData) {
      if (post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q)) {
        results.push({ type: 'Blog', icon: '📝', title: post.title, desc: post.summary.slice(0, 100) + '...', href: `#/blog/${post.id}` });
      }
    }

    return results;
  }

  function renderResults(query) {
    const resultsDiv = overlay.querySelector('.search-results');
    if (!query.trim()) {
      resultsDiv.innerHTML = '<div class="search-empty">Search apps, documentation, and blog posts...</div>';
      return;
    }

    currentResults = buildResults(query);

    if (currentResults.length === 0) {
      resultsDiv.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }

    resultsDiv.innerHTML = currentResults.map((r, i) => `
      <div class="search-result-item" data-index="${i}" data-href="${r.href}">
        <div class="sr-icon">${r.icon}</div>
        <div>
          <div class="sr-title">${highlight(r.title, query)}</div>
          <div class="sr-desc">${r.type} — ${highlight(r.desc, query)}</div>
        </div>
      </div>
    `).join('');

    let highlightedIndex = 0;
    const items = resultsDiv.querySelectorAll('.search-result-item');

    items.forEach((el, i) => {
      el.addEventListener('click', () => {
        close();
        navigate(el.dataset.href);
      });
      el.addEventListener('mouseenter', () => {
        resultsDiv.querySelector('.highlighted')?.classList.remove('highlighted');
        el.classList.add('highlighted');
        highlightedIndex = i;
      });
    });
  }

  function highlight(text, query) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return text.slice(0, idx) + '<strong style="color:var(--accent-text)">' + text.slice(idx, idx + query.length) + '</strong>' + text.slice(idx + query.length);
  }

  function open() {
    overlay.classList.add('open');
    overlay.innerHTML = `
      <div class="search-box">
        <input type="text" placeholder="Search apps, docs, blog..." autofocus />
        <div class="search-results">
          <div class="search-empty">Search apps, documentation, and blog posts...</div>
        </div>
      </div>
    `;
    const input = overlay.querySelector('input');
    input.focus();

    input.addEventListener('input', (e) => renderResults(e.target.value));

    input.addEventListener('keydown', (e) => {
      const resultsDiv = overlay.querySelector('.search-results');
      const items = resultsDiv.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const current = resultsDiv.querySelector('.highlighted');
        const currentIdx = current ? parseInt(current.dataset.index) : -1;
        const next = Math.min(currentIdx + 1, items.length - 1);
        resultsDiv.querySelectorAll('.search-result-item').forEach((el, i) => el.classList.toggle('highlighted', i === next));
        items[next]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const current = resultsDiv.querySelector('.highlighted');
        const currentIdx = current ? parseInt(current.dataset.index) : 0;
        const prev = Math.max(currentIdx - 1, 0);
        resultsDiv.querySelectorAll('.search-result-item').forEach((el, i) => el.classList.toggle('highlighted', i === prev));
        items[prev]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const highlighted = resultsDiv.querySelector('.highlighted');
        if (highlighted) {
          close();
          navigate(highlighted.dataset.href);
        } else if (items[0]) {
          close();
          navigate(items[0].dataset.href);
        }
      }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }

  function close() {
    overlay.classList.remove('open');
    overlay.innerHTML = '';
    setState('searchOpen', false);
  }

  const unsub = subscribe((key, val) => {
    if (key === 'searchOpen') {
      if (val) open();
      else close();
    }
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const globalKeyHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const current = getState('searchOpen');
      setState('searchOpen', !current);
    }
  };
  document.addEventListener('keydown', globalKeyHandler);

  document.body.appendChild(overlay);

  return () => {
    unsub();
    document.removeEventListener('keydown', globalKeyHandler);
    overlay.remove();
  };
}
