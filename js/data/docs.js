export const docsData = {
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        {
          id: "intro",
          title: "Introduction to Synapse",
          description: "Learn the core philosophy and architecture behind the Synapse ecosystem.",
          content: `# Introduction to Synapse

Synapse is a **local-first, security-sandboxed, multi-agent intelligence ecosystem**. It is designed to turn your computer from a collection of fragmented, cloud-dependent applications into a single, cohesive, self-healing operating runtime.

Unlike modern AI systems that operate as isolated cloud web tabs, Synapse runs entirely on your local hardware. It interfaces directly with your system using a low-latency Rust-based message bus (**Synapse Core**), coordinating user tools, environmental sensors (**FloraNode**), vector memory, autonomous planning loops (**Cortex Intelligence Engine**), and graphical workstations (**Cortex Studio**).

### Core Principles

1. **Local-First**: All data, vector databases, model weights, and execution logs reside on your physical drive. No cloud leaks.
2. **Ecosystem-Oriented**: Applications are nodes connected to a unified IPC socket bus. They share state, fire events, and cooperate on complex tasks.
3. **Capability-Audited**: To prevent autonomous AI agents from performing destructive actions, applications and plugins must register cryptographic *capabilities* (e.g., read file, execute command) which are audited by the user.

### Ecosystem Topology

Below is the standard stack of the Synapse ecosystem:

- **User Layer**: Cortex Studio (IDE), Cortex Notes, FloraNode (Cultivation OS)
- **Orchestration Layer**: Cortex Intelligence Engine (CIE) (Planner, Vector Database, Memory Compactor)
- **Communications Layer**: Synapse Core Runtime (Rust IPC sockets & message distribution daemon)
- **Operating System**: Windows / Linux Kernel`
        },
        {
          id: "install-guide",
          title: "Installation Guide",
          description: "How to set up the Core runtime and launch the desktop workstation.",
          content: `# Installation Guide

To run the Synapse Ecosystem, you must first install the **Synapse Core Daemon** and then connect your front-end interfaces.

### Prerequisites

- Windows 10/11 x64 or Linux (Ubuntu 20.04+)
- Local model manager (Ollama recommended for local model serving)
- At least 16GB RAM (32GB recommended for running larger models like DeepSeek-R1-8B)

### 1. Install Synapse Core

Download the installer from the Download Center and run:

\`\`\`powershell
# Windows installer execution
Start-Process msiexec.exe -ArgumentList '/i synapse-core-v0.8.2-x64.msi /quiet' -NoNewWindow -Wait
\`\`\`

\`\`\`bash
# Linux installation
tar -xzf synapse-core-v0.8.2.tar.gz
cd synapse-core
./install.sh
\`\`\`

### 2. Start the Daemon

\`\`\`bash
synapsed --daemon
\`\`\`

### 3. Launch an Application

Install and launch Cortex Studio or any Synapse application. The application will automatically discover the running Core daemon via local IPC.

### Troubleshooting

If the daemon fails to start, check that no other process is bound to the default IPC port range. Run \`synapsed --diagnose\` for system compatibility checks.`
        }
      ]
    },
    {
      id: "core",
      title: "Synapse Core",
      items: [
        {
          id: "core-architecture",
          title: "Core Architecture",
          description: "Deep dive into the IPC bus, capability system, and process supervision.",
          content: `# Core Architecture

Synapse Core is built around three fundamental subsystems:

## IPC Bus

The IPC bus is a high-performance message broker that routes structured events between applications using Unix domain sockets (Linux/macOS) or Named Pipes (Windows).

## Capability System

Every application that connects to Synapse Core must present a capability manifest. This manifest is a signed JSON document listing all system resources the application requires.

## Process Supervisor

The built-in daemon monitors child processes for crashes and automatically restarts them with exponential backoff.`
        }
      ]
    },
    {
      id: "cie",
      title: "Cortex Intelligence Engine",
      items: [
        {
          id: "cie-architecture",
          title: "CIE Architecture",
          description: "Understanding the cognitive pipeline: planner, memory, tools, and agents.",
          content: `# CIE Architecture

The Cortex Intelligence Engine processes requests through a multi-stage pipeline:

## Planner

The Planner decomposes high-level goals into discrete execution steps using ReAct (Reasoning + Action) loops. Each step can invoke a tool, query memory, or generate a response.

## Memory System

CIE maintains both short-term (conversation context) and long-term (vector-embedded) memory stores. Documents are chunked, embedded, and indexed in a local SQLite-backed vector database.

## Tool Registry

Tools are registered via manifest files and discovered at runtime. Each tool declares its input/output schema, required capabilities, and execution constraints.`
        }
      ]
    },
    {
      id: "guides",
      title: "Developer Guides",
      items: [
        {
          id: "plugin-dev",
          title: "Plugin Development",
          description: "How to build and register custom plugins for the Synapse ecosystem.",
          content: `# Plugin Development

Synapse plugins are self-contained applications that communicate over the IPC bus.

## Getting Started

To create a plugin, you need to implement the Synapse IPC protocol:

1. Generate an ed25519 keypair for your plugin identity
2. Create a capability manifest JSON file
3. Connect to the IPC bus using the appropriate language binding
4. Register event listeners and handlers

## Example

\`\`\`python
from synapse_ipc import SynapseClient

client = SynapseClient()
client.connect()

@client.on_event("system.alert")
def handle_alert(data):
    print(f"Alert received: {data}")

client.register_manifest("plugin-manifest.json")
client.run()
\`\`\``
        }
      ]
    }
  ]
};

export function getDoc(id) {
  for (const cat of docsData.categories) {
    for (const item of cat.items) {
      if (item.id === id) return { ...item, category: cat.title };
    }
  }
  return null;
}

export function getAllDocs() {
  const all = [];
  for (const cat of docsData.categories) {
    for (const item of cat.items) {
      all.push({ ...item, category: cat.title });
    }
  }
  return all;
}
