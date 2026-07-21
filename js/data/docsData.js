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

*   **User Layer**: Cortex Studio (IDE), Cortex Notes, FloraNode (Cultivation OS)
*   **Orchestration Layer**: Cortex Intelligence Engine (CIE) (Planner, Vector Database, Memory Compactor)
*   **Communications Layer**: Synapse Core Runtime (Rust IPC sockets & message distribution daemon)
*   **Operating System**: Windows / Linux Kernel`
        },
        {
          id: "install-guide",
          title: "Installation Guide",
          description: "How to set up the Core runtime and launch the desktop workstation.",
          content: `# Installation Guide

To run the Synapse Ecosystem, you must first install the **Synapse Core Daemon** and then connect your front-end interfaces.

### Prerequisites
*   Windows 10/11 x64 or Linux (Ubuntu 20.04+)
*   Local model manager (Ollama recommended for local model serving)
*   At least 16GB RAM (32GB recommended for running larger models like DeepSeek-R1-8B)

### 1. Install Synapse Core
Download the installer from the Download Center and run:

\`\`\`powershell
# Windows installer execution
Start-Process msiexec.exe -ArgumentList '/i synapse-core-v0.8.2-x64.msi /quiet' -NoNewWindow -Wait
\`\`\`

On Linux, extract and launch the systemd service:

\`\`\`bash
# Extract and setup daemon
tar -xzf synapse-core-v0.8.2.tar.gz -C /usr/local/bin/
sudo cp /usr/local/bin/synapse.service /etc/systemd/system/
sudo systemctl enable --now synapse
\`\`\`

### 2. Verify IPC Communication
Verify that the local socket daemon is listening on its designated Named Pipe/Socket:

\`\`\`powershell
# Check running pipes on Windows
Get-ChildItem \\.\\pipe\\ | Where-Object Name -like "*synapse*"
\`\`\`

If successful, you will see the \`synapse-ipc-bus\` pipe.

### 3. Launch Cortex Studio
Download the desktop client and launch. The visual UI will automatically run its handshake protocol with the local daemon, and you will see the **Workspace Indexed** pulse green.`
        }
      ]
    },
    {
      id: "architecture",
      title: "Architecture",
      items: [
        {
          id: "ipc-protocol",
          title: "IPC Message Protocol",
          description: "Understanding the low-level JSON/MessagePack structures powering Core IPC.",
          content: `# IPC Message Protocol

All nodes in the Synapse ecosystem communicate using a structured message frame over local sockets. The default serialization format is **JSON** for light debugging, and **MessagePack** for fast binary telemetry transfers.

### Message Header Structure
Every packet starts with a 32-byte header:

\`\`\`rust
struct SynapseHeader {
    magic: u32,         // 0x53594E50 ('SYNP')
    version: u8,        // Protocol version (e.g. 1)
    flags: u8,          // Compression/Encryption markers
    payload_len: u32,   // Size of payload in bytes
    session_id: [u8; 16], // Unique connection identifier
    checksum: u32       // Adler32 verification checksum
}
\`\`\`

### JSON Payload Schema
For app interactions, the payload format defines operations, capabilities, and arguments:

\`\`\`json
{
  "jsonrpc": "2.0",
  "method": "capability.request",
  "params": {
    "app_id": "floranode",
    "capability": "sys.gpio.write",
    "signature": "z8F9E2A7B5...",
    "args": {
      "pin": 17,
      "value": 1
    }
  },
  "id": 142
}
\`\`\`

### IPC Performance Benchmarks
*   **Message roundtrip (Rust daemon <-> C++ client)**: 85μs
*   **Throughput limit (Shared memory ring-buffer)**: 2.4 GB/sec
*   **Max concurrent connections**: 512 active sockets`
        },
        {
          id: "capability-security",
          title: "Capability Registry & Security",
          description: "How the sandbox restrains agents from executing unapproved filesystem and network commands.",
          content: `# Capability Security Model

Autonomous agents operating inside the **Cortex Intelligence Engine (CIE)** generate tool routing queries that can inspect files, write scripts, and execute shell instructions. To ensure this runs safely, Synapse enforces a **Capability-Based Security Architecture**.

### The Principle of Least Privilege
Instead of giving an agent full user permissions, plugins and tools must register a manifest file (\`manifest.json\`) detailing the specific system nodes they need to access.

\`\`\`json
{
  "plugin_id": "floranode-core",
  "requested_capabilities": [
    "fs.read:C:\\Users\\Dom\\Documents\\GardenLogs\\*",
    "sys.gpio:pin17",
    "net.http.post:https://api.weather.gov/*"
  ]
}
\`\`\`

### Auditing & Signatures
When an agent attempts to call a tool:
1. **Request Interception**: Synapse Core intercepts the socket execution block.
2. **Manifest Lookup**: The daemon matches the calling signature against user-approved authorizations.
3. **Visual Confirmation**: If a tool is not pre-approved, the **Cortex Studio** alerts the user with a glowing window query, blocking execution until approved.`
        }
      ]
    },
    {
      id: "developer-guides",
      title: "Developer Guides",
      items: [
        {
          id: "write-plugin",
          title: "Writing a Custom Plugin",
          description: "Step-by-step tutorial for building a new Python tool registry node.",
          content: `# Writing a Custom Plugin

You can extend the capabilities of the Cortex Intelligence Engine by writing a custom python plugin. A plugin is simply a class registering tools that can be dynamically parsed by the CIE Tool Router.

### 1. Create Plugin Structure
Create a directory in your configuration root under \`plugins/my-sensor/\`:
*   \`plugin.json\` - Metadata and capabilities declaration.
*   \`sensor_tool.py\` - Python execution code.

### 2. Configure plugin.json
\`\`\`json
{
  "name": "LocalWeatherSensor",
  "version": "1.0.0",
  "description": "Fetches local barometric pressure from custom USB sensor.",
  "entrypoint": "sensor_tool.py",
  "capabilities": ["sys.usb.read"]
}
\`\`\`

### 3. Implement sensor_tool.py
\`\`\`python
import serial
from synapse_sdk import register_tool, CapabilityError

@register_tool(
    name="read_barometer",
    description="Reads pressure in hPa from local USB serial weather sensor."
)
def read_barometer(port: str = "COM3") -> float:
    try:
        # Synapse SDK verifies capability is signed
        with serial.Serial(port, 9600, timeout=1) as ser:
            line = ser.readline().decode('utf-8').strip()
            return float(line.split(",")[1])
    except Exception as e:
        raise CapabilityError(f"Failed to read USB sensor: {str(e)}")
\`\`\`

### 4. Load the Plugin
Place the directory in \`~/.gemini/config/plugins/\` and restart the Core daemon. The tool registry will rebuild, and you can query the tool via the CLI:
\`\`\`bash
cie tool exec read_barometer "port='COM3'"
\`\`\``
        }
      ]
    }
  ]
};
