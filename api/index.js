const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { Redis } = require("@upstash/redis");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Redis (Upstash) — permanent storage across all serverless instances
const redisUrl = process.env.UPSTASH_REDIS_URL || "https://endless-impala-181988.upstash.io";
const redisToken = process.env.UPSTASH_REDIS_TOKEN || "gQAAAAAAAsbkAAIgcDFkMzA3OTU2NWYyNGE0ZTdlYmIwODJjODEwYjljZTg0ZQ";
const redis = new Redis({ url: redisUrl, token: redisToken });

const DATA_FILE = path.join(__dirname, "..", "data.json");

async function loadData() {
  try {
    const data = await redis.get("synapse:data");
    if (data) return typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) { console.error("Redis load error:", e.message); }
  // Fallback to file
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {}
  return { users: [], blogPosts: [], bannedTokens: [] };
}

async function saveData(data) {
  try { await redis.set("synapse:data", JSON.stringify(data)); } catch (e) { console.error("Redis save error:", e.message); }
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
}

// Middleware to attach db to each request
app.use(async (req, res, next) => {
  req.db = await loadData();
  next();
});

function generateToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let t = "crtx_";
  for (let i = 0; i < 48; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}

function requireRole(...roles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token" });
    if (req.db.bannedTokens.includes(token)) return res.status(403).json({ error: "Banned" });
    const user = req.db.users.find(u => u.token === token);
    if (!user) return res.status(401).json({ error: "Invalid token" });
    if (!roles.includes(user.role)) return res.status(403).json({ error: "Insufficient permissions" });
    req.user = user;
    next();
  };
}

// ─── Auth Routes ───
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });
  if (username.length < 3) return res.status(400).json({ error: "Username must be at least 3 characters" });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
  if (req.db.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: "Username already taken" });
  }
  const user = {
    id: Date.now().toString(36), username, password,
    role: req.db.users.length === 0 ? "admin" : "user",
    token: generateToken(), banned: false, createdAt: new Date().toISOString()
  };
  req.db.users.push(user);
  await saveData(req.db);
  res.json({ success: true, user: { id: user.id, username: user.username, role: user.role, token: user.token } });
});

app.post("/api/login", async (req, res) => {
  const user = req.db.users.find(u => u.username.toLowerCase() === req.body.username.toLowerCase() && u.password === req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid username or password" });
  if (user.banned) return res.status(403).json({ error: "Account suspended" });
  user.token = generateToken();
  await saveData(req.db);
  res.json({ success: true, user: { id: user.id, username: user.username, role: user.role, token: user.token } });
});

app.get("/api/me", requireRole("user", "editor", "admin"), (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username, role: req.user.role } });
});

app.post("/api/logout", requireRole("user", "editor", "admin"), async (req, res) => {
  req.user.token = null;
  await saveData(req.db);
  res.json({ success: true });
});

// ─── Blog Routes ───
app.get("/api/blog", (req, res) => {
  res.json((req.db.blogPosts || []).map(p => ({
    id: p.id, title: p.title, summary: p.summary, date: p.date,
    author: p.author, category: p.category, tags: p.tags, published: p.published
  })));
});

app.get("/api/blog/:id", (req, res) => {
  const post = (req.db.blogPosts || []).find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.post("/api/blog", requireRole("editor", "admin"), async (req, res) => {
  const { title, content, summary, category, tags } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content required" });
  const post = {
    id: Date.now().toString(36), title, content,
    summary: summary || content.slice(0, 200) + "...",
    date: new Date().toISOString().split("T")[0],
    author: req.user.username, category: category || "General",
    tags: tags || [], published: true, createdAt: new Date().toISOString()
  };
  req.db.blogPosts = req.db.blogPosts || [];
  req.db.blogPosts.unshift(post);
  await saveData(req.db);
  res.json({ success: true, post });
});

app.put("/api/blog/:id", requireRole("editor", "admin"), async (req, res) => {
  const post = (req.db.blogPosts || []).find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { title, content, summary, category, tags, published } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (summary) post.summary = summary;
  if (category) post.category = category;
  if (tags) post.tags = tags;
  if (published !== undefined) post.published = published;
  await saveData(req.db);
  res.json({ success: true, post });
});

app.delete("/api/blog/:id", requireRole("admin"), async (req, res) => {
  const idx = (req.db.blogPosts || []).findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  req.db.blogPosts.splice(idx, 1);
  await saveData(req.db);
  res.json({ success: true });
});

// ─── Plugin Request Routes ───
app.get("/api/requests", (req, res) => {
  res.json(req.db.pluginRequests || []);
});

app.post("/api/requests", async (req, res) => {
  const { name, desc } = req.body;
  if (!name || !desc) return res.status(400).json({ error: "Name and description required" });
  req.db.pluginRequests = req.db.pluginRequests || [];
  const request = {
    id: Date.now().toString(36),
    name, desc,
    author: req.user?.username || "Anonymous",
    date: new Date().toISOString().split("T")[0],
    votes: 0,
  };
  req.db.pluginRequests.push(request);
  await saveData(req.db);
  res.json({ success: true, request });
});

// ─── Admin Routes ───
app.get("/api/admin/users", requireRole("admin"), (req, res) => {
  res.json(req.db.users.map(u => ({
    id: u.id, username: u.username, role: u.role, banned: u.banned, createdAt: u.createdAt
  })));
});

app.put("/api/admin/users/:id/role", requireRole("admin"), async (req, res) => {
  const { role } = req.body;
  if (!["user", "editor", "admin"].includes(role)) return res.status(400).json({ error: "Invalid role" });
  const user = req.db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.role = role;
  await saveData(req.db);
  res.json({ success: true });
});

app.post("/api/admin/users/:id/ban", requireRole("admin"), async (req, res) => {
  const user = req.db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.banned = true;
  if (user.token) req.db.bannedTokens.push(user.token);
  await saveData(req.db);
  res.json({ success: true });
});

app.post("/api/admin/users/:id/unban", requireRole("admin"), async (req, res) => {
  const user = req.db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.banned = false;
  req.db.bannedTokens = req.db.bannedTokens.filter(t => t !== user.token);
  await saveData(req.db);
  res.json({ success: true });
});

// CIE Telemetry proxy
app.get("/api/cie/status", async (req, res) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const resp = await fetch("http://localhost:8485/health", { signal: controller.signal });
    clearTimeout(timeout);
    if (resp.ok) {
      const data = await resp.json();
      return res.json({ connected: true, ...data });
    }
  } catch {}
  // Simulated telemetry when CIE is not running
  res.json({
    connected: false,
    engineLoad: 40 + Math.sin(Date.now() / 1000) * 5 + Math.cos(Date.now() / 500) * 2,
    synapticLatency: 1.1 + Math.sin(Date.now() / 800) * 0.15,
    bandwidth: 80 + Math.sin(Date.now() / 1000) * 4,
    modelStatus: "simulated",
    activeModels: 0,
  });
});

// Health check
app.get("/api/health", async (req, res) => {
  const db = await loadData();
  res.json({ status: "ok", users: db.users.length, posts: (db.blogPosts || []).length, redis: !!redis });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Synapse Server running on http://localhost:${PORT}`);
    console.log("Using Upstash Redis for persistence");
  });
}
