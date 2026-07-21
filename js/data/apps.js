export const appsData = {
  "synapse-core": {
    id: "synapse-core",
    name: "Synapse Core",
    tagline: "The Unified Intelligence Environment",
    icon: "⚡",
    banner: "linear-gradient(135deg, #0a1628 0%, #040a14 100%)",
    description: "Synapse Core (SynAura) is the central runtime that powers the CRTX ecosystem. It provides a unified interface for AI chat, system control, file management, terminal access, plugin modules, and persistent memory — all running locally. Built on a three-layer architecture: C.O.R.E. (runtime), N.O.D.E. (distributed execution), S.C.A.L.E. (automation).",
    currentVersion: "v0.1.0",
    developmentStatus: "Alpha",
    platform: ["Windows", "Linux"],
    language: ["Python"],
    dependencies: ["Ollama (local LLM)", "CIE integration"],
    github: "https://github.com/CortexIAC/SynapseCore",
    documentation: "#/docs/core-getting-started",
    downloads: {
      windows: { size: "2.4 MB", filename: "synapse-core-v0.1.0.zip", sha: "8F9E2A7B5C3D..." },
      linux: { size: "2.1 MB", filename: "synapse-core-v0.1.0.tar.gz", sha: "3A4B5C6D7E8F..." }
    },
    features: [
      "Local-first AI chat with Ollama integration (llama3, llava, dolphin-llama3)",
      "Persistent long-term memory with JSON-backed storage",
      "Plugin module system for extensible capabilities",
      "Built-in terminal, file browser, and web UI",
      "User profile and settings management"
    ],
    architecture: "Synapse Core runs on a three-layer architecture: C.O.R.E. (Centralized Operations & Runtime Environment) handles execution, N.O.D.E. (Network of Distributed Execution) manages modular expansion, and S.C.A.L.E. (Systems for Control, Automation, Logic, Execution) enables workflow orchestration.",
    roadmap: [
      { phase: "Aura — Core Foundation", items: ["Runtime + modular system foundation", "Base UI with tabs (Chat, Debug, Files, System, Control)", "Voice input (ALT hold)", "Module manager skeleton", "Theme system", "Logging & Debug system"] },
      { phase: "Pulse — Active Node Layer", items: ["Modules execute real functions", "Event-driven behavior", "Background processes", "Dynamic logging", "Work interfaces (Dev, Modding, Security)"] },
      { phase: "Halo — Expansion & Extensibility", items: ["Drop-in plugin system", "Module marketplace", "Dynamic UI per interface", "Multi-theme support", "Enhanced voice assistant"] }
    ],
    faq: [
      { q: "What is Synapse Core?", a: "Synapse Core is the central runtime of the CRTX ecosystem. It's a local-first AI operating environment that integrates chat, system tools, plugins, and memory into a single interface." },
      { q: "Does it require internet?", a: "No. Synapse Core runs entirely locally. AI models are served via Ollama on your own machine." },
      { q: "What models does it support?", a: "Any model available through Ollama — llama3, llama3.1, llama3.2-vision, llava, dolphin-llama3, DeepSeek, Qwen, and hundreds more." },
      { q: "Is it open source?", a: "Yes, the entire CRTX ecosystem is open source under the MIT license." }
    ],
    changelog: [
      { version: "v0.1.0", date: "2026-01-15", logs: ["Initial release", "Core runtime with chat, files, terminal panels", "Module system skeleton", "Long-term memory storage", "Ollama integration"] }
    ],
    futurePlans: [
      "Multi-process IPC routing with Synapse Core daemon",
      "Capability-based security ACLs for plugins",
      "Shared memory ring buffer for zero-copy IPC",
      "Plugin marketplace with community modules"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-studio", "nexus-hub"]
  },

  "cortex-intelligence-engine": {
    id: "cortex-intelligence-engine",
    name: "Cortex Intelligence Engine",
    shortName: "CIE",
    tagline: "Shared Intelligence Runtime for All Applications",
    icon: "🧠",
    banner: "linear-gradient(135deg, #1a0a2e 0%, #0d0418 100%)",
    description: "CIE is the shared intelligence engine powering the entire CRTX ecosystem. It provides conversation management, persistent SQLite-backed memory, context building, Ollama model routing, vision analysis, a capability registry, event pub/sub bus, scenes management, and background agents. Any CRTX application can import and use CIE to gain unified intelligence.",
    currentVersion: "v0.1.0",
    developmentStatus: "Beta",
    platform: ["Windows", "Linux", "macOS"],
    language: ["Python"],
    dependencies: ["Ollama (local LLM)", "SQLite"],
    downloadUrl: "/downloads/cie-server.zip",
    github: "https://github.com/CortexIAC/synapse-cie",
    documentation: "#/docs/cie-architecture",
    downloads: {
      windows: { size: "1.8 MB", filename: "cortex-intelligence-engine-v0.1.0.zip", sha: "4F3D2C1B0A..." },
      linux: { size: "1.5 MB", filename: "cortex-intelligence-engine-v0.1.0.tar.gz", sha: "9E8D7C6B5A..." },
      macos: { size: "1.6 MB", filename: "cortex-intelligence-engine-v0.1.0-darwin.zip", sha: "1F2E3D4C5B..." }
    },
    features: [
      "Stateful conversation management with thread history",
      "Persistent SQLite-backed memory with auto-embedding",
      "Multi-model routing (Ollama: llama3, llava, dolphin-llama3, DeepSeek, Qwen)",
      "Vision analysis engine for image understanding",
      "Capability registry for secure tool routing",
      "Event bus for inter-application pub/sub communication",
      "Scene management for saved orchestrations",
      "Background agents for proactive intelligence"
    ],
    architecture: "CIE is a modular Python package. The engine pipeline processes requests through: conversation context assembly, memory retrieval, model selection and routing, tool capability resolution, and response generation. Each application personality (floranode, synapse, studio, browser, nexus) has tuned system prompts.",
    roadmap: [
      { phase: "Phase 1: Foundation (Complete)", items: ["Conversation engine with multi-turn dialogue", "SQLite memory persistence", "Ollama model routing (5 models)", "Vision analysis pipeline", "Capability registry"] },
      { phase: "Phase 2: Proactive Intelligence (Current)", items: ["Background agent system", "Cross-application event bus integration", "Memory summarization and compaction", "Multi-modal context building"] },
      { phase: "Phase 3: Swarm Coordination", items: ["Multi-agent parallel execution", "Distributed planning across applications", "Consensus-based decision making"] }
    ],
    faq: [
      { q: "How do applications use CIE?", a: "CIE is installed as a Python package. Applications import it (e.g., `from cie import engine`) and CIE handles conversation, memory, and model routing automatically." },
      { q: "Can I use external models like GPT-4?", a: "CIE defaults to local Ollama models, but the model layer supports routing to external API providers if configured." },
      { q: "Does CIE share memory between applications?", a: "Yes. The memory system is shared across the ecosystem — what Notes learns can inform Studio, and what FloraNode observes can be referenced by the Planner." },
      { q: "Is the vector store persistent?", a: "Yes, it serializes into a local SQLite database. No cloud, no telemetry." }
    ],
    changelog: [
      { version: "v0.1.0", date: "2026-03-01", logs: ["Initial release", "Conversation engine with stateful threads", "SQLite memory backend", "Ollama model routing (5 models)", "Vision analysis support", "Capability registry", "Application personality system"] }
    ],
    futurePlans: [
      "Memory summarization and compaction for long-running contexts",
      "Cross-application context sharing",
      "Tool-use agents (ReAct loops)",
      "Plugin system for custom capability providers"
    ],
    relatedApps: ["synapse-core", "cortex-studio", "cortex-notes", "floranode", "nexus-hub"]
  },

  "cortex-studio": {
    id: "cortex-studio",
    name: "Cortex Studio",
    tagline: "Desktop AI Workstation & Intelligence IDE",
    icon: "🖥",
    banner: "linear-gradient(135deg, #0a1a12 0%, #040a06 100%)",
    description: "Cortex Studio is a comprehensive desktop AI workstation that integrates an intelligent IDE, web browser, terminal, AI chat, code agent, knowledge graph, notebook, image editor, VPN, plugin marketplace, retro gaming (RetroArch/LibRetro), and security tools into a single unified interface. Built with PyQt6.",
    currentVersion: "v1.0.0",
    developmentStatus: "Stable",
    platform: ["Windows (Desktop)"],
    language: ["Python (PyQt6)"],
    dependencies: ["Synapse Core", "Cortex Intelligence Engine"],
    github: "https://github.com/CortexIAC/cortex-studio",
    documentation: "#/docs/studio-workbench",
    downloads: {
      windows: { size: "48.2 MB", filename: "cortex-studio-v1.0.0-setup.exe", sha: "2E1D9C8B7A..." },
      macos: { size: "51.1 MB", filename: "cortex-studio-v1.0.0.dmg", sha: "9E8A7B6C5D..." }
    },
    features: [
      "Intelligent web browser with AI page summarization",
      "Integrated IDE with syntax highlighting and code intelligence",
      "AI chat panel with local Ollama models",
      "Retro gaming emulation via RetroArch/LibRetro",
      "Security toolkit (OSINT, recon, scanner)",
      "Knowledge graph visualization",
      "Plugin marketplace and module system",
      "Built-in VPN and privacy tools"
    ],
    architecture: "Cortex Studio is built on PyQt6 with QtWebEngine. It uses a tab-based interface with 20+ page modules. The Jarvis Companion provides CLI-based AI assistance, and Polyglot handles multi-language terminal streaming via gRPC.",
    roadmap: [
      { phase: "Phase 1: Foundation", items: ["Browser engine integration", "AI chat panel", "Basic IDE features", "Plugin system"] },
      { phase: "Phase 2: Intelligence (Current)", items: ["CIE integration for AI features", "Knowledge graph", "Agent assembly", "Jarvis CLI companion"] },
      { phase: "Phase 3: Ecosystem", items: ["Full plugin marketplace", "Multi-device sync", "Polyglot terminal streaming"] }
    ],
    faq: [
      { q: "Is Cortex Studio free?", a: "Yes, it's fully open source under the MIT license." },
      { q: "Can I build custom plugins?", a: "Yes. Studio has a plugin system that allows mounting custom panels and tools." },
      { q: "Does it require CIE?", a: "Core features work standalone, but AI features (chat, summarization, knowledge graph) require the Cortex Intelligence Engine." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-04-10", logs: ["Initial stable release", "20+ page modules", "Browser with AI summarization", "IDE with syntax highlighting", "Plugin marketplace", "Jarvis AI companion"] }
    ],
    futurePlans: [
      "Multi-workspace support with session persistence",
      "Remote agent deployment from within Studio",
      "Collaborative editing and pair programming"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-notes", "cortex-horizon", "nexus-hub"]
  },

  "cortex-horizon": {
    id: "cortex-horizon",
    name: "Cortex Horizon",
    tagline: "The Intelligence Browser",
    icon: "🌐",
    banner: "linear-gradient(135deg, #12101e 0%, #080714 100%)",
    description: "Cortex Horizon is a premium intelligence browser built for professionals. It combines a fully-featured Chromium-based browser with enterprise-grade security tools, 14+ OSINT reconnaissance modules, AI-powered analysis, Tor integration, network scanning, Wi-Fi recon, CVE search, Shodan integration, directory busting, packet capture, and Metasploit RPC — all within a customizable interface with 16 themes.",
    currentVersion: "v2.5.0",
    developmentStatus: "Stable",
    platform: ["Windows (Desktop)"],
    language: ["Python (PyQt6 + QtWebEngine)"],
    dependencies: ["Cortex Service (optional)", "Cortex Intelligence Engine (optional)"],
    github: "https://github.com/CortexIAC/cortex-horizon",
    documentation: "#/docs/horizon-swarms",
    downloads: {
      windows: { size: "28.4 MB", filename: "cortex-horizon-v2.5.0-setup.exe", sha: "3F4E5D6C7B..." },
      linux: { size: "26.1 MB", filename: "cortex-horizon-v2.5.0.tar.gz", sha: "8E9D0C1B2A..." }
    },
    features: [
      "Full Chromium-based web browsing (PyQt6 WebEngine)",
      "14+ OSINT reconnaissance modules",
      "Tor integration with privacy controls",
      "AI-powered page summarization and analysis",
      "Network scanner and Wi-Fi reconnaissance",
      "CVE search and Shodan integration",
      "Directory buster and packet capture",
      "16 customizable themes",
      "Built-in adblock and tracker blocking"
    ],
    architecture: "Horizon uses PyQt6 with QtWebEngine for the browser core. It integrates with Cortex Service (port 7474) for authentication, settings sync, AI completions, and profile management. The tab-based interface separates browsing, tools, and AI panels.",
    roadmap: [
      { phase: "Phase 1: Browser Core", items: ["Chromium engine integration", "Tab management", "Bookmarks and history"] },
      { phase: "Phase 2: Intelligence (Current)", items: ["AI summarization", "OSINT tool suite", "Tor integration", "Theme system"] },
      { phase: "Phase 3: Enterprise", items: ["Team sync", "Remote agent deployment", "Threat intelligence feeds"] }
    ],
    faq: [
      { q: "Is Horizon a regular browser?", a: "Yes, it's a fully functional Chromium-based browser with all standard features, plus added intelligence and security tools." },
      { q: "Do the OSINT tools require internet?", a: "Most tools need internet access (Shodan, CVE search), but many reconnaissance modules work on local network scanning." },
      { q: "Can I use it without Cortex Service?", a: "Yes. The browser works standalone. Cortex Service integration is optional for sync and AI features." }
    ],
    changelog: [
      { version: "v2.5.0", date: "2026-07-01", logs: ["Added 6 new OSINT modules", "Tor integration rewrite", "16 themes added", "AI page summarization", "Performance improvements"] },
      { version: "v2.0.0", date: "2026-04-15", logs: ["Complete UI overhaul", "PyQt6 migration", "Tab management rewrite"] }
    ],
    futurePlans: [
      "Collaborative browsing sessions",
      "Automated threat intelligence gathering",
      "Plugin system for custom analysis modules"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-studio", "cortex-service"]
  },

  "cortex-notes": {
    id: "cortex-notes",
    name: "Cortex Notes",
    tagline: "Simple, Persistent Note Management",
    icon: "📓",
    banner: "linear-gradient(135deg, #0e1418 0%, #060a0c 100%)",
    description: "Cortex Notes is a straightforward note-taking application with persistent storage, workspace management, and an intuitive sidebar interface. Part of the CRTX productivity suite, it keeps your notes organized and accessible.",
    currentVersion: "v1.0.0",
    developmentStatus: "Beta",
    platform: ["Windows", "Linux"],
    language: ["Python (Tkinter)"],
    dependencies: ["None (standalone)"],
    downloadUrl: "/downloads/cortex-notes.zip",
    github: "https://github.com/CortexIAC/cortex-notes",
    documentation: "#/docs/cortex-notes-syntax",
    downloads: {
      windows: { size: "1.2 MB", filename: "cortex-notes-v1.0.0.zip", sha: "9D8C7B6A5F..." },
      macos: { size: "1.4 MB", filename: "cortex-notes-v1.0.0.tar.gz", sha: "5E4D3C2B1A..." }
    },
    features: [
      "Create, edit, and organize notes with persistent storage",
      "Workspace management for multiple note collections",
      "Clean, minimal Tkinter interface",
      "Quick search and navigation"
    ],
    architecture: "Cortex Notes uses a simple model-view architecture. The core layer handles note management, storage (JSON files), and workspace organization. The UI layer provides the editor, sidebar, and main window.",
    roadmap: [
      { phase: "Phase 1: Core", items: ["Note CRUD operations", "Workspace management", "File-based storage"] },
      { phase: "Phase 2: Intelligence", items: ["CIE integration for semantic search", "Auto-linking between notes", "Knowledge graph visualization"] },
      { phase: "Phase 3: Sync", items: ["Multi-device sync", "Markdown export/import"] }
    ],
    faq: [
      { q: "Where are my notes stored?", a: "Notes are saved as JSON files in the data/ directory within the application folder." },
      { q: "Can I export my notes?", a: "Currently notes are stored in JSON format. Markdown export is planned for a future release." },
      { q: "Does it work with CIE?", a: "Standalone it works without CIE. CIE integration for semantic features is in development." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-05-01", logs: ["Initial release", "Note CRUD with persistent storage", "Workspace management", "Sidebar navigation"] }
    ],
    futurePlans: [
      "CIE semantic search integration",
      "Markdown export/import",
      "Obsidian vault compatibility"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-studio"]
  },

  "floranode": {
    id: "floranode",
    name: "FloraNode",
    tagline: "Cultivation Operating System",
    icon: "🌿",
    banner: "linear-gradient(135deg, #0f1a0c 0%, #060d04 100%)",
    description: "FloraNode is a specialized cultivation operating system for cannabis growing. It manages plants, strains, breeding experiments, and SOPs with a full SQLite-backed database. Integrates with the Cortex Intelligence Engine for AI-powered diagnostics, chat analysis, and photo journaling. Built with PyQt6 and a FastAPI backend.",
    currentVersion: "v2.0.0",
    developmentStatus: "Stable",
    platform: ["Windows (Desktop)", "Raspberry Pi (OS)"],
    language: ["Python (PyQt6)", "Python (FastAPI)"],
    dependencies: ["Cortex Intelligence Engine"],
    github: "https://github.com/CortexIAC/floranode",
    documentation: "#/docs/floranode-guide",
    downloads: {
      windows: { size: "3.8 MB", filename: "floranode-v2.0.0-setup.exe", sha: "7E6D5C4B3A..." },
      raspi: { size: "2.5 MB", filename: "floranode-pi-v2.0.0.img", sha: "1A2B3C4D5E..." }
    },
    features: [
      "Comprehensive plant, strain, and phenotype management",
      "Breeding experiment tracking with lineage trees",
      "SOP (Standard Operating Procedure) management",
      "AI-powered chat diagnostics via CIE",
      "Photo journal with timeline and visual analysis",
      "Sensor telemetry integration (MQTT, GPIO)",
      "SQLite database with full seed system"
    ],
    architecture: "FloraNode has a dual architecture: a PyQt6 desktop application for direct interaction and a FastAPI backend (port 8485) for API access. It integrates with CIE for AI features (chat, vision analysis) and uses SQLite for local persistence. The database includes tables for plants, strains, phenotypes, experiments, and sensor readings.",
    roadmap: [
      { phase: "Phase 1: Database & UI (Complete)", items: ["SQLite database schema", "Plant and strain management", "Desktop UI with PyQt6"] },
      { phase: "Phase 2: AI Integration (Current)", items: ["CIE chat integration", "Photo journal with AI analysis", "Crop diagnostic assistant"] },
      { phase: "Phase 3: Automation", items: ["Sensor telemetry integration", "Automated watering cycles", "Lighting control profiles"] }
    ],
    faq: [
      { q: "What sensors are supported?", a: "FloraNode supports capacitive soil sensors, DHT22 (temperature/humidity), pH/EC probes, and MQTT-based smart devices." },
      { q: "Do I need a Raspberry Pi?", a: "No. The desktop app runs on Windows. Pi support is for direct GPIO sensor integration." },
      { q: "How does CIE integration work?", a: "FloraNode sends plant data and images to CIE for AI analysis. You can ask about plant health, get diagnostic recommendations, and analyze growth patterns." },
      { q: "Is my data stored locally?", a: "Yes. Everything is stored in a local SQLite database at ~/.floranode/floranode.db. No cloud." }
    ],
    changelog: [
      { version: "v2.0.0", date: "2026-05-15", logs: ["CIE chat integration", "Photo journal with AI analysis", "Database schema overhaul", "Strain management system"] },
      { version: "v1.0.0", date: "2026-02-10", logs: ["Initial release", "Plant management", "SQLite database", "Desktop UI"] }
    ],
    futurePlans: [
      "Real-time sensor graph monitoring",
      "Automated nutrient dosing control",
      "Commercial grow support with multi-room management"
    ],
    relatedApps: ["cortex-intelligence-engine", "synapse-core", "cortex-studio"]
  },

  "cortex-arsenal": {
    id: "cortex-arsenal",
    name: "Cortex Arsenal",
    tagline: "Security & OSINT Toolkit",
    icon: "🔧",
    banner: "linear-gradient(135deg, #1a0e0a 0%, #0d0604 100%)",
    description: "Cortex Arsenal is a standalone offensive security and OSINT toolkit. It provides a multi-tab terminal, tool notebook, and integrates with nmap, Scapy, and PyShark for network analysis, packet capture, and reconnaissance — all within a PyQt6 interface.",
    currentVersion: "v1.0.0",
    developmentStatus: "Beta",
    platform: ["Windows (Desktop)"],
    language: ["Python (PyQt6)"],
    dependencies: ["python-nmap", "Scapy", "PyShark"],
    github: "https://github.com/CortexIAC/cortex-arsenal",
    documentation: "#/docs/arsenal-guide",
    downloads: {
      windows: { size: "4.2 MB", filename: "cortex-arsenal-v1.0.0.zip", sha: "A1B2C3D4E5..." }
    },
    features: [
      "Multi-tab terminal with concurrent session support",
      "Network scanning and reconnaissance (nmap)",
      "Packet capture and analysis (PyShark)",
      "Raw socket operations and packet crafting (Scapy)",
      "Tool notebook for organizing security workflows"
    ],
    architecture: "Cortex Arsenal is a PyQt6 desktop application. It uses process-based terminal emulation for concurrent sessions and wraps system tools (nmap, tcpdump, etc.) with Python bindings for integrated analysis.",
    roadmap: [
      { phase: "Phase 1: Terminal & Tools", items: ["Multi-tab terminal", "nmap integration", "Basic packet capture"] },
      { phase: "Phase 2: Analysis (Current)", items: ["PyShark protocol analysis", "Scapy packet crafting", "Tool notebook"] },
      { phase: "Phase 3: Automation", items: ["Automated reconnaissance pipelines", "Report generation", "Team collaboration"] }
    ],
    faq: [
      { q: "Is this a hacking tool?", a: "Cortex Arsenal is a security toolkit designed for legitimate security testing, network analysis, and educational purposes. Use only on systems you own or have permission to test." },
      { q: "Do I need administrator privileges?", a: "Some features (packet capture, raw sockets) require administrator/root privileges on Windows." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-04-20", logs: ["Initial release", "Multi-tab terminal", "nmap integration", "PyShark packet analysis", "Scapy packet crafting"] }
    ],
    futurePlans: [
      "Automated OSINT reconnaissance pipelines",
      "Integration with CVE databases",
      "Report generation with findings summary"
    ],
    relatedApps: ["cortex-horizon", "cortex-studio"]
  },

  "cortex-voicelab": {
    id: "cortex-voicelab",
    name: "Cortex VoiceLab",
    tagline: "AI Voice Changer & Audio Processing Platform",
    icon: "🎤",
    banner: "linear-gradient(135deg, #1a0a1e 0%, #0d0410 100%)",
    description: "Cortex VoiceLab is a local-first AI voice changer and audio processing platform. It provides real-time audio effects (EQ, compressor, reverb, delay, pitch shift, noise gate, limiter, de-esser, exciter, multiband compression, radio effect, auto-gain, noise reduction), voice conversion via RVC/ONNX, a soundboard, audio routing, and a blueprint/preset system.",
    currentVersion: "v1.0.0",
    developmentStatus: "Beta",
    platform: ["Windows (Desktop)"],
    language: ["Python (PySide6)"],
    dependencies: ["sounddevice", "numpy", "scipy", "soundfile"],
    downloadUrl: "/downloads/cortex-voicelab.zip",
    github: "https://github.com/CortexIAC/cortex-voicelab",
    documentation: "#/docs/voicelab-guide",
    downloads: {
      windows: { size: "8.6 MB", filename: "cortex-voicelab-v1.0.0-setup.exe", sha: "B2C3D4E5F6..." }
    },
    features: [
      "16 real-time audio effects (EQ, compressor, reverb, delay, pitch shift, noise gate, limiter, de-esser, exciter, multiband compression, radio effect, auto-gain, noise reduction)",
      "AI voice conversion via RVC/ONNX models",
      "Soundboard with multi-sample playback",
      "Audio routing and device management",
      "Blueprint/preset system with 9 built-in presets",
      "Voicemod bridge integration"
    ],
    architecture: "VoiceLab uses a pipeline-based audio engine. Audio flows through the device manager into a configurable effects pipeline, then to output. Voice conversion runs as a separate model inference thread. Blueprints are saved as JSON presets.",
    roadmap: [
      { phase: "Phase 1: Effects Engine (Complete)", items: ["16 audio effects implemented", "Real-time audio pipeline", "Device management"] },
      { phase: "Phase 2: Voice AI (Current)", items: ["RVC voice conversion", "Whisper speech recognition", "Blueprint system"] },
      { phase: "Phase 3: Integration", items: ["CIE integration for voice commands", "Plugin system for custom effects", "Network audio streaming"] }
    ],
    faq: [
      { q: "Does it work in real-time?", a: "Yes. VoiceLab processes audio in real-time with low-latency audio routing. Effects are applied instantly." },
      { q: "What voice models does it support?", a: "VoiceLab supports RVC (Retrieval-based Voice Conversion) models in ONNX format. You can train and import your own models." },
      { q: "Can I use it with games or Discord?", a: "Yes. VoiceLab can route processed audio to virtual audio devices, making it usable with any application." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-05-20", logs: ["Initial release", "16 real-time audio effects", "RVC voice conversion", "Blueprint/preset system", "Soundboard", "Audio routing"] }
    ],
    futurePlans: [
      "CIE voice command integration",
      "Custom effect plugin SDK",
      "Network audio streaming for remote sessions"
    ],
    relatedApps: ["cortex-studio", "cortex-intelligence-engine"]
  },

  "nexus-hub": {
    id: "nexus-hub",
    name: "Nexus Hub",
    tagline: "Ecosystem Launcher & Application Dashboard",
    icon: "🗄",
    banner: "linear-gradient(135deg, #0e121c 0%, #060810 100%)",
    description: "Nexus Hub is the central launcher and dashboard for the entire CRTX ecosystem. It manages application discovery, registration, launching, heartbeat monitoring, event bus messaging, and user sessions. Acts as the command center for all Cortex applications.",
    currentVersion: "v0.1.0",
    developmentStatus: "Alpha",
    platform: ["Windows", "Linux"],
    language: ["Python (PySide6)"],
    dependencies: ["Synapse Core"],
    github: "https://github.com/CortexIAC/NexusHub",
    documentation: "#/docs/nexus-hub-admin",
    downloads: {
      windows: { size: "2.6 MB", filename: "nexus-hub-v0.1.0.zip", sha: "1F2E3D4C5B..." },
      linux: { size: "2.3 MB", filename: "nexus-hub-v0.1.0.tar.gz", sha: "6E7D8C9B0A..." }
    },
    features: [
      "Centralized application launcher for all CRTX apps",
      "App discovery and registration from filesystem",
      "Heartbeat monitoring for running services",
      "Event bus for inter-application communication",
      "User session management",
      "Ecosystem registry with version tracking"
    ],
    architecture: "Nexus Hub uses PySide6 for the desktop UI. It discovers installed CRTX applications by scanning the filesystem for manifest files, maintains a registry of known apps, and provides a runtime for launching and monitoring them. The heartbeat system tracks running services and auto-restarts them if they fail.",
    roadmap: [
      { phase: "Phase 1: Launcher (Current)", items: ["Application discovery", "App registry", "Launch management", "Basic UI"] },
      { phase: "Phase 2: Dashboard", items: ["Real-time monitoring", "Log aggregation", "Status indicators"] },
      { phase: "Phase 3: Marketplace", items: ["Plugin installer", "Version management", "Dependency resolution"] }
    ],
    faq: [
      { q: "Is Nexus Hub required?", a: "No, each CRTX application runs independently. Nexus Hub is a convenience tool for managing multiple apps from one place." },
      { q: "How does app discovery work?", a: "Nexus Hub scans configured directories for application manifests (JSON files with app metadata, version, and entry points)." },
      { q: "Can I add my own apps?", a: "Yes. Any application with a valid manifest can be registered. Nexus Hub will discover and launch it." }
    ],
    changelog: [
      { version: "v0.1.0", date: "2026-06-01", logs: ["Initial release", "Application discovery", "App registry with 11 detected apps", "Heartbeat monitoring", "Basic launcher UI"] }
    ],
    futurePlans: [
      "Plugin marketplace with one-click install",
      "Remote monitoring and management",
      "Automatic updates for registered apps"
    ],
    relatedApps: ["synapse-core", "cortex-studio", "cortex-service"]
  },

  "cortex-service": {
    id: "cortex-service",
    name: "Cortex Service",
    tagline: "Backend Microservice for the CRTX Ecosystem",
    icon: "⚙️",
    banner: "linear-gradient(135deg, #0e1418 0%, #060a0c 100%)",
    description: "Cortex Service is the backend microservice for the CRTX ecosystem. It provides a FastAPI-based REST API for authentication, settings synchronization, AI completions (via OpenRouter and Ollama), and profile management. Runs on port 7474 and serves as the backbone for Horizon, Studio, and other CRTX applications.",
    currentVersion: "v1.0.0",
    developmentStatus: "Stable",
    platform: ["Windows", "Linux"],
    language: ["Python (FastAPI)"],
    dependencies: ["Synapse Core"],
    github: "https://github.com/CortexIAC/Cortex-Service",
    documentation: "#/docs/service-api",
    downloads: {
      windows: { size: "1.8 MB", filename: "cortex-service-v1.0.0.zip", sha: "8A7B6C5D4E..." },
      linux: { size: "1.5 MB", filename: "cortex-service-v1.0.0.tar.gz", sha: "3B4C5D6E7F..." }
    },
    features: [
      "REST API for authentication and session management",
      "AI completions proxy (OpenRouter + Ollama dual providers)",
      "Settings synchronization across applications",
      "Profile and user management",
      "Lightweight FastAPI backend with CORS support"
    ],
    architecture: "Cortex Service is a FastAPI application that serves as a centralized backend. It provides REST endpoints that CRTX applications call for shared services. AI completions are routed to either OpenRouter (cloud) or Ollama (local) based on configuration.",
    roadmap: [
      { phase: "Phase 1: API Core (Complete)", items: ["FastAPI server", "Auth endpoints", "Settings sync", "AI completions"] },
      { phase: "Phase 2: Intelligence", items: ["CIE integration for advanced AI", "File storage and sync", "Webhook system"] },
      { phase: "Phase 3: Scale", items: ["Multi-user support", "Team workspaces", "Plugin hosting"] }
    ],
    faq: [
      { q: "Is Cortex Service required?", a: "No. CRTX apps work standalone. Service provides optional sync and AI features." },
      { q: "What AI providers does it support?", a: "It supports OpenRouter (cloud, with API key) and Ollama (local, http://localhost:11434)." },
      { q: "What port does it use?", a: "The service runs on localhost:7474 by default." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-03-15", logs: ["Initial release", "FastAPI backend", "Auth and session management", "AI completions (OpenRouter + Ollama)", "Settings sync", "CORS support for all CRTX apps"] }
    ],
    futurePlans: [
      "Multi-user support with team workspaces",
      "Plugin hosting and execution",
      "Webhook integration for external services"
    ],
    relatedApps: ["cortex-horizon", "cortex-studio", "nexus-hub"]
  }
};

export function getApp(id) {
  return appsData[id] || null;
}

export function getAllApps() {
  return Object.values(appsData);
}

export function getRelatedApps(appId) {
  const app = appsData[appId];
  if (!app) return [];
  return app.relatedApps
    .map(id => appsData[id])
    .filter(Boolean);
}

export function getStatusClass(status) {
  const map = {
    "Alpha": "alpha",
    "Beta": "beta",
    "Stable": "stable",
    "Planning": "planning",
    "Release Candidate": "beta"
  };
  return map[status] || "beta";
}
