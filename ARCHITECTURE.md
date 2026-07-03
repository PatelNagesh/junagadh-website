# 💧 JUMC IoT Dashboard — Architecture & Structure

This document outlines the architecture, file structure, and technical design of the Junagadh Municipal Corporation (JUMC) Water Infrastructure IoT Dashboard.

---

## 📂 1. File Structure

```text
junagadh-website/
├── index.html            # Main HTML layout, modals, and templates
├── style.css             # Vanilla CSS (Vars, components, responsive, @media print)
├── app.js                # Core JavaScript logic (Modular, 17 sections)
├── config.js             # ⚠️ Gitignored: Contains ThingsBoard API credentials
├── config.example.js     # Template showing config structure for developers
├── README.md             # Project overview
├── ARCHITECTURE.md       # This documentation file
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Actions workflow for Pages deployment
```

---

## 🏗️ 2. Core Technologies

- **Frontend Core:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **No Build Step:** Runs directly in the browser. No Webpack, React, or Node.js required.
- **Mapping:** [Leaflet.js](https://leafletjs.com/) (loaded via CDN)
- **Charts:** [Chart.js](https://www.chartjs.org/) (loaded via CDN)
- **Data Source:** [ThingsBoard Community Edition](https://thingsboard.io/) (via REST API & WebSockets)
- **Hosting:** GitHub Pages (Static hosting)

---

## 🧩 3. Application Architecture (`app.js`)

The `app.js` file is heavily documented and split into **17 logical sections** to emulate a component-based framework without the overhead of a bundler.

### ⚙️ Core Configuration & Data
- **Section 1 · CONFIG & CONSTANTS:** Merges credentials from `config.js` or `localStorage`. Defines the API URL and telemetry keys.
- **Section 2 · SEED DEVICE DATA:** A hardcoded array of 40 fallback devices (`DEVICES_DATA`). Ensures the UI renders even if the API fails, serving as the source of truth for device names, types, and locations.
- **Section 3 · STATE MANAGEMENT:** The global `state` object tracks the active view (grid/list/map), search queries, filter states, and active timers. `getStats()` calculates global totals.

### 🎨 UI Components & Rendering
- **Section 4 · UTILITY FUNCTIONS:** Number formatting (`fmtNum`), date parsers (`timeSince`), and inline SVG icons.
- **Section 5 · DEVICE STATE CLASSIFIER:** `getDeviceState(device)` evaluates telemetry and active status to return one of four strict states: `running`, `standby`, `offline`, or `no-data`.
- **Section 6 · COMPONENT FUNCTIONS:** Pure functions that take a device object and return HTML template literals (e.g., `buildDeviceCard()`, `buildListRow()`).
- **Section 7 · CHART RENDERERS:** Functions to initialize and update Chart.js instances (Donut charts, Power trends).
- **Section 8 · RENDER ENGINE:** The main update loops (`renderStats()`, `renderDevices()`). Re-renders the DOM efficiently based on the current state and `DEVICES_DATA`.

### 🔌 API & Connectivity
- **Section 9 · API & DATA LAYER:** REST calls to ThingsBoard. `fetchThingsBoardData()` gets telemetry, whilst a secondary call fetches server-scope attributes (like the critical `active` status). Updates merge directly into `DEVICES_DATA`.
- **Section 10 · AUTO-REFRESH ENGINE:** A fallback 10-minute polling loop using `setInterval`, displaying a countdown in the UI.

### 🎛️ Lifecycle & Events
- **Section 11 · EVENT HANDLERS:** A single `bindEvents()` function attaching all DOM listeners (View toggles, search, filters, modals).
- **Section 12 · APP INIT:** `DOMContentLoaded` bootstrap. Checks credentials, loads data, and boots the real-time WebSocket engine.

### 🚀 Advanced Features
- **Section 13 · ALERTS & NOTIFICATIONS:** A state-transition engine. If a device moves from `running` → `offline`, it pushes an alert to an array, updates the UI bell badge, and triggers a browser Toast notification.
- **Section 14 · LOCATION MAP VIEW:** Leaflet integration. Translates device states into coloured map markers grouped by hardcoded locations (`LOCATION_COORDS`).
- **Section 15 · PDF / PRINT REPORT ENGINE:** Generates a hidden HTML table containing summary stats and anomalies. Triggers `window.print()` leveraging `@media print` in `style.css` to format a clean A4 report.
- **Section 16 · CREDENTIALS & SETUP ENGINE:** Enables GitHub Pages usage. Intercepts first-time visitors to ask for ThingsBoard credentials, tests them via API, and saves them (Base64) to `localStorage`.
- **Section 17 · REAL-TIME WEBSOCKET ENGINE:** Subscribes to ThingsBoard WebSocket API (`wss://`). Listens for instant telemetry changes across all 40 devices, updates the dataset in memory, and triggers debounced UI re-renders. Features exponential back-off reconnection and polling fallback.

---

## 🔒 4. Security & Deployment

### Local Development vs GitHub Pages
Because the site is a static frontend communicating directly with a secured API, credentials must be handled carefully.

1. **Local Development:** Uses `config.js` (ignored by Git). Developers copy `config.example.js` and enter credentials.
2. **GitHub Pages (Production):** GitHub Pages only serves static files, so `config.js` is deliberately missing. 
   - When the app boots, **Section 16** checks `localStorage`. 
   - If empty, it renders a **Setup Modal**.
   - The user inputs credentials, which are saved locally in their browser.
   - **No credentials are ever committed to the repository or sent anywhere except directly to the JUMC ThingsBoard server.**

---

## 🔄 5. Data Flow Lifecycle

1. **Boot:** App loads `DEVICES_DATA` seed (40 devices with `null` telemetry). UI renders in a loading/offline state.
2. **Connect:** App attempts WebSocket connection (Section 17). 
3. **Stream:** ThingsBoard pushes JSON payloads via WebSocket.
4. **Merge:** `onWsMessage` parses JSON, updates the specific object inside `DEVICES_DATA`, and triggers a debounced `render()`.
5. **Evaluate:** `renderStats()` runs, calling `getDeviceState()` on every device. If a state has changed (e.g. Voltage dropped to 0), the Alert Engine (Section 13) catches it and pushes a notification.
6. **Update:** The Grid, List, or Map view replaces its innerHTML with the fresh data.
