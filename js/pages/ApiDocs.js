export function renderApiDocs() {
  const page = document.createElement('div');

  const endpoints = [
    {
      method: 'POST', path: '/api/register', auth: false,
      desc: 'Create a new user account. The first registered user becomes admin.',
      body: { username: 'string (required)', password: 'string (required, min 6 chars)' },
      response: '{ success, user: { id, username, role, token } }',
    },
    {
      method: 'POST', path: '/api/login', auth: false,
      desc: 'Sign in with existing credentials. Returns a session token.',
      body: { username: 'string (required)', password: 'string (required)' },
      response: '{ success, user: { id, username, role, token } }',
    },
    {
      method: 'GET', path: '/api/me', auth: 'user, editor, admin',
      desc: 'Get the currently authenticated user\'s profile.',
      response: '{ user: { id, username, role } }',
    },
    {
      method: 'POST', path: '/api/logout', auth: 'user, editor, admin',
      desc: 'Invalidate the current session token.',
      response: '{ success }',
    },
    {
      method: 'GET', path: '/api/blog', auth: false,
      desc: 'List all published blog posts.',
      response: '[ { id, title, summary, date, author, category, tags, published } ]',
    },
    {
      method: 'GET', path: '/api/blog/:id', auth: false,
      desc: 'Get a single blog post by ID with full content.',
      response: '{ id, title, content, summary, date, author, category, tags, published }',
    },
    {
      method: 'POST', path: '/api/blog', auth: 'editor, admin',
      desc: 'Create a new blog post.',
      body: { title: 'string (required)', content: 'string (required)', summary: 'string (optional)', category: 'string (optional)', tags: 'array (optional)' },
      response: '{ success, post }',
    },
    {
      method: 'PUT', path: '/api/blog/:id', auth: 'editor, admin',
      desc: 'Update an existing blog post.',
      body: { title: 'string', content: 'string', summary: 'string', category: 'string', tags: 'array', published: 'boolean' },
      response: '{ success, post }',
    },
    {
      method: 'DELETE', path: '/api/blog/:id', auth: 'admin',
      desc: 'Delete a blog post permanently.',
      response: '{ success }',
    },
    {
      method: 'GET', path: '/api/admin/users', auth: 'admin',
      desc: 'List all registered users with roles and ban status.',
      response: '[ { id, username, role, banned, createdAt } ]',
    },
    {
      method: 'PUT', path: '/api/admin/users/:id/role', auth: 'admin',
      desc: 'Change a user\'s role (user, editor, or admin).',
      body: { role: 'string ("user" | "editor" | "admin")' },
      response: '{ success }',
    },
    {
      method: 'POST', path: '/api/admin/users/:id/ban', auth: 'admin',
      desc: 'Ban a user account. Banned users cannot log in.',
      response: '{ success }',
    },
    {
      method: 'POST', path: '/api/admin/users/:id/unban', auth: 'admin',
      desc: 'Remove a ban from a user account.',
      response: '{ success }',
    },
    {
      method: 'GET', path: '/api/health', auth: false,
      desc: 'Health check endpoint. Returns server status and data counts.',
      response: '{ status, users, posts, redis }',
    },
  ];

  function getMethodColor(m) {
    return m === 'GET' ? '#00ff9c' : m === 'POST' ? '#00d4ff' : m === 'PUT' ? '#ffd700' : '#ff6b6b';
  }

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Reference</div>
          <h1 class="display-2">API Documentation</h1>
          <p class="body-large">Complete reference for the Synapse Ecosystem REST API. All endpoints are available at <code style="color:var(--accent-text);">/api/*</code>.</p>
        </div>

        <div style="margin-bottom:24px;">
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
            <span style="font-size:14px;color:var(--text-tertiary);">Base URL:</span>
            <code style="padding:6px 14px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;font-size:14px;">https://your-site.vercel.app</code>
            <span style="font-size:14px;color:var(--text-tertiary);">Auth:</span>
            <code style="padding:6px 14px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;font-size:14px;">Authorization: Bearer &lt;token&gt;</code>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          ${endpoints.map(ep => `
            <div class="card" style="padding:0;overflow:hidden;">
              <div style="padding:20px 24px;display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
                  <span style="padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700;font-family:monospace;background:${getMethodColor(ep.method)}20;color:${getMethodColor(ep.method)};border:1px solid ${getMethodColor(ep.method)}30;">${ep.method}</span>
                  <code style="font-size:14px;color:var(--text-primary);">${ep.path}</code>
                </div>
                <div style="flex:1;min-width:200px;">
                  <p style="font-size:14px;color:var(--text-secondary);margin-bottom:8px;">${ep.desc}</p>
                  ${ep.auth ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--text-tertiary);background:var(--bg-glass);padding:2px 10px;border-radius:9999px;">🔒 ${ep.auth}</span>` : '<span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--text-tertiary);background:var(--bg-glass);padding:2px 10px;border-radius:9999px;">🌐 Public</span>'}
                  ${ep.body ? `
                    <div style="margin-top:8px;">
                      <details>
                        <summary style="font-size:13px;color:var(--accent-text);cursor:pointer;">Request Body</summary>
                        <pre style="margin-top:8px;padding:12px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;font-size:13px;color:var(--text-secondary);overflow-x:auto;">${JSON.stringify(ep.body, null, 2)}</pre>
                      </details>
                    </div>
                  ` : ''}
                  <div style="margin-top:8px;">
                    <details>
                      <summary style="font-size:13px;color:var(--accent-text);cursor:pointer;">Response</summary>
                      <pre style="margin-top:8px;padding:12px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;font-size:13px;color:var(--text-secondary);overflow-x:auto;">${ep.response}</pre>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  return page;
}
