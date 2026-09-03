import { Link } from 'react-router-dom';
import { MACRO_INDICATORS } from '@/data/worldIntelData';

export function PalantirMacroGrid() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#1F2733] pb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F0B840]">
            SOVEREIGN MACRO MATRIX · 6-SIGNAL COMPOSITE
          </span>
        </div>
        <h2 className="mt-1 font-serif text-3xl text-white font-normal">
          Thermodynamic & Currency Baselines
        </h2>
        <p className="text-xs text-[#8E95A5] mt-1 font-mono">
          Every fiat monetary claim reconciles against real hydrocarbon extraction cost, physical gold settlement, and sovereign boundary constraints.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MACRO_INDICATORS.map((sig) => (
          <div
            key={sig.id}
            className="rounded-2xl border border-[#1F2733] bg-[#0E121A]/95 p-6 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#1F2733] pb-3 mb-4 font-mono text-xs">
                <span className="text-[#8E95A5] group-hover:text-[#00E5FF] transition-colors">{sig.code}</span>
                <span className="rounded bg-[#161D2B] px-2 py-0.5 text-[10px] text-[#F0B840] border border-[#2B3852] font-semibold">
                  {sig.status} · F1 TRUTH
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-normal">{sig.name}</h3>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-white tracking-tight">{sig.value}</span>
                <span className={`font-mono text-xs font-bold ${sig.isPositive ? 'text-[#34D399]' : 'text-[#FF9F1C]'}`}>
                  {sig.change}
                </span>
              </div>

              <div className="mt-4 font-mono text-[11px] text-[#00E5FF]">{sig.role}</div>

              <div className="mt-3 rounded-lg bg-[#141A26] border border-[#1F2733] p-2.5 font-mono text-[10px] text-[#8E95A5]">
                <span className="text-[#566175] block uppercase">BENCHMARK SETTLEMENT</span>
                <span className="text-white/90">{sig.benchmark}</span>
              </div>
            </div>

            <Link
              to={sig.link}
              className="mt-6 inline-flex items-center justify-between border-t border-[#1F2733] pt-4 font-mono text-xs text-[#00E5FF] hover:text-white transition-colors"
            >
              <span>Detailed Domain Terminal</span>
              <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
