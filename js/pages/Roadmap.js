import { createParticles } from '../components/Particles.js';

const phases = [
  {
    id: 'aura',
    title: 'Aura',
    subtitle: 'Core Foundation',
    theme: 'Neon green, terminal style',
    goal: 'Establish core framework and base UI',
    color: '#00ff9c',
    icon: '🌅',
    status: 'complete',
    features: [
      'Runtime + modular system foundation',
      'Base UI with tabs: Chat, Debug, Files, System, Control',
      'Voice input (ALT hold)',
      'Module manager skeleton',
      'Theme system: Aura',
      'Logging & Debug system',
      'Startup animation + Pip-Boy visuals'
    ],
    notes: 'Foundation phase — systems are placeholders but testable.'
  },
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'Active Node Layer',
    theme: 'Reactive UI, subtle animation',
    goal: 'Make the system alive and responsive',
    color: '#00d4ff',
    icon: '💓',
    status: 'current',
    features: [
      'Modules execute real functions',
      'Event-driven behavior',
      'Background processes',
      'UI upgrades (status bars, waveform)',
      'Dynamic logging',
      'Work interfaces (Dev, Modding, Security)'
    ],
    notes: 'First real working stage.'
  },
  {
    id: 'halo',
    title: 'Halo',
    subtitle: 'Expansion & Extensibility',
    theme: 'Bright, expanding UI',
    goal: 'Turn system into a modular platform',
    color: '#ffd700',
    icon: '✨',
    status: 'upcoming',
    features: [
      'Drop-in plugin system',
      'Module marketplace (local → online)',
      'Dynamic UI per interface',
      'Multi-theme support',
      'Enhanced voice assistant',
      'External tool launching'
    ],
    notes: 'Becomes a platform, not just a shell.'
  },
  {
    id: 'nova',
    title: 'Nova',
    subtitle: 'Deep AI Integration',
    theme: 'Energetic, intelligent UI',
    goal: 'Make AI central',
    color: '#ff6bff',
    icon: '💫',
    status: 'upcoming',
    features: [
      'AI routes commands to modules',
      'Context awareness',
      'IDE + code assistant',
      'Integrated toolsets per interface',
      'UI panel output integration'
    ],
    notes: 'AI becomes proactive.'
  },
  {
    id: 'phantom',
    title: 'Phantom',
    subtitle: 'Automation Layer',
    theme: 'Minimal, stealthy',
    goal: 'Automated workflows',
    color: '#6b6bff',
    icon: '👻',
    status: 'upcoming',
    features: [
      'Task chains',
      'Voice-triggered routines',
      'Pipeline execution',
      'Advanced logging + monitoring',
      'Module-to-module triggers'
    ],
    notes: 'Autopilot phase.'
  },
  {
    id: 'eclipse',
    title: 'Eclipse',
    subtitle: 'Unified Ecosystem',
    theme: 'Polished, sleek',
    goal: 'Stable public release',
    color: '#ffffff',
    icon: '🌑',
    status: 'future',
    features: [
      'Full ecosystem integration',
      'One-click workspace setup',
      'Broadcast server mode',
      'Self-optimizing runtime',
      'Complete SDK + API docs'
    ],
    notes: 'Final form — the unified ecosystem.'
  }
];

export function renderRoadmap() {
  const page = document.createElement('div');
  page.style.cssText = 'position:relative;min-height:100vh;overflow:hidden;';

  // Canvas background
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;';
  page.appendChild(canvas);

  // Ambient glow backgrounds
  const ambient = document.createElement('div');
  ambient.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  ambient.innerHTML = `
    <div style="position:absolute;top:-20%;left:-10%;width:60%;height:60%;border-radius:50%;background:radial-gradient(circle,rgba(0,255,156,0.06),transparent 70%);"></div>
    <div style="position:absolute;bottom:-20%;right:-10%;width:60%;height:60%;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,0.04),transparent 70%);"></div>
    <div style="position:absolute;top:40%;right:20%;width:40%;height:40%;border-radius:50%;background:radial-gradient(circle,rgba(255,107,255,0.03),transparent 70%);"></div>
  `;
  page.appendChild(ambient);

  // Content wrapper
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative;z-index:1;';

  // Track mouse for parallax (desktop only)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.roadmap-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        card.style.setProperty('--rotate-x', `${-dy * 8}deg`);
        card.style.setProperty('--rotate-y', `${dx * 8}deg`);
        card.style.setProperty('--glow-x', `${(e.clientX - rect.left) / rect.width * 100}%`);
        card.style.setProperty('--glow-y', `${(e.clientY - rect.top) / rect.height * 100}%`);
      });
    });
  }

  // Hero
  const hero = document.createElement('div');
  hero.style.cssText = 'text-align:center;padding:140px 24px 60px;';
  hero.innerHTML = `
    <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:9999px;background:rgba(0,255,156,0.08);border:1px solid rgba(0,255,156,0.15);color:#00ff9c;font-size:14px;font-weight:500;margin-bottom:24px;">
      <span style="width:6px;height:6px;border-radius:50%;background:#00ff9c;box-shadow:0 0 8px #00ff9c;"></span>
      Synapse Core — Development Roadmap
    </div>
    <h1 style="font-size:clamp(48px,10vw,96px);font-weight:700;letter-spacing:-0.04em;line-height:0.95;margin-bottom:16px;">
      From <span style="color:#00ff9c;">Aura</span>
      <span style="display:inline-block;animation:float 3s ease-in-out infinite;">→</span>
      <span style="color:#fff;">Eclipse</span>
    </h1>
    <p style="font-size:clamp(16px,1.8vw,20px);color:rgba(255,255,255,0.5);max-width:560px;margin:0 auto 40px;line-height:1.6;">
      Six phases. One vision. Every named version brings us closer to the unified intelligence platform.
    </p>
  `;
  wrapper.appendChild(hero);

  // Roadmap cards
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;max-width:1200px;margin:0 auto;padding:0 24px 80px;';

  phases.forEach((phase, idx) => {
    const card = document.createElement('div');
    card.className = 'roadmap-card';
    card.dataset.phase = phase.id;
    card.style.cssText = `
      position:relative;border-radius:20px;padding:32px;cursor:pointer;
      background:var(--bg-card);
      border:1px solid rgba(255,255,255,0.06);
      transition:transform 0.15s ease-out,border-color 0.3s,box-shadow 0.3s;
      transform:perspective(1000px) rotateX(var(--rotate-x,0deg)) rotateY(var(--rotate-y,0deg));
      overflow:hidden;
    `;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');

    // Glow overlay that follows mouse
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;
      background:radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), ${phase.color}15, transparent 60%);
      opacity:0;transition:opacity 0.3s;border-radius:20px;z-index:1;
    `;
    card.appendChild(glow);
    card.addEventListener('mouseenter', () => glow.style.opacity = '1');
    card.addEventListener('mouseleave', () => glow.style.opacity = '0');

    // Status indicator
    const statusIcon = phase.status === 'complete' ? '✅' : phase.status === 'current' ? '⚡' : phase.status === 'future' ? '🔮' : '○';
    const statusLabel = phase.status === 'complete' ? 'Complete' : phase.status === 'current' ? 'In Progress' : phase.status === 'future' ? 'Future' : 'Upcoming';

    // Border glow animation for current phase
    if (phase.status === 'current') {
      card.style.animation = 'glowPulse 2s ease-in-out infinite';
    }

    card.innerHTML += `
      <div style="position:relative;z-index:2;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
          <div style="font-size:40px;line-height:1;">${phase.icon}</div>
          <div style="display:flex;align-items:center;gap:6px;padding:4px 12px;border-radius:9999px;font-size:11px;font-weight:500;background:${phase.status === 'current' ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)'};color:${phase.status === 'current' ? '#00d4ff' : 'rgba(255,255,255,0.4)'};border:1px solid ${phase.status === 'current' ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.06)'};">
            ${statusIcon} ${statusLabel}
          </div>
        </div>
        <h2 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:4px;color:${phase.color};">
          ${phase.title}
        </h2>
        <p style="font-size:16px;color:rgba(255,255,255,0.4);margin-bottom:16px;">${phase.subtitle}</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;">${phase.goal}</p>
      </div>
    `;

    // Expanded details (hidden by default)
    const details = document.createElement('div');
    details.className = 'roadmap-details';
    details.style.cssText = `
      max-height:0;overflow:hidden;transition:all 0.5s cubic-bezier(0.22,1,0.36,1);
      position:relative;z-index:2;
    `;
    details.innerHTML = `
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Theme</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:16px;">${phase.theme}</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Features</p>
        <ul style="list-style:none;padding:0;">
          ${phase.features.map(f => `
            <li style="padding:6px 0;font-size:14px;color:rgba(255,255,255,0.5);display:flex;align-items:flex-start;gap:8px;">
              <span style="color:${phase.color};font-size:10px;margin-top:4px;">▶</span>
              ${f}
            </li>
          `).join('')}
        </ul>
        <p style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:8px;margin-top:16px;text-transform:uppercase;letter-spacing:0.05em;">Notes</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);font-style:italic;">${phase.notes}</p>
      </div>
    `;
    card.appendChild(details);

    // Click to expand
    let expanded = false;
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      expanded = !expanded;
      details.style.maxHeight = expanded ? '600px' : '0';
      card.style.borderColor = expanded ? phase.color + '40' : 'rgba(255,255,255,0.06)';
    });

    // Number label
    const num = document.createElement('div');
    num.style.cssText = `
      position:absolute;top:12px;right:16px;font-size:48px;font-weight:800;
      color:rgba(255,255,255,0.03);z-index:0;line-height:1;user-select:none;
      font-family:'JetBrains Mono',monospace;
    `;
    num.textContent = `0${idx + 1}`;
    card.appendChild(num);

    grid.appendChild(card);
  });
  wrapper.appendChild(grid);

  page.appendChild(wrapper);

  // Init particles
  requestAnimationFrame(() => {
    createParticles(canvas, { count: 60, speed: 0.15, color: '0, 255, 156', connectDist: 150 });
  });

  return page;
}
