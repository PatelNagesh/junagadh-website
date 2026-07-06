// =============================================================================
// config.js — JUMC IoT Dashboard  |  API Credentials & Settings
// =============================================================================
// ⚠️  THIS FILE IS LISTED IN .gitignore AND IS NEVER COMMITTED TO GIT.
//     It contains sensitive login credentials for the ThingsBoard platform.
//     Do NOT share or upload this file.
// =============================================================================

/**
 * APP_CONFIG
 * @description Injected into CONFIG (Section 1 of app.js) before app boots.
 *              Override any default from app.js here.
 */
const APP_CONFIG = {
  // ThingsBoard API base URL
  apiBase: 'https://iot.ariontechsol.com',
 
  // ThingsBoard login credentials
  username: 'jumc@ariontechsol.com',
  password: 'Junag@dh123',

  // Auto-refresh interval (milliseconds) — 10 minutes
  pollIntervalMs: 10 * 60 * 1000
};
