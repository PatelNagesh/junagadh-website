// =============================================================================
// JUMC IOT DASHBOARD  |  app.js
// Junagadh Municipal Corporation – Water Infrastructure Monitoring
// Version : 2.0.0
// Author  : Nagesh Patel
// Contact : 29072003nagesh@gmail.com
// Updated : 2026-07-03
// =============================================================================
// ARCHITECTURE (12 Sections)
//   1  CONFIG & CONSTANTS       – API URL, poll interval, defaults
//   2  SEED DEVICE DATA         – 40-device fallback / initial dataset
//   3  STATE MANAGEMENT         – App state object + helpers
//   4  UTILITY FUNCTIONS        – Formatters, helpers, SVG icons
//   5  DEVICE STATE CLASSIFIER  – getDeviceState(), STATE_LABEL, STATE_ICON
//   6  COMPONENT FUNCTIONS      – Reusable UI builders (DeviceCard, etc.)
//   7  CHART RENDERERS          – Donut, power, flow charts (Chart.js)
//   8  RENDER ENGINE            – renderStats(), renderDevices()
//   9  API & DATA LAYER         – ThingsBoard REST helpers
//  10  AUTO-REFRESH ENGINE      – 10-min polling, countdown, toast
//  11  EVENT HANDLERS           – bindEvents() – all DOM listeners
//  12  APP INIT                 – DOMContentLoaded bootstrap
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 · CONFIG & CONSTANTS
// Purpose : Central configuration for the dashboard.
//           Credentials live in config.js (gitignored).
//           APP_CONFIG is injected by config.js before this file loads.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Object} CONFIG - merged from config.js + safe defaults */
const CONFIG = Object.assign({
  apiBase        : 'https://iot.ariontechsol.com',
  username       : '',
  password       : '',
  pollIntervalMs : 10 * 60 * 1000,   // 10 minutes
  pageSize       : 100,
  telemetryKeys  : [
    'chip_id','device_id','datetime',
    'data_current_r','data_current_y','data_current_b',
    'data_voltage_r_n','data_voltage_y_n','data_voltage_b_n',
    'data_voltage_r_y','data_voltage_y_b','data_voltage_b_r',
    'data_kw','data_kva','data_kvarh','data_kwh','data_kvah',
    'data_pf','data_pf_r','data_pf_y','data_pf_b',
    'data_frequency','running_time_min','total_running_hours','start_stop_count',
    'data_flow_rate','data_flow_total','data_flow_unit','flow_rate','flow_total',
    'data_flow_decimal_point','data_flow_kilo_flag','data_flow_empty_pipe',
    'data_flow_over_range','data_flow_total_decimal_point'
  ]
}, (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : {}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 · SEED DEVICE DATA (Fallback / Initial Dataset)
// Purpose : Hardcoded snapshot (synced 2026-07-02 21:03 IST).
//           Used as the initial render before the first API fetch.
//           Updated in-memory each time the auto-refresh succeeds.
//           Never written back to disk.
// ─────────────────────────────────────────────────────────────────────────────

const DEVICES_DATA = [
  {id:"0599ab60-760f-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-2",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783054210463,createdTime:1782994231574,telemetry:{chip_id:"686F9DF9D108",device_id:"PADARIYAFT-PUMP-2",datetime:"2026-07-02 21:03:10",data_current_r:1.9393,data_current_y:1.8583,data_current_b:2.0529,data_voltage_r_n:247.33,data_voltage_y_n:247.42,data_voltage_b_n:246.35,data_voltage_r_y:428.4661,data_voltage_y_b:427.6177,data_voltage_b_r:427.5397,data_kw:-1.1496,data_kva:1.4605,data_kvarh:1.831,data_kwh:2.403,data_kvah:3.031,data_pf:-0.7871,data_pf_r:-0.825,data_pf_y:-0.772,data_pf_b:-0.782,data_frequency:49.83,running_time_min:20.3,total_running_hours:-1485833.39,start_stop_count:4}},
  {id:"07afffd0-7470-11f1-b06d-0f068c9b61d7",name:"Dharamaveda-Flow-1",type:"Flow-Meter",location:"Dharamaveda",active:true,lastActivityTime:1783054198205,createdTime:1782815993933,telemetry:{}},
  {id:"0ddf82e0-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-4",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783054211493,createdTime:1782820299278,telemetry:{chip_id:"C0C90FB3A3A0",device_id:"Sardarbag-OLD-PUMP-4",datetime:"2026-07-02 21:03:37",data_current_r:327.675,data_current_y:327.675,data_current_b:327.675,data_voltage_r_n:655.35,data_voltage_y_n:655.35,data_voltage_b_n:655.35,data_voltage_r_y:1.1351,data_voltage_y_b:1.1351,data_voltage_b_r:1.1351,data_kw:0,data_kva:0,data_kvarh:52427768.644,data_kwh:52462648.646,data_kvah:25679496.976,data_pf:1,data_pf_r:-0.001,data_pf_y:-0.001,data_pf_b:-0.001,data_frequency:655.35,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"30851eb0-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-1",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828088347,telemetry:{}},
  {id:"33316280-7456-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Flow-1",type:"Flow-Meter",location:"Anandpur",active:true,lastActivityTime:1783054189130,createdTime:1782804900008,telemetry:{chip_id:"000A9DF9D108",device_id:"Anandpur-New-Flow-1",datetime:"2026-07-02 21:03:32",data_flow_rate:0,data_flow_total:0,data_flow_unit:0,data_flow_decimal_point:0,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:0}},
  {id:"378ba800-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-1",type:"Pump",location:"Dharmaveda",active:true,lastActivityTime:1783054200469,createdTime:1782815215232,telemetry:{chip_id:"581DDBF9D108",device_id:"Dharmaveda-PUMP-1",datetime:"2026-07-02 21:03:34",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:238.43,data_voltage_y_n:231.73,data_voltage_b_n:237.81,data_voltage_r_y:407.1843,data_voltage_y_b:406.645,data_voltage_b_r:412.436,data_kw:0,data_kva:0,data_kvarh:1292.342,data_kwh:2400.183,data_kvah:2737.141,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-495264.99,start_stop_count:3}},
  {id:"44dfd800-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-2",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828122496,telemetry:{}},
  {id:"4ebc4b30-744e-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-1",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783054200861,createdTime:1782801510243,telemetry:{chip_id:"5806DBF9D108",device_id:"ANANDPUR-PUMP-1",datetime:"2026-07-02 21:03:09",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:248.75,data_voltage_y_n:248.67,data_voltage_b_n:247.14,data_voltage_r_y:430.7783,data_voltage_y_b:429.3847,data_voltage_b_r:429.4541,data_kw:0,data_kva:0,data_kvarh:275492.391,data_kwh:1115837.587,data_kvah:1238068.198,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-1485751.25,start_stop_count:4}},
  {id:"4ed89480-7448-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-3",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783054198745,createdTime:1782798933448,telemetry:{chip_id:"2C9D0EB3A3A0",device_id:"ANANDPUR-PUMP-3",datetime:"2026-07-02 21:03:37",data_current_r:160.56,data_current_y:153.728,data_current_b:0,data_voltage_r_n:248.78,data_voltage_y_n:248.88,data_voltage_b_n:247.21,data_voltage_r_y:430.9862,data_voltage_y_b:429.6274,data_voltage_b_r:429.5407,data_kw:77.8995,data_kva:78.2516,data_kvarh:443371.999,data_kwh:365673.106,data_kvah:632459.196,data_pf:0.9955,data_pf_r:0.994,data_pf_y:0.996,data_pf_b:1,data_frequency:49.82,running_time_min:20.4,total_running_hours:-2971561.69,start_stop_count:8}},
  {id:"59145100-7452-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Pump-1",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783054198236,createdTime:1782803245584,telemetry:{chip_id:"1CE59CF9D108",device_id:"Anandpur-NEW-Pump-1",datetime:"2026-07-02 21:03:35",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:250.57,data_voltage_y_n:250.82,data_voltage_b_n:253.32,data_voltage_r_y:434.2165,data_voltage_y_b:436.5998,data_voltage_b_r:436.3837,data_kw:0,data_kva:0,data_kvarh:328611.323,data_kwh:621367.737,data_kvah:705130.217,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-495262.57,start_stop_count:2}},
  {id:"5b98cca0-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-3",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828160618,telemetry:{}},
  {id:"62a41a70-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-FLOW-1",type:"Flow-Meter",location:"Sardarbag",active:false,lastActivityTime:null,createdTime:1782820441495,telemetry:{}},
  {id:"6c4ba8a0-7505-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-2",type:"Pump",location:"Saragvada",active:false,lastActivityTime:null,createdTime:1782880157738,telemetry:{}},
  {id:"6dff0680-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-3",type:"Pump",location:"Adityanagar",active:true,lastActivityTime:1783054189768,createdTime:1782890039016,telemetry:{chip_id:"F03F9EF9D108",device_id:"Aditynagar-PUMP-3",datetime:"2026-07-02 21:03:28",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:255.48,data_voltage_y_n:254.97,data_voltage_b_n:257.6,data_voltage_r_y:442.0627,data_voltage_y_b:443.9006,data_voltage_b_r:444.3416,data_kw:0,data_kva:0,data_kvarh:15.623,data_kwh:9.18,data_kvah:20.724,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"6f21ea70-7452-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Pump-2",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783054200996,createdTime:1782803282583,telemetry:{chip_id:"3C080FB3A3A0",device_id:"ANANDPUR-NEW-PUMP-2",datetime:"2026-07-02 21:03:11",data_current_r:151.2,data_current_y:156.336,data_current_b:158.208,data_voltage_r_n:250.43,data_voltage_y_n:250.85,data_voltage_b_n:253.34,data_voltage_r_y:434.1212,data_voltage_y_b:436.6431,data_voltage_b_r:436.28,data_kw:103.4431,data_kva:117.0536,data_kvarh:149330.679,data_kwh:283727.792,data_kvah:321752.631,data_pf:0.8837,data_pf_r:0.901,data_pf_y:0.875,data_pf_b:0.877,data_frequency:49.83,running_time_min:332.6,total_running_hours:-990499.67,start_stop_count:4}},
  {id:"7133a190-7601-11f1-b06d-0f068c9b61d7",name:"PadariyaFT-Flow",type:"Flow-Meter",location:"Padariya",active:true,lastActivityTime:1783054205647,createdTime:1782988399145,telemetry:{chip_id:"98EC9DF9D108",device_id:"PADARIYAFT-FLOW",datetime:"2026-07-02 21:03:20",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"723ef3f0-7539-11f1-b06d-0f068c9b61d7",name:"Khamdhrol-FLOW-1",type:"Flow-Meter",location:"Khamdhrol",active:true,lastActivityTime:1783054215094,createdTime:1782899052336,telemetry:{chip_id:"EC329EF9D108",device_id:"Khamdhrol-FLOW-1",datetime:"2026-07-02 21:03:24",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"79a2a190-7490-11f1-b06d-0f068c9b61d7",name:"Gopalwadi",type:"Flow-Meter",location:"Gopalwadi",active:false,lastActivityTime:null,createdTime:1782830368714,telemetry:{chip_id:"5C9E9DF9D108",device_id:"GOPALWADI-FLOW",datetime:"2026-07-02 21:03:16",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"7afed300-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-FLOW-1",type:"Flow-Meter",location:"Timbavadi",active:true,lastActivityTime:1783054197699,createdTime:1782828202912,telemetry:{}},
  {id:"7f2d6fd0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-1",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783054215840,createdTime:1782877760284,telemetry:{chip_id:"98399CF9D108",device_id:"Dolatpara-PUMP-1",datetime:"2026-07-02 21:03:08",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.44,data_voltage_y_n:255.27,data_voltage_b_n:257.96,data_voltage_r_y:441.2939,data_voltage_y_b:444.4089,data_voltage_b_r:443.5564,data_kw:0,data_kva:0,data_kvarh:6655.22,data_kwh:7555.305,data_kvah:10109.609,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"828d29f0-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-2",type:"Pump",location:"Dharmaveda",active:true,lastActivityTime:1783054196076,createdTime:1782815319260,telemetry:{chip_id:"44D89DF9D108",device_id:"Dharmaveda-PUMP-2",datetime:"2026-07-02 21:03:04",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:238.66,data_voltage_y_n:232.05,data_voltage_b_n:237.86,data_voltage_r_y:407.6602,data_voltage_y_b:406.9644,data_voltage_b_r:412.6786,data_kw:0,data_kva:0,data_kvarh:1051.65,data_kwh:2013.865,data_kvah:2280.095,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-495264.98,start_stop_count:3}},
  {id:"8331b0e0-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-FLOW-2",type:"Flow-Meter",location:"Sardarbag",active:false,lastActivityTime:null,createdTime:1782820499668,telemetry:{}},
  {id:"85d39bc0-7505-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-3",type:"Pump",location:"Saragvada",active:false,lastActivityTime:null,createdTime:1782880233316,telemetry:{}},
  {id:"8aa06ea0-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-2",type:"Pump",location:"Adityanagar",active:true,lastActivityTime:1783054196766,createdTime:1782889925004,telemetry:{chip_id:"2C3A9CF9D108",device_id:"Aditynagar-PUMP-2",datetime:"2026-07-02 21:03:05",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:255.54,data_voltage_y_n:254.9,data_voltage_b_n:257.64,data_voltage_r_y:442.0541,data_voltage_y_b:443.8748,data_voltage_b_r:444.4281,data_kw:0,data_kva:0,data_kvarh:156920.393,data_kwh:8003.811,data_kvah:157698.67,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:1.81,start_stop_count:2}},
  {id:"8e33f2a0-753d-11f1-b06d-0f068c9b61d7",name:"Khamdhrol-Pump-1",type:"Pump",location:"Khamdhrol",active:true,lastActivityTime:1783054190606,createdTime:1782901016348,telemetry:{chip_id:"840A9CF9D108",device_id:"Khamdhrol-Pump-1",datetime:"2026-07-02 21:03:00",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:0,data_voltage_y_n:0,data_voltage_b_n:0,data_voltage_r_y:0,data_voltage_y_b:0,data_voltage_b_r:0,data_kw:0,data_kva:0,data_kvarh:0,data_kwh:0,data_kvah:0,data_pf:0,data_pf_r:0,data_pf_y:0,data_pf_b:0,data_frequency:0,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"9702e740-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-1",type:"Pump",location:"Adityanagar",active:true,lastActivityTime:1783054199001,createdTime:1782889763968,telemetry:{}},
  {id:"97838700-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-3",type:"Pump",location:"Dharmaveda",active:false,lastActivityTime:null,createdTime:1782815342952,telemetry:{}},
  {id:"a906b550-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-1",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783054217900,createdTime:1782820242048,telemetry:{chip_id:"78E6DAF9D108",device_id:"Sardarbag-PUMP-1",datetime:"2026-07-02 21:02:49",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.22,data_voltage_y_n:245.68,data_voltage_b_n:249.08,data_voltage_r_y:424.2664,data_voltage_y_b:428.4781,data_voltage_b_r:427.2172,data_kw:0,data_kva:0,data_kvarh:20287.586,data_kwh:36567.969,data_kvah:42504.952,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.84,running_time_min:0,total_running_hours:3.26,start_stop_count:1}},
  {id:"aeafd8d0-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-FLOW-1",type:"Flow-Meter",location:"Adityanagar",active:true,lastActivityTime:1783053781290,createdTime:1782890162340,telemetry:{chip_id:"1C58DBF9D108",device_id:"ADITYANAGAR-FLOW",datetime:"2026-07-02 09:03:56",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,flow_rate:0,flow_total:0,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"c2782730-760e-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-1",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783054210902,createdTime:1782994052424,telemetry:{chip_id:"74AF93F9D108",device_id:"PADARIYAFT-PUMP-1",datetime:"2026-07-02 21:02:48",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:247.31,data_voltage_y_n:247.6,data_voltage_b_n:246.21,data_voltage_r_y:428.6047,data_voltage_y_b:427.6526,data_voltage_b_r:427.4012,data_kw:0,data_kva:0,data_kvarh:94533.18,data_kwh:10730.115,data_kvah:95561.476,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e08392a0-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-2",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783054212455,createdTime:1782820274856,telemetry:{chip_id:"B0079CF9D108",device_id:"Sardarbag-PUMP-2",datetime:"2026-07-02 21:03:12",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.23,data_voltage_y_n:245.57,data_voltage_b_n:249.15,data_voltage_r_y:424.1798,data_voltage_y_b:428.4438,data_voltage_b_r:427.2867,data_kw:0,data_kva:0,data_kvarh:2681.639,data_kwh:6063.986,data_kvah:6774.303,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e263dd70-744f-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-2",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783054196216,createdTime:1782801598784,telemetry:{chip_id:"10F5DBF9D108",device_id:"ANANDPUR-PUMP-2",datetime:"2026-07-02 21:03:07",data_current_r:153.968,data_current_y:152.96,data_current_b:0,data_voltage_r_n:248.81,data_voltage_y_n:248.77,data_voltage_b_n:247.05,data_voltage_r_y:430.9169,data_voltage_y_b:429.3936,data_voltage_b_r:429.4283,data_kw:-75.8881,data_kva:76.2548,data_kvarh:385837.434,data_kwh:285056.181,data_kvah:524626.575,data_pf:-0.9952,data_pf_r:-0.995,data_pf_y:-0.995,data_pf_b:1,data_frequency:49.82,running_time_min:825.2,total_running_hours:-495254.73,start_stop_count:3}},
  {id:"e44bd1e0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-2",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783054217699,createdTime:1782877834800,telemetry:{chip_id:"44349CF9D108",device_id:"Dolatpara-PUMP-2",datetime:"2026-07-02 21:03:06",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.28,data_voltage_y_n:255.17,data_voltage_b_n:257.87,data_voltage_r_y:441.1969,data_voltage_y_b:444.3077,data_voltage_b_r:443.5385,data_kw:0,data_kva:0,data_kvarh:4382.855,data_kwh:4931.525,data_kvah:6881.435,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e4677e40-7613-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-3",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783054210629,createdTime:1782994751244,telemetry:{chip_id:"9855DBF9D108",device_id:"PADARIYAFT-PUMP-3",datetime:"2026-07-02 21:02:50",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:247.26,data_voltage_y_n:247.19,data_voltage_b_n:246.31,data_voltage_r_y:428.2062,data_voltage_y_b:427.3837,data_voltage_b_r:427.4444,data_kw:0,data_kva:0,data_kvarh:0,data_kwh:0,data_kvah:0,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.84,running_time_min:0,total_running_hours:-495277.57,start_stop_count:1}},
  {id:"f11dad20-750b-11f1-b06d-0f068c9b61d7",name:"Saragvada-FLOW-1",type:"Flow-Meter",location:"Saragvada",active:true,lastActivityTime:1783054195391,createdTime:1782881038184,telemetry:{chip_id:"54889DF9D108",device_id:"Saragwada-FLOW-1",datetime:"2026-07-02 21:03:13",data_flow_rate:2.8,data_flow_total:0.19,data_flow_unit:1,flow_rate:2.7,flow_total:0.17,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:2}},
  {id:"f3ecaca0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-3",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783054206439,createdTime:1782877882584,telemetry:{chip_id:"900CDBF9D108",device_id:"Dolatpara-PUMP-3",datetime:"2026-07-02 21:03:16",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.11,data_voltage_y_n:255.17,data_voltage_b_n:258.02,data_voltage_r_y:441.0497,data_voltage_y_b:444.4378,data_voltage_b_r:443.5219,data_kw:0,data_kva:0,data_kvarh:301.706,data_kwh:380.468,data_kvah:487.52,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"f5525a50-7504-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-1",type:"Pump",location:"Saragvada",active:true,lastActivityTime:1783054199483,createdTime:1782880075152,telemetry:{chip_id:"E4E09DF9D108",device_id:"Saragvada-PUMP-1",datetime:"2026-07-02 21:03:10",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:239.14,data_voltage_y_n:233.55,data_voltage_b_n:239.28,data_voltage_r_y:409.3711,data_voltage_y_b:409.4928,data_voltage_b_r:414.3239,data_kw:0,data_kva:0,data_kvarh:1511.962,data_kwh:3394.639,data_kvah:3792.402,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-7924275.15,start_stop_count:18}},
  {id:"fa291fe0-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-3",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783054204988,createdTime:1782820340132,telemetry:{chip_id:"38400FB3A3A0",device_id:"Sardarbag-PUMP-3",datetime:"2026-07-02 21:03:13",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.46,data_voltage_y_n:245.83,data_voltage_b_n:249.34,data_voltage_r_y:424.6042,data_voltage_y_b:428.8334,data_voltage_b_r:427.6503,data_kw:0,data_kva:0,data_kvarh:9301.102,data_kwh:23075.093,data_kvah:25753.08,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-6933752.1,start_stop_count:14}},
  {id:"ff89d350-7459-11f1-b06d-0f068c9b61d7",name:"ANANDPUR-FLOW-1",type:"Flow-Meter",location:"Anandpur",active:true,lastActivityTime:1783054201558,createdTime:1782806437612,telemetry:{}},
  {id:"ff958af0-748c-11f1-b06d-0f068c9b61d7",name:"Varun-Pumping-FLOW-1",type:"Flow-Meter",location:"Varun Pumping",active:false,lastActivityTime:null,createdTime:1782828219992,telemetry:{}}
];


// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 · STATE MANAGEMENT
// Purpose : Single source of truth for all UI state.
//           Mutate via state.xxx = value, then call the relevant render fn.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {Object} state - Global UI state */
const state = {
  theme          : localStorage.getItem('iot-theme') || 'dark',
  filter         : 'all',          // 'all'|'running'|'standby'|'online'|'offline'|'no-data'
  typeFilter     : 'all',          // 'all'|'Pump'|'Flow-Meter'
  locationFilter : 'all',          // 'all'|<location string>
  search         : '',             // free-text search
  view           : 'grid',         // 'grid'|'list'
  sortBy         : 'name',         // 'name'|'status'|'location'|'kw'
  sortDir        : 'asc',          // 'asc'|'desc'
  lastUpdated    : new Date('2026-07-02T21:03:37+05:30'),  // timestamp of last data sync
  apiToken       : null,           // JWT from ThingsBoard login
  isFetching     : false,          // true while an API call is in progress
  nextRefreshAt  : null,           // Date of next scheduled refresh
  refreshTimer   : null,           // setInterval handle
  countdownTimer : null            // setInterval handle for countdown display
};

/**
 * getLocations
 * @returns {string[]} Sorted unique location names from all devices
 * @used-in  populateFilters(), filter dropdowns
 */
function getLocations() {
  return [...new Set(DEVICES_DATA.map(d => d.location))].sort();
}

/**
 * getStats
 * @description Computes aggregate statistics across all devices.
 * @returns {{ total, online, offline, pumps, flowMeters,
 *             running, standby, noData, totalKW, totalKWH }}
 * @used-in  renderStats(), donut chart
 */
function getStats() {
  const total      = DEVICES_DATA.length;
  const pumps      = DEVICES_DATA.filter(d => d.type === 'Pump').length;
  const flowMeters = total - pumps;
  const running    = DEVICES_DATA.filter(d => getDeviceState(d) === 'running').length;
  const standby    = DEVICES_DATA.filter(d => getDeviceState(d) === 'standby').length;
  const offline    = DEVICES_DATA.filter(d => getDeviceState(d) === 'offline').length;
  const noData     = DEVICES_DATA.filter(d => getDeviceState(d) === 'no-data').length;
  const online     = running + standby;
  const totalKW    = DEVICES_DATA.reduce((s, d) => s + Math.abs(parseFloat(d.telemetry.data_kw) || 0), 0);
  const totalKWH   = DEVICES_DATA.reduce((s, d) => {
    const v = parseFloat(d.telemetry.data_kwh) || 0;
    return s + (v < 1e7 ? v : 0);  // exclude absurd meter values
  }, 0);
  return { total, online, offline, pumps, flowMeters, running, standby, noData, totalKW, totalKWH };
}

/**
 * getFilteredDevices
 * @description Applies all active filters + search + sort to DEVICES_DATA.
 * @returns {Object[]} Filtered and sorted device array
 * @used-in  renderDevices()
 */
function getFilteredDevices() {
  let d = [...DEVICES_DATA];

  // ── Status filter (6 modes) ──
  const ds = x => getDeviceState(x);
  if      (state.filter === 'running')  d = d.filter(x => ds(x) === 'running');
  else if (state.filter === 'standby')  d = d.filter(x => ds(x) === 'standby');
  else if (state.filter === 'online')   d = d.filter(x => ds(x) === 'running' || ds(x) === 'standby');
  else if (state.filter === 'offline')  d = d.filter(x => ds(x) === 'offline');
  else if (state.filter === 'no-data')  d = d.filter(x => ds(x) === 'no-data');

  // ── Type filter ──
  if (state.typeFilter !== 'all') d = d.filter(x => x.type === state.typeFilter);

  // ── Location filter ──
  if (state.locationFilter !== 'all') d = d.filter(x => x.location === state.locationFilter);

  // ── Free-text search (name / location / chip_id) ──
  if (state.search) {
    const q = state.search.toLowerCase();
    d = d.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.location.toLowerCase().includes(q) ||
      (x.telemetry.chip_id && x.telemetry.chip_id.toLowerCase().includes(q))
    );
  }

  // ── Sort ──
  d.sort((a, b) => {
    let va, vb;
    if      (state.sortBy === 'name')     { va = a.name;     vb = b.name; }
    else if (state.sortBy === 'location') { va = a.location; vb = b.location; }
    else if (state.sortBy === 'kw')       {
      va = Math.abs(parseFloat(a.telemetry.data_kw) || 0);
      vb = Math.abs(parseFloat(b.telemetry.data_kw) || 0);
    }
    else if (state.sortBy === 'status') {
      const ord = { running: 0, standby: 1, offline: 2, 'no-data': 3 };
      va = ord[getDeviceState(a)] ?? 9;
      vb = ord[getDeviceState(b)] ?? 9;
    }
    if (typeof va === 'string') return state.sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return state.sortDir === 'asc' ? va - vb : vb - va;
  });

  return d;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 · UTILITY FUNCTIONS
// Purpose : Pure helpers for formatting, icons, and SVG.
//           No DOM access. All return strings or primitives.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * formatTime
 * @param {number|null} ts - Unix timestamp in ms
 * @returns {string} Human-readable IST date-time, or 'Never'
 * @used-in  deviceCard(), openModal()
 */
function formatTime(ts) {
  if (!ts) return 'Never';
  return new Date(ts).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', hour12: true,
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

/**
 * timeSince
 * @param {number|null} ts - Unix timestamp in ms
 * @returns {string} Relative time string (e.g. "5m ago", "2h ago")
 * @used-in  DeviceCard()
 */
function timeSince(ts) {
  if (!ts) return 'N/A';
  const diff = Date.now() - ts;
  const m    = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

/**
 * fmtNum
 * @param {number|string} v   - Raw value
 * @param {number}        dec - Decimal places (default 2)
 * @returns {string} Formatted number, '—' if NaN, with K/M suffix for large values
 * @used-in  MetricBlock(), TelemetrySection()
 */
function fmtNum(v, dec = 2) {
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  if (Math.abs(n) > 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (Math.abs(n) > 999) return (n / 1000).toFixed(2) + 'K';
  return n.toFixed(dec);
}

/**
 * getPFColor
 * @param {number} pf - Power factor value
 * @returns {string} CSS color variable string
 * @used-in  MetricBlock(), TelemetrySection()
 */
function getPFColor(pf) {
  const v = Math.abs(parseFloat(pf) || 0);
  return v >= 0.95 ? 'var(--green)' : v >= 0.85 ? 'var(--yellow)' : 'var(--red)';
}

/**
 * getVoltageStatus
 * @param {number} v - Voltage value in Volts
 * @returns {'normal'|'warning'|'idle'} CSS class suffix for metric value
 * @used-in  MetricBlock()
 */
function getVoltageStatus(v) {
  const val = parseFloat(v) || 0;
  if (val >= 220 && val <= 265) return 'normal';
  if (val > 0 && val < 220)    return 'warning';
  return 'idle';
}

/**
 * locIcon
 * @param {string} loc - Location name
 * @returns {string} Emoji icon for the location
 * @used-in  DeviceCard(), ModalContent()
 */
function locIcon(loc) {
  return ({
    'Anandpur'     : '🏘️',
    'Sardarbag'    : '🌿',
    'Dharmaveda'   : '⚡',
    'Dharamaveda'  : '⚡',
    'Saragvada'    : '💧',
    'Padariya'     : '🔧',
    'Dolatpara'    : '🏭',
    'Timbavadi'    : '⚙️',
    'Adityanagar'  : '🌆',
    'Khamdhrol'    : '🔩',
    'Gopalwadi'    : '🌊',
    'Varun Pumping': '💦'
  }[loc] || '📍');
}

/**
 * pumpSVG / flowSVG / warnSVG
 * @returns {string} Inline SVG HTML string for device type icons
 * @used-in  DeviceCard(), ModalContent()
 */
function pumpSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22">
    <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24
             M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/>
  </svg>`;
}
function flowSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>`;
}
function warnSVG(w = 18) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${w}">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
    <line x1="12" y1="2" x2="12" y2="12"/>
  </svg>`;
}
function refreshSVG(w = 18) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${w}">
    <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 · DEVICE STATE CLASSIFIER
// Purpose : Canonical single source for determining a device's operational
//           state from its data object. All filters + card rendering use this.
//
// State definitions:
//   running  – Pump is actively drawing current (|kW| > 0)
//   standby  – Connected & sending telemetry, pump at rest / flow meter live
//   offline  – Has historical telemetry but currently inactive/disconnected
//   no-data  – Empty telemetry object → not connected or not yet configured
// ─────────────────────────────────────────────────────────────────────────────

/**
 * getDeviceState
 * @param {Object} device - Device data object from DEVICES_DATA
 * @returns {'running'|'standby'|'offline'|'no-data'}
 * @used-in  getStats(), getFilteredDevices(), DeviceCard(), ModalContent()
 */
function getDeviceState(device) {
  const hasTelemetry = Object.keys(device.telemetry).length > 0;
  if (!hasTelemetry)  return 'no-data';   // No data at all – not configured
  if (!device.active) return 'offline';   // Had data but now disconnected
  if (device.type === 'Pump' && Math.abs(parseFloat(device.telemetry.data_kw) || 0) > 0)
    return 'running';                     // Actively pumping
  return 'standby';                       // Online but at rest
}

/**
 * STATE_LABEL  – Human-readable display name for each state
 * @used-in  DeviceCard(), ModalContent(), filter button text
 */
const STATE_LABEL = {
  running : 'Running',
  standby : 'Standby',
  offline : 'Offline',
  'no-data': 'Not Configured'
};

/**
 * STATE_ICON  – Emoji indicator for each state
 * @used-in  ToastNotification(), page title updates
 */
const STATE_ICON = {
  running : '⚡',
  standby : '✅',
  offline : '📴',
  'no-data': '⚠️'
};


// =============================================================================
// SECTION 6 · COMPONENT FUNCTIONS
// Purpose : Reusable HTML-string builder functions.
//           Each returns a complete HTML string – no direct DOM manipulation.
//           Callers inject the result via innerHTML.
//           Parameters are documented so components can be called with any data.
// =============================================================================

/**
 * @component StatusBadge
 * @description Renders a colour-coded status chip for a device state.
 * @param {string} stateKey - 'running'|'standby'|'offline'|'no-data'
 * @param {string} [size='']  - '' | 'lg' for larger badge in modal header
 * @returns {string} HTML string
 * @used-in  DeviceCard(), ModalContent()
 * @example  StatusBadge('running')
 *           StatusBadge('no-data', 'lg')
 */
function StatusBadge(stateKey, size = '') {
  const label = STATE_LABEL[stateKey] || stateKey;
  return `<div class="status-badge ${stateKey} ${size}">
    <span class="status-dot"></span>${label}
  </div>`;
}

/**
 * @component MetricBlock
 * @description Renders one metric tile inside a device card metrics grid.
 * @param {Object} opts
 * @param {string}        opts.label      - Short label (e.g. "V R-N")
 * @param {string|number} opts.value      - Display value (already formatted)
 * @param {string}        [opts.unit='']  - Unit suffix (e.g. "V", "kW", "A")
 * @param {string}        [opts.cls='']   - Extra CSS class on metric-value span
 * @param {string}        [opts.style=''] - Inline style on metric-value span
 * @param {boolean}       [opts.wide=false] - Spans full row (for flow meters)
 * @returns {string} HTML string
 * @used-in  DeviceCard() pump metrics, DeviceCard() flow metrics
 * @example  MetricBlock({ label:'Power', value:'103.4', unit:'kW', cls:'val-running' })
 */
function MetricBlock({ label, value, unit = '', cls = '', style = '', wide = false }) {
  return `
<div class="metric${wide ? ' wide' : ''}">
  <span class="metric-label">${label}</span>
  <span class="metric-value ${cls}"${style ? ` style="${style}"` : ''}>
    ${value}${unit ? `<small>${unit}</small>` : ''}
  </span>
</div>`;
}

/**
 * @component PumpMetrics
 * @description Renders the 6-metric grid for a pump device card.
 * @param {Object} tel - device.telemetry object
 * @param {boolean} isRunning - true if pump state is 'running'
 * @returns {string} HTML string of 6 MetricBlock calls
 * @used-in  DeviceCard()
 */
function PumpMetrics(tel, isRunning) {
  const vRN = parseFloat(tel.data_voltage_r_n) || 0;
  const cur = parseFloat(tel.data_current_r)   || 0;
  const kw  = Math.abs(parseFloat(tel.data_kw) || 0);
  const pf  = parseFloat(tel.data_pf)          || 0;
  const hz  = parseFloat(tel.data_frequency)   || 0;
  return `
<div class="card-metrics">
  ${MetricBlock({ label:'V R-N',    value: fmtNum(vRN,1),            unit:'V',   cls: getVoltageStatus(vRN) })}
  ${MetricBlock({ label:'Current',  value: fmtNum(cur,2),            unit:'A' })}
  ${MetricBlock({ label:'Power',    value: fmtNum(kw,2),             unit:'kW',  cls: isRunning ? 'val-running' : '' })}
  ${MetricBlock({ label:'P.Factor', value: fmtNum(Math.abs(pf),3),              style:`color:${getPFColor(pf)}` })}
  ${MetricBlock({ label:'Freq',     value: fmtNum(hz,2),             unit:'Hz' })}
  ${MetricBlock({ label:'Energy',   value: fmtNum(tel.data_kwh,1),   unit:'kWh' })}
</div>`;
}

/**
 * @component FlowMetrics
 * @description Renders the 2-metric grid for a flow meter device card.
 * @param {Object} tel - device.telemetry object
 * @returns {string} HTML string of 2 wide MetricBlock calls
 * @used-in  DeviceCard()
 */
function FlowMetrics(tel) {
  const fr = parseFloat(tel.data_flow_rate)  || parseFloat(tel.flow_rate)  || 0;
  const ft = parseFloat(tel.data_flow_total) || parseFloat(tel.flow_total) || 0;
  return `
<div class="card-metrics">
  ${MetricBlock({ label:'Flow Rate',  value: fmtNum(fr,3), unit:'m³/h', cls:'flow-val', wide: true })}
  ${MetricBlock({ label:'Total Flow', value: fmtNum(ft,3), unit:'m³',                   wide: true })}
</div>`;
}

/**
 * @component NoDataBlock
 * @description Renders the 'Not Connected / Not Configured' placeholder
 *              shown when a device has no telemetry data at all.
 * @returns {string} HTML string
 * @used-in  DeviceCard()
 */
function NoDataBlock() {
  return `<div class="no-telemetry">
    ${warnSVG(18)}
    <span>Not Connected <em>or</em> Not Configured</span>
  </div>`;
}

/**
 * @component DeviceCard
 * @description Renders a complete device card HTML string for the grid or list.
 * @param {Object}  device            - Single device object from DEVICES_DATA
 * @param {string}  device.id         - Unique device UUID
 * @param {string}  device.name       - Display name
 * @param {string}  device.type       - 'Pump' | 'Flow-Meter'
 * @param {string}  device.location   - Location name
 * @param {boolean} device.active     - ThingsBoard active flag
 * @param {number}  device.lastActivityTime - Unix ms timestamp
 * @param {Object}  device.telemetry  - Latest telemetry key-value map
 * @returns {string} HTML string
 * @used-in  renderDevices() – injected into #device-grid innerHTML
 * @example  grid.innerHTML = devices.map(d => DeviceCard(d)).join('');
 */
function DeviceCard(device) {
  const isPump    = device.type === 'Pump';
  const hasTel    = Object.keys(device.telemetry).length > 0;
  const devState  = getDeviceState(device);
  const isRunning = devState === 'running';
  const typeIcon  = isPump ? pumpSVG() : flowSVG();
  const typeTag   = isPump
    ? `<div class="card-type-tag tag-pump">⚙️ Pump · AVH 14-M1-E3-N1</div>`
    : `<div class="card-type-tag tag-flow">💧 Flow Meter</div>`;

  // ── Metrics section ──
  const metricsHTML = !hasTel
    ? NoDataBlock()
    : isPump
      ? PumpMetrics(device.telemetry, isRunning)
      : FlowMetrics(device.telemetry);

  return `
<div class="device-card ${devState}" data-id="${device.id}" tabindex="0" role="button"
     aria-label="${device.name} – ${STATE_LABEL[devState]}">

  <!-- Card Header: icon · name · location · status badge -->
  <div class="card-header">
    <div class="card-icon ${isPump ? 'icon-pump' : 'icon-flow'}">${typeIcon}</div>
    <div class="card-title-group">
      <h3 class="card-name">${device.name}</h3>
      <span class="card-location">${locIcon(device.location)} ${device.location}</span>
    </div>
    ${StatusBadge(devState)}
  </div>

  <!-- Type tag (Pump model / Flow Meter) -->
  ${typeTag}

  <!-- Telemetry metrics or No-data placeholder -->
  ${metricsHTML}

  <!-- Card footer: chip ID · last seen -->
  <div class="card-footer">
    <span class="chip-id">${device.telemetry.chip_id ? '🔲 ' + device.telemetry.chip_id : '—'}</span>
    <span class="last-seen">🕐 ${timeSince(device.lastActivityTime)}</span>
  </div>

  <!-- Animated pulse indicator for actively running pumps -->
  ${isRunning ? '<div class="running-pulse" aria-hidden="true"></div>' : ''}
</div>`;
}

/**
 * @component TelemetrySection
 * @description Renders one labelled telemetry table section inside the modal.
 * @param {string}   title - Section heading (e.g. "⚡ Electrical")
 * @param {Array}    rows  - Array of [label, value] pairs
 * @returns {string} HTML string
 * @used-in  ModalContent()
 * @example  TelemetrySection('⚡ Electrical', [['V R-N', '248.8 V'], ...])
 */
function TelemetrySection(title, rows) {
  const rowsHTML = rows.map(([label, value]) =>
    `<tr><td>${label}</td><td>${value}</td></tr>`
  ).join('');
  return `
<div class="tel-section">
  <h4>${title}</h4>
  <table class="tel-table">${rowsHTML}</table>
</div>`;
}

/**
 * @component ModalContent
 * @description Renders the full device detail modal body HTML string.
 * @param {Object} device - Single device object from DEVICES_DATA
 * @returns {string} HTML string
 * @used-in  openModal() – injected into #modal-content innerHTML
 * @example  document.getElementById('modal-content').innerHTML = ModalContent(device);
 */
function ModalContent(device) {
  const isPump   = device.type === 'Pump';
  const tel      = device.telemetry;
  const hasTel   = Object.keys(tel).length > 0;
  const devState = getDeviceState(device);

  // ── Modal header ──
  const headerHTML = `
<div class="modal-header">
  <div class="modal-icon ${isPump ? 'icon-pump' : 'icon-flow'}">
    ${isPump ? pumpSVG() : flowSVG()}
  </div>
  <div class="modal-title-group">
    <h2 class="modal-title">${device.name}</h2>
    <p class="modal-subtitle">${locIcon(device.location)} ${device.location} &nbsp;•&nbsp; ${device.type}</p>
  </div>
  ${StatusBadge(devState, 'modal-status')}
</div>`;

  // ── Meta grid (device identity info) ──
  const metaItems = [
    ['Device ID',    tel.device_id || '—'],
    ['Chip ID',      tel.chip_id   || '—'],
    ['Last Activity', formatTime(device.lastActivityTime)],
    ['Registered',   formatTime(device.createdTime)],
    ['Telemetry At', tel.datetime  || '—'],
    ['Device Type',  device.type]
  ];
  const metaHTML = `
<div class="modal-meta">
  ${metaItems.map(([k, v]) =>
    `<div class="meta-item"><span>${k}</span><strong>${v}</strong></div>`
  ).join('')}
</div>`;

  // ── Telemetry content ──
  let telHTML;
  if (!hasTel) {
    telHTML = `
<div class="modal-no-data">
  ${warnSVG(48)}
  <p>No telemetry data available</p>
  <small>Device may be offline or not yet configured.</small>
</div>`;
  } else if (isPump) {
    // Pump: 3 telemetry sections
    telHTML = `
<h3 class="section-title">📡 Latest Telemetry</h3>
<div class="telemetry-grid">
  ${TelemetrySection('⚡ Electrical', [
    ['Voltage R-N',   fmtNum(tel.data_voltage_r_n, 2) + ' V'],
    ['Voltage Y-N',   fmtNum(tel.data_voltage_y_n, 2) + ' V'],
    ['Voltage B-N',   fmtNum(tel.data_voltage_b_n, 2) + ' V'],
    ['Voltage R-Y',   fmtNum(tel.data_voltage_r_y, 2) + ' V'],
    ['Voltage Y-B',   fmtNum(tel.data_voltage_y_b, 2) + ' V'],
    ['Voltage B-R',   fmtNum(tel.data_voltage_b_r, 2) + ' V'],
    ['Current R',     fmtNum(tel.data_current_r, 3) + ' A'],
    ['Current Y',     fmtNum(tel.data_current_y, 3) + ' A'],
    ['Current B',     fmtNum(tel.data_current_b, 3) + ' A'],
    ['Frequency',     fmtNum(tel.data_frequency, 2) + ' Hz']
  ])}
  ${TelemetrySection('🔋 Power & Energy', [
    ['Active Power',    `<strong class="highlight">${fmtNum(tel.data_kw, 3)} kW</strong>`],
    ['Apparent Power',  fmtNum(tel.data_kva, 3) + ' kVA'],
    ['Energy (kWh)',    fmtNum(tel.data_kwh, 3)],
    ['Energy (kVAh)',   fmtNum(tel.data_kvah, 3)],
    ['Reactive Energy', fmtNum(tel.data_kvarh, 3)],
    ['Power Factor',    `<span style="color:${getPFColor(tel.data_pf)};font-weight:700">${fmtNum(Math.abs(tel.data_pf), 4)}</span>`],
    ['PF Phase R',      fmtNum(Math.abs(tel.data_pf_r), 3)],
    ['PF Phase Y',      fmtNum(Math.abs(tel.data_pf_y), 3)],
    ['PF Phase B',      fmtNum(Math.abs(tel.data_pf_b), 3)]
  ])}
  ${TelemetrySection('🕹️ Operation', [
    ['Run Time',        fmtNum(tel.running_time_min, 1) + ' min'],
    ['Start/Stop Count', tel.start_stop_count || 0],
    ['Total Run Hours', fmtNum(Math.abs(tel.total_running_hours), 2) + ' h']
  ])}
</div>`;
  } else {
    // Flow meter: 1 telemetry section
    telHTML = `
<h3 class="section-title">📡 Latest Telemetry</h3>
<div class="telemetry-grid">
  ${TelemetrySection('💧 Flow Measurements', [
    ['Flow Rate',       `<strong class="highlight">${fmtNum(tel.data_flow_rate || tel.flow_rate, 3)} m³/h</strong>`],
    ['Total Flow',      fmtNum(tel.data_flow_total || tel.flow_total, 3) + ' m³'],
    ['Flow Unit',       tel.data_flow_unit ?? '—'],
    ['Decimal Point',   tel.data_flow_decimal_point ?? '—'],
    ['Kilo Flag',       tel.data_flow_kilo_flag || 0],
    ['Empty Pipe',      tel.data_flow_empty_pipe  ? '⚠️ Yes' : 'No'],
    ['Over Range',      tel.data_flow_over_range  ? '⚠️ Yes' : 'No']
  ])}
</div>`;
  }

  return headerHTML + metaHTML + telHTML;
}

/**
 * @component ToastNotification
 * @description Shows a temporary toast message at the bottom of the screen.
 * @param {string} message - Text to display
 * @param {'success'|'error'|'info'} [type='info'] - Toast colour variant
 * @param {number} [duration=3500] - Auto-dismiss delay in ms
 * @returns {void}
 * @used-in  refreshData() on success/error, openModal()
 * @example  ToastNotification('✅ Data refreshed – 40 devices updated', 'success')
 */
function ToastNotification(message, type = 'info', duration = 3500) {
  // Remove any existing toast
  document.getElementById('iot-toast')?.remove();

  const toast = document.createElement('div');
  toast.id        = 'iot-toast';
  toast.className = `iot-toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// =============================================================================
// SECTION 7 · CHART RENDERERS
// Purpose : Initialise and re-render Chart.js charts.
//           Each function destroys the previous instance before creating new.
//           Call these after data updates or theme changes.
// =============================================================================

/** @private Chart.js instances – stored so we can destroy before re-render */
let donutChart = null, telChart = null, flowChart = null;

/**
 * getChartColors
 * @description Returns theme-aware colour tokens for Chart.js.
 * @returns {{ grid, tick, leg }} colour strings
 * @used-in  initTelChart(), initFlowChart()
 */
function getChartColors() {
  const dark = state.theme === 'dark';
  return {
    grid: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    tick: dark ? '#8892a4' : '#64748b',
    leg:  dark ? '#c0ccd8' : '#334155'
  };
}

/**
 * initDonut
 * @description Renders the 4-segment donut chart showing device state breakdown.
 * @param {number} running  - Count of running devices
 * @param {number} standby  - Count of standby devices
 * @param {number} offline  - Count of offline devices
 * @param {number} noData   - Count of not-configured devices
 * @used-in  renderStats()
 */
function initDonut(running, standby, offline, noData) {
  const ctx = document.getElementById('donutChart');
  if (!ctx) return;
  if (donutChart) donutChart.destroy();
  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Running', 'Standby', 'Offline', 'Not Configured'],
      datasets: [{
        data: [running, standby, offline, noData],
        backgroundColor: ['#7461ef', '#00d4aa', '#ff4757', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ` ${c.label}: ${c.parsed}` } }
      },
      animation: { duration: 900 }
    }
  });
}

/**
 * initTelChart
 * @description Renders the Power (kW) bar + Voltage R-N line chart for active pumps.
 *              Shows up to 10 pumps with telemetry data.
 * @used-in  renderStats(), chart tab switch handler
 */
function initTelChart() {
  const ctx = document.getElementById('telChart');
  if (!ctx) return;
  const c = getChartColors();
  const pumps = DEVICES_DATA
    .filter(d => d.type === 'Pump' && d.active && Object.keys(d.telemetry).length > 0)
    .slice(0, 10);
  if (telChart) telChart.destroy();
  telChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pumps.map(d => d.name.replace(/-(Pump|PUMP)-/, '-P').slice(0, 12)),
      datasets: [
        {
          label: 'Power (kW)',
          data: pumps.map(d => Math.abs(parseFloat(d.telemetry.data_kw) || 0)),
          backgroundColor: 'rgba(0,212,170,0.8)',
          borderRadius: 5,
          yAxisID: 'y'
        },
        {
          label: 'Voltage R-N (V)',
          data: pumps.map(d => parseFloat(d.telemetry.data_voltage_r_n) || 0),
          type: 'line',
          borderColor: '#7461ef',
          backgroundColor: 'rgba(116,97,239,0.1)',
          tension: 0.4,
          pointRadius: 4,
          fill: true,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y:  { type: 'linear', position: 'left',  grid: { color: c.grid }, ticks: { color: '#00d4aa', font: { size: 10 } } },
        y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#7461ef', font: { size: 10 } } },
        x:  { grid: { display: false }, ticks: { color: c.tick, font: { size: 9 }, maxRotation: 35 } }
      },
      plugins: { legend: { labels: { color: c.leg, font: { size: 11 }, boxWidth: 12 } } }
    }
  });
}

/**
 * initFlowChart
 * @description Renders flow rate + total flow bar chart for flow meters with data.
 * @used-in  renderStats(), chart tab switch handler
 */
function initFlowChart() {
  const ctx = document.getElementById('flowChart');
  if (!ctx) return;
  const c   = getChartColors();
  const fds = DEVICES_DATA.filter(d => d.type === 'Flow-Meter' && Object.keys(d.telemetry).length > 0);
  if (flowChart) flowChart.destroy();
  flowChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: fds.map(d => d.name.split('-')[0]),
      datasets: [
        {
          label: 'Flow Rate (m\u00b3/h)',
          data: fds.map(d => parseFloat(d.telemetry.data_flow_rate) || parseFloat(d.telemetry.flow_rate) || 0),
          backgroundColor: 'rgba(0,186,255,0.8)',
          borderRadius: 5
        },
        {
          label: 'Total (m\u00b3)',
          data: fds.map(d => parseFloat(d.telemetry.data_flow_total) || parseFloat(d.telemetry.flow_total) || 0),
          backgroundColor: 'rgba(255,167,38,0.75)',
          borderRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { grid: { color: c.grid }, ticks: { color: c.tick, font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { color: c.tick, font: { size: 10 } } }
      },
      plugins: { legend: { labels: { color: c.leg, font: { size: 11 }, boxWidth: 12 } } }
    }
  });
}

// =============================================================================
// SECTION 8 · RENDER ENGINE
// Purpose : Top-level render functions that update the DOM.
//           Call these after data changes or filter/sort state changes.
// =============================================================================

/**
 * renderStats
 * @description Updates all stat card values and re-renders the donut chart.
 * @used-in  App init, refreshData() after successful API fetch
 */
function renderStats() {
  const s  = getStats();
  const se = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  se('stat-total',   s.total);
  se('stat-online',  s.online);
  se('stat-offline', s.offline);
  se('stat-pumps',   s.pumps);
  se('stat-flow',    s.flowMeters);
  se('stat-running', s.running);
  se('stat-standby', s.standby);
  se('stat-no-data', s.noData);
  se('stat-kw',      s.totalKW.toFixed(1) + ' kW');
  se('stat-kwh',     (s.totalKWH / 1000).toFixed(1) + ' MWh');
  initDonut(s.running, s.standby, s.offline, s.noData);
}

/**
 * renderDevices
 * @description Re-renders the device grid/list with current filters applied.
 *              Attaches click/keyboard handlers to each card.
 * @used-in  App init, filter changes, search input, sort changes, refreshData()
 */
function renderDevices() {
  const devs  = getFilteredDevices();
  const grid  = document.getElementById('device-grid');
  const empty = document.getElementById('empty-state');
  const cnt   = document.getElementById('result-count');

  if (cnt) cnt.textContent = devs.length + ' device' + (devs.length !== 1 ? 's' : '');

  if (!devs.length) {
    grid.style.display  = 'none';
    empty.style.display = 'flex';
    return;
  }

  empty.style.display = 'none';
  grid.className      = state.view === 'grid' ? 'device-grid' : 'device-list';
  grid.style.display  = state.view === 'grid' ? 'grid'        : 'flex';

  // Build HTML using DeviceCard() component
  grid.innerHTML = devs.map(DeviceCard).join('');

  // Attach card interactions
  grid.querySelectorAll('.device-card').forEach((el, i) => {
    el.style.animationDelay = (i * 25) + 'ms';
    el.classList.add('card-enter');
    const device = DEVICES_DATA.find(d => d.id === el.dataset.id);
    el.addEventListener('click',   () => openModal(device));
    el.addEventListener('keydown', e  => { if (e.key === 'Enter') openModal(device); });
  });
}

/**
 * renderLastUpdated
 * @description Updates the header "last synced" timestamp display.
 * @used-in  App init, after every successful refreshData()
 */
function renderLastUpdated() {
  const el = document.getElementById('last-updated');
  if (el) el.textContent = 'Synced: ' + formatTime(state.lastUpdated.getTime());
}

/**
 * openModal
 * @description Opens the device detail modal with full telemetry for a device.
 * @param {Object} device - Device object from DEVICES_DATA
 * @used-in  DeviceCard click handler, renderDevices()
 */
function openModal(device) {
  if (!device) return;
  const modal   = document.getElementById('device-modal');
  const content = document.getElementById('modal-content');
  content.innerHTML = ModalContent(device);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * closeModal
 * @description Closes the device detail modal.
 * @used-in  modal close button, ESC key, backdrop click
 */
function closeModal() {
  document.getElementById('device-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * applyTheme
 * @description Sets the data-theme attribute and updates the toggle button icon.
 * @param {'dark'|'light'} theme
 * @used-in  App init, toggleTheme()
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
       </svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
       </svg>`;
}

/**
 * toggleTheme
 * @description Flips between dark and light mode, persists to localStorage.
 * @used-in  theme-toggle button click
 */
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('iot-theme', state.theme);
  applyTheme(state.theme);
  // Re-render charts with new theme colours
  setTimeout(() => { initTelChart(); initFlowChart(); renderStats(); }, 80);
}

/**
 * populateFilters
 * @description Fills the location dropdown with unique location options.
 * @used-in  App init
 */
function populateFilters() {
  const sel = document.getElementById('filter-location');
  if (!sel) return;
  // Clear existing dynamic options (keep "All Locations")
  while (sel.options.length > 1) sel.remove(1);
  getLocations().forEach(loc => {
    const o = document.createElement('option');
    o.value       = loc;
    o.textContent = locIcon(loc) + ' ' + loc;
    sel.appendChild(o);
  });
}

/**
 * startClock
 * @description Starts a 1-second interval that updates the live clock display.
 * @used-in  App init
 */
function startClock() {
  const tick = () => {
    const el = document.getElementById('live-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('en-IN', {
      hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };
  tick();
  setInterval(tick, 1000);
}

// =============================================================================
// SECTION 9 · API & DATA LAYER
// Purpose : All ThingsBoard REST API calls.
//           Credentials are read from CONFIG (injected by config.js).
//           Each function returns a Promise.
//           On CORS or network error, rejects gracefully.
// =============================================================================

/**
 * apiLogin
 * @description Authenticates with ThingsBoard and stores the JWT in state.
 * @returns {Promise<string>} Resolves to the JWT token string
 * @throws  {Error}           On network failure or bad credentials
 * @used-in  refreshData()
 */
async function apiLogin() {
  const res = await fetch(`${CONFIG.apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: CONFIG.username, password: CONFIG.password })
  });
  if (!res.ok) throw new Error(`Login failed: HTTP ${res.status}`);
  const data = await res.json();
  state.apiToken = data.token;
  return data.token;
}

/**
 * apiFetch
 * @description Generic authenticated GET helper for ThingsBoard API.
 * @param {string} path    - API path (e.g. '/api/tenant/devices?pageSize=100')
 * @param {string} token   - JWT from apiLogin()
 * @returns {Promise<Object>} Parsed JSON response
 * @used-in  apiGetDevices(), apiGetTelemetry()
 */
async function apiFetch(path, token) {
  const res = await fetch(`${CONFIG.apiBase}${path}`, {
    headers: { 'X-Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json();
}

/**
 * apiGetDevices
 * @description Fetches the full device list from ThingsBoard (all pages).
 * @param {string} token - JWT
 * @returns {Promise<Object[]>} Array of ThingsBoard device objects
 * @used-in  refreshData()
 */
async function apiGetDevices(token) {
  const data = await apiFetch(`/api/tenant/devices?pageSize=${CONFIG.pageSize}&page=0`, token);
  return data.data || [];
}

/**
 * apiGetTelemetry
 * @description Fetches the latest telemetry values for one device.
 * @param {string}   deviceId - Device UUID
 * @param {string}   token    - JWT
 * @returns {Promise<Object>} Flat key→value telemetry map (latest values only)
 * @used-in  refreshData()
 */
async function apiGetTelemetry(deviceId, token) {
  try {
    const keys = CONFIG.telemetryKeys.join(',');
    // Fetch telemetry timeseries AND server-scope attributes in parallel
    const [raw, attrsRaw] = await Promise.all([
      apiFetch(`/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keys}`, token),
      apiFetch(`/api/plugins/telemetry/DEVICE/${deviceId}/values/attributes?keys=active,lastActivityTime`, token)
        .catch(() => [])  // attributes fetch may fail for some devices – degrade gracefully
    ]);
    // ThingsBoard returns { key: [{ts, value}] } – extract latest value
    const flat = {};
    for (const [key, arr] of Object.entries(raw)) {
      if (Array.isArray(arr) && arr.length > 0) {
        const v = arr[0].value;
        flat[key] = isNaN(v) ? v : parseFloat(v);
      }
    }
    // Extract active + lastActivityTime from server-scope attributes
    const attrs = {};
    if (Array.isArray(attrsRaw)) {
      attrsRaw.forEach(a => { attrs[a.key] = a.value; });
    }
    return { telemetry: flat, active: attrs.active ?? null, lastActivityTime: attrs.lastActivityTime ?? null };
  } catch {
    return { telemetry: {}, active: null, lastActivityTime: null };
  }
}

/**
 * mergeApiData
 * @description Merges fresh API data into the DEVICES_DATA array.
 *              Preserves seed data for devices not returned by the API.
 *              Updates telemetry, active status, and lastActivityTime.
 * @param {Object[]} apiDevices     - Device list from apiGetDevices()
 * @param {Map}      telemetryMap   - Map<deviceId, telemetryObj> from apiGetTelemetry()
 * @used-in  refreshData()
 */
function mergeApiData(apiDevices, telemetryMap) {
  // FIX: telemetryMap now holds { telemetry, active, lastActivityTime } objects
  apiDevices.forEach(apiDev => {
    const id      = apiDev.id?.id;
    const tData   = telemetryMap.get(id) || { telemetry: {}, active: null, lastActivityTime: null };
    const idx     = DEVICES_DATA.findIndex(d => d.id === id);
    const seed    = idx >= 0 ? DEVICES_DATA[idx] : {};

    // FIX: apiDev.type is "Pump-AVH 14-M1-E3-N1" or "Flow-Meter-xxx"
    //      – check start of string, not includes('Flow')
    const rawType = (apiDev.type || '').toLowerCase();
    const type    = rawType.startsWith('flow') ? 'Flow-Meter' : 'Pump';

    // FIX: active comes from attributes (tData.active), not apiDev.active (always undefined)
    //      Fall back to seed data active value if attributes call also failed (null)
    const active = (tData.active !== null) ? tData.active : (seed.active ?? false);

    // FIX: lastActivityTime from attributes, fall back to seed
    const lastActivityTime = tData.lastActivityTime ?? seed.lastActivityTime ?? null;

    // Location: ThingsBoard label field is often empty – preserve seed location
    const location = apiDev.label || seed.location || 'Unknown';

    const merged = {
      id,
      name            : apiDev.name,
      type,
      location,
      active,
      lastActivityTime,
      createdTime     : apiDev.createdTime ?? seed.createdTime ?? null,
      telemetry       : tData.telemetry
    };

    if (idx >= 0) {
      DEVICES_DATA[idx] = merged;  // update existing entry
    } else {
      DEVICES_DATA.push(merged);   // new device added to platform
    }
  });
}

// =============================================================================
// SECTION 10 · AUTO-REFRESH ENGINE
// Purpose : Polls the ThingsBoard API every CONFIG.pollIntervalMs (10 min).
//           Shows a countdown in the header between polls.
//           Handles errors gracefully with toast notifications.
// =============================================================================

/**
 * updateCountdown
 * @description Updates the #sync-countdown element with time remaining.
 * @used-in  startAutoRefresh() countdown interval
 */
function updateCountdown() {
  const el = document.getElementById('sync-countdown');
  if (!el || !state.nextRefreshAt) return;
  const remaining = Math.max(0, state.nextRefreshAt - Date.now());
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  el.textContent = `Next sync ${m}:${String(s).padStart(2, '0')}`;
}

/**
 * setFetchingState
 * @description Toggles the loading spinner on the refresh button.
 * @param {boolean} loading
 * @used-in  refreshData()
 */
function setFetchingState(loading) {
  state.isFetching = loading;
  const btn = document.getElementById('refresh-btn');
  if (btn) btn.classList.toggle('spinning', loading);
  const cd = document.getElementById('sync-countdown');
  if (cd) cd.textContent = loading ? 'Syncing...' : '';
}

/**
 * refreshData
 * @description Fetches fresh data from ThingsBoard API and updates the UI.
 *              Called automatically every 10 minutes and on manual refresh.
 * @returns {Promise<void>}
 * @used-in  startAutoRefresh(), refresh button click
 */
async function refreshData() {
  if (state.isFetching) return;  // prevent overlapping calls
  if (!CONFIG.username || !CONFIG.password) {
    ToastNotification('⚠️ No credentials configured – showing cached data', 'error', 5000);
    return;
  }

  setFetchingState(true);
  try {
    // Step 1: Authenticate
    const token = await apiLogin();

    // Step 2: Fetch device list
    const apiDevices = await apiGetDevices(token);

    // Step 3: Fetch telemetry for each device (parallel, max 5 concurrent)
    const telemetryMap = new Map();
    const batchSize    = 5;
    for (let i = 0; i < apiDevices.length; i += batchSize) {
      const batch = apiDevices.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map(dev => apiGetTelemetry(dev.id?.id, token).then(tel => [dev.id?.id, tel]))
      );
      results.forEach(([id, tel]) => telemetryMap.set(id, tel));
    }

    // Step 4: Merge into DEVICES_DATA
    mergeApiData(apiDevices, telemetryMap);

    // Step 5: Update UI
    state.lastUpdated = new Date();
    renderStats();
    renderDevices();
    renderLastUpdated();
    initTelChart();
    initFlowChart();

    const s = getStats();
    ToastNotification(
      `✅ Data refreshed – ${s.total} devices | ⚡ ${s.running} running | ✅ ${s.standby} standby`,
      'success'
    );

  } catch (err) {
    console.error('[JUMC IoT] Refresh failed:', err.message);
    const isCORS = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');
    if (isCORS) {
      ToastNotification('⚠️ Network/CORS error – showing cached data. Open via a web server for live data.', 'error', 6000);
    } else {
      ToastNotification(`❌ Fetch failed: ${err.message}`, 'error', 5000);
    }
  } finally {
    setFetchingState(false);
  }
}

/**
 * startAutoRefresh
 * @description Starts the 10-minute polling loop and the countdown display.
 *              Does an immediate first fetch on page load if credentials exist.
 * @used-in  App init (DOMContentLoaded)
 */
function startAutoRefresh() {
  if (!CONFIG.username) return;  // no-op if config.js not loaded

  // Immediate first fetch
  refreshData();

  // Schedule repeating fetch
  state.refreshTimer = setInterval(() => {
    state.nextRefreshAt = Date.now() + CONFIG.pollIntervalMs;
    refreshData();
  }, CONFIG.pollIntervalMs);

  // Set first nextRefreshAt for countdown
  state.nextRefreshAt = Date.now() + CONFIG.pollIntervalMs;

  // Countdown display – update every second
  state.countdownTimer = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// =============================================================================
// SECTION 11 · EVENT HANDLERS
// Purpose : Wires all DOM events to state changes + render calls.
//           Called once in App init.
//           Grouped by feature area for easy scanning.
// =============================================================================

/**
 * bindEvents
 * @description Attaches all UI event listeners. Called once on DOMContentLoaded.
 * @used-in  App init
 */
function bindEvents() {

  // ── Theme toggle ──
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // ── Manual refresh button ──
  document.getElementById('refresh-btn')?.addEventListener('click', () => refreshData());

  // ── Status filter buttons (All / Running / Standby / Online / Offline / Not Configured) ──
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderDevices();
    });
  });

  // ── Type filter dropdown ──
  document.getElementById('filter-type')?.addEventListener('change', e => {
    state.typeFilter = e.target.value;
    renderDevices();
  });

  // ── Location filter dropdown ──
  document.getElementById('filter-location')?.addEventListener('change', e => {
    state.locationFilter = e.target.value;
    renderDevices();
  });

  // ── Sort dropdown ──
  document.getElementById('sort-by')?.addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderDevices();
  });

  // ── Search input ──
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', e => {
    state.search = e.target.value;
    renderDevices();
  });
  document.getElementById('clear-search')?.addEventListener('click', () => {
    if (searchInput) { searchInput.value = ''; state.search = ''; renderDevices(); }
  });

  // ── Grid / List view toggle ──
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.view = btn.dataset.view;
      renderDevices();
    });
  });

  // ── Modal: close button, backdrop click, ESC key ──
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('device-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Chart tab switcher ──
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.chart-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('chart-' + target)?.classList.add('active');
      if (target === 'flow') initFlowChart(); else initTelChart();
    });
  });
}

// =============================================================================
// SECTION 12 · APP INIT
// Purpose : Bootstrap the entire application on DOMContentLoaded.
//           Order matters: theme → filters → events → render → charts → clock
//           → auto-refresh.
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Apply saved theme
  applyTheme(state.theme);

  // 2. Populate dynamic filters (location dropdown)
  populateFilters();

  // 3. Bind all UI event handlers
  bindEvents();

  // 4. Render stat cards + device grid from seed data
  renderStats();
  renderDevices();

  // 5. Render charts
  initTelChart();
  initFlowChart();

  // 6. Start live clock
  startClock();

  // 7. Show last-updated timestamp
  renderLastUpdated();

  // 8. Start 10-minute auto-refresh loop (no-op if config.js not loaded)
  startAutoRefresh();

  console.log('[JUMC IoT] Dashboard initialised. API polling:', CONFIG.username ? 'ENABLED' : 'DISABLED (no config.js)');
});
