const API_BASE = "/api";

async function request(method, path, body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("synapse_token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, opts);
  } catch (e) {
    throw new Error("Cannot connect to server. Make sure the backend is running.");
  }

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // Response is not JSON — probably HTML from a 404 or GitHub Pages
    const text = await res.text().catch(() => "");
    if (text.includes("<!doctype") || text.includes("<html")) {
      throw new Error("Server unavailable: The API backend is not running. Start the server with 'node server/server.js'.");
    }
    throw new Error(`Server error (${res.status}): Unexpected response`);
  }

  if (!res.ok) {
    // Auto-logout on invalid token
    if (res.status === 401 && localStorage.getItem("synapse_token")) {
      localStorage.removeItem("synapse_token");
      localStorage.removeItem("synapse_user");
      // Only reload if we're on a page that requires auth
      if (window.location.hash.includes('/admin') || window.location.hash.includes('/login')) {
        window.location.hash = '/';
      }
    }
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  login: (username, password) => request("POST", "/login", { username, password }),
  register: (username, password) => request("POST", "/register", { username, password }),
  me: () => request("GET", "/me"),
  logout: () => request("POST", "/logout"),

  getPosts: () => request("GET", "/blog"),
  getPost: (id) => request("GET", `/blog/${id}`),
  createPost: (data) => request("POST", "/blog", data),
  updatePost: (id, data) => request("PUT", `/blog/${id}`, data),
  deletePost: (id) => request("DELETE", `/blog/${id}`),

  getRequests: () => request("GET", "/requests"),
  createRequest: (name, desc) => request("POST", "/requests", { name, desc }),

  getUsers: () => request("GET", "/admin/users"),
  setRole: (userId, role) => request("PUT", `/admin/users/${userId}/role`, { role }),
  banUser: (userId) => request("POST", `/admin/users/${userId}/ban`),
  unbanUser: (userId) => request("POST", `/admin/users/${userId}/unban`),

  health: () => request("GET", "/health"),
};

export function isLoggedIn() {
  return !!localStorage.getItem("synapse_token");
}

export function getStoredUser() {
  const u = localStorage.getItem("synapse_user");
  return u ? JSON.parse(u) : null;
}

export function storeSession(user) {
  localStorage.setItem("synapse_token", user.token);
  localStorage.setItem("synapse_user", JSON.stringify({ id: user.id, username: user.username, role: user.role }));
}

export function clearSession() {
  localStorage.removeItem("synapse_token");
  localStorage.removeItem("synapse_user");
}
