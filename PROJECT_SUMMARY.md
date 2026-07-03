# JUMC IoT Dashboard - Project & Task Summary

This document briefly outlines the recent feature implementations and fixes that were completed to enhance the dashboard's functionality, performance, and user experience.

1. **Task 4 (Live Data):** Implemented a real-time WebSocket connection to the ThingsBoard server to stream device telemetry instantly.
2. **Task 5 (GitHub Pages):** Configured a GitHub Actions workflow (`deploy.yml`) to automatically build and host the site on GitHub Pages. Added a secure fallback `setup-modal` so users can enter credentials securely since `config.js` is ignored.
3. **Task 6 (PDF Reports):** Added a "Print Report" button that uses `@media print` CSS rules to format the dashboard into a clean, printable PDF summarizing device states and anomalies.
4. **Task 7 (Anomaly Flags):** Added warning banners (`.card-anomaly-banner`) to device cards if they have a low power factor, voltage deviation, or are offline. These tags were designed to fit neatly inside the card headers.
5. **Task 9 (Location Groups):** Introduced a new "Grouped" view in the toolbar. The JavaScript engine sorts and groups the devices by their `location` property, placing them under distinct headers.
6. **UI Refresh Optimization:** Decoupled the live WebSocket data stream from the DOM rendering engine. Data now arrives instantly in the background, but the UI is throttled to update smoothly only once every 10 minutes (or via manual refresh) to prevent annoying screen flickering.
7. **Bug Fixes:** Resolved syntax duplication in `app.js` and fixed the blurry screen issue by hiding the `setup-overlay` by default.

*All these changes have been merged into the `master` branch and deployed successfully to the live GitHub Pages site.*
