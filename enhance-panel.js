// Panel: Wide view, 3 themes (Transformers, Bitcoin, OpenClaw)
(function () {
  'use strict';

  var STORAGE_KEY = 'x_unfollower_theme';
  var DEFAULT_THEME = 'transformers';

  var BASE_CSS = `
    [data-x-unfollower-panel] .ant-modal-wrap { backdrop-filter: blur(8px); }
    [data-x-unfollower-panel] .ant-modal { max-width: 95vw !important; width: 1150px !important; padding: 0 !important; }
    [data-x-unfollower-panel] .ant-modal-content {
      border-radius: 16px !important;
      overflow: hidden !important;
    }
    [data-x-unfollower-panel] .ant-modal-header {
      padding: 24px 32px !important;
      border-radius: 16px 16px 0 0 !important;
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
    }
    [data-x-unfollower-panel] .ant-modal-title { font-size: 20px !important; font-weight: 600 !important; }
    [data-x-unfollower-panel] .ant-modal-body { padding: 32px !important; }
    [data-x-unfollower-panel] .ant-card { border-radius: 12px !important; }
    [data-x-unfollower-panel] .ant-card-body { padding: 24px !important; }
    [data-x-unfollower-panel] .ant-divider { border-color: rgba(255, 255, 255, 0.1) !important; }
    [data-x-unfollower-panel] .ant-list { border-radius: 12px !important; }
    [data-x-unfollower-panel] .ant-list-item {
      border-radius: 8px !important;
      margin: 0 16px 8px !important;
      transition: all 0.15s ease !important;
    }
    .x-theme-picker {
      display: flex !important;
      gap: 8px !important;
      margin-left: auto !important;
    }
    .x-theme-btn {
      padding: 8px 14px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      border: none !important;
      cursor: pointer !important;
      border-radius: 8px !important;
      transition: all 0.2s !important;
    }
    .x-theme-btn.active { box-shadow: 0 0 0 2px currentColor; }

    /* VIP Premium Transitions */
    @keyframes vip-modal-in {
      0% { opacity: 0; transform: scale(0.95) translateY(20px); filter: blur(8px); }
      100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
    }
    @keyframes vip-modal-out {
      0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
      100% { opacity: 0; transform: scale(0.95) translateY(20px); filter: blur(8px); }
    }
    [data-x-unfollower-panel] .ant-modal.ant-zoom-appear,
    [data-x-unfollower-panel] .ant-modal.ant-zoom-enter {
      animation: vip-modal-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      transform-origin: center center;
    }
    [data-x-unfollower-panel] .ant-modal.ant-zoom-leave {
      animation: vip-modal-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
    }
  `;

  var TRANSFORMERS_CSS = `
    /* Fonts and Keyframes */
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    @keyframes glitch {
      0% { transform: translate(0) }
      20% { transform: translate(-2px, 2px) }
      40% { transform: translate(-2px, -2px) }
      60% { transform: translate(2px, 2px) }
      80% { transform: translate(2px, -2px) }
      100% { transform: translate(0) }
    }

    @keyframes pulse-primary {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }

    /* Core Panel Styles */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-wrap { 
      backdrop-filter: blur(10px);
      background: rgba(10, 12, 16, 0.85) !important; 
    }
    
    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-content {
      background: #0a0c10 !important; /* background-dark */
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 0 !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
      font-family: 'Space Grotesk', sans-serif !important;
      overflow: hidden !important;
      position: relative !important;
    }

    /* Decorative Background */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-content::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V10C10 4.477 5.523 0 0 0h24c-5.523 0-10 4.477-10 10v20c0 5.523 5.523 10 10 10H0z' fill='%231f2937' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.2;
      pointer-events: none;
      z-index: 0;
    }

    /* Header */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-header {
      background: rgba(10, 12, 16, 0.95) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      padding: 20px 32px !important;
      z-index: 10 !important;
      position: relative !important;
    }

    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-title { 
      color: #ffffff !important; 
      font-family: 'Space Grotesk', sans-serif !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.1em !important;
      text-shadow: 0 0 10px rgba(13, 89, 242, 0.5) !important; /* glow-text */
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
    }

    /* Body */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-modal-body { 
      background: transparent !important;
      position: relative !important;
      z-index: 5 !important;
      padding: 0 !important; /* Reset padding for full width hero */
    }

    /* Custom Stitch Container */
    .stitch-transformers-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    /* Functional UI Wrapper */
    .stitch-functional-ui {
      padding: 32px;
    }

    /* Typography & Colors Override */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-typography,
    [data-x-unfollower-panel][data-theme="transformers"] .ant-typography strong,
    [data-x-unfollower-panel][data-theme="transformers"] h1,
    [data-x-unfollower-panel][data-theme="transformers"] h2,
    [data-x-unfollower-panel][data-theme="transformers"] h3, 
    [data-x-unfollower-panel][data-theme="transformers"] h4 { 
      color: #f5f6f8 !important; 
      font-family: 'Space Grotesk', sans-serif !important;
    }

    /* Cards */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-card {
      background: #151921 !important; /* surface-dark */
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
      border-radius: 4px !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-card-head {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
      color: #fff !important;
    }
    
    /* Switches */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-switch {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-switch-checked {
      background: #0d59f2 !important; /* primary */
    }

    /* Sliders */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-track {
      background-color: #0d59f2 !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-handle {
      border-color: #0d59f2 !important;
      background-color: #151921 !important;
      border-radius: 0 !important;
      transform: rotate(45deg) !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-rail {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-dot {
      border-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 0 !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-dot-active {
      border-color: #0d59f2 !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-mark-text {
      color: #94a3b8 !important;
    }
    [data-x-unfollower-panel][data-theme="transformers"] .ant-slider-mark-text-active {
      color: #0d59f2 !important;
    }
    
    /* Inputs */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-input,
    [data-x-unfollower-panel][data-theme="transformers"] .ant-select-selector {
      background: #0a0c10 !important; /* background-dark */
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      color: #ffffff !important;
      border-radius: 2px !important;
      font-family: 'Space Grotesk', monospace !important;
      text-transform: uppercase !important;
      font-size: 13px !important;
    }
    
    [data-x-unfollower-panel][data-theme="transformers"] .ant-input:focus,
    [data-x-unfollower-panel][data-theme="transformers"] .ant-select-selector:focus,
    [data-x-unfollower-panel][data-theme="transformers"] .ant-select-open .ant-select-selector {
      border-color: #0d59f2 !important; /* primary */
      box-shadow: 0 0 0 2px rgba(13, 89, 242, 0.2) !important;
    }

    /* Primary Buttons - Stitch 'Clip Hex' Style */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-btn-primary {
      background: #0d59f2 !important; /* primary */
      border: none !important;
      border-radius: 0 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.1em !important;
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px) !important;
      transition: all 0.3s ease !important;
      padding: 0 24px !important;
      height: 40px !important;
    }

    [data-x-unfollower-panel][data-theme="transformers"] .ant-btn-primary:hover {
      background: #ffffff !important;
      color: #0d59f2 !important;
      transform: translateY(-2px) !important;
    }

    /* Default Buttons */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-btn-default {
      background: transparent !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: #ffffff !important;
      border-radius: 0 !important;
      text-transform: uppercase !important;
      font-weight: 600 !important;
      clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px) !important;
    }
    
    [data-x-unfollower-panel][data-theme="transformers"] .ant-btn-default:hover {
      border-color: #0d59f2 !important;
      color: #0d59f2 !important;
    }

    /* List Items */
    [data-x-unfollower-panel][data-theme="transformers"] .ant-list-item {
      background: rgba(21, 25, 33, 0.6) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
      margin-bottom: 8px !important;
      border-radius: 0 !important;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    }

    [data-x-unfollower-panel][data-theme="transformers"] .ant-list-item:hover {
      border-color: #0d59f2 !important;
      background: rgba(13, 89, 242, 0.1) !important;
    }
  `;

  var STITCH_HERO_HTML = `
    <div class="stitch-transformers-container">
       <!-- Hero Section -->
       <div style="position: relative; width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0a0c10;">
          <div style="position: absolute; inset: 0; background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcXO-yU6iQnMKktUjr-ssMY5Dv76cMmCQ5d6S7ONeGJM9xLwevr-Aec_NAWIlw1iF5W6cHE2B5pYwOc_acuXu2mAkSeD5_1UtlC4ZFXpqJtdeeCMF3wchtV5A8ShFmrPcA5bTWJ_J108dyzmVyUYsII2VLeFE6B5BCqOPBZhUfESG3ntJ4OhXQ8DZ67gWPRCgM_HE7ZzmAgbAVauJMT_84DP1hiUhqqkmgCSdcZGXTNA4dnn48cdifPH0_GjWMFS8a3NFEsTDz6rNM'); background-size: cover; background-position: center; opacity: 0.6;"></div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, #0a0c10);"></div>
          
          <div style="position: relative; z-index: 10; text-align: center;">
             <div style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border: 1px solid rgba(13, 89, 242, 0.3); border-radius: 99px; background: rgba(13, 89, 242, 0.1); margin-bottom: 16px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #0d59f2; animation: pulse-primary 2s infinite;"></span>
                <span style="font-size: 10px; font-weight: 500; color: #0d59f2; text-transform: uppercase; letter-spacing: 0.1em;">Incoming Transmission</span>
             </div>
             <h1 style="color: white; font-size: 32px; font-weight: 900; line-height: 1; text-transform: uppercase; letter-spacing: -0.02em; margin: 0;">
                Fate of <span style="background: linear-gradient(to right, #0d59f2, #60a5fa); -webkit-background-clip: text; color: transparent;">Two Worlds</span>
             </h1>
          </div>
       </div>
       
       <!-- Functional UI Container -->
       <div class="stitch-functional-ui" id="stitch-functional-ui-root">
          <!-- Extension logic will be injected here -->
       </div>
    </div>
  `;


  var BITCOIN_CSS = `
    /* Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    /* Variables (Scoped) */
    [data-x-unfollower-panel][data-theme="bitcoin"] {
      --btc-primary: #f7951d;
      --btc-bg-dark: #0a0a0a;
      --btc-surface: #161616;
      --btc-highlight: #232323;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-modal-wrap { 
      backdrop-filter: blur(12px);
      background: rgba(0, 0, 0, 0.8) !important; 
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-modal-content {
      background: var(--btc-bg-dark) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
      font-family: 'Inter', sans-serif !important;
      color: #e2e8f0 !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-modal-header {
      background: rgba(22, 22, 22, 0.9) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
      padding: 20px 24px !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-modal-title {
      color: #ffffff !important;
      font-family: 'Inter', sans-serif !important;
      font-weight: 700 !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-modal-body {
      background: var(--btc-bg-dark) !important;
      padding: 0 !important;
      position: relative !important;
       /* Background Accents */
      background-image: 
        radial-gradient(circle at 90% 10%, rgba(247, 149, 29, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.08) 0%, transparent 40%) !important;
    }

    /* Glassmorphism Panels */
    [data-x-unfollower-panel][data-theme="bitcoin"] .glass-panel {
      background: rgba(30, 30, 30, 0.4) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 12px !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .glass-panel:hover {
      border-color: rgba(247, 149, 29, 0.3) !important;
    }

    /* Stitch Bitcoin Layout Styles */
    .stitch-bitcoin-container {
      display: flex;
      height: 100%;
      min-height: 600px;
    }



    .stitch-bitcoin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 24px;
      overflow-y: auto;
    }

    /* Functional UI Wrapper within Bitcoin Theme */
    .stitch-bitcoin-functional-ui {
      background: rgba(22, 22, 22, 0.6) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
      border-radius: 16px !important;
      padding: 24px !important;
      margin-top: 24px;
    }

    /* Typography Overrides */
    [data-x-unfollower-panel][data-theme="bitcoin"] h1,
    [data-x-unfollower-panel][data-theme="bitcoin"] h2,
    [data-x-unfollower-panel][data-theme="bitcoin"] h3 {
      color: #fff !important;
      font-family: 'Inter', sans-serif !important;
    }
    
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-typography {
        color: #94a3b8 !important;
        font-family: 'Inter', sans-serif !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-typography strong {
        color: #fff !important;
    }

    /* Input Fields */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-input,
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-select-selector {
      background: #161616 !important;
      border: 1px solid #232323 !important;
      border-radius: 8px !important;
      color: #fff !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-input:focus,
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-select-selector:focus {
      border-color: var(--btc-primary) !important;
      box-shadow: 0 0 0 2px rgba(247, 149, 29, 0.2) !important;
    }

    /* Buttons */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-btn-primary {
      background: var(--btc-primary) !important;
      border: none !important;
      border-radius: 12px !important;
      color: #fff !important;
      font-weight: 600 !important;
      box-shadow: 0 4px 6px -1px rgba(247, 149, 29, 0.2) !important;
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-btn-primary:hover {
      background: #fbbf24 !important; /* Lighter Orange */
      transform: translateY(-1px);
    }

    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-btn-default {
        border-color: #333 !important;
        background: transparent !important;
        color: #94a3b8 !important;
        border-radius: 12px !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-btn-default:hover {
        border-color: var(--btc-primary) !important;
        color: var(--btc-primary) !important;
    }

    /* Cards */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-card {
      background: rgba(22, 22, 22, 0.8) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
      border-radius: 12px !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-card-head {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
      color: #fff !important;
    }

    /* Switches */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-switch {
      background: rgba(255, 255, 255, 0.2) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-switch-checked {
      background: var(--btc-primary) !important;
    }

    /* Sliders */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-track {
      background-color: var(--btc-primary) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-handle {
      border-color: var(--btc-primary) !important;
      background-color: #fff !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-rail {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-dot {
      border-color: rgba(255, 255, 255, 0.2) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-dot-active {
      border-color: var(--btc-primary) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-mark-text {
      color: #64748b !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-slider-mark-text-active {
      color: var(--btc-primary) !important;
    }

    /* List Items */
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-list-item {
        background: rgba(30, 30, 30, 0.4) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        border-radius: 12px !important;
        margin-bottom: 8px !important;
        padding: 12px 16px !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-list-item:hover {
        background: rgba(40, 40, 40, 0.6) !important;
        border-color: rgba(247, 149, 29, 0.3) !important;
    }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-list-item-meta-title { color: #fff !important; }
    [data-x-unfollower-panel][data-theme="bitcoin"] .ant-list-item-meta-description { color: #64748b !important; }
  `;

  var STITCH_BITCOIN_HTML = `
    <div class="stitch-bitcoin-container">
        <!-- Main Content Area -->
        <div class="stitch-bitcoin-main">
            <!-- Header -->
            <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h1 style="font-size: 24px; font-weight: 700; color: white; margin: 0;">Dashboard</h1>
                    <p style="color: #94a3b8; font-size: 14px; margin: 4px 0 0 0;">Start managing your network.</p>
                </div>
                <!-- Top Stats -->
                 <div class="glass-panel" style="padding: 8px 16px; display: flex; align-items: center; gap: 12px;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="color: #64748b; font-size: 10px; font-weight: 600; text-transform: uppercase;">BTC Price</span>
                        <span style="color: white; font-weight: 700;">$64,230.15</span>
                    </div>
                    <span style="color: #4ade80; font-size: 12px; font-weight: 600;">+5.2%</span>
                 </div>
            </header>

            <!-- Functional UI Container -->
            <div class="stitch-bitcoin-functional-ui" id="stitch-bitcoin-functional-ui-root">
                <!-- Extension logic will be injected here -->
            </div>
        </div>
    </div>
  `;


  var OPENCLAW_CSS = `
    /* Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700;900&display=swap');

    /* Variables (Scoped) */
    [data-x-unfollower-panel][data-theme="openclaw"] {
      --oc-primary: #ff2929;
      --oc-bg-dark: #070B10;
      --oc-abyss: #0F1A25;
      --oc-text: #f8f5f5;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-modal-wrap { 
      backdrop-filter: blur(8px);
      background: rgba(0, 0, 0, 0.9) !important; 
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-modal-content {
      background: var(--oc-bg-dark) !important;
      border: 1px solid rgba(255, 41, 41, 0.2) !important;
      border-radius: 4px !important;
      font-family: 'Space Grotesk', sans-serif !important;
      color: var(--oc-text) !important;
      box-shadow: 0 0 40px rgba(255, 41, 41, 0.1) !important;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L40 40 M60 20 L30 50 M80 10 L50 40' stroke='%23ff2929' stroke-width='0.5' stroke-opacity='0.05' fill='none'/%3E%3C/svg%3E") !important;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-modal-header {
      background: rgba(15, 26, 37, 0.9) !important;
      border-bottom: 1px solid rgba(255, 41, 41, 0.1) !important;
      padding: 20px 24px !important;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-modal-title {
      color: #ffffff !important;
      font-family: 'Space Grotesk', sans-serif !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-modal-body {
      background: transparent !important;
      padding: 0 !important;
      position: relative !important;
    }

    /* Stitch OpenClaw Layout Styles */
    .stitch-openclaw-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 600px;
      position: relative;
      overflow: hidden;
    }

    .stitch-openclaw-background {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: linear-gradient(to bottom, rgba(15, 26, 37, 0.3), #070B10);
    }
    
    .stitch-openclaw-glow {
        position: absolute;
        top: -10%;
        right: -10%;
        width: 60%;
        height: 60%;
        background: radial-gradient(circle, rgba(255,41,41,0.1) 0%, transparent 70%);
        filter: blur(60px);
        z-index: 0;
    }

    .stitch-openclaw-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 24px;
      position: relative;
      z-index: 10;
      overflow-y: auto;
    }

    /* Functional UI Wrapper within OpenClaw Theme */
    .stitch-openclaw-functional-ui {
      background: rgba(15, 26, 37, 0.6) !important;
      border: 1px solid rgba(255, 41, 41, 0.15) !important;
      border-radius: 4px !important;
      padding: 24px !important;
      backdrop-filter: blur(10px);
      margin-top: 24px;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }

    /* Typography Overrides */
    [data-x-unfollower-panel][data-theme="openclaw"] h1,
    [data-x-unfollower-panel][data-theme="openclaw"] h2,
    [data-x-unfollower-panel][data-theme="openclaw"] h3 {
      color: #fff !important;
      font-family: 'Space Grotesk', sans-serif !important;
      text-transform: uppercase !important;
    }
    
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-typography {
        color: #94a3b8 !important;
        font-family: 'Space Grotesk', sans-serif !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-typography strong {
        color: var(--oc-primary) !important;
    }

    /* Input Fields */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-input,
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-select-selector {
      background: rgba(7, 11, 16, 0.8) !important;
      border: 1px solid rgba(255, 41, 41, 0.3) !important;
      border-radius: 2px !important;
      color: #fff !important;
      font-family: 'Space Grotesk', sans-serif !important;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-input:focus,
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-select-selector:focus {
      border-color: var(--oc-primary) !important;
      box-shadow: 0 0 15px rgba(255, 41, 41, 0.2) !important;
    }

    /* Buttons */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-btn-primary {
      background: linear-gradient(135deg, #ff2929, #990a0a) !important;
      border: none !important;
      border-radius: 2px !important;
      color: #fff !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      box-shadow: 0 0 10px rgba(255, 41, 41, 0.3) !important;
      transition: all 0.3s ease !important;
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-btn-primary:hover {
      box-shadow: 0 0 20px rgba(255, 41, 41, 0.6) !important;
      transform: translateY(-1px);
    }

    [data-x-unfollower-panel][data-theme="openclaw"] .ant-btn-default {
        border-color: rgba(255, 41, 41, 0.3) !important;
        background: transparent !important;
        color: #cbd5e1 !important;
        border-radius: 2px !important;
        font-family: 'Space Grotesk', sans-serif !important;
        text-transform: uppercase !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-btn-default:hover {
        border-color: var(--oc-primary) !important;
        color: var(--oc-primary) !important;
        box-shadow: 0 0 10px rgba(255, 41, 41, 0.2) !important;
    }

    /* Cards */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-card {
      background: rgba(15, 26, 37, 0.7) !important;
      border: 1px solid rgba(255, 41, 41, 0.1) !important;
      border-radius: 4px !important;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.5) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-card-head {
      border-bottom: 1px solid rgba(255, 41, 41, 0.1) !important;
      color: #fff !important;
    }

    /* Switches */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-switch {
      background: rgba(255, 41, 41, 0.2) !important;
      border: 1px solid rgba(255, 41, 41, 0.3) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-switch-checked {
      background: var(--oc-primary) !important;
      box-shadow: 0 0 10px rgba(255, 41, 41, 0.5) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-switch-handle::before {
      background-color: #fff !important;
    }

    /* Sliders */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-track {
      background-color: var(--oc-primary) !important;
      box-shadow: 0 0 10px rgba(255, 41, 41, 0.5) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-handle {
      border-color: var(--oc-primary) !important;
      background-color: #070B10 !important;
      box-shadow: 0 0 10px rgba(255, 41, 41, 0.8) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-rail {
      background-color: rgba(255, 41, 41, 0.1) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-dot {
      border-color: rgba(255, 41, 41, 0.3) !important;
      background-color: #070B10 !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-dot-active {
      border-color: var(--oc-primary) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-mark-text {
      color: #94a3b8 !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-slider-mark-text-active {
      color: var(--oc-primary) !important;
    }

    /* List Items */
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-list-item {
        background: rgba(15, 26, 37, 0.4) !important;
        border-bottom: 1px solid rgba(255, 41, 41, 0.1) !important;
        margin-bottom: 4px !important;
        padding: 12px 16px !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-list-item:hover {
        background: rgba(255, 41, 41, 0.05) !important;
        border-color: rgba(255, 41, 41, 0.3) !important;
    }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-list-item-meta-title { color: #fff !important; font-family: 'Space Grotesk', sans-serif !important; }
    [data-x-unfollower-panel][data-theme="openclaw"] .ant-list-item-meta-description { color: #94a3b8 !important; }
    
    /* Custom Scrollbar */
    [data-x-unfollower-panel][data-theme="openclaw"] ::-webkit-scrollbar-thumb {
        background: #333 !important;
        border: 1px solid #ff2929 !important;
    }
  `;

  var STITCH_OPENCLAW_HTML = `
    <div class="stitch-openclaw-container">
        <div class="stitch-openclaw-background"></div>
        <div class="stitch-openclaw-glow"></div>
        
        <div class="stitch-openclaw-main">
            <!-- Header -->
            <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="color: #ff2929;">
                        <!-- Simple icon representation -->
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 style="color: white; font-weight: 700; font-size: 20px; text-transform: uppercase; letter-spacing: 2px; margin: 0; text-shadow: 0 0 10px rgba(255,41,41,0.5);">OpenClaw</h2>
                        <div style="display: flex; gap: 8px; align-items: center;">
                             <span style="width: 6px; height: 6px; background: #ff2929; border-radius: 50%; box-shadow: 0 0 5px #ff2929;"></span>
                             <span style="color: #ff2929; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">System Online</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Functional UI Container -->
            <div class="stitch-openclaw-functional-ui" id="stitch-openclaw-functional-ui-root">
                <!-- Extension logic will be injected here -->
            </div>
            
            <!-- Footer overlay decorative -->
            <div style="margin-top: auto; padding-top: 20px; display: flex; justify-content: space-between; opacity: 0.3; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
                <span>Deep Water Protocol</span>
                <span>V.4.9.0</span>
            </div>
        </div>
    </div>
  `;


  var THEME_BTNS = {
    transformers: { label: '🤖 Transformers', color: '#00b4d8' },
    bitcoin: { label: '₿ Bitcoin', color: '#f7931a' },
    openclaw: { label: '🦞 OpenClaw', color: '#dc2626' }
  };

  function getTheme(cb) {
    try {
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(STORAGE_KEY, function (r) {
          cb(r && r[STORAGE_KEY] ? r[STORAGE_KEY] : DEFAULT_THEME);
        });
        return;
      }
    } catch (e) { }
    cb(DEFAULT_THEME);
  }

  function setTheme(theme, cb) {
    try {
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ [STORAGE_KEY]: theme }, cb || function () { });
        return;
      }
    } catch (e) { }
    if (cb) cb();
  }

  function addThemePicker(modal, currentTheme) {
    if (modal.querySelector('.x-theme-picker')) return;
    var header = modal.querySelector('.ant-modal-header');
    if (!header) return;
    var picker = document.createElement('div');
    picker.className = 'x-theme-picker';
    ['transformers', 'bitcoin', 'openclaw'].forEach(function (key) {
      var btn = document.createElement('button');
      btn.className = 'x-theme-btn' + (key === currentTheme ? ' active' : '');
      btn.type = 'button';
      btn.textContent = THEME_BTNS[key].label;
      btn.style.color = THEME_BTNS[key].color;
      btn.style.borderColor = THEME_BTNS[key].color;
      btn.onclick = function () {
        setTheme(key, function () {
          var wrap = modal.closest('.ant-modal-wrap');
          wrap.setAttribute('data-theme', key);
          modal.setAttribute('data-theme', key);
          picker.querySelectorAll('.x-theme-btn').forEach(function (b, i) {
            b.classList.toggle('active', ['transformers', 'bitcoin', 'openclaw'][i] === key);
          });
        });
      };
      picker.appendChild(btn);
    });
    header.appendChild(picker);
  }

  function addRefreshButton(modal) {
    if (modal.querySelector('.x-refresh-btn')) return;
    var header = modal.querySelector('.ant-modal-header');
    if (!header) return;
    var btn = document.createElement('button');
    btn.className = 'x-refresh-btn';
    btn.type = 'button';
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg> Refresh';
    btn.onclick = function () { window.location.reload(); };
    header.appendChild(btn);
  }

  function removeBadges(panel) {
    panel.querySelectorAll('.bot-badge, .insights-card').forEach(function (el) { el.remove(); });
  }

  function enhancePanel() {
    var modals = document.querySelectorAll('.ant-modal');
    modals.forEach(function (modal) {
      var titleEl = modal.querySelector('.ant-modal-title');
      var titleText = (titleEl || {}).textContent || '';
      if (titleText.indexOf('Unfollower') === -1 && titleText.indexOf('crypto_apha') === -1 && titleText.indexOf('Superextensions') === -1) return;

      // --- Rebranding ---
      if (titleEl && !titleEl.getAttribute('data-rebranded')) {
        titleEl.innerHTML = 'Open X Follower by <a href="https://x.com/crypto_apha" target="_blank" style="color: inherit; text-decoration: underline;">@crypto_apha</a>';
        titleEl.setAttribute('data-rebranded', 'true');
      }

      var wrap = modal.closest('.ant-modal-wrap');

      // Initialize only once per modal
      if (modal.getAttribute('data-x-unfollower-panel') !== '1') {
        modal.setAttribute('data-x-unfollower-panel', '1');
        modal.setAttribute('data-theme', DEFAULT_THEME);
        if (wrap) wrap.setAttribute('data-x-unfollower-panel', '1');
        if (wrap) wrap.setAttribute('data-theme', DEFAULT_THEME);
      }

      getTheme(function (theme) {
        // Theme Attribute Update
        if (modal.getAttribute('data-theme') !== theme) {
          modal.setAttribute('data-theme', theme);
          if (wrap) wrap.setAttribute('data-theme', theme);
        }

        var body = modal.querySelector('.ant-modal-body');
        if (!body) return;

        // Helper to get functional UI regardless of current state
        function getFunctionalUI() {
          var existingRoot = body.querySelector('#stitch-functional-ui-root') ||
            body.querySelector('#stitch-bitcoin-functional-ui-root') ||
            body.querySelector('#stitch-openclaw-functional-ui-root');
          var fragment = document.createDocumentFragment();
          var source = existingRoot || body;
          while (source.firstChild) {
            fragment.appendChild(source.firstChild);
          }
          // If we took from a root, we need to clear the body to remove the old shell
          if (existingRoot) {
            body.innerHTML = '';
          }
          return fragment;
        }

        // Logic for Stitch HTML Injection
        if (theme === 'transformers') {
          if (!body.querySelector('.stitch-transformers-container')) {
            var ui = getFunctionalUI();
            body.innerHTML = STITCH_HERO_HTML;
            var placeholder = body.querySelector('#stitch-functional-ui-root');
            if (placeholder) placeholder.appendChild(ui);
          }
        } else if (theme === 'bitcoin') {
          if (!body.querySelector('.stitch-bitcoin-container')) {
            var ui = getFunctionalUI();
            body.innerHTML = STITCH_BITCOIN_HTML;
            var placeholder = body.querySelector('#stitch-bitcoin-functional-ui-root');
            if (placeholder) placeholder.appendChild(ui);
          }
        } else if (theme === 'openclaw') {
          if (!body.querySelector('.stitch-openclaw-container')) {
            var ui = getFunctionalUI();
            body.innerHTML = STITCH_OPENCLAW_HTML;
            var placeholder = body.querySelector('#stitch-openclaw-functional-ui-root');
            if (placeholder) placeholder.appendChild(ui);
          }
        } else {
          // Unwrap if wrapped
          var existingRoot = body.querySelector('#stitch-functional-ui-root') ||
            body.querySelector('#stitch-bitcoin-functional-ui-root') ||
            body.querySelector('#stitch-openclaw-functional-ui-root');
          if (existingRoot) {
            var ui = getFunctionalUI();
            body.innerHTML = '';
            body.appendChild(ui);
          }
        }

        addThemePicker(modal, theme);
      });
      addRefreshButton(modal);
      removeBadges(modal);
    });
  }

  function injectStyles() {
    if (document.getElementById('x-unfollower-enhance-css')) return;
    var style = document.createElement('style');
    style.id = 'x-unfollower-enhance-css';
    style.textContent = BASE_CSS + TRANSFORMERS_CSS + BITCOIN_CSS + OPENCLAW_CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function run() {
    try {
      injectStyles();
      enhancePanel();
    } catch (e) { }
  }

  if (typeof document !== 'undefined' && !window.frameElement) {
    injectStyles();

    // Initial run
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }

    // Use MutationObserver for ultra-smooth, lightweight updates
    // instead of a heavy setInterval loop
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          // Only trigger if a modal might have been added
          var hasNewNodes = Array.from(mutations[i].addedNodes).some(function (node) {
            return node.nodeType === 1 && (
              node.classList.contains('ant-modal-root') ||
              node.classList.contains('ant-modal-wrap') ||
              node.querySelector('.ant-modal')
            );
          });
          if (hasNewNodes) {
            setTimeout(run, 50); // slight debounce
            break;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
