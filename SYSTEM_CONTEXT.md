# CRTX Ecosystem — Full System Context

## Overview
An open-source ecosystem of AI-powered desktop applications sharing a single intelligence engine (CIE). All apps are local-first, modular, and communicate via a shared runtime.

## Current Architecture
```
User Layer:     Studio | Horizon | FloraNode | VoiceLab | Arsenal | Notes
                     \      |          |          |         |        /
Engine Layer:           CIE (Cortex Intelligence Engine)
                           |
Runtime Layer:        Synapse Core (IPC daemon)
                           |
Infrastructure:      Cortex Service | Nexus Hub | Ollama | Upstash Redis
```

## Apps & Their State

### CIE Runtime (synapse-cie) — THE PRIORITY
- **Language:** Python package
- **Current:** Chat engine with memory (SQLite), Ollama routing, vision, capability registry, event bus
- **Current modules:** engine.py, conversation.py, memory.py, models.py, vision.py, registry.py, events.py, scenes.py, agents.py, context.py
- **Missing (what to build):**
  - `planner.py` — Goal decomposition into task lists
  - `executor.py` — Task execution via tool calls
  - `tools.py` — Read/write/search/run/git tools
  - `reflect.py` — Result review, next-step decisions
  - `agent.py` — Orchestrates plan→execute→reflect loop
  - Streaming token output
  - Context builder (smart file selection)
  - Codebase indexer (AST + embeddings)
  - Multi-model router

### CIEServer
- FastAPI REST API exposing CIE as HTTP endpoints on port 8485
- Endpoints: /health, /cie/chat, /cie/status, /cie/conversations, /cie/memory, /cie/vision

### Cortex Studio
- **Current:** PyQt6 desktop app with 20+ page modules (browser, IDE, terminal, AI chat, games, security)
- **Missing for Cursor-level:**
  - Agent loop UI (plan panel, task list, status updates)
  - Streaming output display
  - Diff viewer for file edits
  - Codebase indexer integration
  - Terminal integrated with agent
  - Multi-file editing workflow

### Synapse Core (SynAura)
- Python runtime with AI chat, file browser, terminal, plugin modules, user system
- Manifest.json version 0.1.0
- Entry: main.py → Runtime().run()

### Cortex Horizon
- **Current:** PyQt6 Chromium browser + 14 OSINT tools + Tor + AI + 16 themes
- Version 2.5.0
- Most complete app after VoiceLab

### Cortex VoiceLab
- 16 audio effects, RVC voice conversion, soundboard, blueprint system
- Most polished app in the ecosystem

### FloraNode
- PyQt6 cultivation OS + FastAPI backend
- Plant management, strain tracking, CIE chat integration, photo journal
- Version 2.0.0 — 9,000+ lines

### Other Apps
- **Cortex Arsenal:** Security toolkit (nmap, Scapy, PyShark)
- **Cortex Notes:** Tkinter note manager
- **Nexus Hub:** Ecosystem launcher/dashboard
- **Cortex Service:** FastAPI backend microservice
- **WaveGuard PTS:** ESP32 hardware project (planned)

## Website
- Vercel-deployed SPA with 12 routes
- Auth system (localStorage + API tokens)
- Blog with markdown editor
- Plugin marketplace with download packages
- Upstash Redis persistence
- Admin panel (user management, blog CRUD)

## Downloadable Packages
- cie-server.zip, cortex-notes.zip, cortex-voicelab.zip
- 5 community plugins with PyQt6 UIs

## Repos (GitHub.com/CortexIAC)
SynapseCore, synapse-cie, Cortex-Studio, Cortex-Horizon, Cortex-Notes, FloraNode, Cortex-Arsenal, Cortex-VoiceLab, NexusHub, Cortex-Service, CIEServer, NNTest

## Immediate Build Targets
1. CIE agent loop (planner → executor → tools → reflect)
2. Studio agent UI (plan panel, streaming, status, diffs)
3. Synapse Core terminal as downloadable package
4. Codebase indexer
5. Context builder
