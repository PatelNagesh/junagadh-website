# JUMC IoT Dashboard — Alerts + Map View Plan

## Coordinates Extracted from Notebook

| # | Site Name (Notebook) | Device Location | Lat | Lng |
|---|---------------------|----------------|-----|-----|
| 1 | Anandpur Dam | Anandpur | 21.400861 | 70.525267 |
| 3 | Padariya Filter Plant | Padariya | 21.470936 | 70.472886 |
| 5 | Sardar Baug | Sardarbag | 21.520165 | 70.448609 |
| 6 | Zanzarda Dam | Gopalwadi | 21.526732 | 70.430344 |
| 8 | Timbavadi | Timbavadi | 21.504558 | 70.433469 |
| 9 | Saragalwadi | Saragvada | 21.534045 | 70.448781 |
| 10 | Aditye | Adityanagar | 21.539650 | 70.451628 |
| 11 | Varun Pumping | Varun Pumping | 21.520821 | 70.458138 |
| 12 | Dharam Aveda | Dharmaveda / Dharamaveda | 21.499883 | 70.457179 |
| 15 | Khamdhral | Khamdhrol | 21.550980 | 70.453419 |
| 18 | Dolatpara | Dolatpara | 21.551478 | 70.470424 |

> [!NOTE]
> Sites 2 (Uper Kat), 4 (Diwan Office), 13 (Janki Value), 14 (Dharlagadh), 16 (Saragevada #2), 17 (Salealpur), 19 (Chasweeda), 20 (Pancheswars) — no coordinates given or no matching devices.
> All 11 device locations in DEVICES_DATA are covered ✅

---

## Feature 1 — 🔔 Alerts & Browser Notifications

### How it works
- Before each 10-min refresh, snapshot all device states
- After refresh, compare old vs new state for every device
- On state change → fire browser notification + log it in-app

### State change events that trigger alerts:
| Change | Severity | Example notification |
|--------|----------|---------------------|
| standby → running | 🟢 Info | "⚡ Anandpur-Pump-3 started running" |
| running → standby | 🟡 Warning | "✅ Anandpur-Pump-3 stopped – now standby" |
| any → offline | 🔴 Critical | "📴 Sardarbag-Pump-1 went OFFLINE!" |
| offline → online | 🟢 Info | "✅ Khamdhrol-Pump-1 back online" |
| no-data → any | 🟢 Info | "🔌 Timbavadi-Pump-1 now sending data" |

### UI components added:
- **Bell icon** 🔔 in header with red badge showing unread count
- **Alert panel** (slide-in from right) showing last 50 alerts with timestamps
- Browser native notification (requests permission on first use)
- Alert stored in `localStorage` (persists across page reloads)

---

## Feature 2 — 📍 Location Map View

### How it works
- New 3rd view toggle: Grid | List | **Map**
- Uses **Leaflet.js + OpenStreetMap** (completely free, no API key)
- One coloured marker cluster per location (11 total)
- Marker colour reflects the **worst** device state at that location:
  - 🔴 Red = any device offline
  - 🟡 Amber = any device not-configured  
  - 🟢 Green = all standby/running
  - 🟣 Purple = has a running pump
- Click a marker → popup shows all devices at that location with state badges
- Click a device in popup → opens the device detail modal

---

## Proposed Changes

### [MODIFY] index.html
- Add Leaflet.js CDN (CSS + JS)
- Add bell icon 🔔 + badge in header  
- Add alert panel HTML (slide-in drawer)
- Add map view button in toolbar
- Add `#map-container` div

### [MODIFY] style.css
- Alert panel styles (slide-in drawer, alert items, severity colours)
- Notification badge on bell icon
- Map container (full height)
- Custom Leaflet marker overrides

### [MODIFY] app.js (new sections added)
- **SECTION 0** · `LOCATION_COORDS` map — lat/lng for all 11 sites
- **SECTION 13** · Alert Engine — `snapshotStates()`, `detectChanges()`, `showAlert()`, `renderAlertPanel()`
- **SECTION 14** · Map View — `initMap()`, `renderMap()`, `buildMarker()`, `buildPopup(device)`
- Update `refreshData()` to call alert detection after merge
- Update `bindEvents()` for bell icon, alert panel, map view button
- Update `renderDevices()` to show/hide map vs grid/list

---

## Verification Plan
- Open dashboard → bell icon visible in header
- Trigger a refresh → if any state changed, notification fires + badge increments  
- Click bell → alert panel slides in with history
- Click Map button → Junagadh map renders with 11 coloured location markers
- Click a marker → popup shows devices at that location
- Click device in popup → device modal opens with full telemetry
