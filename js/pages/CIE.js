import { navigate } from '../router.js';

export function renderCIE() {
  const page = document.createElement('div');

  const components = [
    { icon: '💬', title: 'Conversation', desc: 'Multi-turn dialogue with context tracking and system prompt management across model backends.' },
    { icon: '🧠', title: 'Memory', desc: 'Persistent vector store with automatic embedding generation and semantic retrieval in under 8ms.' },
    { icon: '📋', title: 'Planner', desc: 'Decomposes high-level goals into ReAct (Reasoning + Action) execution loops with failure recovery.' },
    { icon: '🔍', title: 'Context', desc: 'Compiles relevant documents, conversation history, and tool outputs into optimized model prompts.' },
    { icon: '👁', title: 'Vision', desc: 'Multi-modal support for image analysis, document scanning, and visual diagnostics via local models.' },
    { icon: '🔧', title: 'Tool Router', desc: 'Routes execution requests to registered capabilities with schema validation and security auditing.' },
    { icon: '📜', title: 'Capability Registry', desc: 'Manifests, validates, and audits tool capabilities to prevent unauthorized system access.' },
    { icon: '⚙️', title: 'Runtime', desc: 'Isolated agent execution environment with resource limits, timeout controls, and sandboxing.' },
    { icon: '🤖', title: 'Agents', desc: 'Autonomous agents that plan, execute, and learn. Supports single and multi-agent coordination.' },
  ];

  page.innerHTML = `
    <div class="cie-hero">
      <div class="cie-hero-bg"></div>
      <div class="container">
        <div class="hero-tagline" style="display:inline-flex;margin-bottom:24px;">🧠 Cortex Intelligence Engine</div>
        <h1 class="display-2" style="margin-bottom:16px;">The Brain of the Ecosystem</h1>
        <p class="body-large" style="max-width:600px;margin:0 auto 40px;">
          CIE translates human intent into autonomous action. It plans, remembers, routes tools, and coordinates agents — all running locally on your hardware.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" data-nav="/docs/cie-architecture">Read the Docs</button>
          <button class="btn btn-secondary btn-large" data-nav="/app/cortex-intelligence-engine">App Details</button>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Components</div>
          <h2 class="display-2">What Makes Up CIE</h2>
          <p class="body-large">Every component is modular, replaceable, and auditable. They work together to form a complete cognitive pipeline.</p>
        </div>
        <div class="cie-component-grid">
          ${components.map(c => `
            <div class="cie-component">
              <div class="cc-icon">${c.icon}</div>
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <section class="section">
      <div class="container">
        <div class="feature-row">
          <div class="feature-text">
            <div class="tag tag-accent">Pipeline</div>
            <h3 class="heading-1" style="margin-top:16px;">How It Works</h3>
            <p>The CIE pipeline transforms a natural language request into coordinated system action through a series of specialized stages.</p>
            <ul class="feature-list">
              <li>User sends a request or goal</li>
              <li>Context compiler assembles relevant memories and documents</li>
              <li>Planner decomposes into actionable steps</li>
              <li>Tool Router executes capabilities safely</li>
              <li>Results are compiled and returned</li>
            </ul>
          </div>
          <div class="feature-visual">
            <div style="text-align:center;padding:40px;font-family:var(--font-mono);font-size:14px;line-height:2;color:var(--text-secondary);">
              <div style="color:var(--accent-text);">Request</div>
              <div style="opacity:0.4;">↓ Context</div>
              <div style="opacity:0.6;">↓ Memory</div>
              <div style="color:var(--accent-text);">↓ Planner</div>
              <div style="opacity:0.6;">↓ Tool</div>
              <div style="opacity:0.4;">↓ Compile</div>
              <div style="color:var(--accent-text);">Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <section class="section">
      <div class="container">
        <div class="section-header" style="text-align:center;">
          <h2 class="display-2">CIE Roadmap</h2>
          <p class="body-large" style="margin:0 auto;">From local chat to distributed swarm intelligence.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">Phase 1: Chat & Embeddings</h3>
            <p class="body-regular" style="margin-bottom:16px;">Basic LLM client, RAG pipeline, local vector database</p>
            <span class="status-pill active">Complete</span>
          </div>
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">Phase 2: Agentic Loops</h3>
            <p class="body-regular" style="margin-bottom:16px;">ReAct controller, capability manifests, dynamic tool routing</p>
            <span class="status-pill beta">Current</span>
          </div>
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">Phase 3: Swarm Coordination</h3>
            <p class="body-regular" style="margin-bottom:16px;">Multi-agent execution, consensus algorithms, distributed planning</p>
            <span class="status-pill planning">Future</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="text-align:center;">
      <div class="container">
        <h2 class="display-2" style="margin-bottom:20px;">Start Building with CIE</h2>
        <p class="body-large" style="max-width:560px;margin:0 auto 32px;">Download the Cortex Intelligence Engine and start building autonomous agents today.</p>
        <button class="btn btn-primary btn-large" data-nav="/downloads">Get CIE</button>
      </div>
    </section>
  `;

  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.nav);
    });
  });

  return page;
}
