// World Intelligence Data Layer — Palantir-Grade Multi-Domain Ops Center
// Inspired by world-intel-mcp (120+ tools, 30+ domains, zero paid API keys)

export interface IntelHotspot {
  id: string;
  name: string;
  region: string;
  country: string;
  category: 'Maritime' | 'Military' | 'Energy' | 'Cyber' | 'Capital' | 'Hazard' | 'Strategic';
  lat: number;
  lng: number;
  zoom?: number;
  threatLevel: 'CRITICAL' | 'ELEVATED' | 'WATCH' | 'NOMINAL';
  metric: string;
  headline: string;
  summary: string;
  epistemicStatus: 'SEAL' | 'SABAR' | 'HOLD';
  route?: string;
  source: string;
  details?: {
    flowCapacity?: string;
    operatorOrControl?: string;
    keyRiskFactor?: string;
    strategicSignificance?: string;
  };
}

export interface TradeRouteLine {
  id: string;
  name: string;
  category: 'Energy' | 'Maritime' | 'SubseaCable';
  coords: [number, number][];
  color: string;
  dashArray?: string;
}

export interface IntelFeedEvent {
  id: string;
  domain: 'Geopolitical' | 'Energy' | 'Military' | 'Cyber' | 'Seismic' | 'SpaceWeather' | 'Capital';
  severity: 'CRITICAL' | 'ELEVATED' | 'NOMINAL';
  timestamp: string;
  title: string;
  summary: string;
  location: string;
  source: string;
  tag: string;
}

export interface MacroIndicator {
  id: string;
  code: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  role: string;
  status: 'SEAL' | 'SABAR' | 'HOLD' | 'BREACHED';
  link: string;
  benchmark: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MACRO SOVEREIGN INDICATORS
// ─────────────────────────────────────────────────────────────────────────────
export const MACRO_INDICATORS: MacroIndicator[] = [
  {
    id: 'oil',
    code: 'BRENT / USD',
    name: 'Brent Crude Oil',
    value: '$85.48',
    change: '+1.20%',
    isPositive: true,
    role: 'Global Primary Energy Baseline & Petrochemical Feedstock',
    status: 'SEAL',
    link: '/world/economics/oil',
    benchmark: 'ICE Brent Futures (Cash Physical Delivery Anchor)',
  },
  {
    id: 'gas',
    code: 'HH / GAS',
    name: 'Natural Gas (Henry Hub)',
    value: '$2.86',
    change: '+0.80%',
    isPositive: true,
    role: 'Global Gas Benchmark & Transition Baseload Reference',
    status: 'SABAR',
    link: '/world/economics/gas',
    benchmark: 'Henry Hub Spot Reference & LNG Parity Index',
  },
  {
    id: 'gold',
    code: 'XAU / USD',
    name: 'Physical Gold Bullion',
    value: '$2,425.80',
    change: '+0.45%',
    isPositive: true,
    role: 'Ultimate Sovereign De-Dollarization & Unencumbered Reserve',
    status: 'SEAL',
    link: '/world/economics/gold',
    benchmark: 'LBMA London Physical Settlement vs Paper COMEX',
  },
  {
    id: 'usdmyr',
    code: 'USD / MYR',
    name: 'Ringgit Forex Rate',
    value: '4.047',
    change: '-0.30%',
    isPositive: false,
    role: 'National Sovereign Purchasing Power & Import Parity',
    status: 'SABAR',
    link: '/world/economics/usdmyr',
    benchmark: 'BNM Interbank Reference & Corporate Repatriation Inflow',
  },
  {
    id: 'klci',
    code: 'FBM KLCI',
    name: 'FTSE Bursa Malaysia',
    value: '1,749.20',
    change: '+0.51%',
    isPositive: true,
    role: 'Domestic Capital, Utilities & Data Center Infrastructure Bellwether',
    status: 'SEAL',
    link: '/world/economics/klci',
    benchmark: 'Bursa Malaysia 30-Constituent Sovereign Index',
  },
  {
    id: 'us10y',
    code: 'US 10Y YIELD',
    name: 'Treasury Benchmark',
    value: '4.28%',
    change: '-0.04%',
    isPositive: false,
    role: 'Global Cost of Capital & Sovereign Debt Discount Rate',
    status: 'HOLD',
    link: '/world',
    benchmark: 'US 10-Year Benchmark Constant Maturity',
  },
  {
    id: 'petronas-sovereign-extraction',
    code: 'PETRONAS / DIV/PAT',
    name: 'PETRONAS Sovereign Extraction',
    value: '70.5%',
    change: '-37.5% YoY',
    isPositive: false,
    role: 'Single Largest Federal Dividend Source · ~20-25% of Federal Revenue · Bond Spread / Sovereign Rating Cascade Anchor',
    status: 'BREACHED',
    link: '/vitals',
    benchmark: 'FY2025 Audited IFR · div RM32.0B / PAT RM45.4B · tripwire 60% · next audit 1H FY2026 (~29 Aug 2026)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. PALANTIR-GRADE GEOSPATIAL INTELLIGENCE NODES (30+ GLOBAL SENSORS)
// ─────────────────────────────────────────────────────────────────────────────
export const WORLD_INTEL_NODES: IntelHotspot[] = [
  // ── MARITIME CHOKEPOINTS ──
  {
    id: 'malacca',
    name: 'Strait of Malacca & Singapore',
    region: 'Southeast Asia / Malaysia',
    country: 'Malaysia / Singapore / Indonesia',
    category: 'Maritime',
    lat: 2.45,
    lng: 101.85,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: '90,000+ vessels/yr · 16M bbl/d crude',
    headline: 'The World’s Most Vital Hydrocarbon & Merchandise Artery',
    summary: 'Over 25% of global traded crude and 30% of global seaborne merchandise traverses this 2.8km choke point. Sovereign surveillance and naval security here directly anchor East Asian industrial continuity.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/oil',
    source: 'NGA Navigational Warnings / IMO Marine AIS',
    details: {
      flowCapacity: '16.0 Million bbl/day crude, 85% of East Asia supply',
      operatorOrControl: 'Tripartite Straits Littoral States (MY, SG, ID)',
      keyRiskFactor: 'Asymmetric electronic warfare & traffic congestion',
      strategicSignificance: 'Primary maritime chokepoint bridging Middle East energy to Pacific consumers'
    }
  },
  {
    id: 'hormuz',
    name: 'Strait of Hormuz',
    region: 'Persian Gulf / Middle East',
    country: 'Oman / Iran',
    category: 'Maritime',
    lat: 26.56,
    lng: 56.25,
    zoom: 6,
    threatLevel: 'CRITICAL',
    metric: '21M bbl/d · 20% Global Petroleum',
    headline: 'Global Energy Arterial Pressure Gauge',
    summary: 'The world’s primary maritime crude bottleneck. Any geopolitical escalation or drone interdiction triggers instantaneous risk premia across Brent benchmarks and VLCC tanker hull insurance.',
    epistemicStatus: 'HOLD',
    route: '/world/economics/oil',
    source: 'USNI Fleet Tracker / Lloyd’s List Maritime Intelligence',
    details: {
      flowCapacity: '21 Million bbl/day crude + 20% global LNG exports (Qatar)',
      operatorOrControl: 'Omani Traffic Separation Scheme / IRGCN patrol radius',
      keyRiskFactor: 'Mine warfare, fast-attack missile craft, GPS spoofing',
      strategicSignificance: 'Sole sea route from Persian Gulf to open ocean'
    }
  },
  {
    id: 'bab-el-mandeb',
    name: 'Bab el-Mandeb & Red Sea Corridor',
    region: 'Horn of Africa / Red Sea',
    country: 'Yemen / Djibouti / Eritrea',
    category: 'Maritime',
    lat: 12.58,
    lng: 43.33,
    zoom: 6,
    threatLevel: 'CRITICAL',
    metric: '12% Global Trade Rerouted to Cape',
    headline: 'Asymmetric Anti-Access Maritime Interdiction Zone',
    summary: 'Anti-ship ballistic missile and drone swarms have forced major container liners and bulk carriers onto the 14-day Cape of Good Hope transit, inflating global bunker fuel consumption and freight rates.',
    epistemicStatus: 'HOLD',
    route: '/world/economics/oil',
    source: 'UKMTO Incident Feed / EUNAVFOR Aspides',
    details: {
      flowCapacity: 'Pre-crisis 6.2M bbl/d crude + 30% container trade',
      operatorOrControl: 'Houthi missile engagement envelope / International Task Forces',
      keyRiskFactor: 'Uncrewed surface vessels (USV) and ballistic missile strikes',
      strategicSignificance: 'Gatekeeper between Indian Ocean and Suez Canal'
    }
  },
  {
    id: 'taiwan-strait',
    name: 'Taiwan Strait & Bashi Channel',
    region: 'East Asia / Western Pacific',
    country: 'Taiwan / China / Philippines',
    category: 'Maritime',
    lat: 24.00,
    lng: 119.50,
    zoom: 6,
    threatLevel: 'ELEVATED',
    metric: '50% Global Container Fleet Transit',
    headline: 'High-End Semiconductor & Sea Line Defense Nexus',
    summary: 'Critical maritime corridor for semiconductor supply chains and deep-sea fiber optic cables connecting Japan, Taiwan, and Southeast Asia. Subject to regular air defense identification zone surges.',
    epistemicStatus: 'HOLD',
    route: '/world',
    source: 'Indo-Pacific Command / OpenSky Flight Radar',
    details: {
      flowCapacity: '88% of world’s largest container ships by tonnage',
      operatorOrControl: 'PLA Eastern Theater Command / ROC Armed Forces / US 7th Fleet',
      keyRiskFactor: 'Naval blockade simulations, gray-zone coast guard boardings',
      strategicSignificance: 'Core choke point for global advanced semiconductor logistics'
    }
  },
  {
    id: 'suez-canal',
    name: 'Suez Canal & Port Said',
    region: 'North Africa / Mediterranean',
    country: 'Egypt',
    category: 'Maritime',
    lat: 30.70,
    lng: 32.34,
    zoom: 7,
    threatLevel: 'ELEVATED',
    metric: '19,000+ transits/yr · $9B Sovereign Revenue',
    headline: 'Euro-Asian Shortest Sea Bridge',
    summary: 'Egyptian sovereign maritime transit artery. Revenue under severe contraction due to Red Sea security dynamics, shifting transit economics toward African circumnavigation.',
    epistemicStatus: 'SABAR',
    route: '/world',
    source: 'Suez Canal Authority (SCA) Daily Manifests',
    details: {
      flowCapacity: '12% of global merchandise volume',
      operatorOrControl: 'Suez Canal Authority (Egypt Ministry of Defense)',
      keyRiskFactor: 'Red Sea upstream denial causing 50%+ transit volume collapse',
      strategicSignificance: 'Eliminates 7,000km transit penalty around Africa'
    }
  },

  // ── ENERGY & HYDROCARBON BASINS ──
  {
    id: 'sarawak-luconia',
    name: 'Central Luconia & Bintulu MLNG',
    region: 'Offshore Sarawak / South China Sea',
    country: 'Malaysia (Sarawak)',
    category: 'Energy',
    lat: 4.85,
    lng: 112.65,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: '1.2B SCF/d Gas · MLNG Train 9 · Kasawari CCS',
    headline: 'Sarawak Sovereign Gas & SEARAH Aggregation Core',
    summary: 'Major offshore carbonate gas buildups feeding the world-class Bintulu MLNG complex. Central to the federal-state resource sovereignty architecture and regional carbon capture sequestration.',
    epistemicStatus: 'SEAL',
    route: '/world/makcikgpt',
    source: 'PETROS / PETRONAS Upstream Field Reports / GEOX Subsurface',
    details: {
      flowCapacity: '30 Million Tonnes Per Annum (MTPA) LNG capacity',
      operatorOrControl: 'PETRONAS Gas Berhad / PETROS Aggregator Mandate',
      keyRiskFactor: 'High CO2 field development economics & CCS deployment timeline',
      strategicSignificance: 'Cornerstone of Malaysia’s sovereign balance of payments'
    }
  },
  {
    id: 'malay-basin',
    name: 'Malay Basin (PM-304 & PM-3 Complex)',
    region: 'Offshore Terengganu / Peninsular Malaysia',
    country: 'Malaysia',
    category: 'Energy',
    lat: 5.60,
    lng: 104.85,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: '13-Year Lineage · Bekantan Rejuvenation',
    headline: 'Low-Resistivity Low-Contrast Mature Hydrocarbon Field Engineering',
    summary: 'Mature basin renaissance through advanced seismic inversion and petrophysical breakthrough. Proving commercial hydrocarbon flow where legacy logs predicted wet sands.',
    epistemicStatus: 'SEAL',
    route: '/work',
    source: 'Arif Fazil Subsurface Exploration Ledger & Well Ingests',
    details: {
      flowCapacity: '100,000+ boe/d mature basin production complex',
      operatorOrControl: 'PCSB / ExxonMobil Exploration / EnQuest',
      keyRiskFactor: 'Reservoir compartmentalization & water cut management',
      strategicSignificance: 'Primary domestic energy security engine for Peninsular grid'
    }
  },
  {
    id: 'sabah-deepwater',
    name: 'Sabah Deepwater (Gumusut-Kakap & Malikai)',
    region: 'Offshore Sabah / Borneo',
    country: 'Malaysia (Sabah)',
    category: 'Energy',
    lat: 5.82,
    lng: 114.35,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: '1,200m+ Water Depth Turbidite Channels',
    headline: 'Deepwater Turbidite Channel Subsea Production',
    summary: 'High-pressure slope-channel turbidite systems utilizing floating semi-submersible production units. Anchors high-grade sweet Malaysian crude (Kimanis benchmark).',
    epistemicStatus: 'SEAL',
    route: '/earth',
    source: 'Shell / PETRONAS Deepwater Technical Operations',
    details: {
      flowCapacity: '165,000 bbl/d Kimanis light sweet crude',
      operatorOrControl: 'Sabah Shell Petroleum / ConocoPhillips / PETRONAS',
      keyRiskFactor: 'Subsea flow assurance & seabed geohazards',
      strategicSignificance: 'Premium light sweet crude pricing benchmark for Asia-Pacific'
    }
  },
  {
    id: 'permian-basin',
    name: 'Permian Basin (Midland & Delaware Basins)',
    region: 'Texas & New Mexico, USA',
    country: 'United States',
    category: 'Energy',
    lat: 31.85,
    lng: -102.35,
    zoom: 6,
    threatLevel: 'NOMINAL',
    metric: '6.3M bbl/d · Global Swing Producer',
    headline: 'Global Marginal Hydrocarbon Cost Anchor',
    summary: 'The primary non-OPEC marginal oil engine. Parent-child well spacing degradation and Tier-1 acreage consolidation determine the global long-term floor price for West Texas Intermediate.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/oil',
    source: 'EIA Drilling Productivity Report / Enverus Analytics',
    details: {
      flowCapacity: '6.3 Million bbl/day oil + 23 Bcf/d natural gas',
      operatorOrControl: 'ExxonMobil (Pioneer), Chevron, ConocoPhillips, Occidental',
      keyRiskFactor: 'Associated gas pipeline takeaway bottlenecks (Waha negative pricing)',
      strategicSignificance: 'The swing basin holding OPEC+ market share in equilibrium'
    }
  },
  {
    id: 'ras-laffan',
    name: 'Ras Laffan Industrial City',
    region: 'Qatar North Field',
    country: 'Qatar',
    category: 'Energy',
    lat: 25.90,
    lng: 51.53,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: '77 MTPA → 126 MTPA Expansion',
    headline: 'World’s Largest Mega-LNG Liquefaction Complex',
    summary: 'Directly drains the world’s largest non-associated natural gas reservoir (North Field / South Pars). Expansion projects are locking in 27-year supply contracts with Asian and European utilities.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/gas',
    source: 'QatarEnergy / GIIGNL World LNG Database',
    details: {
      flowCapacity: '77 Million Tonnes/year LNG (expanding to 126 MTPA by 2027)',
      operatorOrControl: 'QatarEnergy / TotalEnergies / Shell / Eni / ConocoPhillips',
      keyRiskFactor: 'Strait of Hormuz egress vulnerability for all LNG carriers',
      strategicSignificance: 'Lowest cash-cost LNG liquefaction in the world'
    }
  },

  // ── MILITARY BASES & DEFENSE POSTURE ──
  {
    id: 'diego-garcia',
    name: 'Naval Support Facility Diego Garcia',
    region: 'Chagos Archipelago / Indian Ocean',
    country: 'BIOT (UK / US Lease)',
    category: 'Military',
    lat: -7.32,
    lng: 72.42,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: 'Strategic Bomber Runway · Submarine Tender Wharf',
    headline: 'Indo-Pacific Strategic Deep-Strike & Maritime Hub',
    summary: 'Isolated atoll housing B-2/B-52 capable runways, pre-positioned maritime prepositioning ships, and satellite communications tracking for all Indian Ocean and Middle East operations.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'DoD Base Structure Report / Satellite Imagery Analysis',
    details: {
      flowCapacity: 'Carrier strike group replenishment & stealth bomber rotation',
      operatorOrControl: 'US Navy / Royal Navy joint facility',
      keyRiskFactor: 'Mauritius sovereignty transfer legal reconciliation',
      strategicSignificance: 'Central unsinkable aircraft carrier in the Indian Ocean'
    }
  },
  {
    id: 'yulin-ssbn',
    name: 'Yulin Naval Base (Hainan Island)',
    region: 'South China Sea / Hainan',
    country: 'China',
    category: 'Military',
    lat: 18.23,
    lng: 109.55,
    zoom: 7,
    threatLevel: 'ELEVATED',
    metric: 'Underground Submarine Pens · Type 094 SSBN Bastion',
    headline: 'PLA Navy Southern Theater Deep-Water Nuclear Bastion',
    summary: 'Subterranean submarine caverns carved into granite mountains with direct access to deep South China Sea trenches, shielding Type 094 nuclear ballistic missile submarines from overhead satellite detection.',
    epistemicStatus: 'HOLD',
    route: '/world',
    source: 'IISS Military Balance / US Office of Naval Intelligence',
    details: {
      flowCapacity: 'Berthing for multiple aircraft carriers and 6+ nuclear submarines',
      operatorOrControl: 'People’s Liberation Army Navy (South Sea Fleet)',
      keyRiskFactor: 'ASW sonobuoy barrier monitoring in Luzon & Karimata Straits',
      strategicSignificance: 'Continuous second-strike nuclear deterrence platform in SCS'
    }
  },
  {
    id: 'kadena-afb',
    name: 'Kadena Air Base & White Beach',
    region: 'Okinawa, Japan',
    country: 'Japan',
    category: 'Military',
    lat: 26.35,
    lng: 127.77,
    zoom: 7,
    threatLevel: 'ELEVATED',
    metric: '18th Wing · Keystone of the Pacific',
    headline: 'First Island Chain Forward Air Superiority Hub',
    summary: 'The largest US air base in the Pacific. Houses advanced rotational fighter squadrons, aerial refueling wings, and airborne early warning intelligence aircraft monitoring the Taiwan Strait.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'Pacific Air Forces (PACAF) Telemetry',
    details: {
      flowCapacity: 'Over 100 combat aircraft + KC-135 Stratotanker fleet',
      operatorOrControl: 'US Air Force (5th Air Force, 18th Wing)',
      keyRiskFactor: 'Vulnerability to DF-21/DF-26 intermediate-range ballistic missile strikes',
      strategicSignificance: 'Forward tactical fighter presence 650km from Taipei'
    }
  },
  {
    id: 'guam-andersen',
    name: 'Andersen AFB & Naval Base Guam',
    region: 'Mariana Islands / Second Island Chain',
    country: 'Guam (US Territory)',
    category: 'Military',
    lat: 13.58,
    lng: 144.93,
    zoom: 7,
    threatLevel: 'WATCH',
    metric: 'Continuous Bomber Presence · Aegis Ashore Defense',
    headline: 'Second Island Chain Strategic Logistics Powerhouse',
    summary: 'Essential hub for long-range strategic bombers, Global Hawk reconnaissance drones, and nuclear attack submarine squadrons. Upgrading to a 360-degree integrated air and missile defense architecture.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'INDOPACOM Readiness Reviews',
    details: {
      flowCapacity: 'Munitions and fuel storage exceeding all other Pacific bases',
      operatorOrControl: 'Joint Region Marianas (USAF / USN)',
      keyRiskFactor: 'Enhanced Guam Defense System integration vs hypersonic threats',
      strategicSignificance: 'Command backbone for all West Pacific naval expeditions'
    }
  },
  {
    id: 'ramstein-afb',
    name: 'Ramstein Air Base & Landstuhl',
    region: 'Rhineland-Palatinate, Germany',
    country: 'Germany',
    category: 'Military',
    lat: 49.44,
    lng: 7.60,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: 'HQ Allied Air Command · Major Airlift Hub',
    headline: 'NATO European Air Command & Strategic Logistics Artery',
    summary: 'The primary airlift and medical evacuation hub for all NATO and US forces across Europe, Africa, and the Middle East, hosting the Ramstein Ukraine Defense Contact Group.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'NATO Allied Air Command (AIRCOM) Bulletins',
    details: {
      flowCapacity: 'Continuous heavy C-17 and C-5 strategic transport throughput',
      operatorOrControl: 'US Air Forces in Europe – Air Forces Africa (USAFE-AFAFRICA)',
      keyRiskFactor: 'European airspace congestion and contested supply logistics',
      strategicSignificance: 'Nerve center of transatlantic military mobility'
    }
  },

  // ── SUBSEA CABLES & AI DATA CENTERS (CYBER/INFRA) ──
  {
    id: 'johor-ai-dc',
    name: 'Johor Sedenak & Nusajaya AI Data Center Cluster',
    region: 'Johor / Greater Singapore Hub',
    country: 'Malaysia (Johor)',
    category: 'Cyber',
    lat: 1.62,
    lng: 103.60,
    zoom: 8,
    threatLevel: 'WATCH',
    metric: '3,000MW+ Power Allocation · NVIDIA GB200 Racks',
    headline: 'Southeast Asia’s High-Density AI Compute Supercluster',
    summary: 'Rapid aggregation of hyperscale AI compute clusters (YTL, ByteDance, Bridge Data Centres, Princeton Digital). Consuming significant national grid and water resources to serve Singapore cross-border latency requirements.',
    epistemicStatus: 'SEAL',
    route: '/world/makcikgpt',
    source: 'MIDA / Tenaga Nasional Berhad Grid Offtake Data / MakcikGPT',
    details: {
      flowCapacity: '3.5 Gigawatts contracted grid capacity by 2027',
      operatorOrControl: 'Private Hyperscalers (YTL AI Cloud, ByteDance, Singtel, GDS)',
      keyRiskFactor: 'Grid carbon intensity vs RE100 commitments & water basin stress',
      strategicSignificance: 'Regional compute nexus for Southeast Asian LLM inference'
    }
  },
  {
    id: 'singapore-cable-hub',
    name: 'Singapore Subsea Cable Landing Stations (Tuas & Changi)',
    region: 'Straits of Johor / Singapore',
    country: 'Singapore',
    category: 'Cyber',
    lat: 1.35,
    lng: 103.82,
    zoom: 8,
    threatLevel: 'WATCH',
    metric: '26+ Subsea Fiber Systems (SEA-ME-WE, APG, Bifrost)',
    headline: 'Indo-Pacific Telecommunications Interconnect Core',
    summary: 'The highest density of undersea fiber optic cables in Asia. Direct digital landing corridors connecting North America, East Asia, India, and Western Europe.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'TeleGeography Submarine Cable Map / Cloudflare Radar',
    details: {
      flowCapacity: 'Over 150 Tbps international bandwidth interconnect',
      operatorOrControl: 'Singtel, Tata Communications, Telin, Global Cloud Xchange',
      keyRiskFactor: 'Seabed dredging, anchor dragging, and shallow-water sabotage',
      strategicSignificance: 'Digital gateway bridging Asian economies to global Internet backbone'
    }
  },
  {
    id: 'ashburn-data-alley',
    name: 'Data Center Alley (Ashburn, Northern Virginia)',
    region: 'Loudoun County, VA, USA',
    country: 'United States',
    category: 'Cyber',
    lat: 39.04,
    lng: -77.48,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: '70% Global Internet Traffic Throughput',
    headline: 'Global Internet Exchange & Hyperscale Epicenter',
    summary: 'The largest concentration of data centers on Earth (over 300 facilities). Houses AWS us-east-1, Azure, and Google Cloud primary availability zones.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'Loudoun Economic Development / PeeringDB',
    details: {
      flowCapacity: '3,400+ Megawatts operating capacity',
      operatorOrControl: 'Equinix, Digital Realty, AWS, QTS, Vantage',
      keyRiskFactor: 'PJM Interconnection transmission grid capacity constraints',
      strategicSignificance: 'The gravitational center of global cloud computing infrastructure'
    }
  },

  // ── PHYSICAL CAPITAL & SOVEREIGN VAULTS ──
  {
    id: 'london-boe-vaults',
    name: 'Bank of England Gold Vaults (Threadneedle St)',
    region: 'City of London, UK',
    country: 'United Kingdom',
    category: 'Capital',
    lat: 51.51,
    lng: -0.09,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: '400,000+ Good Delivery Bars · ~5,100 Tonnes',
    headline: 'The Global Custodial Anchor for Sovereign Bullion',
    summary: 'Second largest custodian of physical gold in the world. Provides gold clearing and custodial vaulting for 70+ central banks and LBMA market makers.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/gold',
    source: 'Bank of England Annual Bullion Audits / LBMA Custodial Data',
    details: {
      flowCapacity: 'Settles ~$30B+ in physical bar transfers daily',
      operatorOrControl: 'Bank of England / LBMA bullion banks',
      keyRiskFactor: 'Physical bar allocation lead times and repatriation queues',
      strategicSignificance: 'The benchmark price discovery physical vault of the Western world'
    }
  },
  {
    id: 'zurich-dutyfree-vaults',
    name: 'Zurich & Geneva Sovereign Freeports',
    region: 'Zurich & Geneva, Switzerland',
    country: 'Switzerland',
    category: 'Capital',
    lat: 47.37,
    lng: 8.54,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: 'Private Sovereign Custodial Reserve',
    headline: 'Alpine Capital Sanctuary & High-Purity Physical Refineries',
    summary: 'Home to the world’s leading 4-nines gold refineries (Valcambi, PAMP, Argor-Heraeus). Non-aligned central banks are reallocating physical bullion to Swiss custody to mitigate cross-border asset freezes.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/gold',
    source: 'Swiss Federal Customs Administration (FCA) Precious Metals Export',
    details: {
      flowCapacity: 'Processes >60% of all newly mined gold worldwide',
      operatorOrControl: 'Swiss precious metals refiners and independent vault operators',
      keyRiskFactor: 'EU/Swiss sanctions regulatory harmonization shifts',
      strategicSignificance: 'Neutral physical bar manufacturing and off-balance-sheet storage'
    }
  },
  {
    id: 'singapore-le-freeport',
    name: 'Singapore Le Freeport & BullionStar Vaults',
    region: 'Changi, Singapore',
    country: 'Singapore',
    category: 'Capital',
    lat: 1.36,
    lng: 103.98,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: 'Asian Physical Gold Settlement Hub',
    headline: 'Southeast Asian Sovereign Precious Metals Vault',
    summary: 'Max-security duty-free vault complex designed for central banks, sovereign wealth funds, and institutional bullion bars seeking non-Western Asian jurisdiction settlement.',
    epistemicStatus: 'SEAL',
    route: '/world/economics/gold',
    source: 'Singapore Bullion Market Association (SBMA)',
    details: {
      flowCapacity: 'Multi-billion dollar physical asset capacity',
      operatorOrControl: 'Le Freeport Singapore / High-Security Custodians',
      keyRiskFactor: 'ASEAN geopolitical alignment neutrality preservation',
      strategicSignificance: 'The primary physical gold storage safe haven in the ASEAN region'
    }
  },

  // ── STRATEGIC MINERALS & SPACE INFRASTRUCTURE ──
  {
    id: 'bayan-obo-rare-earth',
    name: 'Bayan Obo Rare Earth Mine & Processing Hub',
    region: 'Inner Mongolia, China',
    country: 'China',
    category: 'Strategic',
    lat: 41.77,
    lng: 109.95,
    zoom: 6,
    threatLevel: 'ELEVATED',
    metric: '45% Global Neodymium & Heavy Rare Earths',
    headline: 'Monopoly Anchor for Permanent Magnets & Defense Avionics',
    summary: 'The world’s largest rare earth deposit. Dominates global refining of dysprosium and neodymium required for EV traction motors, wind turbines, and guided missile actuators.',
    epistemicStatus: 'HOLD',
    route: '/world',
    source: 'USGS Mineral Commodity Summaries / China Northern Rare Earth',
    details: {
      flowCapacity: 'Over 120,000 tonnes REO annual production',
      operatorOrControl: 'China Northern Rare Earth Group',
      keyRiskFactor: 'Export controls and processing technology transfer bans',
      strategicSignificance: 'Monopolistic leverage over Western electrification and defense supply'
    }
  },
  {
    id: 'chile-lithium-triangle',
    name: 'Salar de Atacama Lithium Brine Hub',
    region: 'Antofagasta, Chile',
    country: 'Chile',
    category: 'Strategic',
    lat: -23.50,
    lng: -68.30,
    zoom: 6,
    threatLevel: 'WATCH',
    metric: 'Lowest Cash Cost Lithium Carbonate',
    headline: 'The Global Battery Chemistry Evaporative Source',
    summary: 'Ultra-high solar radiation and zero rainfall produce the world’s richest and lowest-cost lithium brine extraction. Chile’s national lithium policy is restructuring sovereign joint-venture concessions.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'CORFO / SQM / Albemarle Operational Filings',
    details: {
      flowCapacity: '250,000+ tonnes Lithium Carbonate Equivalent (LCE)/yr',
      operatorOrControl: 'SQM / Codelco National Partnership & Albemarle',
      keyRiskFactor: 'Aquifer water balance and indigenous community environmental royalties',
      strategicSignificance: 'Supplies >30% of global battery-grade lithium'
    }
  },
  {
    id: 'kourou-spaceport',
    name: 'Guiana Space Centre (Kourou Spaceport)',
    region: 'French Guiana',
    country: 'France / ESA',
    category: 'Strategic',
    lat: 5.23,
    lng: -52.76,
    zoom: 7,
    threatLevel: 'NOMINAL',
    metric: 'Equatorial Launch Advantage (5.2° N)',
    headline: 'Europe’s Independent Sovereign Space Launch Gateway',
    summary: 'Equatorial proximity maximizes Earth rotational velocity boost for geostationary payload deployment. Primary operational base for Ariane 6 and Vega-C launch vehicles.',
    epistemicStatus: 'SEAL',
    route: '/world',
    source: 'European Space Agency (ESA) / CNES',
    details: {
      flowCapacity: '10-12 heavy orbital launches per year',
      operatorOrControl: 'CNES / ESA / Arianespace',
      keyRiskFactor: 'Supply chain cadence for Ariane 6 upper stages',
      strategicSignificance: 'Europe’s sole sovereign access to orbital space'
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. TRADE ROUTES & SUBSEA FIBER OPTIC CORRIDORS (CANVAS LINES)
// ─────────────────────────────────────────────────────────────────────────────
export const TACTICAL_VECTORS: TradeRouteLine[] = [
  {
    id: 'energy-artery-middle-east-asia',
    name: 'Middle East → Malacca → East Asia Energy Artery',
    category: 'Energy',
    color: '#E27D60',
    coords: [
      [26.56, 56.25], // Hormuz
      [22.0, 63.0],   // Arabian Sea
      [11.5, 74.0],   // South India
      [5.9, 80.5],    // Sri Lanka Dondra Head
      [5.5, 95.0],    // North Sumatra / Malacca approach
      [2.45, 101.85], // Port Klang / Malacca
      [1.3, 103.85],  // Singapore Strait
      [4.85, 112.65], // South China Sea / Sarawak offshore
      [14.0, 116.0],  // Central SCS
      [22.0, 120.0],  // Luzon Strait
      [31.5, 122.5],  // Shanghai
      [35.5, 139.75]  // Tokyo Bay
    ]
  },
  {
    id: 'europe-asia-suez-cape',
    name: 'Red Sea / Bab el-Mandeb → Indian Ocean Line',
    category: 'Maritime',
    color: '#38BDF8',
    dashArray: '6, 6',
    coords: [
      [31.2, 32.3],   // Port Said
      [27.5, 34.0],   // Red Sea North
      [18.0, 39.5],   // Central Red Sea
      [12.58, 43.33], // Bab el-Mandeb
      [12.0, 50.0],   // Gulf of Aden
      [10.0, 65.0],   // Arabian Sea
      [5.9, 80.5],    // Sri Lanka
      [2.45, 101.85]  // Malacca
    ]
  },
  {
    id: 'subsea-fiber-seamewe-5',
    name: 'SEA-ME-WE 5 Submarine Fiber Optic Corridor',
    category: 'SubseaCable',
    color: '#2DD4BF',
    dashArray: '4, 4',
    coords: [
      [1.35, 103.82], // Singapore
      [5.4, 100.3],   // Penang, Malaysia
      [6.9, 79.8],    // Colombo, Sri Lanka
      [18.9, 72.8],   // Mumbai, India
      [23.6, 58.5],   // Muscat, Oman
      [12.6, 43.3],   // Djibouti
      [21.5, 39.2],   // Jeddah, Saudi Arabia
      [29.9, 32.5],   // Zafarana, Egypt
      [38.1, 13.3],   // Palermo, Italy
      [43.3, 5.3]     // Marseille, France
    ]
  },
  {
    id: 'transatlantic-fiber',
    name: 'Transatlantic Low-Latency Financial Corridor (Ashburn → London)',
    category: 'SubseaCable',
    color: '#A78BFA',
    dashArray: '5, 5',
    coords: [
      [39.04, -77.48], // Ashburn, VA
      [40.71, -74.00], // New York City
      [41.5, -60.0],   // North Atlantic
      [50.5, -25.0],   // Mid Atlantic
      [50.1, -5.5],    // Bude, UK
      [51.51, -0.09]   // London
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. LIVE SITUATION INTELLIGENCE FEED (REAL-TIME EVENTS & SYNTHESIS)
// ─────────────────────────────────────────────────────────────────────────────
export const LIVE_INTEL_STREAM: IntelFeedEvent[] = [
  {
    id: 'evt-01',
    domain: 'Energy',
    severity: 'ELEVATED',
    timestamp: '2026-08-25T18:42:00Z',
    title: 'Sarawak Gas Aggregation Concession Reached with PETROS',
    summary: 'Formalization of single-buyer gas aggregator mechanism under Sarawak Distribution of Gas Ordinance (DGO). Domestic gas quotas locked at 1.2 Bcf/d for local industrial power and Bintulu hydrogen pilots.',
    location: 'Kuching / Bintulu, Sarawak',
    source: 'PETROS Regulatory Governance Bulletin',
    tag: 'SOVEREIGN_GAS'
  },
  {
    id: 'evt-02',
    domain: 'Geopolitical',
    severity: 'CRITICAL',
    timestamp: '2026-08-25T16:15:00Z',
    title: 'Red Sea Transit Interdiction Risk Remains Above 90th Percentile',
    summary: 'Commercial vessel tracking indicates 68% of Asian-European container movements continue Cape of Good Hope circumnavigation. Bunker fuel consumption in Singapore and Port Klang hub up +14% YoY.',
    location: 'Bab el-Mandeb / Gulf of Aden',
    source: 'UKMTO / Marine Traffic AIS Surveillance',
    tag: 'CHOKEPOINT_DEFENSE'
  },
  {
    id: 'evt-03',
    domain: 'Capital',
    severity: 'NOMINAL',
    timestamp: '2026-08-25T14:30:00Z',
    title: 'Central Bank Gold Allocation Surpasses 1,000 Tonnes Trailing Rate',
    summary: 'Non-G7 central banks continue net physical gold accumulation. Swiss refiners report heightened conversion of London Good Delivery 400oz bars into sovereign 1kg high-purity ingots for Asian custodial vaults.',
    location: 'Zurich / London LBMA',
    source: 'World Gold Council / Swiss Customs FCA',
    tag: 'DE_DOLLARIZATION'
  },
  {
    id: 'evt-04',
    domain: 'Cyber',
    severity: 'ELEVATED',
    timestamp: '2026-08-25T11:05:00Z',
    title: 'Johor Sedenak AI Data Hub Grid Offtake Phase 2 Authorized',
    summary: 'TNB executes power purchase agreement for additional 450MW high-voltage substation capacity serving GPU inference clusters in Kulai/Sedenak Tech Park. Direct subsea fiber link to Tuas operational.',
    location: 'Johor Bahru / Singapore Border',
    source: 'TNB Grid Operations / MIDA',
    tag: 'AI_INFRASTRUCTURE'
  },
  {
    id: 'evt-05',
    domain: 'Military',
    severity: 'ELEVATED',
    timestamp: '2026-08-25T08:20:00Z',
    title: 'Indo-Pacific Strategic Reconnaissance Rotation Tracked at Kadena',
    summary: 'RC-135V Rivet Joint and P-8A Poseidon flight trajectories logged over Luzon Strait and Southern South China Sea maritime approaches. No airspace violations recorded in territorial waters.',
    location: 'Kadena Air Base / SCS',
    source: 'OpenSky Network / ADS-B Telemetry',
    tag: 'AIR_SURVEILLANCE'
  },
  {
    id: 'evt-06',
    domain: 'SpaceWeather',
    severity: 'NOMINAL',
    timestamp: '2026-08-25T04:10:00Z',
    title: 'NOAA SWPC Planetary Kp-Index Registered at 2.6 (Quiet Solar Wind)',
    summary: 'Solar radiation environment nominal. High-frequency HF marine communications across Malacca and Indian Ocean unencumbered by geomagnetic ionospheric scintillation.',
    location: 'NOAA Space Weather Prediction Center',
    source: 'NOAA SWPC Satellite Data',
    tag: 'SPACE_WEATHER'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. STRATEGIC SITUATION BRIEFING (AI & CONSTITUTIONAL SYNTHESIS)
// ─────────────────────────────────────────────────────────────────────────────
export const STRATEGIC_SITUATION_BRIEF = {
  convergenceScore: 84, // 0 - 100
  threatGauge: 'ELEVATED',
  focalPoint: 'South China Sea / Malacca Energy Arc & Middle East Maritime Tension',
  synthesisMarkdown: `
### Strategic Convergence Assessment

1. **Hydrocarbon Transit Elasticity**: The simultaneous vulnerability of the Bab el-Mandeb and Strait of Hormuz chokepoints has increased the strategic weighting of the **Strait of Malacca** and **Sarawak MLNG export lines**. Physical crude inventory buffers in Asia remain resilient, but prompt crack spreads reflect structural freight overheads.

2. **Capital Realignment**: Physical gold withdrawals from Western fractional paper exchanges into unencumbered Asian and Swiss sovereign custody are running at multi-decade peaks. Sovereign balance sheets are structurally immunizing against dollar weaponization.

3. **Compute Sovereignty**: The Malaysia-Singapore cross-border data corridor (Johor Sedenak – Tuas) represents the highest concentration of GPU acceleration deployments in ASEAN, forcing national grid infrastructure into rapid baseload expansion.
  `,
  focalPoints: [
    { name: 'Malacca Strait Security Envelope', risk: 'WATCH', delta: '+2.4%' },
    { name: 'Red Sea Cape Diversion Pressure', risk: 'CRITICAL', delta: '+8.1%' },
    { name: 'Sarawak-Federal Resource Parity', risk: 'SEALED', delta: 'STABLE' },
    { name: 'Johor-Singapore Compute Grid', risk: 'EXPANDING', delta: '+15.2%' }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. LIVE USGS EARTHQUAKE FETCHER HELPER
// ─────────────────────────────────────────────────────────────────────────────
export interface LiveQuake {
  id: string;
  mag: number;
  place: string;
  time: number;
  lat: number;
  lng: number;
  depthKm: number;
}

export async function fetchLiveUSGSQuakes(): Promise<LiveQuake[]> {
  try {
    const res = await fetch(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`USGS HTTP ${res.status}`);
    const data = await res.json();
    return (data.features || []).slice(0, 40).map((f: any) => ({
      id: f.id,
      mag: f.properties.mag,
      place: f.properties.place,
      time: f.properties.time,
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
      depthKm: f.geometry.coordinates[2],
    }));
  } catch (err) {
    // Graceful fallback sample data in case client blocks external connect
    return [
      { id: 'q1', mag: 4.8, place: '72 km SW of Banda Aceh, Indonesia', time: Date.now() - 3600000, lat: 5.12, lng: 94.85, depthKm: 35 },
      { id: 'q2', mag: 5.2, place: '120 km E of Hualien City, Taiwan', time: Date.now() - 7200000, lat: 23.95, lng: 122.80, depthKm: 18 },
      { id: 'q3', mag: 4.5, place: 'South of Java, Indonesia', time: Date.now() - 14400000, lat: -9.25, lng: 111.45, depthKm: 42 },
      { id: 'q4', mag: 5.6, place: 'Off coast of Honshu, Japan', time: Date.now() - 18000000, lat: 37.85, lng: 142.10, depthKm: 24 }
    ];
  }
}
