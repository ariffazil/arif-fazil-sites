import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Types & Static Signals ---
interface MacroSignal {
  id: string;
  name: string;
  code: string;
  value: string;
  change: string;
  isPositive: boolean;
  status: 'SEAL' | 'SABAR' | 'HOLD';
  role: string;
  summary: string;
  link: string;
}

const MACRO_SIGNALS: MacroSignal[] = [
  {
    id: 'oil',
    name: 'Brent Crude',
    code: 'BRENT / USD',
    value: '$82.40',
    change: '+1.2%',
    isPositive: true,
    status: 'SEAL',
    role: 'Global Primary Energy Baseline',
    summary: 'Marginal cost of extraction rising in non-OPEC deepwater. Middle East supply vulnerability keeping floor tight.',
    link: '/oil',
  },
  {
    id: 'gas',
    name: 'Natural Gas / LNG',
    code: 'JKM / LNG',
    value: '$13.20',
    change: '+0.8%',
    isPositive: true,
    status: 'SEAL',
    role: 'Sarawak & Pacific Energy Transition Artery',
    summary: 'Asian spot demand resilient. Luconia and Bintulu LNG export trains maintain high cash conversion.',
    link: '/gas',
  },
  {
    id: 'gold',
    name: 'Gold (Hard Asset)',
    code: 'XAU / USD',
    value: '$2,425.80',
    change: '+0.4%',
    isPositive: true,
    status: 'SEAL',
    role: 'Ultimate Sovereign De-dollarization Hedge',
    summary: 'Central bank accumulation at multi-decade highs as sovereign balance sheets seek neutral reserve assets.',
    link: '/gold',
  },
  {
    id: 'usdmyr',
    name: 'Ringgit Exchange',
    code: 'USD / MYR',
    value: '4.4250',
    change: '-0.3%',
    isPositive: false,
    status: 'SABAR',
    role: 'National Sovereign Purchasing Power',
    summary: 'Repatriation mandates and trade surplus stabilizing local currency against strong USD index.',
    link: '/usdmyr',
  },
  {
    id: 'klci',
    name: 'FTSE Bursa KLCI',
    code: 'FBMKLCI',
    value: '1,598.40',
    change: '+0.5%',
    isPositive: true,
    status: 'SEAL',
    role: 'Domestic Capital & Utilities Bellwether',
    summary: 'Data center infrastructure inflow and energy dividend stability supporting domestic index multiples.',
    link: '/klci',
  },
];

interface AtlasHotspot {
  id: string;
  name: string;
  region: string;
  category: 'Energy' | 'Maritime' | 'Civic' | 'Capital';
  coords: { x: number; y: number }; // Percentage 0-100 on SVG
  metric: string;
  headline: string;
  analysis: string;
  route?: string;
}

const ATLAS_HOTSPOTS: AtlasHotspot[] = [
  {
    id: 'malacca',
    name: 'Strait of Malacca',
    region: 'Southeast Asia / Malaysia',
    category: 'Maritime',
    coords: { x: 74, y: 56 },
    metric: '90,000+ vessels/yr',
    headline: 'The World’s Most Critical Maritime Chokepoint',
    analysis: 'Over 25% of global traded oil passes through this 2.8km-wide channel. Sovereign positioning here dictates global supply chain resilience.',
    route: '/earth',
  },
  {
    id: 'sarawak',
    name: 'Central Luconia & Bintulu',
    region: 'Sarawak Offshore, South China Sea',
    category: 'Energy',
    coords: { x: 78, y: 55 },
    metric: '1.2B SCF/day gas',
    headline: 'Sarawak Sovereign Gas & SEARAH Aggregation',
    analysis: 'High CO2 gas carbonate build-ups combined with LNG export trains. The constitutional battleground for federal-state resource sovereignty.',
    route: '/world/makcikgpt',
  },
  {
    id: 'malay-basin',
    name: 'Malay Basin (PM-304/PM-3)',
    region: 'Offshore Terengganu',
    category: 'Energy',
    coords: { x: 75, y: 53 },
    metric: '13-Year Lineage',
    headline: 'Bekantan & Mature Field Oil Rejuvenation',
    analysis: 'Low-resistivity low-contrast pay discoveries. Proving commercial hydrocarbon flow where traditional petrophysical models said reservoir was wet.',
    route: '/work',
  },
  {
    id: 'hormuz',
    name: 'Strait of Hormuz',
    region: 'Persian Gulf / Middle East',
    category: 'Maritime',
    coords: { x: 61, y: 44 },
    metric: '21M bbl/day crude',
    headline: 'Global Energy Arterial Pressure Gauge',
    analysis: 'Vulnerability point for global crude benchmark. Any geopolitical friction triggers immediate risk premia across Brent and freight rates.',
    route: '/oil',
  },
  {
    id: 'sabah-deep',
    name: 'Sabah Deepwater (Gumusut)',
    region: 'Offshore Sabah / Borneo',
    category: 'Energy',
    coords: { x: 80, y: 53 },
    metric: '3,000m+ depth',
    headline: 'Turbidite Channel Reservoir Engineering',
    analysis: 'Complex slope-channel turbidite systems requiring high-pressure seismic inversion and automated drilling safety envelopes.',
    route: '/earth',
  },
  {
    id: 'london-vault',
    name: 'London / Zurich Gold Hub',
    region: 'Western Europe',
    category: 'Capital',
    coords: { x: 47, y: 31 },
    metric: '8,500 tonnes gold',
    headline: 'Physical Settlement vs Paper Derivatives',
    analysis: 'Physical sovereign bar withdrawals outstripping COMEX paper claims. Sovereign nations repatriating hard bullion.',
    route: '/gold',
  },
];

const MAKCIK_PICKS = [
  {
    id: 'm1',
    series: 'Siri M1 · PETRONAS DNA',
    date: '2026-08-02',
    title: 'Suara Yang Tak Letak Dalam Mulut Manusia',
    snippet: 'Taufik, Bakke Salleh, Anwar — bahasa korporat yang terlalu licin selalunya menyorok sesuatu. Bila profesor tak nampak, telinga kampung dengar.',
    seal: 'SEAL 999',
  },
  {
    id: 'm2',
    series: 'Siri M2 · SEARAH & Gas Sarawak',
    date: '2026-07-18',
    title: 'Bernama Baru Sampai. Makcik Dah Lama Tanya.',
    snippet: '40 hari lepas Makcik dedah isu SEARAH, semalam Bernama copy press release. Bila agensi berita jadi mesin fotostat, siapa jaga rakyat?',
    seal: 'SEAL 999',
  },
  {
    id: 'm3',
    series: 'Siri M3 · YTL & Kuasa Data',
    date: '2026-06-30',
    title: 'Air Kita, Elektrik Kita, Data Centre Siapa Punya?',
    snippet: 'Johor dan Cyberjaya banjir pelaburan AI, tapi bil elektrik rakyat naik dan paip air kering. Kiraan sebenar siapa yang untung.',
    seal: 'SEAL 999',
  },
];

export function World() {
  const [activeTab, setActiveTab] = useState<'atlas' | 'commodities' | 'makcikgpt' | 'institutions'>('atlas');
  const [selectedHotspot, setSelectedHotspot] = useState<AtlasHotspot>(ATLAS_HOTSPOTS[0]);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Active status count
  const signalSummary = useMemo(() => {
    const seals = MACRO_SIGNALS.filter((s) => s.status === 'SEAL').length;
    return { seals, total: MACRO_SIGNALS.length };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EAE6DF] font-sans antialiased selection:bg-[#E27D60] selection:text-[#0A0B0D]">
      
      {/* ── 01 TOP TICKER / STATE OF THE WORLD BAR ── */}
      <div className="border-b border-[#222733] bg-[#0E1015] px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ECCA3] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ECCA3]"></span>
            </span>
            <span className="text-[#8E95A5] uppercase tracking-wider">STATE OF THE WORLD RADAR:</span>
            <span className="text-[#4ECCA3] font-semibold">{signalSummary.seals}/{signalSummary.total} SIGNALS SEALED</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto py-1 scrollbar-none">
            {MACRO_SIGNALS.map((sig) => (
              <Link
                key={sig.id}
                to={sig.link}
                className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="text-[#8E95A5]">{sig.name}:</span>
                <span className="text-white font-semibold">{sig.value}</span>
                <span className={`text-[10px] ${sig.isPositive ? 'text-[#4ECCA3]' : 'text-[#E27D60]'}`}>
                  {sig.change}
                </span>
                <span className="rounded bg-[#181C24] px-1.5 py-0.5 text-[9px] text-[#D4AF37] border border-[#2B3242]">
                  {sig.status}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[#8E95A5]">
            <span>CANON: F1–F13</span>
            <span>·</span>
            <span>AED: SYNC</span>
          </div>
        </div>
      </div>

      {/* ── 02 MAIN HERO: THE SOVEREIGN WORLD ATLAS ── */}
      <section className="relative border-b border-[#222733] px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2B3242] bg-[#141820] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#E27D60]">
                <span>🌐</span> The World View & Macro Atlas
              </div>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                ATLAS OF THE WORLD
              </h1>
              <p className="mt-3 max-w-2xl text-base sm:text-lg text-[#A0A7B8] font-light leading-relaxed">
                Dynamic geopolitical signals, macroeconomic reality, energy chokepoints, and civic accountability. 
                Reading the physical flow of oil, gas, money, and power without corporate sanitization.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-1 rounded-lg border border-[#222733] bg-[#11141A] p-1.5 font-mono text-xs">
              {[
                { key: 'atlas', label: '🗺️ Interactive Atlas' },
                { key: 'commodities', label: '📊 5 Core Signals' },
                { key: 'makcikgpt', label: '📰 MakcikGPT Civic' },
                { key: 'institutions', label: '🏛️ Institutions' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`rounded px-4 py-2 uppercase tracking-wider transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#E27D60] text-[#0A0B0D] font-bold shadow'
                      : 'text-[#8E95A5] hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB 1: INTERACTIVE ATLAS DISPLAY ── */}
          {activeTab === 'atlas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Vector Map (8 Cols) */}
              <div className="lg:col-span-8 rounded-2xl border border-[#222733] bg-[#0E1117] p-6 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#1F2533] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#E27D60] animate-pulse"></div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8E95A5]">
                      SOVEREIGN MARITIME & ENERGY RADAR
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#4ECCA3]">PROBE: LIVE · FIDELITY: HIGH</span>
                </div>

                {/* SVG Vector Globe / World Background Representation */}
                <div className="relative w-full aspect-[16/9] bg-[#08090C] rounded-xl border border-[#181D26] overflow-hidden flex items-center justify-center">
                  
                  {/* Subtle Grid and Lat/Long lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-[#2B3347]" strokeWidth="0.5">
                    <line x1="0%" y1="25%" x2="100%" y2="25%" />
                    <line x1="0%" y1="50%" x2="100%" y2="50%" strokeDasharray="4 4" stroke="#4ECCA3" strokeOpacity="0.4" />
                    <line x1="0%" y1="75%" x2="100%" y2="75%" />
                    <line x1="25%" y1="0%" x2="25%" y2="100%" />
                    <line x1="50%" y1="0%" x2="50%" y2="100%" />
                    <line x1="75%" y1="0%" x2="75%" y2="100%" />
                  </svg>

                  {/* World Continents Outlines (Stylized Vector) */}
                  <svg viewBox="0 0 1000 500" className="w-full h-full object-cover select-none">
                    {/* Eurasia & Africa outline */}
                    <path
                      d="M420,120 Q500,100 620,110 T780,140 Q850,200 820,280 T720,340 Q650,380 600,420 T480,430 Q440,320 460,260 T420,120 Z"
                      fill="#121722"
                      stroke="#222C3D"
                      strokeWidth="1.5"
                    />
                    {/* Americas outline */}
                    <path
                      d="M180,100 Q260,110 240,200 T210,280 Q250,340 230,420 T170,460 Q140,380 160,260 T140,140 Z"
                      fill="#121722"
                      stroke="#222C3D"
                      strokeWidth="1.5"
                    />
                    {/* Maritime Energy Flow Route lines */}
                    <path
                      d="M610,220 Q680,260 740,280 T780,275"
                      fill="none"
                      stroke="#E27D60"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Hotspots clickable nodes */}
                  {ATLAS_HOTSPOTS.map((spot) => {
                    const isSelected = selectedHotspot.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        onClick={() => setSelectedHotspot(spot)}
                        style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
                      >
                        <span className="relative flex h-6 w-6 items-center justify-center">
                          {isSelected && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E27D60] opacity-75"></span>
                          )}
                          <span
                            className={`relative inline-flex h-3.5 w-3.5 rounded-full transition-transform duration-200 group-hover:scale-125 border-2 ${
                              isSelected
                                ? 'bg-[#E27D60] border-white shadow-[0_0_12px_#E27D60]'
                                : 'bg-[#1F2636] border-[#4ECCA3] group-hover:border-white'
                            }`}
                          ></span>
                        </span>
                        
                        {/* Tooltip on Map */}
                        <span
                          className={`absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[10px] tracking-wide transition-all ${
                            isSelected
                              ? 'border-[#E27D60] bg-[#141820] text-white font-bold'
                              : 'border-[#2B3242] bg-[#0E1015]/90 text-[#8E95A5] group-hover:text-white'
                          }`}
                        >
                          {spot.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Hotspot Quick Selector Pill Bar */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {ATLAS_HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedHotspot(spot)}
                      className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                        selectedHotspot.id === spot.id
                          ? 'border-[#E27D60] bg-[#221815] text-[#E27D60] font-semibold'
                          : 'border-[#1F2533] bg-[#12151D] text-[#8E95A5] hover:border-[#3A455E] hover:text-white'
                      }`}
                    >
                      {spot.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Intelligence & Node Dossier (4 Cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-[#222733] bg-[#0E1117] p-6 shadow-xl flex flex-col justify-between h-full min-h-[480px]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1F2533] pb-3 mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#E27D60]">
                      HOTSPOT INTELLIGENCE DOSSIER
                    </span>
                    <span className="rounded bg-[#1A202C] px-2 py-0.5 font-mono text-[10px] text-[#4ECCA3] border border-[#2B364A]">
                      {selectedHotspot.category}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedHotspot.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="font-mono text-xs text-[#8E95A5]">{selectedHotspot.region}</span>
                      <h3 className="mt-1 font-serif text-2xl text-white font-normal leading-snug">
                        {selectedHotspot.name}
                      </h3>

                      <div className="mt-4 rounded-lg bg-[#141822] border border-[#202738] p-3 font-mono">
                        <div className="text-[10px] text-[#8E95A5] uppercase tracking-wider">STRATEGIC VOLUME / METRIC</div>
                        <div className="text-lg font-bold text-[#E27D60]">{selectedHotspot.metric}</div>
                      </div>

                      <h4 className="mt-5 font-serif text-base text-white/90 italic">
                        "{selectedHotspot.headline}"
                      </h4>

                      <p className="mt-3 text-sm text-[#A0A7B8] font-light leading-relaxed">
                        {selectedHotspot.analysis}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2533]">
                  {selectedHotspot.route ? (
                    <Link
                      to={selectedHotspot.route}
                      className="flex items-center justify-between w-full rounded-lg bg-[#E27D60] px-4 py-3 font-mono text-xs font-bold text-[#0A0B0D] uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      <span>Buka Laporan Terperinci</span>
                      <span>→</span>
                    </Link>
                  ) : (
                    <div className="font-mono text-xs text-[#8E95A5] text-center">
                      SEALED AUDIT LEDGER · F1 TRUTH
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ── TAB 2: 5 CORE SOVEREIGN COMMODITIES ── */}
          {activeTab === 'commodities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MACRO_SIGNALS.map((sig) => (
                <div
                  key={sig.id}
                  className="rounded-2xl border border-[#222733] bg-[#0E1117] p-6 hover:border-[#384259] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1F2533] pb-3 mb-4">
                      <span className="font-mono text-xs uppercase text-[#8E95A5]">{sig.code}</span>
                      <span className="rounded bg-[#1A202C] px-2 py-0.5 font-mono text-[10px] text-[#D4AF37] border border-[#2D364A]">
                        {sig.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-white font-normal">{sig.name}</h3>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-mono text-3xl font-bold text-white">{sig.value}</span>
                      <span className={`font-mono text-xs font-semibold ${sig.isPositive ? 'text-[#4ECCA3]' : 'text-[#E27D60]'}`}>
                        {sig.change}
                      </span>
                    </div>

                    <div className="mt-4 font-mono text-xs text-[#E27D60]">{sig.role}</div>
                    <p className="mt-2 text-sm text-[#A0A7B8] font-light leading-relaxed">
                      {sig.summary}
                    </p>
                  </div>

                  <Link
                    to={sig.link}
                    className="mt-6 inline-flex items-center justify-between border-t border-[#1F2533] pt-4 font-mono text-xs text-[#E27D60] hover:text-white transition-colors"
                  >
                    <span>Masuk Ke Analisis {sig.name}</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}

              {/* Economic Macro Synthesis Card */}
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#16140D] p-6 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase text-[#D4AF37] tracking-wider">
                    THERMODYNAMIC SYNTHESIS
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-white font-normal">
                    Energy & Currency Causality
                  </h3>
                  <p className="mt-3 text-sm text-[#D8D2C2] font-light leading-relaxed">
                    You cannot print Joules of energy or ounces of physical gold. Every fiat monetary system eventually reconciles with physical reservoir decline and sovereign boundary constraints.
                  </p>
                </div>
                <Link
                  to="/economics"
                  className="mt-6 flex items-center justify-between rounded-lg bg-[#D4AF37] px-4 py-2.5 font-mono text-xs font-bold text-[#0A0B0D] uppercase tracking-wider hover:opacity-90"
                >
                  <span>Buka /economics/</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )}

          {/* ── TAB 3: MAKCIKGPT CIVIC INVESTIGATIONS ── */}
          {activeTab === 'makcikgpt' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222733] pb-6 mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E27D60]">
                    CIVIC INTELLIGENCE · BAHASA MAKCIK
                  </span>
                  <h2 className="mt-1 font-serif text-3xl text-white">
                    MakcikGPT: Kewartawanan Siasatan Sivik
                  </h2>
                </div>
                <Link
                  to="/world/makcikgpt"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E27D60] px-5 py-2.5 font-mono text-xs font-bold text-[#0A0B0D] uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <span>Masuk Ke Penuh Broadsheet</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MAKCIK_PICKS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#222733] bg-[#0E1117] p-6 flex flex-col justify-between hover:border-[#3A455E] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#8E95A5] mb-3">
                        <span className="text-[#E27D60] font-semibold">{item.series}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-serif text-xl text-white font-normal leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#A0A7B8] font-light leading-relaxed italic">
                        "{item.snippet}"
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1F2533] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#D4AF37] border border-[#2D364A] bg-[#16140D] px-2 py-0.5 rounded">
                        {item.seal}
                      </span>
                      <Link
                        to="/world/makcikgpt"
                        className="font-mono text-xs text-[#E27D60] hover:text-white transition-colors"
                      >
                        Baca Artikel →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 4: INSTITUTIONS & SHADOW POWER ── */}
          {activeTab === 'institutions' && (
            <div className="rounded-2xl border border-[#222733] bg-[#0E1117] p-8">
              <div className="max-w-3xl">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E27D60]">
                  GOVERNANCE & INSTITUTIONAL FORENSICS
                </span>
                <h2 className="mt-2 font-serif text-3xl text-white">
                  Shadow Cabinet & Structural Power Dynamics
                </h2>
                <p className="mt-4 text-base text-[#A0A7B8] font-light leading-relaxed">
                  Analyzing institutions not by their public relations press releases, but by their audited balance sheets, sovereign debt obligations, regulatory appointments, and real capital flows.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="rounded-xl border border-[#1F2533] bg-[#12151E] p-4">
                    <div className="text-[#8E95A5] uppercase">PETRONAS & Fiscal Integrity</div>
                    <div className="mt-1 text-sm font-bold text-white">70.5% Dividends vs Reinvestment</div>
                    <p className="mt-2 text-[#A0A7B8] font-sans text-xs">
                      Simulated capital stress thresholds under lower crude benchmark pricing.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1F2533] bg-[#12151E] p-4">
                    <div className="text-[#8E95A5] uppercase">Sarawak Energy Sovereignty</div>
                    <div className="mt-1 text-sm font-bold text-white">SEARAH Gas Monopoly Transition</div>
                    <p className="mt-2 text-[#A0A7B8] font-sans text-xs">
                      Aggregation rights and revenue division between state and federal mechanisms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── 03 DISPATCH & RSS SUBSCRIBE ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#222733] bg-[#0D1016] p-8 md:p-12 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#E27D60]">
            SOVEREIGN DISPATCH · RSS & TELEGRAM
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-white font-normal">
            Kekal Berpijak Pada Realiti Fizikal
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-[#8E95A5] font-light">
            Dapatkan isyarat makro dan analisis siasatan sivik terus ke emel atau RSS reader anda tanpa sebarang algoritma pihak ketiga.
          </p>

          <div className="mt-8 flex justify-center">
            {subscribed ? (
              <div className="rounded-lg border border-[#4ECCA3] bg-[#0E1A16] px-6 py-3 font-mono text-sm font-bold text-[#4ECCA3]">
                DITERIMA ✓ LANGGANAN DIAKTIFKAN
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="flex w-full max-w-md flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emel@anda.my"
                  className="w-full rounded-lg border border-[#2B3242] bg-[#141822] px-4 py-3 font-mono text-sm text-white placeholder:text-[#50596B] focus:border-[#E27D60] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#E27D60] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0B0D] hover:opacity-90 transition-opacity shrink-0"
                >
                  Langgan
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#8E95A5]">
            <a href="/world/makcikgpt/feed.xml" className="hover:text-[#E27D60] transition-colors">
              RSS: /world/makcikgpt/feed.xml
            </a>
            <span>·</span>
            <a href="https://t.me/ariffazil" target="_blank" rel="noreferrer" className="hover:text-[#E27D60] transition-colors">
              Telegram: @ariffazil
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default World;
