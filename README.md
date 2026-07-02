# Junagadh IoT Dashboard

Real-time IoT monitoring dashboard for **Junagadh Municipal Corporation** water infrastructure.

## 📋 Overview

Live dashboard for monitoring **40 IoT devices** (pumps + flow meters) deployed across Junagadh city.
Data sourced from ThingsBoard platform at [iot.ariontechsol.com](https://iot.ariontechsol.com).

## 🗂️ Project Structure

`
junagadh-website/
├── index.html    ← Main HTML structure & layout
├── style.css     ← Dark/light theme, animations, responsive CSS
├── app.js        ← All device data (40 devices) + dashboard logic
└── .gitignore
`

## 🚀 Features

- **40 Devices** monitored: 30 Pumps + 10 Flow Meters
- Dark/Light theme toggle (persisted)
- Real-time stat cards (online/offline, power, energy)
- Donut chart — device status breakdown
- Bar/Line chart — pump power & voltage
- Flow meter chart — flow rate & total
- Device cards with live telemetry metrics
- Click-to-open detail modal (all telemetry keys)
- Search, filter by status / type / location
- Sort by name / status / location / power
- Grid & list view
- Live clock, last-sync timestamp, refresh button
- Fully responsive (mobile → desktop)

## 🏗️ Tech Stack

- **HTML5** — semantic structure, ARIA accessibility
- **CSS3** — CSS variables, glassmorphism, animations
- **Vanilla JS** — all logic, Chart.js for visualizations
- **Chart.js 4.4.3** — doughnut, bar, line charts

## 📍 Device Locations

| Location | Devices |
|----------|---------|
| Anandpur | 8 |
| Sardarbag | 6 |
| Padariya | 5 |
| Dolatpara | 3 |
| Dharmaveda / Dharamaveda | 4 |
| Adityanagar | 4 |
| Saragvada | 4 |
| Khamdhrol | 2 |
| Timbavadi | 4 |
| Gopalwadi | 1 |
| Varun Pumping | 1 |

## 🔄 Version History

See git log for full history.

## 📄 License

© 2026 Junagadh Municipal Corporation. All rights reserved.
