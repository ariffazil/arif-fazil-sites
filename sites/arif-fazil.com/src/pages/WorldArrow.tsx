import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RealWorldAtlasMap, REAL_HOTSPOTS, type HotspotLocation } from '@/components/RealWorldAtlasMap';

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
  const [activeTab, setActiveTab] = useState<'atlas' | 'commodities' | 'makcikgpt' | 'institutions' | 'shadow'>('atlas');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotLocation>(REAL_HOTSPOTS[0]);
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
                <span>🌐</span> Real GIS Cartography & Macro Atlas
              </div>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                ATLAS OF THE WORLD
              </h1>
              <p className="mt-3 max-w-2xl text-base sm:text-lg text-[#A0A7B8] font-light leading-relaxed">
                Real OpenStreetMap, CartoDB Dark Matter, and Esri Satellite GIS engine. 
                Tracking global maritime chokepoints, offshore hydrocarbon basins, physical gold reserves, and civic accountability under real uncertainty.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-1 rounded-lg border border-[#222733] bg-[#11141A] p-1.5 font-mono text-xs">
              {[
                { key: 'atlas', label: '🗺️ Real GIS Atlas' },
                { key: 'commodities', label: '📊 5 Core Signals' },
                { key: 'makcikgpt', label: '📰 MakcikGPT Civic' },
                { key: 'institutions', label: '🏛️ Institutions' },
                { key: 'shadow', label: '🗝️ PM Bayang' },
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

          {/* ── TAB 1: REAL GIS INTERACTIVE ATLAS DISPLAY ── */}
          {activeTab === 'atlas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Real Leaflet Map Component (8 Cols) */}
              <div className="lg:col-span-8">
                <RealWorldAtlasMap
                  selectedHotspot={selectedHotspot}
                  onSelectHotspot={setSelectedHotspot}
                />

                {/* Hotspot Quick Selector Pill Bar */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {REAL_HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedHotspot(spot)}
                      className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                        selectedHotspot.id === spot.id
                          ? 'border-[#E27D60] bg-[#221815] text-[#E27D60] font-semibold shadow-sm'
                          : 'border-[#1F2533] bg-[#12151D] text-[#8E95A5] hover:border-[#3A455E] hover:text-white'
                      }`}
                    >
                      {spot.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Intelligence & Node Dossier (4 Cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-[#222733] bg-[#0E1117] p-6 shadow-xl flex flex-col justify-between h-full min-h-[580px]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1F2533] pb-3 mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#E27D60]">
                      SPATIAL INTELLIGENCE DOSSIER
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
                        <div className="text-[10px] text-[#8E95A5] uppercase tracking-wider">STRATEGIC VOLUME / CAPACITY</div>
                        <div className="text-base font-bold text-[#E27D60] mt-0.5">{selectedHotspot.metric}</div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-[#8E95A5]">
                        <span>COORDINATES:</span>
                        <span className="text-white">
                          {selectedHotspot.lat.toFixed(2)}°N, {selectedHotspot.lng.toFixed(2)}°E
                        </span>
                        <span>·</span>
                        <span className="text-[#D4AF37] border border-[#2B3242] bg-[#16140D] px-1.5 py-0.5 rounded">
                          {selectedHotspot.status}
                        </span>
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

          {/* ── TAB 5: PM BAYANG — SHADOW POLITICS ── */}
          {activeTab === 'shadow' && (
            <div className="rounded-2xl border border-[#c9a84c]/30 bg-[#0E1015] p-6 md:p-10">
              <div className="max-w-3xl">
                <span className="font-mono text-xs uppercase tracking-widest text-[#c9a84c]">
                  PSIKOLOGI BAYANG · 9 PERDANA MENTERI · DARI TUNKU KE ANWAR
                </span>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl text-white">
                  PM Bayang
                </h2>
                <p className="mt-4 text-base text-[#A0A7B8] font-light leading-relaxed">
                  Setiap Perdana Menteri ada persona — topeng yang ditunjukkan pada dunia.
                  Carl Jung kata: makin cantik topeng kau, makin gelap bayang kau. Di sini
                  9 Perdana Menteri dianalisa melalui Jungian shadow:{' '}
                  <span style={{ color: 'var(--cyan, #00d4aa)' }}>Persona</span>,{' '}
                  <span style={{ color: 'var(--red, #ef4444)' }}>Bayang</span>,{' '}
                  <span style={{ color: 'var(--amber, #f59e0b)' }}>Tragedi</span>,{' '}
                  Legasi. Atau masuk terus ke 33 bayang Anwar Ibrahim — politik, ekonomi, peribadi.
                </p>
                <p className="mt-3 font-mono text-[0.6rem] text-[#8E95A5] uppercase tracking-widest">
                  Δ-ONLY · Bayang = Nyata · Dari Rekod Umum · 322 Sumber
                </p>
              </div>

              {/* 9 PM portrait strip — grayscale, hover reveals color (mirrors hub) */}
              <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {[
                  { name: 'Tunku',        url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Tunku_abd_rahman_%28cropped%2C_4to3_port%2C_bypass%29.jpg' },
                  { name: 'Razak',        url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Tun_Abdul_Razak_1968.jpg' },
                  { name: 'Hussein',      url: 'https://upload.wikimedia.org/wikipedia/en/1/12/Tun_Hussein_Onn.jpg' },
                  { name: 'Mahathir',     url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mahathir_Mohamad_13112018_%28cropped%29.jpg' },
                  { name: 'Badawi',       url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Abdullah_Ahmad_Badawi_at_the_XIVth_Non-Aligned_Movement_Summit_at_Havana%2C_Cuba_on_September_16%2C_2006.jpg' },
                  { name: 'Najib',        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Najib_Razak_2008-08-21.jpg' },
                  { name: 'Muhyiddin',    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Muhyiddin_Yassin_%2851087589446%29_%28cropped%29.jpg' },
                  { name: 'Ismail Sabri', url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ismail_Sabri_Yaakob_01042022_%28cropped%29.jpg' },
                  { name: 'Anwar',        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Anwar_Ibrahim_in_June_2026.jpg' },
                ].map((pm) => (
                  <div key={pm.name} className="aspect-[3/4] overflow-hidden rounded border border-[#222733] bg-[#111120] grayscale hover:grayscale-0 transition-all duration-500" title={pm.name}>
                    <img src={pm.url} alt={pm.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Two CTAs */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/world/politics/shadow/"
                  className="block rounded-lg border border-[#c9a84c]/50 bg-[#16140D] hover:bg-[#1d1a0f] transition-colors p-5"
                >
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest text-[#c9a84c] mb-1">
                    Hub · 9 PM
                  </div>
                  <div className="font-serif text-xl text-white leading-tight">
                    → Semua PM Bayang
                  </div>
                  <div className="mt-2 font-body text-sm text-[#8E95A5]">
                    Dari Tunku (1957) ke Anwar (2022). Persona, Bayang, Tragedi, Legasi untuk setiap satu.
                  </div>
                </Link>

                <Link
                  to="/world/politics/shadow/anwar-ibrahim/"
                  className="block rounded-lg border border-purple-500/50 bg-[#12100E] hover:bg-[#1a1418] transition-colors p-5"
                >
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest text-purple-400 mb-1">
                    Deep-dive · PM ke-10
                  </div>
                  <div className="font-serif text-xl text-white leading-tight">
                    🗝️ 33 Bayang Anwar Ibrahim
                  </div>
                  <div className="mt-2 font-body text-sm text-[#8E95A5]">
                    11 politik · 11 ekonomi · 11 peribadi. Editorial psychology, bukan tuduhan.
                  </div>
                </Link>
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
