import { STRATEGIC_SITUATION_BRIEF } from '@/data/worldIntelData';

export function PalantirSituationBrief() {
  return (
    <div className="rounded-2xl border border-[#1F2733] bg-[#0E121A]/95 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F2733] pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00E5FF]">
              SYNTHETIC STRATEGIC ESTIMATE
            </span>
          </div>
          <h2 className="mt-1 font-serif text-2xl md:text-3xl text-white font-normal">
            Convergence & Situational Awareness Brief
          </h2>
        </div>

        {/* Instability & Convergence Scorecard */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#1F2733] bg-[#141A26] px-3.5 py-2">
            <span className="text-[#8E95A5] text-[10px] block uppercase">CONVERGENCE</span>
            <span className="text-xl font-bold text-[#00E5FF]">
              {STRATEGIC_SITUATION_BRIEF.convergenceScore}/100
            </span>
          </div>

          <div className="rounded-xl border border-[#FF9F1C]/30 bg-[#261B0E] px-3.5 py-2">
            <span className="text-[#FF9F1C] text-[10px] block uppercase">GLOBAL POSTURE</span>
            <span className="text-xl font-bold text-[#FF9F1C]">
              {STRATEGIC_SITUATION_BRIEF.threatGauge}
            </span>
          </div>
        </div>
      </div>

      {/* Main Brief Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Text Synthesis (8 cols) */}
        <div className="lg:col-span-8 space-y-4 font-light text-sm text-[#D8D2C2] leading-relaxed">
          <p className="border-l-2 border-[#00E5FF] pl-4 py-1 text-white font-serif text-base italic">
            "Sovereignty is tested at the margins where physical geography, energy reserves, and unencumbered capital intersect."
          </p>
          <div className="space-y-3 font-sans text-xs sm:text-sm text-[#A0A7B8]">
            <p>
              <strong className="text-white font-semibold">1. Hydrocarbon Transit Elasticity:</strong> Simultaneous vulnerability in the Bab el-Mandeb and Strait of Hormuz has intensified reliance on the <strong className="text-[#00E5FF]">Strait of Malacca</strong> and <strong className="text-[#FF9F1C]">Sarawak Bintulu MLNG</strong> export trains. While Asian inventory buffers remain functional, structural rerouting penalties sustain elevated freight differentials.
            </p>
            <p>
              <strong className="text-white font-semibold">2. Capital Realignment:</strong> Net central bank accumulation of unencumbered physical gold bullion continues at multi-decade highs. Institutional custody is pivoting toward neutral Swiss and Asian freeports to insulate sovereign reserves against sanctions and currency debasement.
            </p>
            <p>
              <strong className="text-white font-semibold">3. Compute Sovereignty:</strong> The Johor-Singapore cross-border AI compute corridor represents Southeast Asia's fastest-growing GPU cluster density, demanding unprecedented national grid allocation and high-voltage baseload infrastructure.
            </p>
          </div>
        </div>

        {/* Right: Key Focal Vectors (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-[#1F2733] bg-[#121622] p-4 font-mono text-xs">
          <div className="text-[10px] text-[#8E95A5] uppercase tracking-wider mb-3">
            STRATEGIC FOCAL POINTS
          </div>
          <div className="space-y-2.5">
            {STRATEGIC_SITUATION_BRIEF.focalPoints.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-[#0E121A] border border-[#1F2733]"
              >
                <div>
                  <div className="text-white font-medium">{pt.name}</div>
                  <div className="text-[10px] text-[#8E95A5]">Delta: {pt.delta}</div>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${
                    pt.risk === 'CRITICAL'
                      ? 'border-[#FF3B3B]/40 text-[#FF3B3B] bg-[#2B0E12]'
                      : pt.risk === 'SEALED'
                      ? 'border-[#34D399]/40 text-[#34D399] bg-[#0E2619]'
                      : 'border-[#FF9F1C]/40 text-[#FF9F1C] bg-[#261B0E]'
                  }`}
                >
                  {pt.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
