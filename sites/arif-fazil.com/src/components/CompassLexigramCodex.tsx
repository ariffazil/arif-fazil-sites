import { useState, useEffect } from 'react';

interface FloorNode {
  id: string;
  name: string;
  angle: number;
  type: 'HARD' | 'SOFT' | 'DERIVED' | 'SOVEREIGN';
  essence: string;
}

const FLOORS: FloorNode[] = [
  { id: 'F1', name: 'AMANAH', angle: 0, type: 'HARD', essence: 'Reversible-first. Every mutation can be undone.' },
  { id: 'F2', name: 'TRUTH', angle: 27.69, type: 'HARD', essence: 'Evidence before narrative. Epistemic confidence labeled.' },
  { id: 'F3', name: 'WITNESS', angle: 55.38, type: 'DERIVED', essence: 'Tri-witness validation before consequential action.' },
  { id: 'F4', name: 'CLARITY', angle: 83.07, type: 'HARD', essence: 'Zero noise. Entropy reduction on every output (ΔS ≤ 0).' },
  { id: 'F5', name: 'SEPARATION', angle: 110.76, type: 'HARD', essence: 'Strict boundary between observation and verdict.' },
  { id: 'F6', name: 'AUDIT', angle: 138.45, type: 'DERIVED', essence: 'Full provenance trace stored in immutable ledger.' },
  { id: 'F7', name: 'LEAST POWER', angle: 166.14, type: 'SOFT', essence: 'Route to the smallest sufficient capability.' },
  { id: 'F8', name: 'LINEAGE', angle: 193.83, type: 'DERIVED', essence: 'Explicit causality and parentage across all claims.' },
  { id: 'F9', name: 'PROVENANCE', angle: 221.52, type: 'HARD', essence: 'Direct primary source citations only. No hallucinations.' },
  { id: 'F10', name: 'BOUNDARY', angle: 249.21, type: 'HARD', essence: 'Strict isolation of organ authority and domains.' },
  { id: 'F11', name: 'REVERSIBILITY', angle: 276.90, type: 'HARD', essence: 'Hold state on ambiguity. Never destroy without veto.' },
  { id: 'F12', name: 'HUMAN VETO', angle: 304.59, type: 'HARD', essence: 'Human dignity floor. AI serves, never rules.' },
  { id: 'F13', name: 'SOVEREIGNTY', angle: 332.28, type: 'SOVEREIGN', essence: 'Arif owns F13. Final authority and seal.' },
];

const VERBS = ['INIT', 'OBSERVE', 'THINK', 'ROUTE', 'MEMORY', 'JUDGE', 'FORGE', 'SEAL'];

export function CompassLexigramCodex() {
  const [selectedFloor, setSelectedFloor] = useState<FloorNode | null>(FLOORS[0]);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRotation(r => (r + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  const typeColor = (type: string) => {
    switch (type) {
      case 'HARD': return '#EF4444';
      case 'SOFT': return '#F59E0B';
      case 'DERIVED': return '#31C48D';
      case 'SOVEREIGN': return '#C9A227';
      default: return '#C9A227';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#C9A227]/30 bg-gradient-to-b from-[#10131B] via-[#0B0D13] to-[#06070A] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      {/* Background Radial Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: The Astrolabe / Lexigram Codex Dial */}
        <div 
          className="lg:col-span-7 flex justify-center items-center relative py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px]">
            <svg 
              className="w-full h-full select-none" 
              viewBox="0 0 500 500"
            >
              <defs>
                <radialGradient id="codexCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A227" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#00D4AA" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Core Glow */}
              <circle cx="250" cy="250" r="140" fill="url(#codexCoreGlow)" />

              {/* 1. Outer Azimuth Scale (Static) */}
              <circle cx="250" cy="250" r="235" fill="none" stroke="#1F2733" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="222" fill="none" stroke="#C9A227" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="250" cy="250" r="185" fill="none" stroke="#1F2733" strokeWidth="1" />

              {/* Cardinal Glyphs */}
              <text x="250" y="32" fill="#C9A227" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">N · 000°</text>
              <text x="472" y="254" fill="#C9A227" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">E · 090°</text>
              <text x="250" y="480" fill="#C9A227" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">S · 180°</text>
              <text x="28" y="254" fill="#C9A227" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">W · 270°</text>

              {/* 2. Rotating Astrolabe Crosshairs & Celestial Dial */}
              <g transform={`rotate(${rotation} 250 250)`}>
                {/* 8-Point Compass Star */}
                <path d="M250 85 L258 250 L250 415 L242 250 Z" fill="rgba(201,162,39,0.12)" stroke="#C9A227" strokeOpacity="0.4" strokeWidth="0.8" />
                <path d="M85 250 L250 258 L415 250 L250 242 Z" fill="rgba(201,162,39,0.12)" stroke="#C9A227" strokeOpacity="0.4" strokeWidth="0.8" />
                <path d="M133 133 L250 244 L367 367 L244 250 Z" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeOpacity="0.3" strokeWidth="0.6" />
                <path d="M367 133 L250 256 L133 367 L256 250 Z" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeOpacity="0.3" strokeWidth="0.6" />

                {/* 8 Sacred Verbs Ring */}
                {VERBS.map((verb, idx) => {
                  const rad = (idx * 45 * Math.PI) / 180;
                  const x = 250 + 138 * Math.sin(rad);
                  const y = 250 - 138 * Math.cos(rad);
                  return (
                    <text
                      key={verb}
                      x={x}
                      y={y + 3}
                      fill="#8A8578"
                      fontSize="7"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                      textAnchor="middle"
                      letterSpacing="1px"
                    >
                      {verb}
                    </text>
                  );
                })}
              </g>

              {/* 3. The 13 Constitutional Floor Nodes */}
              {FLOORS.map((floor) => {
                const rad = (floor.angle * Math.PI) / 180;
                const x = 250 + 185 * Math.sin(rad);
                const y = 250 - 185 * Math.cos(rad);
                const isSelected = selectedFloor?.id === floor.id;
                const color = typeColor(floor.type);

                return (
                  <g 
                    key={floor.id}
                    className="cursor-pointer transition-transform duration-200 hover:scale-125"
                    onClick={() => setSelectedFloor(floor)}
                  >
                    {/* Outer Node Halo */}
                    {isSelected && (
                      <circle cx={x} cy={y} r="16" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" className="animate-spin" />
                    )}
                    {/* Node Circle */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isSelected ? 10 : 8} 
                      fill="#0D0F16" 
                      stroke={color} 
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      filter={isSelected ? "url(#glow)" : undefined}
                    />
                    {/* Node ID Text */}
                    <text 
                      x={x} 
                      y={y + 3.5} 
                      fill="#FFFFFF" 
                      fontSize={isSelected ? "8" : "7"} 
                      fontFamily="JetBrains Mono, monospace" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {floor.id}
                    </text>
                  </g>
                );
              })}

              {/* 4. Central Sovereign Seal Core */}
              <circle cx="250" cy="250" r="54" fill="#0A0B0F" stroke="#C9A227" strokeWidth="2" filter="url(#glow)" />
              <circle cx="250" cy="250" r="44" fill="none" stroke="#C9A227" strokeOpacity="0.4" strokeDasharray="4 2" />
              <text x="250" y="244" fill="#C9A227" fontSize="24" fontFamily="serif" fontStyle="italic" textAnchor="middle">Ψ</text>
              <text x="250" y="266" fill="#EDEAE2" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="2px" textAnchor="middle">&Delta;S &le; 0</text>
            </svg>

            {/* Micro Coordinates Tag */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#6A665E] tracking-widest uppercase bg-[#0D0F16]/90 px-3 py-1 rounded border border-[#1F2733] whitespace-nowrap">
              CODEX RETICLE · 13 FLOORS · 360° AZIMUTH
            </div>
          </div>
        </div>

        {/* Right: Constitutional Lexigram Inspector */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C9A227] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse"></span>
            <span>COMPASS LEXIGRAM CODEX</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
            The Navigational Spine
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#9AA0A8] leading-relaxed">
            The intellectual and constitutional compass of the arifOS federation. Every essay, decision, and derivation in <span className="text-[#EDEAE2] font-semibold">/words</span> anchors to one of the 13 immutable floors below.
          </p>

          {/* Active Node Detail Card */}
          {selectedFloor && (
            <div className="rounded-xl border border-[#C9A227]/40 bg-[#12151F] p-5 space-y-3 transition-all duration-300 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-black text-white px-2.5 py-0.5 rounded bg-[#C9A227]/20 border border-[#C9A227]/50">
                    {selectedFloor.id}
                  </span>
                  <span className="font-display text-xl font-bold text-white tracking-wide">
                    {selectedFloor.name}
                  </span>
                </div>
                <span 
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                  style={{
                    color: typeColor(selectedFloor.type),
                    backgroundColor: `${typeColor(selectedFloor.type)}18`,
                    border: `1px solid ${typeColor(selectedFloor.type)}40`
                  }}
                >
                  {selectedFloor.type} FLOOR
                </span>
              </div>

              <p className="font-sans text-sm text-[#EDEAE2]/90 leading-relaxed pt-1">
                {selectedFloor.essence}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#1F2733] font-mono text-[10px] text-[#6A665E]">
                <span>AZIMUTH: {selectedFloor.angle.toFixed(1)}°</span>
                <span className="text-[#C9A227]">CLICK ANY NODE ON DIAL</span>
              </div>
            </div>
          )}

          {/* Quick Series Directory Badges */}
          <div className="pt-2">
            <div className="font-mono text-[10px] text-[#6A665E] uppercase tracking-wider mb-2">
              CANON ESSAY SERIES (S1 – S9)
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {['S1 ORIGIN', 'S2 NAMING', 'S3 MCP', 'S4 GOVERNANCE', 'S5 PHYSICS', 'S6 EUREKA', 'S7 BAHASA', 'S8 FIELD', 'S9 REFLECTION'].map(s => (
                <span key={s} className="px-2 py-1 rounded bg-[#0A0B0D] border border-[#1F2733] text-[#8A8578]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
