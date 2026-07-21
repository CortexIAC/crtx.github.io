import { blogData, getPost as getStaticPost } from '../data/blog.js';
import { navigate } from '../router.js';

async function fetchApiPosts() {
  try {
    const { api } = await import('../api.js');
    const posts = await api.getPosts();
    return posts.filter(p => p.published !== false);
  } catch {
    return [];
  }
}

async function fetchApiPost(id) {
  try {
    const { api } = await import('../api.js');
    return await api.getPost(id);
  } catch {
    return null;
  }
}

function mergePosts(staticPosts, apiPosts) {
  const seen = new Set();
  const merged = [];

  // API posts first (newest)
  for (const p of apiPosts) {
    merged.push({
      id: p.id,
      title: p.title,
      summary: p.summary,
      date: p.date,
      author: p.author,
      category: p.category || 'General',
      tags: p.tags || [],
      content: p.content || '',
      _api: true,
    });
    seen.add(p.id);
  }

  // Static posts (fallback, deduped)
  for (const p of staticPosts) {
    if (!seen.has(p.id)) {
      merged.push(p);
      seen.add(p.id);
    }
  }

  return merged;
}

export async function renderBlogIndex() {
  const page = document.createElement('div');
  const apiPosts = await fetchApiPosts();
  const allPosts = mergePosts(blogData, apiPosts);

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Devlog</div>
          <h1 class="display-2">Blog</h1>
          <p class="body-large">Development updates, architecture deep-dives, and technical articles about building the Synapse ecosystem.</p>
        </div>

        <div>
          ${allPosts.length === 0 ? '<div style="text-align:center;padding:60px 0;color:var(--text-tertiary);">No blog posts yet.</div>' : ''}
          ${allPosts.map(post => `
            <div class="blog-card" data-post="${post.id}">
              <div class="bc-meta">
                <span class="bc-category">${post.category}</span>
                <span style="display:block;margin-top:4px;">${post.date}</span>
                ${post.author ? `<span style="display:block;margin-top:2px;font-size:12px;color:var(--text-tertiary);">by ${post.author}</span>` : ''}
              </div>
              <div class="bc-content">
                <h3>${post.title}</h3>
                <p>${post.summary || post.content?.slice(0, 200) + '...'}</p>
                ${post.tags?.length ? `<div class="bc-tags">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  page.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate(`#/blog/${card.dataset.post}`);
    });
  });

  return page;
}

export async function renderBlogPost(params) {
  const page = document.createElement('div');

  // Try API first, then static
  let post = await fetchApiPost(params?.id);
  if (!post) {
    post = getStaticPost(params?.id);
  }

  if (!post) {
    page.innerHTML = `
      <div style="padding:160px var(--content-pad);text-align:center;">
        <h2 class="display-2">Post Not Found</h2>
        <p class="body-large" style="margin:16px 0 32px;">The blog post you're looking for doesn't exist.</p>
        <button class="btn btn-primary" id="backToBlog">Back to Blog</button>
      </div>
    `;
    page.querySelector('#backToBlog')?.addEventListener('click', () => navigate('/blog'));
    return page;
  }

  // Simple markdown rendering
  let content = post.content || '';
  content = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (m, lang, code) => {
      const label = lang || 'code';
      return `<div class="code-block"><div class="code-header"><span>${label}</span><button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div><pre><code>${code.trim()}</code></pre></div>`;
    })
    .replace(/\n\n/g, '</p><p>');

  content = '<p>' + content + '</p>'
    .replace(/<p><h1/g, '<h1').replace(/<\/h1><\/p>/g, '</h1>')
    .replace(/<p><h2/g, '<h2').replace(/<\/h2><\/p>/g, '</h2>')
    .replace(/<p><h3/g, '<h3').replace(/<\/h3><\/p>/g, '</h3>')
    .replace(/<p><ul>/g, '<ul>').replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><div /g, '<div ').replace(/<\/div><\/p>/g, '</div>')
    .replace(/<p><br><\/p>/g, '');

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="blog-post-content">
          <div style="margin-bottom:40px;">
            <button class="btn btn-ghost" id="backToBlog" style="padding-left:0;margin-bottom:24px;">
              ← Back to Blog
            </button>
          </div>
          ${content}
          <div style="margin-top:48px;padding-top:32px;border-top:1px solid var(--border-subtle);">
            <p class="body-small">${post.date || ''} ${post.author ? `· by ${post.author}` : ''} ${post.category ? `· ${post.category}` : ''}</p>
            ${post.tags?.length ? `<div style="display:flex;gap:8px;margin-top:8px;">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      </div>
    </section>
  `;

  page.querySelector('#backToBlog')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/blog');
  });

  return page;
}
