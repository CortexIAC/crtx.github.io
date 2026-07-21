const path = require("path");
const express = require("express");

// Import the Express app from the Vercel serverless function
const apiApp = require("../api/index");

// Create a separate app for local development
const app = express();

// Serve static files from the project root
app.use(express.static(path.join(__dirname, ".."), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    }
  }
}));

// Mount the API routes
app.use(apiApp);

// SPA fallback: serve index.html for all non-API routes
app.use((req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ error: "Not found" });
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Synapse Server running on http://localhost:${PORT}`);
  console.log(`First user to register becomes admin`);
});
