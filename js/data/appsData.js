export const appsData = {
  "synapse-core": {
    id: "synapse-core",
    name: "Synapse Core",
    tagline: "The Local Communications & IPC Backbone",
    logo: "cpu",
    banner: "linear-gradient(135deg, #111e2e 0%, #070e1b 100%)",
    description: "Synapse Core is the underlying runtime and high-performance communication bus that coordinates all Synapse applications. Built in Rust for bare-metal speed and security, it implements an encrypted, local-first IPC socket matrix with capability-based security permissions.",
    currentVersion: "v0.8.2-beta",
    developmentStatus: "Beta",
    platform: ["Windows", "Linux", "macOS"],
    language: ["Rust", "C++"],
    dependencies: ["None (Self-contained)"],
    github: "https://github.com/crtx/synapse-core",
    documentation: "#/docs/core-getting-started",
    downloads: {
      windows: { size: "14.2 MB", filename: "synapse-core-v0.8.2-x64.msi", sha: "8F9E2A7B5C3D..." },
      linux: { size: "11.8 MB", filename: "synapse-core-v0.8.2.tar.gz", sha: "3A4B5C6D7E8F..." },
      macos: { size: "13.1 MB", filename: "synapse-core-v0.8.2-darwin-x64.zip", sha: "D5E6F7A8B9C0..." }
    },
    features: [
      "Ultra-low latency process coordination (<100μs IPC loops)",
      "Zero-trust capability-based access control lists (ACLs)",
      "Automated sandboxing for external capability integrations",
      "Event-driven pub/sub socket broker architecture",
      "Built-in crash-resilient process supervisor daemon"
    ],
    architecture: "Synapse Core runs as a background daemon, opening local IPC channels via Unix domain sockets (Linux/macOS) and Named Pipes (Windows). Applications negotiate capabilities by signing handshake messages with local ed25519 keypairs.",
    roadmap: [
      { phase: "Phase 1: Foundation", items: ["Multi-process routing", "Basic Unix socket IPC", "Keypair generation"] },
      { phase: "Phase 2: Security", items: ["Capability registry enforcement", "Encrypted memory buffers", "Windows Named Pipes integration"] },
      { phase: "Phase 3: Scale (Current)", items: ["Shared memory ring buffer (Zero-copy IPC)", "Static binary compilation", "Tauri backend links"] }
    ],
    faq: [
      { q: "Why Rust?", a: "To guarantee zero-cost abstractions, thread safety, and no garbage collection pauses, which is vital for system-level IPC coordination." },
      { q: "Does it make cloud connections?", a: "No. Synapse Core operates entirely on your local machine, keeping data private and secure." }
    ],
    changelog: [
      { version: "v0.8.2", date: "2026-06-15", logs: ["Optimized shared memory allocation speed", "Fixed thread locking on Windows Named Pipes", "Added CLI capability auditor"] },
      { version: "v0.8.0", date: "2026-03-22", logs: ["Initial public beta release", "Implemented basic pub/sub socket routing"] }
    ],
    futurePlans: [
      "Zero-copy shared memory IPC on Windows",
      "Native eBPF kernel event listeners for Linux system automation"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-horizon", "nexus-hub"]
  },

  "cortex-intelligence-engine": {
    id: "cortex-intelligence-engine",
    name: "Cortex Intelligence Engine (CIE)",
    tagline: "The Cognitive Orchestrator & Multi-Agent Runtime",
    logo: "brain",
    banner: "linear-gradient(135deg, #220f38 0%, #0d061c 100%)",
    description: "The Cortex Intelligence Engine (CIE) acts as the brain of the Synapse ecosystem. It translates high-level prompts into actionable execution trees, routes requests through available tool registries, integrates vector memories, and manages runtimes for local autonomous agents.",
    currentVersion: "v0.9.5-beta",
    developmentStatus: "Beta",
    platform: ["Windows", "Linux", "macOS"],
    language: ["Python", "C++", "Rust"],
    dependencies: ["Synapse Core"],
    github: "https://github.com/crtx/cortex-intelligence-engine",
    documentation: "#/docs/cie-architecture",
    downloads: {
      windows: { size: "84.5 MB", filename: "cortex-intelligence-engine-v0.9.5-x64.exe", sha: "4F3D2C1B0A..." },
      linux: { size: "78.2 MB", filename: "cortex-intelligence-engine-v0.9.5.tar.gz", sha: "9E8D7C6B5A..." },
      macos: { size: "81.9 MB", filename: "cortex-intelligence-engine-v0.9.5-darwin.zip", sha: "1F2E3D4C5B..." }
    },
    features: [
      "Local multi-model routing (compatible with Ollama, llama.cpp, and local API targets)",
      "Context compiler with memory vector retrieval (embedding matches in <8ms)",
      "Dynamic planner executing ReAct (Reasoning + Action) loops autonomously",
      "Security-audited capability registry preventing rogue agent operations",
      "Flexible Agent Runtime with isolated environment templates"
    ],
    architecture: "CIE coordinates cognitive tasks by loading specialized system prompts, embedding local documents into a tiny embedded database, and dispatching execution tokens to runtimes. It uses Synapse Core's IPC to issue system commands to other applications.",
    roadmap: [
      { phase: "Phase 1: Chat & Embeddings", items: ["Basic LLM client wrapper", "Retrieval-Augmented Generation (RAG)", "Local vector database integration"] },
      { phase: "Phase 2: Agentic Loops (Current)", items: ["ReAct loop controller", "Capability registration manifest files", "Dynamic tool routing system"] },
      { phase: "Phase 3: Swarm Coordination", items: ["Multi-agent parallel execution", "Local consensus algorithm for swarm tasks"] }
    ],
    faq: [
      { q: "Can I use external models like OpenAI?", a: "Yes. CIE supports local models by default (via Ollama/Llama.cpp) but can route tasks to external API providers if configured." },
      { q: "Is the vector store persistent?", a: "Yes, it serializes locally into an encrypted sqlite-based vector index." }
    ],
    changelog: [
      { version: "v0.9.5", date: "2026-07-02", logs: ["Upgraded ReAct planner stability", "Integrated memory compilation optimizer", "Added multi-modal image token support"] },
      { version: "v0.9.0", date: "2026-04-10", logs: ["Introduced capability registry specs", "Initial agent runtime sandbox support"] }
    ],
    futurePlans: [
      "Native support for DeepSeek-R1 and Qwen locally-tuned models",
      "Distributed planning engine for splitting tasks across local network clusters"
    ],
    relatedApps: ["synapse-core", "cortex-studio", "cortex-notes", "cortex-horizon"]
  },

  "cortex-studio": {
    id: "cortex-studio",
    name: "Cortex Studio",
    tagline: "Flagship AI Workstation & Visual Agent IDE",
    logo: "terminal",
    banner: "linear-gradient(135deg, #0d2218 0%, #050e0a 100%)",
    description: "Cortex Studio is the flagship visual workspace and IDE for the Synapse ecosystem. It provides system health telemetry, local model monitoring, workspace indexing, custom agent assembly grids, and interactive vector search visualizers.",
    currentVersion: "v1.0.0-rc2",
    developmentStatus: "Release Candidate",
    platform: ["Windows (Desktop)", "macOS (Desktop)"],
    language: ["JavaScript", "HTML/CSS", "Rust (Tauri)"],
    dependencies: ["Synapse Core", "Cortex Intelligence Engine"],
    github: "https://github.com/crtx/cortex-studio",
    documentation: "#/docs/studio-workbench",
    downloads: {
      windows: { size: "48.2 MB", filename: "cortex-studio-v1.0.0-rc2-setup.exe", sha: "2E1D9C8B7A..." },
      macos: { size: "51.1 MB", filename: "cortex-studio-v1.0.0-rc2.dmg", sha: "9E8A7B6C5D..." }
    },
    features: [
      "Raycast-style search command palette (Cmd/Ctrl + K)",
      "Real-time system health dashboard (CPU, GPU, VRAM load visualizers)",
      "No-code Agent Assembly builder (drag-and-drop capability routing)",
      "Interactive 3D Knowledge Graph rendering note relationships",
      "Local LLM model downloader and load balancer monitoring UI"
    ],
    architecture: "Cortex Studio runs as a desktop application built on Tauri. It connects to Synapse Core's IPC via a Rust-based backend, rendering a responsive HTML5 UI styled with premium scientific-minimalist visual tokens.",
    roadmap: [
      { phase: "Phase 1: Shell Prototype", items: ["Design tokens foundation", "Module shell layout", "Basic settings panel"] },
      { phase: "Phase 2: Core Telemetry", items: ["Websocket connection state", "CPU/GPU telemetry loops", "Agent chat UI"] },
      { phase: "Phase 3: IDE & Graph (Current)", items: ["Interactive 3D knowledge graph visualizer", "Visual Agent Builder canvas", "Marketplace panel"] }
    ],
    faq: [
      { q: "Is Cortex Studio free?", a: "Yes, it is fully open-source and free to run locally." },
      { q: "Can I connect custom HTML panels?", a: "Absolutely. The plugin architecture allows you to mount custom panels into the nav rail." }
    ],
    changelog: [
      { version: "v1.0.0-rc2", date: "2026-07-18", logs: ["Added 3D knowledge graph navigation controls", "Optimized VRAM telemetry parser", "Refined terminal theme"] },
      { version: "v1.0.0-rc1", date: "2026-05-30", logs: ["First release candidate release", "Implemented drag-and-drop capability wiring UI"] }
    ],
    futurePlans: [
      "Dynamic hot-reloading for custom web modules",
      "Integrated audio waveform diagnostics editor"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-notes", "nexus-hub"]
  },

  "floranode": {
    id: "floranode",
    name: "FloraNode",
    tagline: "AI-Powered Cultivation Operating System",
    logo: "leaf",
    banner: "linear-gradient(135deg, #1f271b 0%, #0d120a 100%)",
    description: "FloraNode is a specialized cultivation operating system that brings local AI diagnostics and automation to gardening and commercial growing. It gathers sensor data, coordinates watering cycles, builds plant lineages, and diagnoses plant health locally via the Cortex Intelligence Engine.",
    currentVersion: "v0.7.1-alpha",
    developmentStatus: "Alpha",
    platform: ["Windows (Desktop)", "Raspberry Pi (OS)"],
    language: ["JavaScript", "Python"],
    dependencies: ["Synapse Core", "Cortex Intelligence Engine"],
    github: "https://github.com/crtx/floranode",
    documentation: "#/docs/floranode-guide",
    downloads: {
      windows: { size: "36.8 MB", filename: "floranode-v0.7.1-setup.exe", sha: "7E6D5C4B3A..." },
      raspi: { size: "28.5 MB", filename: "floranode-pi-v0.7.1.img", sha: "1A2B3C4D5E..." }
    },
    features: [
      "Real-time sensor graphs (soil moisture, temperature, humidity, pH, EC)",
      "Interactive genetic mapping tree (pedigree tracking with dynamic nodes)",
      "AI Crop Diagnostic assistant (local multi-modal vision detects leaf stress)",
      "Timeline Journal with photo timeline slider and data correlation",
      "Automation rules editor (link sensor parameters directly to GPIO relays)"
    ],
    architecture: "FloraNode integrates with Raspberry Pi GPIO pins or ESP32 MQTT sensors. Raw telemetry is fed into Synapse Core's event bus, where the FloraNode process monitors thresholds, saves data to SQLite, and issues alerts through CIE diagnostic pipelines.",
    roadmap: [
      { phase: "Phase 1: Telemetry Dashboard", items: ["Real-time gauge UI", "InfluxDB/SQLite storage hook", "CSV exporting utility"] },
      { phase: "Phase 2: Diagnostics & Trees", items: ["CIE vision diagnostic agent integration", "Interactive Genealogy Tree layout", "Photo journal timeline"] },
      { phase: "Phase 3: Relay Automation (Current)", items: ["Automated GPIO control triggers", "MQTT broker bridge", "Commercial scale sensor integration"] }
    ],
    faq: [
      { q: "What sensors are supported?", a: "Out of the box, capacitive soil sensors (SoilWatch10), DHT22 (Temp/Humid), Atlas Scientific pH/EC probes, and generic MQTT smart plug devices." },
      { q: "Do I need a Raspberry Pi?", a: "No, you can run the desktop UI on Windows/macOS and input data manually, or bridge to remote MQTT microcontrollers." }
    ],
    changelog: [
      { version: "v0.7.1", date: "2026-07-10", logs: ["Added genealogy tree zoom/pan support", "Upgraded CIE leaf-vision diagnostic training set", "Added MQTT sensor configuration UI"] },
      { version: "v0.6.0", date: "2026-04-05", logs: ["First telemetry dashboard MVP release", "Added photo journal tracking"] }
    ],
    futurePlans: [
      "Automatic nutrient dosing valve control profiles",
      "Light spectrum adjustment presets for intelligent LED bars"
    ],
    relatedApps: ["synapse-core", "cortex-intelligence-engine", "cortex-studio"]
  },

  "cortex-horizon": {
    id: "cortex-horizon",
    name: "Cortex Horizon",
    tagline: "Distributed Agent Swarm & Grid Orchestrator",
    logo: "globe",
    banner: "linear-gradient(135deg, #1d1b27 0%, #0c0a12 100%)",
    description: "Cortex Horizon coordinates swarms of autonomous agents across multiple physical machines, local networks, and private cloud partitions. Implemented with consensus algorithms, it scales local intelligence from a single computer to a distributed grid.",
    currentVersion: "v0.4.0-alpha",
    developmentStatus: "Alpha",
    platform: ["Linux", "Windows"],
    language: ["Go", "Rust"],
    dependencies: ["Synapse Core", "Cortex Intelligence Engine"],
    github: "https://github.com/crtx/cortex-horizon",
    documentation: "#/docs/horizon-swarms",
    downloads: {
      windows: { size: "18.4 MB", filename: "cortex-horizon-v0.4.0.zip", sha: "3F4E5D6C7B..." },
      linux: { size: "16.1 MB", filename: "cortex-horizon-v0.4.0.tar.gz", sha: "8E9D0C1B2A..." }
    },
    features: [
      "Distributed task allocation (peer-to-peer job auction bidding)",
      "P2P secure state synchronizer via local libp2p channels",
      "Agent consensus voting protocols (Raft variant tuned for LLM choices)",
      "Dynamic node joining / auto-discovery on local subnets",
      "Dynamic load balancing (spills memory-heavy agent runtimes onto idle PCs)"
    ],
    architecture: "Cortex Horizon nodes announce themselves on the local network. When a task is dispatched, the orchestrator splits the execution tree. Sub-tasks are bid on by nodes based on free CPU/GPU capacity, then executed locally.",
    roadmap: [
      { phase: "Phase 1: P2P Network", items: ["mDNS node auto-discovery", "Cryptographic handshakes", "Simple ping registry"] },
      { phase: "Phase 2: Task Bidding (Current)", items: ["Decentralized scheduler bidding engine", "State replication vectors", "Failover node recovery"] },
      { phase: "Phase 3: Consensus & Clusters", items: ["Consensus validation on LLM text outputs", "Docker Swarm API bridge", "Web-based swarm monitor UI"] }
    ],
    faq: [
      { q: "Is this a blockchain?", a: "No. It is a private distributed computing grid using consensus algorithms for fault tolerance, not token operations." },
      { q: "What happens if a node disconnects?", a: "Horizon detects node heartbeats. If a node fails, its tasks are re-auctioned to surviving nodes within 3 seconds." }
    ],
    changelog: [
      { version: "v0.4.0", date: "2026-06-28", logs: ["Implemented libp2p dynamic port negotiation", "Added cluster resources graph API", "Refined task priority queuing"] },
      { version: "v0.3.0", date: "2026-02-14", logs: ["Initial network protocol proof of concept", "Added multi-node terminal logs tracker"] }
    ],
    futurePlans: [
      "Support for private cloud instances (AWS EC2, Hetzner, Proxmox integration)",
      "Homomorphic encryption layer for executing sensitive tasks across semi-trusted nodes"
    ],
    relatedApps: ["synapse-core", "cortex-intelligence-engine", "nexus-hub"]
  },

  "cortex-notes": {
    id: "cortex-notes",
    name: "Cortex Notes",
    tagline: "Semantic Knowledge Graph & Notebook",
    logo: "book-open",
    banner: "linear-gradient(135deg, #1b262a 0%, #0a1114 100%)",
    description: "Cortex Notes is an AI-augmented markdown notebook. As you write, a background agent processes text, links ideas semantically into a local knowledge graph, auto-summarizes reference lists, and surfaces context matches without manual folders or tagging.",
    currentVersion: "v0.6.2-beta",
    developmentStatus: "Beta",
    platform: ["Windows", "macOS", "Web"],
    language: ["TypeScript", "Rust (Tauri)"],
    dependencies: ["Synapse Core", "Cortex Intelligence Engine"],
    github: "https://github.com/crtx/cortex-notes",
    documentation: "#/docs/cortex-notes-syntax",
    downloads: {
      windows: { size: "32.4 MB", filename: "cortex-notes-v0.6.2-setup.exe", sha: "9D8C7B6A5F..." },
      macos: { size: "34.8 MB", filename: "cortex-notes-v0.6.2.dmg", sha: "5E4D3C2B1A..." }
    },
    features: [
      "WYSIWYG markdown editor with keyboard-centric controls",
      "Real-time semantic search (calculates embeddings as you type)",
      "Auto-linking recommendation engine (suggests related concepts in sidebar)",
      "Interactive 3D Node Graph visualization showing semantic clusters",
      "Offline sync to plain text markdown vault folders"
    ],
    architecture: "Cortex Notes acts as an editor UI. Notes are saved as plain markdown. An indexing runner listens to file changes, generates embeddings via CIE, and updates a sqlite database containing graph node linkages.",
    roadmap: [
      { phase: "Phase 1: Editor Core", items: ["Markdown parsing engine", "Folder view sidebar", "File watcher scheduler"] },
      { phase: "Phase 2: Semantic Graph (Current)", items: ["CIE local embedding indexer", "Interactive force-directed graph", "Sidebar similarity matches panel"] },
      { phase: "Phase 3: Smart Prompts", items: ["Inline AI text generation", "Semantic vault Q&A agent", "Conflict resolution diff tool"] }
    ],
    faq: [
      { q: "Are my notes stored in the cloud?", a: "No. Your vault is a local folder of plain text files. Synapse does not upload your writing." },
      { q: "Is it compatible with Obsidian?", a: "Yes. It reads standard markdown file structures and WikiLinks (`[[Note Name]]`)." }
    ],
    changelog: [
      { version: "v0.6.2", date: "2026-07-05", logs: ["Optimized vector database re-indexing loops", "Added Obsidian vault import wizard", "Fixed note rename graph broken link bug"] },
      { version: "v0.5.0", date: "2026-03-12", logs: ["Initial beta release with editor and basic graph visualizer"] }
    ],
    futurePlans: [
      "Encrypted note synchronizer for peer-to-peer multi-device syncing",
      "Auto-generation of visual flowcharts based on markdown headers"
    ],
    relatedApps: ["cortex-intelligence-engine", "cortex-studio"]
  },

  "nexus-hub": {
    id: "nexus-hub",
    name: "Nexus Hub",
    tagline: "Central Database Manager & Log Aggregator",
    logo: "database",
    banner: "linear-gradient(135deg, #1b212c 0%, #0b0e14 100%)",
    description: "Nexus Hub is the operations dashboard of the Synapse network. It aggregates logs, automates backups, audits capability keys, registers connected device ports, and handles configuration schemas across all installed modules.",
    currentVersion: "v0.8.0-beta",
    developmentStatus: "Beta",
    platform: ["Windows", "Linux", "macOS"],
    language: ["Go", "TypeScript"],
    dependencies: ["Synapse Core"],
    github: "https://github.com/crtx/nexus-hub",
    documentation: "#/docs/nexus-hub-admin",
    downloads: {
      windows: { size: "21.6 MB", filename: "nexus-hub-v0.8.0.msi", sha: "1F2E3D4C5B..." },
      linux: { size: "18.3 MB", filename: "nexus-hub-v0.8.0.tar.gz", sha: "6E7D8C9B0A..." },
      macos: { size: "19.9 MB", filename: "nexus-hub-v0.8.0-darwin.zip", sha: "A1B2C3D4E5..." }
    },
    features: [
      "Centralized log stream viewer with severity and source filtering",
      "Database snapshot manager (scheduled encrypted compression)",
      "Capability access auditor (lists keys and signs authorization tokens)",
      "Plugin configuration inspector and JSON schema validator",
      "System alert webhook dispatcher (Discord, Email, local toast)"
    ],
    architecture: "Nexus Hub listens on local TCP port 8999, hosting a lightweight Go-based API server that communicates with Synapse Core to gather database states and file watch outputs, rendering a clean responsive dashboard.",
    roadmap: [
      { phase: "Phase 1: Log Aggregator", items: ["Websocket stdout capture hook", "Search regex parser", "Local DB logger"] },
      { phase: "Phase 2: Backups & Schemas (Current)", items: ["SQLite vacuum backup scheduler", "Encryption key handshakes", "JSON configuration parser"] },
      { phase: "Phase 3: Web UI v2", items: ["Responsive administrative console UI", "Multi-tenant permissions engine", "Live alert notification system"] }
    ],
    faq: [
      { q: "Is Nexus Hub required?", a: "No, but it is highly recommended if you run multiple background automation nodes or manage custom plugins." },
      { q: "What databases are supported?", a: "SQLite by default, with configuration triggers for external PostgreSQL/InfluxDB setups." }
    ],
    changelog: [
      { version: "v0.8.0", date: "2026-06-18", logs: ["Integrated backup compression engine", "Added capability audit grid", "Optimized log memory buffer limit"] },
      { version: "v0.7.0", date: "2026-02-28", logs: ["Initial release with basic live logs panel"] }
    ],
    futurePlans: [
      "Dynamic database migration scripting engine",
      "InfluxDB performance visualization modules"
    ],
    relatedApps: ["synapse-core", "cortex-studio", "cortex-horizon"]
  },

  "nexus-connect": {
    id: "nexus-connect",
    name: "Nexus Connect",
    tagline: "IoT, Cloud & Protocol Integration Bridge",
    logo: "share-2",
    banner: "linear-gradient(135deg, #24221c 0%, #100f0c 100%)",
    description: "Nexus Connect is the future IoT and external connection bridge for the Synapse environment. It coordinates protocol translation (Zigbee, Z-Wave, MQTT), manages OAuth credentials for third-party cloud apps, and bridges local networks to secure cloud backups.",
    currentVersion: "v0.1.0-pre",
    developmentStatus: "Planning",
    platform: ["Windows", "Linux"],
    language: ["Go"],
    dependencies: ["Synapse Core"],
    github: "https://github.com/crtx/nexus-connect",
    documentation: "#/docs/connect-protocols",
    downloads: {
      windows: { size: "12.8 MB", filename: "nexus-connect-v0.1.0-alpha.zip", sha: "2A3B4C5D6E..." },
      linux: { size: "10.4 MB", filename: "nexus-connect-v0.1.0-alpha.tar.gz", sha: "7F8E9D0C1B..." }
    },
    features: [
      "Zigbee / Z-Wave hardware controller bridges (using serial interfaces)",
      "Secure OAuth credential vault (encrypted locally with hardware keys)",
      "Custom HTTP webhook router for remote webhook integration",
      "Dynamic cloud backup driver (supports ProtonDrive, Mega, generic WebDAV)",
      "Zero-tier network peer bridging for secure remote admin access"
    ],
    architecture: "Nexus Connect acts as an translation bridge, reading serial/network IoT protocol packets, converting them into standard Synapse Event packets, and dispatching them into Synapse Core for AI action routing.",
    roadmap: [
      { phase: "Phase 1: Specs & MQTT", items: ["Protocol specifications sheet", "MQTT basic connection test suite", "OAuth vault design"] },
      { phase: "Phase 2: Serial Bridges (Current)", items: ["Zigbee device descriptor map", "Serial port event listener", "Local webhook routing logic"] },
      { phase: "Phase 3: Sync & Cloud", items: ["P2P cloud proxy layer", "Hardware encryption keys module", "Dynamic device tree map UI"] }
    ],
    faq: [
      { q: "Is this a cloud-only service?", a: "No. It is fully local, but provides the bridges necessary if you want to securely link your local Synapse system to cloud services." },
      { q: "What smart plugs work?", a: "Any smart plug that supports Zigbee, Z-Wave, or local MQTT (such as Shelly, Sonoff, or Tuya-flashed smart plugs)." }
    ],
    changelog: [
      { version: "v0.1.0-pre", date: "2026-07-01", logs: ["Defined core schema structures", "Completed basic serial loopback tests"] }
    ],
    futurePlans: [
      "Direct driver support for Bluetooth Low Energy (BLE) environmental beacons",
      "Matter/Thread protocol bridge implementation"
    ],
    relatedApps: ["synapse-core", "nexus-hub", "floranode"]
  }
};
