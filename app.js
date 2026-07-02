// =====================================================
// JUNAGADH MUNICIPAL CORPORATION - IoT Dashboard
// Last synced: 2026-07-02 21:03 IST
// =====================================================

const DEVICES_DATA = [
  {id:"0599ab60-760f-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-2",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783006391946,createdTime:1782994231574,telemetry:{chip_id:"686F9DF9D108",device_id:"PADARIYAFT-PUMP-2",datetime:"2026-07-02 21:03:10",data_current_r:1.9393,data_current_y:1.8583,data_current_b:2.0529,data_voltage_r_n:247.33,data_voltage_y_n:247.42,data_voltage_b_n:246.35,data_voltage_r_y:428.4661,data_voltage_y_b:427.6177,data_voltage_b_r:427.5397,data_kw:-1.1496,data_kva:1.4605,data_kvarh:1.831,data_kwh:2.403,data_kvah:3.031,data_pf:-0.7871,data_pf_r:-0.825,data_pf_y:-0.772,data_pf_b:-0.782,data_frequency:49.83,running_time_min:20.3,total_running_hours:-1485833.39,start_stop_count:4}},
  {id:"07afffd0-7470-11f1-b06d-0f068c9b61d7",name:"Dharamaveda-Flow-1",type:"Flow-Meter",location:"Dharamaveda",active:true,lastActivityTime:1783006393795,createdTime:1782815993933,telemetry:{}},
  {id:"0ddf82e0-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-4",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783006389395,createdTime:1782820299278,telemetry:{chip_id:"C0C90FB3A3A0",device_id:"Sardarbag-OLD-PUMP-4",datetime:"2026-07-02 21:03:37",data_current_r:327.675,data_current_y:327.675,data_current_b:327.675,data_voltage_r_n:655.35,data_voltage_y_n:655.35,data_voltage_b_n:655.35,data_voltage_r_y:1.1351,data_voltage_y_b:1.1351,data_voltage_b_r:1.1351,data_kw:0,data_kva:0,data_kvarh:52427768.644,data_kwh:52462648.646,data_kvah:25679496.976,data_pf:1,data_pf_r:-0.001,data_pf_y:-0.001,data_pf_b:-0.001,data_frequency:655.35,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"30851eb0-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-1",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828088347,telemetry:{}},
  {id:"33316280-7456-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Flow-1",type:"Flow-Meter",location:"Anandpur",active:true,lastActivityTime:1783006414696,createdTime:1782804900008,telemetry:{chip_id:"000A9DF9D108",device_id:"Anandpur-New-Flow-1",datetime:"2026-07-02 21:03:32",data_flow_rate:0,data_flow_total:0,data_flow_unit:0,data_flow_decimal_point:0,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:0}},
  {id:"378ba800-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-1",type:"Pump",location:"Dharmaveda",active:true,lastActivityTime:1783006415915,createdTime:1782815215232,telemetry:{chip_id:"581DDBF9D108",device_id:"Dharmaveda-PUMP-1",datetime:"2026-07-02 21:03:34",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:238.43,data_voltage_y_n:231.73,data_voltage_b_n:237.81,data_voltage_r_y:407.1843,data_voltage_y_b:406.645,data_voltage_b_r:412.436,data_kw:0,data_kva:0,data_kvarh:1292.342,data_kwh:2400.183,data_kvah:2737.141,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-495264.99,start_stop_count:3}},
  {id:"44dfd800-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-2",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828122496,telemetry:{}},
  {id:"4ebc4b30-744e-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-1",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783006391986,createdTime:1782801510243,telemetry:{chip_id:"5806DBF9D108",device_id:"ANANDPUR-PUMP-1",datetime:"2026-07-02 21:03:09",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:248.75,data_voltage_y_n:248.67,data_voltage_b_n:247.14,data_voltage_r_y:430.7783,data_voltage_y_b:429.3847,data_voltage_b_r:429.4541,data_kw:0,data_kva:0,data_kvarh:275492.391,data_kwh:1115837.587,data_kvah:1238068.198,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-1485751.25,start_stop_count:4}},
  {id:"4ed89480-7448-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-3",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783006390083,createdTime:1782798933448,telemetry:{chip_id:"2C9D0EB3A3A0",device_id:"ANANDPUR-PUMP-3",datetime:"2026-07-02 21:03:37",data_current_r:160.56,data_current_y:153.728,data_current_b:0,data_voltage_r_n:248.78,data_voltage_y_n:248.88,data_voltage_b_n:247.21,data_voltage_r_y:430.9862,data_voltage_y_b:429.6274,data_voltage_b_r:429.5407,data_kw:77.8995,data_kva:78.2516,data_kvarh:443371.999,data_kwh:365673.106,data_kvah:632459.196,data_pf:0.9955,data_pf_r:0.994,data_pf_y:0.996,data_pf_b:1,data_frequency:49.82,running_time_min:20.4,total_running_hours:-2971561.69,start_stop_count:8}},
  {id:"59145100-7452-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Pump-1",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783006418386,createdTime:1782803245584,telemetry:{chip_id:"1CE59CF9D108",device_id:"Anandpur-NEW-Pump-1",datetime:"2026-07-02 21:03:35",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:250.57,data_voltage_y_n:250.82,data_voltage_b_n:253.32,data_voltage_r_y:434.2165,data_voltage_y_b:436.5998,data_voltage_b_r:436.3837,data_kw:0,data_kva:0,data_kvarh:328611.323,data_kwh:621367.737,data_kvah:705130.217,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-495262.57,start_stop_count:2}},
  {id:"5b98cca0-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-Pump-3",type:"Pump",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828160618,telemetry:{}},
  {id:"62a41a70-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-FLOW-1",type:"Flow-Meter",location:"Sardarbag",active:false,lastActivityTime:null,createdTime:1782820441495,telemetry:{}},
  {id:"6c4ba8a0-7505-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-2",type:"Pump",location:"Saragvada",active:false,lastActivityTime:null,createdTime:1782880157738,telemetry:{}},
  {id:"6dff0680-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-3",type:"Pump",location:"Adityanagar",active:true,lastActivityTime:1783006411789,createdTime:1782890039016,telemetry:{chip_id:"F03F9EF9D108",device_id:"Aditynagar-PUMP-3",datetime:"2026-07-02 21:03:28",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:255.48,data_voltage_y_n:254.97,data_voltage_b_n:257.6,data_voltage_r_y:442.0627,data_voltage_y_b:443.9006,data_voltage_b_r:444.3416,data_kw:0,data_kva:0,data_kvarh:15.623,data_kwh:9.18,data_kvah:20.724,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"6f21ea70-7452-11f1-b06d-0f068c9b61d7",name:"Anandpur-NEW-Pump-2",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783006392715,createdTime:1782803282583,telemetry:{chip_id:"3C080FB3A3A0",device_id:"ANANDPUR-NEW-PUMP-2",datetime:"2026-07-02 21:03:11",data_current_r:151.2,data_current_y:156.336,data_current_b:158.208,data_voltage_r_n:250.43,data_voltage_y_n:250.85,data_voltage_b_n:253.34,data_voltage_r_y:434.1212,data_voltage_y_b:436.6431,data_voltage_b_r:436.28,data_kw:103.4431,data_kva:117.0536,data_kvarh:149330.679,data_kwh:283727.792,data_kvah:321752.631,data_pf:0.8837,data_pf_r:0.901,data_pf_y:0.875,data_pf_b:0.877,data_frequency:49.83,running_time_min:332.6,total_running_hours:-990499.67,start_stop_count:4}},
  {id:"7133a190-7601-11f1-b06d-0f068c9b61d7",name:"PadariyaFT-Flow",type:"Flow-Meter",location:"Padariya",active:true,lastActivityTime:1783006401282,createdTime:1782988399145,telemetry:{chip_id:"98EC9DF9D108",device_id:"PADARIYAFT-FLOW",datetime:"2026-07-02 21:03:20",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"723ef3f0-7539-11f1-b06d-0f068c9b61d7",name:"Khamdhrol-FLOW-1",type:"Flow-Meter",location:"Khamdhrol",active:true,lastActivityTime:1783006405120,createdTime:1782899052336,telemetry:{chip_id:"EC329EF9D108",device_id:"Khamdhrol-FLOW-1",datetime:"2026-07-02 21:03:24",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"79a2a190-7490-11f1-b06d-0f068c9b61d7",name:"Gopalwadi",type:"Flow-Meter",location:"Gopalwadi",active:true,lastActivityTime:1783006396022,createdTime:1782830368714,telemetry:{chip_id:"5C9E9DF9D108",device_id:"GOPALWADI-FLOW",datetime:"2026-07-02 21:03:16",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"7afed300-748c-11f1-b06d-0f068c9b61d7",name:"Timbavadi-old-FLOW-1",type:"Flow-Meter",location:"Timbavadi",active:false,lastActivityTime:null,createdTime:1782828202912,telemetry:{}},
  {id:"7f2d6fd0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-1",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783006388942,createdTime:1782877760284,telemetry:{chip_id:"98399CF9D108",device_id:"Dolatpara-PUMP-1",datetime:"2026-07-02 21:03:08",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.44,data_voltage_y_n:255.27,data_voltage_b_n:257.96,data_voltage_r_y:441.2939,data_voltage_y_b:444.4089,data_voltage_b_r:443.5564,data_kw:0,data_kva:0,data_kvarh:6655.22,data_kwh:7555.305,data_kvah:10109.609,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"828d29f0-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-2",type:"Pump",location:"Dharmaveda",active:true,lastActivityTime:1783006384004,createdTime:1782815319260,telemetry:{chip_id:"44D89DF9D108",device_id:"Dharmaveda-PUMP-2",datetime:"2026-07-02 21:03:04",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:238.66,data_voltage_y_n:232.05,data_voltage_b_n:237.86,data_voltage_r_y:407.6602,data_voltage_y_b:406.9644,data_voltage_b_r:412.6786,data_kw:0,data_kva:0,data_kvarh:1051.65,data_kwh:2013.865,data_kvah:2280.095,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-495264.98,start_stop_count:3}},
  {id:"8331b0e0-747a-11f1-b06d-0f068c9b61d7",name:"Sardarbag-FLOW-2",type:"Flow-Meter",location:"Sardarbag",active:false,lastActivityTime:null,createdTime:1782820499668,telemetry:{}},
  {id:"85d39bc0-7505-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-3",type:"Pump",location:"Saragvada",active:false,lastActivityTime:null,createdTime:1782880233316,telemetry:{}},
  {id:"8aa06ea0-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-2",type:"Pump",location:"Adityanagar",active:true,lastActivityTime:1783006385005,createdTime:1782889925004,telemetry:{chip_id:"2C3A9CF9D108",device_id:"Aditynagar-PUMP-2",datetime:"2026-07-02 21:03:05",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:255.54,data_voltage_y_n:254.9,data_voltage_b_n:257.64,data_voltage_r_y:442.0541,data_voltage_y_b:443.8748,data_voltage_b_r:444.4281,data_kw:0,data_kva:0,data_kvarh:156920.393,data_kwh:8003.811,data_kvah:157698.67,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:1.81,start_stop_count:2}},
  {id:"8e33f2a0-753d-11f1-b06d-0f068c9b61d7",name:"Khamdhrol-Pump-1",type:"Pump",location:"Khamdhrol",active:true,lastActivityTime:1783006380000,createdTime:1782901016348,telemetry:{chip_id:"840A9CF9D108",device_id:"Khamdhrol-Pump-1",datetime:"2026-07-02 21:03:00",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:0,data_voltage_y_n:0,data_voltage_b_n:0,data_voltage_r_y:0,data_voltage_y_b:0,data_voltage_b_r:0,data_kw:0,data_kva:0,data_kvarh:0,data_kwh:0,data_kvah:0,data_pf:0,data_pf_r:0,data_pf_y:0,data_pf_b:0,data_frequency:0,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"9702e740-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-PUMP-1",type:"Pump",location:"Adityanagar",active:false,lastActivityTime:null,createdTime:1782889763968,telemetry:{}},
  {id:"97838700-746e-11f1-b06d-0f068c9b61d7",name:"Dharmaveda-Pump-3",type:"Pump",location:"Dharmaveda",active:false,lastActivityTime:null,createdTime:1782815342952,telemetry:{}},
  {id:"a906b550-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-1",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783006369000,createdTime:1782820242048,telemetry:{chip_id:"78E6DAF9D108",device_id:"Sardarbag-PUMP-1",datetime:"2026-07-02 21:02:49",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.22,data_voltage_y_n:245.68,data_voltage_b_n:249.08,data_voltage_r_y:424.2664,data_voltage_y_b:428.4781,data_voltage_b_r:427.2172,data_kw:0,data_kva:0,data_kvarh:20287.586,data_kwh:36567.969,data_kvah:42504.952,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.84,running_time_min:0,total_running_hours:3.26,start_stop_count:1}},
  {id:"aeafd8d0-751c-11f1-b06d-0f068c9b61d7",name:"AdityNager-FLOW-1",type:"Flow-Meter",location:"Adityanagar",active:false,lastActivityTime:1782967436000,createdTime:1782890162340,telemetry:{chip_id:"1C58DBF9D108",device_id:"ADITYANAGAR-FLOW",datetime:"2026-07-02 09:03:56",data_flow_rate:0,data_flow_total:0,data_flow_unit:1,flow_rate:0,flow_total:0,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:3}},
  {id:"c2782730-760e-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-1",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783006368000,createdTime:1782994052424,telemetry:{chip_id:"74AF93F9D108",device_id:"PADARIYAFT-PUMP-1",datetime:"2026-07-02 21:02:48",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:247.31,data_voltage_y_n:247.6,data_voltage_b_n:246.21,data_voltage_r_y:428.6047,data_voltage_y_b:427.6526,data_voltage_b_r:427.4012,data_kw:0,data_kva:0,data_kvarh:94533.18,data_kwh:10730.115,data_kvah:95561.476,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e08392a0-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-2",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783006392000,createdTime:1782820274856,telemetry:{chip_id:"B0079CF9D108",device_id:"Sardarbag-PUMP-2",datetime:"2026-07-02 21:03:12",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.23,data_voltage_y_n:245.57,data_voltage_b_n:249.15,data_voltage_r_y:424.1798,data_voltage_y_b:428.4438,data_voltage_b_r:427.2867,data_kw:0,data_kva:0,data_kvarh:2681.639,data_kwh:6063.986,data_kvah:6774.303,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e263dd70-744f-11f1-b06d-0f068c9b61d7",name:"Anandpur-Pump-2",type:"Pump",location:"Anandpur",active:true,lastActivityTime:1783006387000,createdTime:1782801598784,telemetry:{chip_id:"10F5DBF9D108",device_id:"ANANDPUR-PUMP-2",datetime:"2026-07-02 21:03:07",data_current_r:153.968,data_current_y:152.96,data_current_b:0,data_voltage_r_n:248.81,data_voltage_y_n:248.77,data_voltage_b_n:247.05,data_voltage_r_y:430.9169,data_voltage_y_b:429.3936,data_voltage_b_r:429.4283,data_kw:-75.8881,data_kva:76.2548,data_kvarh:385837.434,data_kwh:285056.181,data_kvah:524626.575,data_pf:-0.9952,data_pf_r:-0.995,data_pf_y:-0.995,data_pf_b:1,data_frequency:49.82,running_time_min:825.2,total_running_hours:-495254.73,start_stop_count:3}},
  {id:"e44bd1e0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-2",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783006386000,createdTime:1782877834800,telemetry:{chip_id:"44349CF9D108",device_id:"Dolatpara-PUMP-2",datetime:"2026-07-02 21:03:06",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.28,data_voltage_y_n:255.17,data_voltage_b_n:257.87,data_voltage_r_y:441.1969,data_voltage_y_b:444.3077,data_voltage_b_r:443.5385,data_kw:0,data_kva:0,data_kvarh:4382.855,data_kwh:4931.525,data_kvah:6881.435,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"e4677e40-7613-11f1-b06d-0f068c9b61d7",name:"Padariya-Pump-3",type:"Pump",location:"Padariya",active:true,lastActivityTime:1783006370000,createdTime:1782994751244,telemetry:{chip_id:"9855DBF9D108",device_id:"PADARIYAFT-PUMP-3",datetime:"2026-07-02 21:02:50",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:247.26,data_voltage_y_n:247.19,data_voltage_b_n:246.31,data_voltage_r_y:428.2062,data_voltage_y_b:427.3837,data_voltage_b_r:427.4444,data_kw:0,data_kva:0,data_kvarh:0,data_kwh:0,data_kvah:0,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.84,running_time_min:0,total_running_hours:-495277.57,start_stop_count:1}},
  {id:"f11dad20-750b-11f1-b06d-0f068c9b61d7",name:"Saragvada-FLOW-1",type:"Flow-Meter",location:"Saragvada",active:true,lastActivityTime:1783006393000,createdTime:1782881038184,telemetry:{chip_id:"54889DF9D108",device_id:"Saragwada-FLOW-1",datetime:"2026-07-02 21:03:13",data_flow_rate:2.8,data_flow_total:0.19,data_flow_unit:1,flow_rate:2.7,flow_total:0.17,data_flow_decimal_point:1,data_flow_kilo_flag:0,data_flow_empty_pipe:0,data_flow_over_range:0,data_flow_total_decimal_point:2}},
  {id:"f3ecaca0-7500-11f1-b06d-0f068c9b61d7",name:"Dolatpara-PUMP-3",type:"Pump",location:"Dolatpara",active:true,lastActivityTime:1783006396000,createdTime:1782877882584,telemetry:{chip_id:"900CDBF9D108",device_id:"Dolatpara-PUMP-3",datetime:"2026-07-02 21:03:16",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:254.11,data_voltage_y_n:255.17,data_voltage_b_n:258.02,data_voltage_r_y:441.0497,data_voltage_y_b:444.4378,data_voltage_b_r:443.5219,data_kw:0,data_kva:0,data_kvarh:301.706,data_kwh:380.468,data_kvah:487.52,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:0,start_stop_count:0}},
  {id:"f5525a50-7504-11f1-b06d-0f068c9b61d7",name:"Saragvada-PUMP-1",type:"Pump",location:"Saragvada",active:true,lastActivityTime:1783006390000,createdTime:1782880075152,telemetry:{chip_id:"E4E09DF9D108",device_id:"Saragvada-PUMP-1",datetime:"2026-07-02 21:03:10",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:239.14,data_voltage_y_n:233.55,data_voltage_b_n:239.28,data_voltage_r_y:409.3711,data_voltage_y_b:409.4928,data_voltage_b_r:414.3239,data_kw:0,data_kva:0,data_kvarh:1511.962,data_kwh:3394.639,data_kvah:3792.402,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.82,running_time_min:0,total_running_hours:-7924275.15,start_stop_count:18}},
  {id:"fa291fe0-7479-11f1-b06d-0f068c9b61d7",name:"Sardarbag-Pump-3",type:"Pump",location:"Sardarbag",active:true,lastActivityTime:1783006393000,createdTime:1782820340132,telemetry:{chip_id:"38400FB3A3A0",device_id:"Sardarbag-PUMP-3",datetime:"2026-07-02 21:03:13",data_current_r:0,data_current_y:0,data_current_b:0,data_voltage_r_n:244.46,data_voltage_y_n:245.83,data_voltage_b_n:249.34,data_voltage_r_y:424.6042,data_voltage_y_b:428.8334,data_voltage_b_r:427.6503,data_kw:0,data_kva:0,data_kvarh:9301.102,data_kwh:23075.093,data_kvah:25753.08,data_pf:1,data_pf_r:1,data_pf_y:1,data_pf_b:1,data_frequency:49.83,running_time_min:0,total_running_hours:-6933752.1,start_stop_count:14}},
  {id:"ff89d350-7459-11f1-b06d-0f068c9b61d7",name:"ANANDPUR-FLOW-1",type:"Flow-Meter",location:"Anandpur",active:true,lastActivityTime:1783006413000,createdTime:1782806437612,telemetry:{}},
  {id:"ff958af0-748c-11f1-b06d-0f068c9b61d7",name:"Varun-Pumping-FLOW-1",type:"Flow-Meter",location:"Varun Pumping",active:false,lastActivityTime:null,createdTime:1782828219992,telemetry:{}}
];

// ─── APP STATE ───────────────────────────────────────────────────────────────
const state = {
  theme: localStorage.getItem('iot-theme') || 'dark',
  filter: 'all', typeFilter: 'all', locationFilter: 'all',
  search: '', selectedDevice: null, view: 'grid', sortBy: 'name', sortDir: 'asc',
  lastUpdated: new Date('2026-07-02T21:03:37+05:30')
};

function getStats() {
  const total = DEVICES_DATA.length;
  const online = DEVICES_DATA.filter(d => d.active).length;
  const pumps = DEVICES_DATA.filter(d => d.type === 'Pump').length;
  const flowMeters = total - pumps;
  const running = DEVICES_DATA.filter(d => d.type==='Pump' && d.active && Math.abs(parseFloat(d.telemetry.data_kw)||0)>0).length;
  const totalKW = DEVICES_DATA.reduce((s,d)=>s+Math.abs(parseFloat(d.telemetry.data_kw)||0),0);
  const totalKWH = DEVICES_DATA.reduce((s,d)=>{const v=parseFloat(d.telemetry.data_kwh)||0;return s+(v<1e7?v:0);},0);
  return {total,online,offline:total-online,pumps,flowMeters,running,totalKW,totalKWH};
}

function getLocations() { return [...new Set(DEVICES_DATA.map(d=>d.location))].sort(); }

function getFilteredDevices() {
  let d=[...DEVICES_DATA];
  if(state.filter==='online') d=d.filter(x=>x.active);
  else if(state.filter==='offline') d=d.filter(x=>!x.active);
  if(state.typeFilter!=='all') d=d.filter(x=>x.type===state.typeFilter);
  if(state.locationFilter!=='all') d=d.filter(x=>x.location===state.locationFilter);
  if(state.search){const q=state.search.toLowerCase();d=d.filter(x=>x.name.toLowerCase().includes(q)||x.location.toLowerCase().includes(q)||(x.telemetry.chip_id&&x.telemetry.chip_id.toLowerCase().includes(q)));}
  d.sort((a,b)=>{
    let va,vb;
    if(state.sortBy==='name'){va=a.name;vb=b.name;}
    else if(state.sortBy==='status'){va=a.active?1:0;vb=b.active?1:0;}
    else if(state.sortBy==='location'){va=a.location;vb=b.location;}
    else if(state.sortBy==='kw'){va=Math.abs(parseFloat(a.telemetry.data_kw)||0);vb=Math.abs(parseFloat(b.telemetry.data_kw)||0);}
    if(typeof va==='string') return state.sortDir==='asc'?va.localeCompare(vb):vb.localeCompare(va);
    return state.sortDir==='asc'?va-vb:vb-va;
  });
  return d;
}

function formatTime(ts) {
  if(!ts) return 'Never';
  return new Date(ts).toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour12:true,day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
}
function timeSince(ts) {
  if(!ts) return 'N/A';
  const diff=Date.now()-ts, m=Math.floor(diff/60000);
  if(m<1) return 'just now';
  if(m<60) return m+'m ago';
  const h=Math.floor(m/60);
  if(h<24) return h+'h ago';
  return Math.floor(h/24)+'d ago';
}
function fmtNum(v,dec=2){
  const n=parseFloat(v);
  if(isNaN(n)) return '—';
  if(Math.abs(n)>1e6) return (n/1e6).toFixed(2)+'M';
  if(Math.abs(n)>999) return (n/1000).toFixed(2)+'K';
  return n.toFixed(dec);
}
function getPFColor(pf){const v=Math.abs(parseFloat(pf)||0);return v>=0.95?'var(--green)':v>=0.85?'var(--yellow)':'var(--red)';}
function getVoltageStatus(v){const val=parseFloat(v)||0;if(val>=220&&val<=265)return'normal';if(val>0&&val<220)return'warning';return'idle';}
function locIcon(loc){return({'Anandpur':'🏘️','Sardarbag':'🌿','Dharmaveda':'⚡','Dharamaveda':'⚡','Saragvada':'💧','Padariya':'🔧','Dolatpara':'🏭','Timbavadi':'⚙️','Adityanagar':'🌆','Khamdhrol':'🔩','Gopalwadi':'🌊','Varun Pumping':'💦'}[loc]||'📍');}
function pumpSVG(){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22"><path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>`;}
function flowSVG(){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;}

// CHARTS
let donutChart=null, telChart=null, flowChart=null;

function getCC(){
  const d=state.theme==='dark';
  return{grid:d?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.07)',tick:d?'#8892a4':'#64748b',leg:d?'#c0ccd8':'#334155'};
}

function initDonut(online,offline){
  const ctx=document.getElementById('donutChart');if(!ctx)return;
  if(donutChart)donutChart.destroy();
  donutChart=new Chart(ctx,{
    type:'doughnut',
    data:{labels:['Online','Offline'],datasets:[{data:[online,offline],backgroundColor:['#00d4aa','#ff4757'],borderWidth:0,hoverOffset:10}]},
    options:{cutout:'72%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed}`}}},animation:{duration:900}}
  });
}

function initTelChart(){
  const ctx=document.getElementById('telChart');if(!ctx)return;
  const c=getCC();
  const pumps=DEVICES_DATA.filter(d=>d.type==='Pump'&&d.active&&Object.keys(d.telemetry).length>0).slice(0,10);
  if(telChart)telChart.destroy();
  telChart=new Chart(ctx,{
    type:'bar',
    data:{
      labels:pumps.map(d=>d.name.replace(/-Pump-/,'-P').replace(/-PUMP-/,'-P').slice(0,12)),
      datasets:[
        {label:'Power (kW)',data:pumps.map(d=>Math.abs(parseFloat(d.telemetry.data_kw)||0)),backgroundColor:'rgba(0,212,170,0.8)',borderRadius:5,yAxisID:'y'},
        {label:'Voltage R-N (V)',data:pumps.map(d=>parseFloat(d.telemetry.data_voltage_r_n)||0),type:'line',borderColor:'#7461ef',backgroundColor:'rgba(116,97,239,0.1)',tension:0.4,pointRadius:4,fill:true,yAxisID:'y1'}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,
      scales:{
        y:{type:'linear',position:'left',grid:{color:c.grid},ticks:{color:'#00d4aa',font:{size:10}}},
        y1:{type:'linear',position:'right',grid:{drawOnChartArea:false},ticks:{color:'#7461ef',font:{size:10}}},
        x:{grid:{display:false},ticks:{color:c.tick,font:{size:9},maxRotation:35}}
      },
      plugins:{legend:{labels:{color:c.leg,font:{size:11},boxWidth:12}}}
    }
  });
}

function initFlowChart(){
  const ctx=document.getElementById('flowChart');if(!ctx)return;
  const c=getCC();
  const fds=DEVICES_DATA.filter(d=>d.type==='Flow-Meter'&&Object.keys(d.telemetry).length>0);
  if(flowChart)flowChart.destroy();
  flowChart=new Chart(ctx,{
    type:'bar',
    data:{
      labels:fds.map(d=>d.name.split('-')[0]),
      datasets:[
        {label:'Flow Rate (m³/h)',data:fds.map(d=>parseFloat(d.telemetry.data_flow_rate)||parseFloat(d.telemetry.flow_rate)||0),backgroundColor:'rgba(0,186,255,0.8)',borderRadius:5},
        {label:'Total (m³)',data:fds.map(d=>parseFloat(d.telemetry.data_flow_total)||parseFloat(d.telemetry.flow_total)||0),backgroundColor:'rgba(255,167,38,0.75)',borderRadius:5}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,
      scales:{
        y:{grid:{color:c.grid},ticks:{color:c.tick,font:{size:10}}},
        x:{grid:{display:false},ticks:{color:c.tick,font:{size:10}}}
      },
      plugins:{legend:{labels:{color:c.leg,font:{size:11},boxWidth:12}}}
    }
  });
}

function renderStats(){
  const s=getStats();
  const se=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  se('stat-total',s.total);se('stat-online',s.online);se('stat-offline',s.offline);
  se('stat-pumps',s.pumps);se('stat-flow',s.flowMeters);
  se('stat-kw',s.totalKW.toFixed(1)+' kW');se('stat-kwh',(s.totalKWH/1000).toFixed(1)+' MWh');
  se('stat-running',s.running);
  initDonut(s.online,s.offline);
}

function deviceCard(d){
  const hasTel=Object.keys(d.telemetry).length>0;
  const isPump=d.type==='Pump';
  const kw=isPump?parseFloat(d.telemetry.data_kw)||0:0;
  const isRunning=isPump&&Math.abs(kw)>0;
  const sc=d.active?(isRunning?'running':'online'):'offline';
  const sl=d.active?(isRunning?'Running':'Standby'):'Offline';
  const vRN=isPump?parseFloat(d.telemetry.data_voltage_r_n)||0:0;
  const cur=isPump?parseFloat(d.telemetry.data_current_r)||0:0;
  const pf=isPump?parseFloat(d.telemetry.data_pf)||0:0;
  const hz=isPump?parseFloat(d.telemetry.data_frequency)||0:0;
  const fr=!isPump?(parseFloat(d.telemetry.data_flow_rate)||parseFloat(d.telemetry.flow_rate)||0):0;
  const ft=!isPump?(parseFloat(d.telemetry.data_flow_total)||parseFloat(d.telemetry.flow_total)||0):0;
  return `
<div class="device-card ${sc}" data-id="${d.id}" tabindex="0" role="button">
  <div class="card-header">
    <div class="card-icon ${isPump?'icon-pump':'icon-flow'}">${isPump?pumpSVG():flowSVG()}</div>
    <div class="card-title-group">
      <h3 class="card-name">${d.name}</h3>
      <span class="card-location">${locIcon(d.location)} ${d.location}</span>
    </div>
    <div class="status-badge ${sc}"><span class="status-dot"></span>${sl}</div>
  </div>
  <div class="card-type-tag ${isPump?'tag-pump':'tag-flow'}">${isPump?'⚙️ Pump · AVH 14-M1-E3-N1':'💧 Flow Meter'}</div>
  ${hasTel?`<div class="card-metrics">
    ${isPump?`
      <div class="metric"><span class="metric-label">V R-N</span><span class="metric-value ${getVoltageStatus(vRN)}">${fmtNum(vRN,1)}<small>V</small></span></div>
      <div class="metric"><span class="metric-label">Current</span><span class="metric-value">${fmtNum(cur,2)}<small>A</small></span></div>
      <div class="metric"><span class="metric-label">Power</span><span class="metric-value ${isRunning?'val-running':''}">${fmtNum(Math.abs(kw),2)}<small>kW</small></span></div>
      <div class="metric"><span class="metric-label">P.Factor</span><span class="metric-value" style="color:${getPFColor(pf)}">${fmtNum(Math.abs(pf),3)}</span></div>
      <div class="metric"><span class="metric-label">Freq</span><span class="metric-value">${fmtNum(hz,2)}<small>Hz</small></span></div>
      <div class="metric"><span class="metric-label">Energy</span><span class="metric-value">${fmtNum(d.telemetry.data_kwh,1)}<small>kWh</small></span></div>
    `:`
      <div class="metric wide"><span class="metric-label">Flow Rate</span><span class="metric-value flow-val">${fmtNum(fr,3)}<small>m³/h</small></span></div>
      <div class="metric wide"><span class="metric-label">Total Flow</span><span class="metric-value">${fmtNum(ft,3)}<small>m³</small></span></div>
    `}
  </div>`:`<div class="no-telemetry"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg> No telemetry data</div>`}
  <div class="card-footer">
    <span class="chip-id">${d.telemetry.chip_id?'🔲 '+d.telemetry.chip_id:'—'}</span>
    <span class="last-seen">🕐 ${timeSince(d.lastActivityTime)}</span>
  </div>
  ${isRunning?'<div class="running-pulse"></div>':''}
</div>`;
}

function renderDevices(){
  const devs=getFilteredDevices();
  const grid=document.getElementById('device-grid');
  const empty=document.getElementById('empty-state');
  const cnt=document.getElementById('result-count');
  if(cnt) cnt.textContent=devs.length+' device'+(devs.length!==1?'s':'');
  if(!devs.length){grid.style.display='none';empty.style.display='flex';return;}
  empty.style.display='none';
  grid.className=state.view==='grid'?'device-grid':'device-list';
  grid.style.display=state.view==='grid'?'grid':'flex';
  grid.innerHTML=devs.map(deviceCard).join('');
  grid.querySelectorAll('.device-card').forEach((el,i)=>{
    el.style.animationDelay=i*25+'ms';
    el.classList.add('card-enter');
    el.addEventListener('click',()=>openModal(DEVICES_DATA.find(d=>d.id===el.dataset.id)));
    el.addEventListener('keydown',e=>{if(e.key==='Enter')el.click();});
  });
}

function openModal(device){
  const modal=document.getElementById('device-modal');
  const content=document.getElementById('modal-content');
  const isPump=device.type==='Pump';
  const tel=device.telemetry;
  const hasTel=Object.keys(tel).length>0;
  const isRunning=isPump&&Math.abs(parseFloat(tel.data_kw)||0)>0;
  const sc=device.active?(isRunning?'running':'online'):'offline';
  const sl=device.active?(isRunning?'Running':'Online / Standby'):'Offline';
  content.innerHTML=`
<div class="modal-header">
  <div class="modal-icon ${isPump?'icon-pump':'icon-flow'}">${isPump?pumpSVG():flowSVG()}</div>
  <div class="modal-title-group">
    <h2 class="modal-title">${device.name}</h2>
    <p class="modal-subtitle">${locIcon(device.location)} ${device.location} &nbsp;•&nbsp; ${device.type}</p>
  </div>
  <div class="status-badge ${sc} modal-status"><span class="status-dot"></span>${sl}</div>
</div>
<div class="modal-meta">
  <div class="meta-item"><span>Device ID</span><strong>${tel.device_id||'—'}</strong></div>
  <div class="meta-item"><span>Chip ID</span><strong>${tel.chip_id||'—'}</strong></div>
  <div class="meta-item"><span>Last Activity</span><strong>${formatTime(device.lastActivityTime)}</strong></div>
  <div class="meta-item"><span>Registered</span><strong>${formatTime(device.createdTime)}</strong></div>
  <div class="meta-item"><span>Telemetry At</span><strong>${tel.datetime||'—'}</strong></div>
  <div class="meta-item"><span>Type</span><strong>${device.type}</strong></div>
</div>
${hasTel?`<h3 class="section-title">📡 Latest Telemetry</h3>
<div class="telemetry-grid">
${isPump?`
<div class="tel-section"><h4>⚡ Electrical</h4><table class="tel-table">
  <tr><td>Voltage R-N</td><td>${fmtNum(tel.data_voltage_r_n,2)} V</td></tr>
  <tr><td>Voltage Y-N</td><td>${fmtNum(tel.data_voltage_y_n,2)} V</td></tr>
  <tr><td>Voltage B-N</td><td>${fmtNum(tel.data_voltage_b_n,2)} V</td></tr>
  <tr><td>Voltage R-Y</td><td>${fmtNum(tel.data_voltage_r_y,2)} V</td></tr>
  <tr><td>Voltage Y-B</td><td>${fmtNum(tel.data_voltage_y_b,2)} V</td></tr>
  <tr><td>Voltage B-R</td><td>${fmtNum(tel.data_voltage_b_r,2)} V</td></tr>
  <tr><td>Current R</td><td>${fmtNum(tel.data_current_r,3)} A</td></tr>
  <tr><td>Current Y</td><td>${fmtNum(tel.data_current_y,3)} A</td></tr>
  <tr><td>Current B</td><td>${fmtNum(tel.data_current_b,3)} A</td></tr>
  <tr><td>Frequency</td><td>${fmtNum(tel.data_frequency,2)} Hz</td></tr>
</table></div>
<div class="tel-section"><h4>🔋 Power & Energy</h4><table class="tel-table">
  <tr><td>Active Power</td><td><strong class="highlight">${fmtNum(tel.data_kw,3)} kW</strong></td></tr>
  <tr><td>Apparent Power</td><td>${fmtNum(tel.data_kva,3)} kVA</td></tr>
  <tr><td>Energy (kWh)</td><td>${fmtNum(tel.data_kwh,3)}</td></tr>
  <tr><td>Energy (kVAh)</td><td>${fmtNum(tel.data_kvah,3)}</td></tr>
  <tr><td>Reactive Energy</td><td>${fmtNum(tel.data_kvarh,3)}</td></tr>
  <tr><td>Power Factor</td><td style="color:${getPFColor(tel.data_pf)};font-weight:700">${fmtNum(Math.abs(tel.data_pf),4)}</td></tr>
  <tr><td>PF Phase R</td><td>${fmtNum(Math.abs(tel.data_pf_r),3)}</td></tr>
  <tr><td>PF Phase Y</td><td>${fmtNum(Math.abs(tel.data_pf_y),3)}</td></tr>
  <tr><td>PF Phase B</td><td>${fmtNum(Math.abs(tel.data_pf_b),3)}</td></tr>
</table></div>
<div class="tel-section"><h4>🕹️ Operation</h4><table class="tel-table">
  <tr><td>Run Time</td><td>${fmtNum(tel.running_time_min,1)} min</td></tr>
  <tr><td>Start/Stop Count</td><td>${tel.start_stop_count||0}</td></tr>
  <tr><td>Total Run Hours</td><td>${fmtNum(Math.abs(tel.total_running_hours),2)} h</td></tr>
</table></div>`
:`<div class="tel-section"><h4>💧 Flow Measurements</h4><table class="tel-table">
  <tr><td>Flow Rate</td><td><strong class="highlight">${fmtNum(tel.data_flow_rate||tel.flow_rate,3)} m³/h</strong></td></tr>
  <tr><td>Total Flow</td><td>${fmtNum(tel.data_flow_total||tel.flow_total,3)} m³</td></tr>
  <tr><td>Flow Unit</td><td>${tel.data_flow_unit||'—'}</td></tr>
  <tr><td>Decimal Point</td><td>${tel.data_flow_decimal_point||'—'}</td></tr>
  <tr><td>Kilo Flag</td><td>${tel.data_flow_kilo_flag||0}</td></tr>
  <tr><td>Empty Pipe</td><td>${tel.data_flow_empty_pipe?'⚠️ Yes':'No'}</td></tr>
  <tr><td>Over Range</td><td>${tel.data_flow_over_range?'⚠️ Yes':'No'}</td></tr>
</table></div>`}
</div>`:`<div class="modal-no-data"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg><p>No telemetry data available</p><small>Device may be offline or not yet configured.</small></div>`}
`;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(){
  document.getElementById('device-modal').classList.remove('open');
  document.body.style.overflow='';
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme',theme);
  const btn=document.getElementById('theme-toggle');
  if(!btn) return;
  btn.innerHTML=theme==='dark'
    ?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    :`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

function toggleTheme(){
  state.theme=state.theme==='dark'?'light':'dark';
  localStorage.setItem('iot-theme',state.theme);
  applyTheme(state.theme);
  setTimeout(()=>{initTelChart();initFlowChart();initDonut(getStats().online,getStats().offline);},80);
}

function populateFilters(){
  const sel=document.getElementById('filter-location');if(!sel)return;
  getLocations().forEach(loc=>{const o=document.createElement('option');o.value=loc;o.textContent=locIcon(loc)+' '+loc;sel.appendChild(o);});
}

function startClock(){
  const t=()=>{const el=document.getElementById('live-clock');if(el)el.textContent=new Date().toLocaleTimeString('en-IN',{hour12:true,hour:'2-digit',minute:'2-digit',second:'2-digit'});};
  t();setInterval(t,1000);
}

function renderLastUpdated(){
  const el=document.getElementById('last-updated');
  if(el) el.textContent='Synced: '+formatTime(state.lastUpdated.getTime());
}

function bindEvents(){
  document.getElementById('theme-toggle')?.addEventListener('click',toggleTheme);

  document.querySelectorAll('[data-filter]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.filter=btn.dataset.filter;
      renderDevices();
    });
  });

  document.getElementById('filter-type')?.addEventListener('change',e=>{state.typeFilter=e.target.value;renderDevices();});
  document.getElementById('filter-location')?.addEventListener('change',e=>{state.locationFilter=e.target.value;renderDevices();});
  document.getElementById('sort-by')?.addEventListener('change',e=>{state.sortBy=e.target.value;renderDevices();});

  const si=document.getElementById('search-input');
  si?.addEventListener('input',e=>{state.search=e.target.value;renderDevices();});
  document.getElementById('clear-search')?.addEventListener('click',()=>{if(si){si.value='';state.search='';renderDevices();}});

  document.querySelectorAll('[data-view]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');state.view=btn.dataset.view;renderDevices();
    });
  });

  document.getElementById('modal-close')?.addEventListener('click',closeModal);
  document.getElementById('device-modal')?.addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

  document.querySelectorAll('.chart-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.chart-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const tgt=tab.dataset.tab;
      document.querySelectorAll('.chart-panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('chart-'+tgt)?.classList.add('active');
      if(tgt==='flow') initFlowChart();else initTelChart();
    });
  });

  document.getElementById('refresh-btn')?.addEventListener('click',()=>{
    const btn=document.getElementById('refresh-btn');
    btn.classList.add('spinning');
    setTimeout(()=>{btn.classList.remove('spinning');state.lastUpdated=new Date();renderLastUpdated();renderStats();renderDevices();},1200);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  applyTheme(state.theme);
  populateFilters();
  bindEvents();
  renderStats();
  renderDevices();
  initTelChart();
  initFlowChart();
  startClock();
  renderLastUpdated();
});
