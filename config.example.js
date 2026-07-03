// =============================================================================
// config.example.js  –  EXAMPLE / TEMPLATE ONLY
// =============================================================================
// This file documents the structure of config.js (which is gitignored).
//
// For LOCAL development:
//   1. Copy this file → config.js
//   2. Fill in your ThingsBoard credentials below
//   3. config.js is loaded in <head> BEFORE app.js, providing APP_CONFIG
//
// For GITHUB PAGES:
//   config.js is NOT deployed. Instead, enter credentials via the
//   Setup Modal that appears on first visit. They're saved to localStorage.
//
// SECURITY: config.js is in .gitignore and must NEVER be committed.
// =============================================================================

var APP_CONFIG = {
  // ThingsBoard server base URL (no trailing slash)
  apiBase: 'https://iot.ariontechsol.com',

  // ThingsBoard login credentials
  username: 'your-email@example.com',
  password: 'your-password',

  // Auto-refresh poll interval (milliseconds). Default: 10 minutes.
  // When WebSocket is active, this is reduced to 30 minutes (safety net only).
  pollIntervalMs: 10 * 60 * 1000,

  // Max devices to fetch per page
  pageSize: 100,
};
