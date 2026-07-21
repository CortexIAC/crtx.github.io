export const communityPlugins = [
  {
    id: "terminal-plus",
    name: "Terminal Plus",
    icon: "💻",
    tagline: "Advanced Multi-Tab Terminal Emulator",
    banner: "linear-gradient(135deg, #0a0e14 0%, #040608 100%)",
    description: "Terminal Plus is a feature-rich terminal emulator with multi-tab support, SSH connection management, Docker container attach, and session persistence. Built on a custom xterm.js fork with GPU-accelerated rendering.",
    currentVersion: "v1.2.0",
    developmentStatus: "Stable",
    platform: ["Windows", "Linux", "macOS"],
    language: ["JavaScript", "C++"],
    dependencies: ["Synapse Core (optional)"],
    github: "https://github.com/community/terminal-plus",
    features: [
      "Multi-tab terminal with drag-and-drop reordering",
      "SSH connection manager with key-based auth",
      "Docker exec/attach integration",
      "Persistent session recovery after crashes",
      "GPU-accelerated rendering via WebGL",
      "Split-pane support (vertical/horizontal)",
      "Custom theme engine with 20+ presets",
      "Searchable scrollback buffer (100K lines)"
    ],
    architecture: "Terminal Plus uses a pty-process bridge architecture. The frontend renders via a custom xterm.js fork with WebGL compositing. Each tab spawns a separate pseudoterminal process with isolated environment variables.",
    roadmap: [
      { phase: "Phase 1: Core (Complete)", items: ["xterm.js integration", "Multi-tab management", "SSH client", "Theme engine"] },
      { phase: "Phase 2: Docker (Complete)", items: ["Docker attach protocol", "Container exec", "Log streaming"] },
      { phase: "Phase 3: Collaboration (Current)", items: ["Shared terminal sessions", "Session recording/playback", "WebRTC terminal sharing"] }
    ],
    faq: [
      { q: "Do I need Synapse Core?", a: "No. Terminal Plus runs standalone. Synapse Core integration enables cross-app terminal sharing." },
      { q: "Can I save SSH passwords?", a: "Yes. Credentials are stored encrypted using your OS keychain (Windows Credential Manager, macOS Keychain, Linux Secret Service)." },
      { q: "Does it support tmux?", a: "Yes. Terminal Plus has native tmux integration with session picker and pane synchronization." }
    ],
    changelog: [
      { version: "v1.2.0", date: "2026-06-20", logs: ["WebGL acceleration enabled by default", "Added session recording", "Fixed unicode rendering in split-pane mode"] },
      { version: "v1.1.0", date: "2026-04-15", logs: ["SSH key manager UI", "Docker compose integration", "Performance improvements"] },
      { version: "v1.0.0", date: "2026-02-01", logs: ["Initial release with multi-tab terminal", "SSH connection management", "Theme engine"] }
    ],
    futurePlans: [
      "WebRTC-based collaborative terminal sharing",
      "Built-in file transfer over SSH (SCP/SFTP)",
      "Terminal macro recording and playback"
    ],
    relatedApps: ["synapse-core", "cortex-studio"],
    downloadSize: "8.4 MB"
  },
  {
    id: "audio-visualizer",
    name: "Audio Visualizer",
    icon: "🎵",
    tagline: "Real-Time Audio Spectrum Analyzer",
    banner: "linear-gradient(135deg, #0e0a1a 0%, #06040d 100%)",
    description: "Audio Visualizer is a real-time audio spectrum analyzer with multiple rendering modes. It captures system audio output and renders FFT-based visualizations including waveform, spectrogram, waterfall, and 3D surface plots.",
    currentVersion: "v1.0.0",
    developmentStatus: "Beta",
    platform: ["Windows", "macOS"],
    language: ["Python", "C++"],
    dependencies: ["None (standalone)"],
    github: "https://github.com/community/audio-visualizer",
    features: [
      "Real-time FFT spectrum analysis (up to 96kHz)",
      "Multiple visualization modes: waveform, spectrogram, waterfall, 3D surface",
      "System audio capture (WASAPI/CoreAudio)",
      "Customizable color schemes and rendering quality",
      "Peak frequency detection and note identification",
      "Export visualization as PNG/MP4",
      "Low-latency audio pipeline (<10ms)",
      "Multiple input source support (microphone, loopback, file)"
    ],
    architecture: "Audio Visualizer captures system audio via platform-specific APIs (WASAPI on Windows, CoreAudio on macOS). Audio is processed through a ring buffer and fed into an FFT engine. Multiple rendering modes share the same FFT data but visualize differently.",
    roadmap: [
      { phase: "Phase 1: Capture & FFT (Complete)", items: ["System audio capture", "FFT engine", "Basic waveform renderer"] },
      { phase: "Phase 2: Visualizations (Current)", items: ["Spectrogram mode", "Waterfall mode", "3D surface renderer", "Color schemes"] },
      { phase: "Phase 3: Export", items: ["Video recording", "Image export", "MIDI note output"] }
    ],
    faq: [
      { q: "Can it capture audio from any application?", a: "Yes. On Windows it uses WASAPI loopback to capture all system audio. On macOS it uses Aggregate Device setup." },
      { q: "Is there a latency-free mode?", a: "Visualization latency is under 10ms. Recording/export adds processing time depending on quality settings." }
    ],
    changelog: [
      { version: "v1.0.0", date: "2026-07-01", logs: ["Initial release", "4 visualization modes", "System audio capture", "Custom color schemes"] }
    ],
    futurePlans: [
      "MIDI output for frequency-to-note conversion",
      "Audio fingerprinting and song identification",
      "VST plugin hosting for effects visualization"
    ],
    relatedApps: ["cortex-voicelab"],
    downloadSize: "12.6 MB"
  },
  {
    id: "weather-station",
    name: "Weather Station",
    icon: "🌤",
    tagline: "Local Weather Monitoring & Forecasting",
    banner: "linear-gradient(135deg, #0a141e 0%, #040a0f 100%)",
    description: "Weather Station provides hyperlocal weather monitoring with support for personal weather stations (PWS), OpenWeatherMap integration, and historical data analysis. Features include 7-day forecasts, animated radar maps, and severe weather alerts.",
    currentVersion: "v1.1.0",
    developmentStatus: "Stable",
    platform: ["Windows", "Linux", "macOS", "Web"],
    language: ["Python", "JavaScript"],
    dependencies: ["Synapse Core (optional)"],
    github: "https://github.com/community/weather-station",
    features: [
      "Personal weather station support (Davis, Ambient, Ecowitt)",
      "OpenWeatherMap and WeatherAPI integration",
      "7-day forecast with hourly breakdown",
      "Animated radar and satellite imagery overlay",
      "Historical data analysis with trend charts",
      "Severe weather alerts (NWS/Environment Canada)",
      "Custom dashboard with draggable widgets",
      "Data export to CSV/JSON"
    ],
    architecture: "Weather Station uses a plugin-based data source architecture. Each weather provider (PWS, OpenWeatherMap, etc.) is a separate data source plugin. The core engine aggregates data, caches it in SQLite, and feeds the UI dashboard.",
    roadmap: [
      { phase: "Phase 1: Data Sources (Complete)", items: ["OpenWeatherMap integration", "PWS data parsing", "SQLite caching"] },
      { phase: "Phase 2: UI (Complete)", items: ["Dashboard with widgets", "Forecast display", "Chart rendering"] },
      { phase: "Phase 3: Alerts (Current)", items: ["NWS alert integration", "Push notifications", "Email alert dispatch"] }
    ],
    faq: [
      { q: "Do I need a weather station?", a: "No. Weather Station works with free APIs (OpenWeatherMap). A personal station adds hyperlocal accuracy." },
      { q: "Is the API key required?", a: "A free OpenWeatherMap API key is needed for weather data. The free tier allows 60 calls/minute." }
    ],
    changelog: [
      { version: "v1.1.0", date: "2026-06-10", logs: ["Added personal weather station support", "NWS alert integration", "Custom widget dashboard"] },
      { version: "v1.0.0", date: "2026-03-20", logs: ["Initial release", "OpenWeatherMap integration", "7-day forecast", "Chart rendering"] }
    ],
    futurePlans: [
      "Weather routing for outdoor activity planning",
      "Crop-specific forecasts (FloraNode integration)",
      "Historical climate trend analysis"
    ],
    relatedApps: ["floranode", "synapse-core"],
    downloadSize: "6.2 MB"
  },
  {
    id: "pdf-toolkit",
    name: "PDF Toolkit",
    icon: "📄",
    tagline: "Offline PDF Editor & Document Tools",
    banner: "linear-gradient(135deg, #0e0e0e 0%, #060606 100%)",
    description: "PDF Toolkit is a complete offline PDF editing suite. Merge, split, compress, annotate, sign, and convert PDF documents without sending files to any cloud service. Uses PDFium and Poppler for rendering.",
    currentVersion: "v2.0.0",
    developmentStatus: "Stable",
    platform: ["Windows", "Linux", "macOS"],
    language: ["C++", "Python"],
    dependencies: ["None (standalone)"],
    github: "https://github.com/community/pdf-toolkit",
    features: [
      "Merge multiple PDFs with page reordering",
      "Split PDFs by page range or bookmarks",
      "Compress PDFs with quality control",
      "Annotate with highlights, notes, and drawings",
      "Digital signatures with certificate support",
      "PDF/A conversion for archival",
      "Batch processing with queue management",
      "OCR for scanned documents (Tesseract)"
    ],
    architecture: "PDF Toolkit wraps PDFium (Google's PDF rendering library) and Poppler for document processing. OCR is handled by a bundled Tesseract instance. All processing happens locally — no data leaves your machine.",
    roadmap: [
      { phase: "Phase 1: Core Operations (Complete)", items: ["PDF merge/split", "Page extraction", "PDF rendering"] },
      { phase: "Phase 2: Editing (Current)", items: ["Annotation engine", "Digital signatures", "PDF/A conversion"] },
      { phase: "Phase 3: Advanced", items: ["OCR pipeline", "Form filling", "PDF-to-Office conversion"] }
    ],
    faq: [
      { q: "Are my documents sent to the cloud?", a: "No. All processing happens locally. PDF Toolkit never sends your documents anywhere." },
      { q: "How good is the OCR?", a: "PDF Toolkit uses Tesseract 5 with English language data bundled. Additional language packs can be downloaded." }
    ],
    changelog: [
      { version: "v2.0.0", date: "2026-05-15", logs: ["Annotation engine rewrite", "Digital signature support", "Batch processing queue"] },
      { version: "v1.0.0", date: "2026-01-10", logs: ["Initial release", "PDF merge/split", "Compression", "Rendering"] }
    ],
    futurePlans: [
      "PDF form auto-detection and filling",
      "AI-powered document summarization",
      "Collaborative PDF annotation"
    ],
    relatedApps: ["cortex-studio"],
    downloadSize: "24.8 MB"
  },
  {
    id: "network-scanner",
    name: "Network Scanner",
    icon: "🌐",
    tagline: "LAN Discovery & Security Auditing Tool",
    banner: "linear-gradient(135deg, #0a0e1a 0%, #04060d 100%)",
    description: "Network Scanner is a local network discovery and security auditing tool. It scans subnets for active devices, identifies services and open ports, fingerprints operating systems, and detects common vulnerabilities — all from your desktop.",
    currentVersion: "v1.3.0",
    developmentStatus: "Stable",
    platform: ["Windows", "Linux"],
    language: ["Python", "Rust"],
    dependencies: ["Synapse Core (optional)", "Npcap/WinPcap (Windows)"],
    github: "https://github.com/community/network-scanner",
    features: [
      "Automatic subnet discovery and device enumeration",
      "Port scanning (TCP SYN, TCP Connect, UDP)",
      "Service fingerprinting and version detection",
      "OS detection via TCP/IP stack fingerprinting",
      "CVE lookup for detected services",
      "Packet capture with protocol analysis",
      "Network topology mapping",
      "Export results to JSON/CSV/HTML report"
    ],
    architecture: "Network Scanner uses raw sockets (via Npcap on Windows) for packet crafting and capture. Scanning engines run in isolated Rust threads for performance. Results are cached in SQLite and visualized in a PyQt6 UI.",
    roadmap: [
      { phase: "Phase 1: Discovery (Complete)", items: ["ARP scan", "Ping sweep", "Port scanning engine"] },
      { phase: "Phase 2: Fingerprinting (Complete)", items: ["Service detection", "OS fingerprinting", "CVE lookup"] },
      { phase: "Phase 3: Monitoring (Current)", items: ["Continuous network monitoring", "Anomaly detection", "Alerting system"] }
    ],
    faq: [
      { q: "Is this a hacking tool?", a: "Network Scanner is designed for legitimate network administration, security auditing, and educational purposes. Only scan networks you own or have permission to test." },
      { q: "Do I need administrator privileges?", a: "Raw packet capture requires admin/root. Port scanning and service detection work without elevated privileges." }
    ],
    changelog: [
      { version: "v1.3.0", date: "2026-06-25", logs: ["Rust port scanning engine", "Network topology map", "HTML report export"] },
      { version: "v1.2.0", date: "2026-04-20", logs: ["CVE lookup integration", "Continuous monitoring mode", "Alert system"] },
      { version: "v1.0.0", date: "2026-02-10", logs: ["Initial release", "Subnet discovery", "Port scanning", "Service fingerprinting"] }
    ],
    futurePlans: [
      "Integration with Cortex Arsenal for automated pentesting",
      "Wireless network auditing (802.11)",
      "Network traffic anomaly detection with ML"
    ],
    relatedApps: ["cortex-arsenal", "cortex-horizon"],
    downloadSize: "14.2 MB"
  }
];

export function getPlugin(id) {
  return communityPlugins.find(p => p.id === id) || null;
}
