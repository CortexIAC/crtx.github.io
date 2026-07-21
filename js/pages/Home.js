import { createParticles } from '../components/Particles.js';
import { createAppCard } from '../components/AppCard.js';
import { getAllApps } from '../data/apps.js';
import { navigate } from '../router.js';

export function renderHome() {
  const page = document.createElement('div');

  page.innerHTML = `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-grad"></div>
      <div class="hero-canvas"></div>
      <div class="hero-content">
        <div class="hero-tagline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
          The Local Intelligence Platform
        </div>
        <h1 class="display-1 hero-title">
          One Intelligence.<br>
          <span class="gradient-text">Many Applications.</span>
        </h1>
        <p class="hero-subtitle">
          A unified ecosystem of AI-powered applications that communicate, coordinate, and evolve — entirely on your hardware.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" data-nav="/ecosystem">Explore Ecosystem</button>
          <button class="btn btn-secondary btn-large" data-nav="/architecture">View Architecture</button>
        </div>
      </div>
      <div class="hero-scroll">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7"/>
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
      </div>
    </section>

    <!-- STATS -->
    <section class="section">
      <div class="container">
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-number" data-count="10">0</div>
            <div class="stat-label">Applications</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="5">0</div>
            <div class="stat-label">Programming Languages</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="4">0</div>
            <div class="stat-label">Platforms</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="100">0<span style="font-size:0.5em">%</span></div>
            <div class="stat-label">Local & Private</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURE ROW 1 -->
    <section class="section">
      <div class="container">
        <div class="feature-row">
          <div class="feature-visual">
            <div style="text-align:center;color:var(--accent-text);opacity:0.6;font-size:80px;">⚡</div>
          </div>
          <div class="feature-text">
            <div class="tag tag-accent">Performance</div>
            <h3 class="heading-1" style="margin-top:16px;">Built for Speed</h3>
            <p>Synapse Core provides sub-100 microsecond IPC between applications using Rust-backed shared memory ring buffers. No cloud latency. No network overhead.</p>
            <ul class="feature-list">
              <li>Zero-copy shared memory IPC</li>
              <li>Capability-based security model</li>
              <li>Crash-resilient process supervision</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURE ROW 2 -->
    <section class="section">
      <div class="container">
        <div class="feature-row">
          <div class="feature-text">
            <div class="tag tag-accent">Intelligence</div>
            <h3 class="heading-1" style="margin-top:16px;">Local AI That Acts</h3>
            <p>CIE runs autonomous agents that plan, execute tools, retrieve memories, and coordinate across your system — all without sending data to the cloud.</p>
            <ul class="feature-list">
              <li>Multi-model routing (Ollama, llama.cpp, APIs)</li>
              <li>ReAct agent loops with tool use</li>
              <li>Persistent vector memory store</li>
            </ul>
          </div>
          <div class="feature-visual" id="brain3d-container">
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURE ROW 3 -->
    <section class="section">
      <div class="container">
        <div class="feature-row">
          <div class="feature-visual">
            <div style="text-align:center;color:var(--accent-text);opacity:0.6;font-size:80px;">🔗</div>
          </div>
          <div class="feature-text">
            <div class="tag tag-accent">Ecosystem</div>
            <h3 class="heading-1" style="margin-top:16px;">Everything Connected</h3>
            <p>Applications share state, fire events, and cooperate on complex tasks. Write notes in Cortex Notes and have CIE automatically surface related research in Cortex Studio.</p>
            <ul class="feature-list">
              <li>Unified IPC event bus</li>
              <li>Cross-application data sharing</li>
              <li>Distributed agent swarms</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- APP PREVIEW -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="tag tag-accent">Ecosystem</div>
          <h2 class="display-2">Explore the Ecosystem</h2>
          <p class="body-large">Every application is a node in a unified intelligence network. Click any app to learn more.</p>
        </div>
        <div class="app-preview-strip animate-stagger"></div>
        <div style="text-align:center;margin-top:40px;">
          <button class="btn btn-secondary btn-large" data-nav="/ecosystem">View All Applications →</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="text-align:center;">
      <div class="container">
        <h2 class="display-2" style="margin-bottom:20px;">Ready to Build Intelligence?</h2>
        <p class="body-large" style="max-width:560px;margin:0 auto 32px;">The entire ecosystem is open source. Download, contribute, and run it all locally.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" data-nav="/downloads">Download Now</button>
          <button class="btn btn-secondary btn-large" onclick="window.open('https://github.com/CortexIAC','_blank')">View on GitHub</button>
        </div>
      </div>
    </section>
  `;

  page.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.dataset.nav);
    });
  });

  // Particle canvas
  requestAnimationFrame(() => {
    const canvasContainer = page.querySelector('.hero-canvas');
    if (canvasContainer) {
      createParticles(canvasContainer, { count: 80, speed: 0.2 });
    }
  });

  // 3D Brain
  requestAnimationFrame(() => {
    const brainContainer = page.querySelector('#brain3d-container');
    if (brainContainer) {
      import('../components/Brain3D.js').then(({ createBrain3D }) => {
        createBrain3D(brainContainer);
      });
    }
  });

  // Animate stats
  requestAnimationFrame(() => {
    const statNumbers = page.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.innerHTML = el.dataset.count === '100' ? `${current}<span style="font-size:0.5em">%</span>` : current;
      }, 30);
    });
  });

  // Render app preview
  requestAnimationFrame(() => {
    const strip = page.querySelector('.app-preview-strip');
    if (strip) {
      const apps = getAllApps().slice(0, 3);
      apps.forEach(app => {
        strip.appendChild(createAppCard(app));
      });
    }
  });

  // Reveal animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  page.querySelectorAll('.feature-row').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 150}ms`;
    observer.observe(el);
  });

  return page;
}
