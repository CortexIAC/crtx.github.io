export const blogData = [
  {
    id: "rethinking-local-first-ipc",
    title: "Rethinking Local-First AI IPC: Moving to Zero-Copy Shared Memory Sockets",
    date: "July 12, 2026",
    author: "Dom",
    category: "Architecture",
    tags: ["Rust", "IPC", "Performance"],
    summary: "Why we migrated our messaging loop from standard TCP loopbacks to Rust-backed shared memory buffers, improving throughput by 400% and cutting latency to under 85 microseconds.",
    content: `# Rethinking Local-First AI IPC: Moving to Zero-Copy Shared Memory Sockets

When building a local-first ecosystem of AI tools, developers often run into a significant performance barrier: **Inter-Process Communication (IPC) latency**.

In the initial prototype of **Synapse Core**, applications like **Cortex Studio** and **FloraNode** communicated with the central model runner and database server using local TCP sockets (\`localhost:8999\`). While this is easy to code and debug, the loopback interface on Windows introduces significant kernel routing overhead. For standard payloads, TCP loopback added 4–12ms of overhead per call. In agentic ReAct loops, where a single action might require dozens of micro-checks, this latency aggregated into sluggish user experiences.

To solve this, we rewrote the IPC layer of Synapse Core in Rust, moving away from TCP loopback entirely.

## The Solution: OS Named Pipes & Shared Memory Ring-Buffers

On Windows, standard local communications are best handled by **Named Pipes** for command handshakes, and **Shared Memory Mapping** for heavy data transfers (like model weights, telemetry streams, and vector arrays).

### Named Pipes for Command Handshakes

We implemented a Rust daemon that listens on a custom named pipe path:

\`\`\`
\\\\.\\pipe\\synapse-ipc-bus
\`\`\`

Using the \`tokio-named-pipes\` crate, we built a non-blocking connection pool. Sockets negotiate authentication by signing challenges with local ed25519 keypairs. This ensures that only authorized processes can command the Synapse Core daemon.

### Shared Memory Ring-Buffers for High-Throughput Data

For large telemetry packets and audio streams, Named Pipes still copy data multiple times across user space and kernel space. To achieve true **zero-copy** transfer, we mapped an anonymous shared memory file index:

\`\`\`rust
use shared_memory::*;

let mut shmem = ShmemConf::new()
    .size(1024 * 1024 * 16)
    .os_id("synapse_ring_buffer")
    .create()
    .expect("Failed to map shared memory ring buffer");
\`\`\`

Using a read/write cursor lock in atomic memory, both the daemon and the client process can write directly into the same physical RAM sector.

## Results

After migrating to Named Pipes + Shared Memory, we observed:

- **Latency**: Dropped from 4–12ms to 25–85μs per IPC call
- **Throughput**: Increased by approximately 400% for streaming payloads
- **CPU Overhead**: Reduced context switching by roughly 60%

## Next Steps

We are currently working on extending the shared memory ring-buffer to support GPU tensors, enabling zero-copy model inference data directly from the GPU to consumer applications without touching system RAM.`
  },
  {
    id: "building-cortex-notes",
    title: "Building Cortex Notes: A Semantic Knowledge Graph Editor",
    date: "June 28, 2026",
    author: "Dom",
    category: "Development",
    tags: ["TypeScript", "Tauri", "Knowledge Graph", "Rust"],
    summary: "Lessons learned from building an AI-augmented note-taking application with local embedding, semantic search, and interactive 3D graph visualization.",
    content: `# Building Cortex Notes: A Semantic Knowledge Graph Editor

Cortex Notes was born from the observation that existing note-taking tools treat notes as isolated files. We wanted to build a tool where your notes form a **living knowledge graph** — where ideas automatically discover connections to related concepts.

## Architecture Overview

Cortex Notes uses a three-tier architecture:

- **Frontend**: TypeScript + Tauri for a native desktop experience with web rendering
- **Indexing Layer**: A background worker that watches file changes and generates embeddings via CIE
- **Storage**: Plain markdown files on disk + a SQLite database mapping graph node linkages

## The Embedding Pipeline

When you write or modify a note, the following happens:

1. The file watcher detects the change
2. The note content is split into semantic chunks
3. Each chunk is sent to CIE for embedding generation
4. Embeddings are compared against existing notes using cosine similarity
5. High-similarity matches create automatic graph edges

## Semantic Search

The search bar in Cortex Notes doesn't just do keyword matching. It converts your query to an embedding and finds the nearest neighbors in the vector space. Results include a similarity score and a preview of the surrounding context.

## Future Work

We're planning to add:
- Inline AI text generation based on related notes
- A Q&A agent that can answer questions across your entire vault
- Diff-based conflict resolution for multi-device syncing

Cortex Notes is already available in beta. Download it from the Download Center.`
  },
  {
    id: "cie-react-loops",
    title: "Deep Dive: CIE ReAct Loops and Autonomous Tool Use",
    date: "June 15, 2026",
    author: "Dom",
    category: "Architecture",
    tags: ["AI", "Agents", "ReAct", "Python"],
    summary: "How we implemented the Reasoning + Action loop in CIE, enabling local agents to autonomously plan, execute tools, and recover from failures.",
    content: `# Deep Dive: CIE ReAct Loops and Autonomous Tool Use

The Cortex Intelligence Engine's core innovation is its implementation of the ReAct (Reasoning + Action) pattern for local AI agents.

## How ReAct Works

The ReAct loop follows a repeating cycle:

1. **Thought**: The model reasons about the current state and decides what to do next
2. **Action**: The model selects and invokes a tool with specific parameters
3. **Observation**: The tool's output is fed back into the context
4. **Repeat**: Until the objective is complete or the model decides to respond

## CIE Implementation

Our implementation extends the basic ReAct pattern with:

- **Capability Guarding**: Before executing any tool, CIE verifies the action against the user's capability policy
- **Memory Injection**: Relevant vector memories are injected into the context at each thought step
- **Failure Recovery**: If a tool call fails, the model is prompted to try an alternative approach

## Example: Research Agent

Here's how a Research Agent might use ReAct:

\`\`\`
Thought: I need to find information about Rust IPC patterns.
Action: search_docs(query="Rust IPC shared memory")
Observation: Found 3 relevant documents...
Thought: Let me compile the key insights.
Action: write_note(content="Rust IPC options: ...")
Observation: Note saved successfully.
Thought: I have gathered enough information.
Response: Here's what I found about Rust IPC...
\`\`\`

The key insight is that the model isn't just generating text — it's actively orchestrating system capabilities.`
  }
];

export function getPost(id) {
  return blogData.find(p => p.id === id) || null;
}
