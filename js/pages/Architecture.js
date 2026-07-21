import { navigate } from '../router.js';

const layers = [
  {
    icon: '🖥',
    title: 'Applications',
    subtitle: 'User-facing tools and interfaces',
    apps: ['Cortex Studio', 'Cortex Notes', 'FloraNode', 'Nexus Hub', 'Cortex Horizon'],
    description: 'Applications are the user-facing nodes of the ecosystem. Each application connects to the IPC bus, registers its capabilities, and communicates with other applications through the Synapse Core runtime.',
    color: 'var(--accent-text)',
  },
  {
    icon: '🧠',
    title: 'Cortex Intelligence Engine',
    subtitle: 'Orchestration, planning, memory, agents',
    apps: ['Planner', 'Memory Store', 'Tool Router', 'Agent Runtime', 'Capability Registry'],
    description: 'CIE sits between applications and the core runtime. It provides cognitive services: planning, memory retrieval, tool routing, and autonomous agent execution. Applications delegate intelligence tasks to CIE via the IPC bus.',
    color: '#a78bfa',
  },
  {
    icon: '⚡',
    title: 'Synapse Runtime',
    subtitle: 'IPC bus, capability security, process supervision',
    apps: ['IPC Daemon', 'Capability ACL', 'Process Supervisor', 'Event Broker', 'Shared Memory'],
    description: 'The Synapse Core runtime is the foundation. It manages inter-process communication via Named Pipes / Unix sockets, enforces capability-based security, supervises child processes, and brokers events between all connected applications.',
    color: '#f59e0b',
  },
  {
    icon: '💻',
    title: 'Operating System',
    subtitle: 'Windows, Linux, macOS kernel interfaces',
    apps: ['Windows NT', 'Linux Kernel', 'macOS Darwin'],
    description: 'Synapse runs on all major desktop operating systems. The core runtime abstracts platform-specific details (Named Pipes on Windows, Unix sockets on Linux/macOS) behind a unified IPC API.',
    color: '#6b7280',
  },
];

export function renderArchitecture() {
  const page = document.createElement('div');

  page.innerHTML = `
    <section style="padding-top:120px;">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">System</div>
          <h1 class="display-2">Architecture</h1>
          <p class="body-large">The Synapse ecosystem is organized into four layers. Click any layer to explore how it connects to the whole.</p>
        </div>

        <div class="arch-diagram">
          ${layers.map((layer, i) => `
            <div class="arch-layer" data-index="${i}">
              <div class="arch-layer-header">
                <div style="display:flex;align-items:center;gap:16px;">
                  <div class="arch-icon" style="color:${layer.color};">${layer.icon}</div>
                  <div>
                    <h3 style="color:${layer.color};">${layer.title}</h3>
                    <p class="body-small">${layer.subtitle}</p>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arch-chevron" style="transition:transform 0.3s;color:var(--text-tertiary);">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <div class="arch-layer-content">
                <p>${layer.description}</p>
                <div class="arch-apps">
                  ${layer.apps.map(a => `<span>${a}</span>`).join('')}
                </div>
              </div>
            </div>
            ${i < layers.length - 1 ? '<div class="arch-connector">↓</div>' : ''}
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Data Flow</div>
          <h2 class="display-2">How It Connects</h2>
          <p class="body-large">Applications never communicate directly. All inter-process communication flows through the Synapse Core runtime, which enforces security policies and routes events.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">1. Connection</h3>
            <p class="body-regular">An application connects to the IPC daemon, presenting its capability manifest signed with an ed25519 keypair.</p>
          </div>
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">2. Authentication</h3>
            <p class="body-regular">The daemon verifies the signature and checks requested capabilities against user-configured ACL policies.</p>
          </div>
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">3. Communication</h3>
            <p class="body-regular">Once authorized, the application sends and receives events through the pub/sub broker or shared memory ring buffers.</p>
          </div>
          <div class="card card-glow">
            <h3 class="heading-3" style="margin-bottom:8px;">4. Coordination</h3>
            <p class="body-regular">CIE acts as a cognitive orchestrator, planning sequences of actions across multiple applications and tool registries.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="text-align:center;">
      <div class="container">
        <h2 class="display-2" style="margin-bottom:20px;">Explore the Source</h2>
        <p class="body-large" style="max-width:560px;margin:0 auto 32px;">Synapse Core is open source. Read the code, contribute, and build on top of it.</p>
        <button class="btn btn-primary btn-large" onclick="window.open('https://github.com/crtx/synapse-core','_blank')">View on GitHub</button>
      </div>
    </section>
  `;

  // Layer expand/collapse
  page.querySelectorAll('.arch-layer').forEach(el => {
    el.addEventListener('click', () => {
      const wasActive = el.classList.contains('active');
      page.querySelectorAll('.arch-layer.active').forEach(a => a.classList.remove('active'));
      if (!wasActive) el.classList.add('active');
    });
  });

  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.nav);
    });
  });

  return page;
}
