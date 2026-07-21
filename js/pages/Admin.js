import { api, getStoredUser } from '../api.js';
import { navigate } from '../router.js';

export function renderAdmin() {
  const page = document.createElement('div');
  page.style.cssText = 'padding-top:100px;min-height:100vh;';

  const user = getStoredUser();
  if (!user || user.role !== 'admin') {
    page.innerHTML = `
      <div class="container" style="text-align:center;padding-top:80px;">
        <h2 class="heading-1">Access Denied</h2>
        <p class="body-large" style="margin:16px 0 32px;">Admin privileges required.</p>
        <button class="btn btn-primary" onclick="window.location.hash='#/login'">Sign In</button>
      </div>
    `;
    return page;
  }

  const container = document.createElement('div');
  container.className = 'container';

  // Tab navigation
  let activeTab = 'users';

  function render() {
    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:12px;">
        <h1 class="display-2" style="font-size:clamp(28px,4vw,40px);">Admin Panel</h1>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary" style="font-size:13px;padding:8px 16px;" onclick="window.location.hash='#/'">← Back</button>
        </div>
      </div>

      <div style="display:flex;gap:4px;margin-bottom:32px;border-bottom:1px solid var(--border-subtle);padding-bottom:0;">
        <button class="tab-btn" data-tab="users" style="padding:12px 20px;border-radius:10px 10px 0 0;font-size:14px;font-weight:500;color:${activeTab === 'users' ? 'var(--accent-text)' : 'var(--text-tertiary)'};background:${activeTab === 'users' ? 'var(--bg-card)' : 'transparent'};border:1px solid ${activeTab === 'users' ? 'var(--border-subtle)' : 'transparent'};border-bottom:1px solid ${activeTab === 'users' ? 'var(--bg-card)' : 'transparent'};margin-bottom:-1px;transition:all 0.2s;">👥 Users</button>
        <button class="tab-btn" data-tab="blog" style="padding:12px 20px;border-radius:10px 10px 0 0;font-size:14px;font-weight:500;color:${activeTab === 'blog' ? 'var(--accent-text)' : 'var(--text-tertiary)'};background:${activeTab === 'blog' ? 'var(--bg-card)' : 'transparent'};border:1px solid ${activeTab === 'blog' ? 'var(--border-subtle)' : 'transparent'};border-bottom:1px solid ${activeTab === 'blog' ? 'var(--bg-card)' : 'transparent'};margin-bottom:-1px;transition:all 0.2s;">📝 Blog</button>
      </div>

      <div id="tabContent"></div>
    `;

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    if (activeTab === 'users') renderUsers();
    else renderBlog();
  }

  async function renderUsers() {
    const content = container.querySelector('#tabContent');
    content.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner" style="margin:0 auto;"></div></div>';

    try {
      const users = await api.getUsers();
      content.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:16px;overflow:hidden;">
          <div style="display:grid;grid-template-columns:30px 1fr 100px 120px 100px;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border-subtle);font-size:12px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">
            <span></span><span>Username</span><span>Role</span><span>Status</span><span>Actions</span>
          </div>
          ${users.map(u => `
            <div style="display:grid;grid-template-columns:30px 1fr 100px 120px 100px;gap:12px;padding:14px 20px;align-items:center;border-bottom:1px solid var(--border-subtle);font-size:14px;">
              <span>${u.banned ? '🚫' : '✅'}</span>
              <span style="font-weight:500;">${u.username}</span>
              <span>
                <select class="role-select" data-userid="${u.id}" style="background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:6px;padding:4px 8px;color:var(--text-primary);font-size:13px;">
                  <option value="user" ${u.role === 'user' ? 'selected' : ''}>User</option>
                  <option value="editor" ${u.role === 'editor' ? 'selected' : ''}>Editor</option>
                  <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
              </span>
              <span>
                ${u.banned
                  ? '<span style="color:#ff6b6b;font-size:13px;">Banned</span>'
                  : '<span style="color:#00ff9c;font-size:13px;">Active</span>'
                }
              </span>
              <span>
                ${u.banned
                  ? `<button class="unban-btn" data-userid="${u.id}" style="padding:4px 12px;border-radius:6px;background:rgba(0,255,156,0.1);color:#00ff9c;font-size:12px;border:1px solid rgba(0,255,156,0.2);">Unban</button>`
                  : `<button class="ban-btn" data-userid="${u.id}" style="padding:4px 12px;border-radius:6px;background:rgba(255,77,77,0.1);color:#ff6b6b;font-size:12px;border:1px solid rgba(255,77,77,0.2);">Ban</button>`
                }
              </span>
            </div>
          `).join('')}
        </div>
      `;

      // Role change
      content.querySelectorAll('.role-select').forEach(sel => {
        sel.addEventListener('change', async () => {
          try {
            await api.setRole(sel.dataset.userid, sel.value);
            showToast(`Role updated to ${sel.value}`);
          } catch (e) { showToast(e.message, 'error'); }
        });
      });

      // Ban
      content.querySelectorAll('.ban-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm('Ban this user?')) {
            try { await api.banUser(btn.dataset.userid); renderUsers(); }
            catch (e) { alert(e.message); }
          }
        });
      });

      // Unban
      content.querySelectorAll('.unban-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          try { await api.unbanUser(btn.dataset.userid); renderUsers(); }
          catch (e) { alert(e.message); }
        });
      });

    } catch (e) {
      content.innerHTML = `<div style="color:#ff6b6b;text-align:center;padding:40px;">Error: ${e.message}</div>`;
    }
  }

  async function renderBlog() {
    const content = container.querySelector('#tabContent');

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h3 class="heading-2">Blog Posts</h3>
        <button class="btn btn-primary" id="newPostBtn">+ New Post</button>
      </div>
      <div id="blogEditor" style="display:none;"></div>
      <div id="blogList"></div>
    `;

    content.querySelector('#newPostBtn').addEventListener('click', () => {
      showEditor(null);
    });

    await renderBlogList(content.querySelector('#blogList'));
  }

  async function renderBlogList(el) {
    el.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner" style="margin:0 auto;"></div></div>';
    try {
      const posts = await api.getPosts();
      if (posts.length === 0) {
        el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-tertiary);">No blog posts yet.</div>';
        return;
      }
      el.innerHTML = posts.map(p => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border-subtle);">
          <div style="flex:1;">
            <h4 style="font-size:15px;font-weight:500;">${p.title}</h4>
            <p style="font-size:13px;color:var(--text-tertiary);">${p.date} · ${p.category} · by ${p.author}</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn-ghost edit-post" data-postid="${p.id}" style="font-size:13px;">Edit</button>
            <button class="btn-ghost delete-post" data-postid="${p.id}" style="font-size:13px;color:#ff6b6b;">Delete</button>
          </div>
        </div>
      `).join('');

      el.querySelectorAll('.edit-post').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            const post = await api.getPost(btn.dataset.postid);
            showEditor(post);
          } catch (e) { alert(e.message); }
        });
      });

      el.querySelectorAll('.delete-post').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm('Delete this post?')) {
            try { await api.deletePost(btn.dataset.postid); renderBlog(); }
            catch (e) { alert(e.message); }
          }
        });
      });

    } catch (e) {
      el.innerHTML = `<div style="color:#ff6b6b;text-align:center;padding:40px;">Error: ${e.message}</div>`;
    }
  }

  function showEditor(post) {
    const editor = container.querySelector('#blogEditor');
    const list = container.querySelector('#blogList');
    editor.style.display = 'block';
    if (list) list.style.display = 'none';

    const isEdit = !!post;
    editor.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:16px;padding:28px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h3 class="heading-3">${isEdit ? 'Edit Post' : 'New Post'}</h3>
          <button class="btn-ghost" id="cancelEditor">Cancel</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <input id="postTitle" type="text" placeholder="Post title" value="${isEdit ? post.title : ''}" style="width:100%;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-primary);font-size:18px;font-weight:600;">
          <div style="display:flex;gap:12px;">
            <input id="postCategory" type="text" placeholder="Category" value="${isEdit ? post.category : ''}" style="flex:1;padding:10px 14px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;color:var(--text-primary);font-size:14px;">
            <input id="postTags" type="text" placeholder="Tags (comma separated)" value="${isEdit ? (post.tags || []).join(', ') : ''}" style="flex:2;padding:10px 14px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;color:var(--text-primary);font-size:14px;">
          </div>
          <textarea id="postSummary" placeholder="Summary (optional)" rows="2" style="width:100%;padding:10px 14px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:8px;color:var(--text-primary);font-size:14px;resize:vertical;">${isEdit ? post.summary || '' : ''}</textarea>
          <div style="display:flex;gap:8px;align-items:center;border-bottom:1px solid var(--border-subtle);margin-bottom:0;">
            <button class="editor-tab active" data-tab="write" style="padding:8px 16px;font-size:13px;color:var(--accent-text);border-bottom:2px solid var(--accent);background:none;">Write</button>
            <button class="editor-tab" data-tab="preview" style="padding:8px 16px;font-size:13px;color:var(--text-tertiary);border-bottom:2px solid transparent;background:none;">Preview</button>
          </div>
          <div id="editorContentArea">
            <textarea id="postContent" placeholder="Post content (Markdown supported)" rows="15" style="width:100%;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-primary);font-size:14px;font-family:var(--font-mono);resize:vertical;line-height:1.7;">${isEdit ? post.content : ''}</textarea>
          </div>
          <button id="savePostBtn" class="btn btn-primary" style="align-self:flex-start;">${isEdit ? 'Update Post' : 'Publish Post'}</button>
          <div id="editorError" style="display:none;color:#ff6b6b;font-size:14px;"></div>
        </div>
      </div>
    `;

    editor.querySelector('#cancelEditor').addEventListener('click', () => {
      editor.style.display = 'none';
      if (list) list.style.display = 'block';
    });

    // Editor tabs (Write / Preview)
    editor.querySelectorAll('.editor-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        editor.querySelectorAll('.editor-tab').forEach(t => {
          t.style.color = 'var(--text-tertiary)';
          t.style.borderBottomColor = 'transparent';
        });
        tab.style.color = 'var(--accent-text)';
        tab.style.borderBottomColor = 'var(--accent)';

        const area = editor.querySelector('#editorContentArea');
        const textarea = editor.querySelector('#postContent');

        if (tab.dataset.tab === 'preview') {
          const md = textarea.value;
          const html = md
            .replace(/^### (.+)$/gm, '<h3 style="margin:16px 0 8px;font-size:18px;font-weight:600;">$1</h3>')
            .replace(/^## (.+)$/gm, '<h2 style="margin:20px 0 8px;font-size:22px;font-weight:600;">$1</h2>')
            .replace(/^# (.+)$/gm, '<h1 style="margin:24px 0 12px;font-size:28px;font-weight:700;">$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:0.9em;">$1</code>')
            .replace(/\n\n/g, '</p><p style="margin-bottom:12px;line-height:1.7;">')
            .replace(/^- (.+)$/gm, '<li style="margin:4px 0;">$1</li>');
          area.innerHTML = `<div style="min-height:300px;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;font-size:14px;line-height:1.7;overflow-y:auto;"><p style="margin-bottom:12px;line-height:1.7;">${html}</p></div>`;
        } else {
          area.innerHTML = '';
          area.appendChild(textarea);
        }
      });
    });

    editor.querySelector('#savePostBtn').addEventListener('click', async () => {
      const title = editor.querySelector('#postTitle').value.trim();
      const content = editor.querySelector('#postContent').value.trim();
      const summary = editor.querySelector('#postSummary').value.trim();
      const category = editor.querySelector('#postCategory').value.trim();
      const tags = editor.querySelector('#postTags').value.split(',').map(t => t.trim()).filter(Boolean);
      const errEl = editor.querySelector('#editorError');

      if (!title || !content) {
        errEl.style.display = 'block';
        errEl.textContent = 'Title and content are required.';
        return;
      }

      try {
        if (isEdit) {
          await api.updatePost(post.id, { title, content, summary, category, tags });
        } else {
          await api.createPost({ title, content, summary, category, tags });
        }
        renderBlog();
      } catch (e) {
        errEl.style.display = 'block';
        errEl.textContent = e.message;
      }
    });
  }

  // Toast notification system
  function showToast(msg, type = 'success') {
    const existing = document.getElementById('admin-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;background:${type === 'error' ? 'rgba(255,77,77,0.9)' : 'rgba(0,255,156,0.9)'};color:#000;backdrop-filter:blur(10px);transition:all 0.3s;font-family:Inter,sans-serif;`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
  }

  page.appendChild(container);
  render();
  return page;
}
