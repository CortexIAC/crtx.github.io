import { api, storeSession, getStoredUser, isLoggedIn, clearSession } from '../api.js';
import { navigate } from '../router.js';

export function renderLogin() {
  const page = document.createElement('div');
  page.style.cssText = 'min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;';

  // If already logged in, show profile
  if (isLoggedIn()) {
    const user = getStoredUser();
    page.innerHTML = `
      <div style="width:100%;max-width:400px;">
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:20px;padding:40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">👤</div>
          <h2 style="font-size:24px;font-weight:600;margin-bottom:8px;">${user.username}</h2>
          <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:9999px;font-size:12px;font-weight:500;background:${user.role === 'admin' ? 'rgba(255,215,0,0.1)' : 'rgba(0,255,156,0.1)'};color:${user.role === 'admin' ? '#ffd700' : '#00ff9c'};border:1px solid ${user.role === 'admin' ? 'rgba(255,215,0,0.2)' : 'rgba(0,255,156,0.2)'};margin-bottom:24px;">
            ${user.role === 'admin' ? '⚡' : user.role === 'editor' ? '✏️' : '👤'} ${user.role}
          </div>
          ${user.role === 'admin' ? '<button class="btn btn-secondary" style="width:100%;margin-bottom:8px;" id="adminBtn">Admin Panel</button>' : ''}
          <button class="btn btn-secondary" style="width:100%;margin-bottom:8px;" id="logoutBtn">Sign Out</button>
          <button class="btn btn-ghost" style="width:100%;font-size:13px;color:var(--text-tertiary);" id="clearBtn">Clear local data & re-register</button>
        </div>
      </div>
    `;

    page.querySelector('#logoutBtn')?.addEventListener('click', async () => {
      try { await api.logout(); } catch {}
      clearSession();
      navigate('/');
    });

    page.querySelector('#clearBtn')?.addEventListener('click', () => {
      clearSession();
      location.reload();
    });

    page.querySelector('#adminBtn')?.addEventListener('click', () => navigate('/admin'));
    return page;
  }

  // Login/Register form
  const form = document.createElement('div');
  form.style.cssText = 'width:100%;max-width:400px;';

  // Toggle state
  let isRegister = false;

  function renderForm() {
    form.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:20px;padding:40px;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:40px;margin-bottom:12px;">🔐</div>
          <h2 style="font-size:24px;font-weight:600;">${isRegister ? 'Create Account' : 'Sign In'}</h2>
          <p style="font-size:14px;color:var(--text-tertiary);margin-top:4px;">
            ${isRegister ? 'First user gets admin privileges' : 'Welcome back to Synapse'}
          </p>
        </div>

        <div id="errorMsg" style="display:none;padding:12px 16px;border-radius:10px;background:rgba(255,77,77,0.1);border:1px solid rgba(255,77,77,0.2);color:#ff6b6b;font-size:14px;margin-bottom:16px;"></div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <input id="usernameInput" type="text" placeholder="Username" style="width:100%;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-primary);font-size:16px;">
          <input id="passwordInput" type="password" placeholder="Password" style="width:100%;padding:14px 18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:12px;color:var(--text-primary);font-size:16px;">
          <button id="submitBtn" class="btn btn-primary btn-large" style="width:100%;justify-content:center;margin-top:8px;">
            ${isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div style="text-align:center;margin-top:20px;">
          <button id="toggleBtn" style="font-size:14px;color:var(--text-tertiary);cursor:pointer;background:none;border:none;">
            ${isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    `;

    form.querySelector('#submitBtn').addEventListener('click', handleSubmit);
    form.querySelector('#toggleBtn').addEventListener('click', () => {
      isRegister = !isRegister;
      renderForm();
    });

    // Enter key to submit
    form.querySelector('#passwordInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
  }

  async function handleSubmit() {
    const username = form.querySelector('#usernameInput').value.trim();
    const password = form.querySelector('#passwordInput').value;
    const errorEl = form.querySelector('#errorMsg');

    try {
      const result = isRegister ? await api.register(username, password) : await api.login(username, password);
      storeSession(result.user);
      navigate('/');
    } catch (e) {
      errorEl.style.display = 'block';
      errorEl.textContent = e.message;
    }
  }

  renderForm();
  page.appendChild(form);
  return page;
}
