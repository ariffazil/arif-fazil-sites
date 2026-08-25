import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { type IntelHotspot } from '@/data/worldIntelData';

interface PalantirTargetInspectorProps {
  node: IntelHotspot;
}

export function PalantirTargetInspector({ node }: PalantirTargetInspectorProps) {
  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-[#FF3B3B] border-[#FF3B3B]/40 bg-[#2B0E12]';
      case 'ELEVATED':
        return 'text-[#FF9F1C] border-[#FF9F1C]/40 bg-[#261B0E]';
      case 'WATCH':
        return 'text-[#00E5FF] border-[#00E5FF]/40 bg-[#0E202B]';
      default:
        return 'text-[#34D399] border-[#34D399]/40 bg-[#0E2619]';
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Maritime':
        return 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30';
      case 'Energy':
        return 'bg-[#FF9F1C]/10 text-[#FF9F1C] border-[#FF9F1C]/30';
      case 'Military':
        return 'bg-[#FF3B3B]/10 text-[#FF3B3B] border-[#FF3B3B]/30';
      case 'Cyber':
        return 'bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/30';
      case 'Capital':
        return 'bg-[#F0B840]/10 text-[#F0B840] border-[#F0B840]/30';
      default:
        return 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30';
    }
  };

  return (
    <div className="rounded-2xl border border-[#1F2733] bg-[#0E121A]/95 p-6 shadow-2xl flex flex-col justify-between h-full min-h-[580px] lg:min-h-[640px] relative overflow-hidden backdrop-blur-md">
      {/* Decorative Grid Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent pointer-events-none" />

      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-[#1F2733] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E5FF]">
              TACTICAL INTEL DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`rounded px-2 py-0.5 font-mono text-[10px] border ${getCategoryBadge(node.category)}`}>
              {node.category.toUpperCase()}
            </span>
            <span className={`rounded px-2 py-0.5 font-mono text-[10px] border font-bold ${getThreatColor(node.threatLevel)}`}>
              {node.threatLevel}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Country / Region */}
            <div className="font-mono text-xs text-[#8E95A5] flex items-center justify-between">
              <span>{node.region}</span>
              <span className="text-[#566175]">ID: {node.id.toUpperCase()}</span>
            </div>

            {/* Target Title */}
            <h3 className="mt-1 font-serif text-2xl text-white font-normal leading-snug tracking-tight">
              {node.name}
            </h3>

            {/* Metric / Strategic Capacity Box */}
            <div className="mt-4 rounded-xl bg-[#141A26] border border-[#232D42] p-3 font-mono">
              <div className="text-[9px] text-[#8E95A5] uppercase tracking-wider flex items-center justify-between">
                <span>STRATEGIC CAPACITY / THROUGHPUT</span>
                <span className="text-[#34D399]">VERIFIED METRIC</span>
              </div>
              <div className="text-base font-bold text-[#00E5FF] mt-1 tracking-tight">
                {node.metric}
              </div>
            </div>

            {/* Spatial Coordinates & Provenance */}
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <div className="rounded-lg bg-[#111622] border border-[#1F2733] p-2">
                <span className="text-[#8E95A5] block">COORDINATES</span>
                <span className="text-white font-semibold">
                  {node.lat.toFixed(2)}°N, {node.lng.toFixed(2)}°E
                </span>
              </div>
              <div className="rounded-lg bg-[#111622] border border-[#1F2733] p-2">
                <span className="text-[#8E95A5] block">EPISTEMIC GRADE</span>
                <span className="text-[#F0B840] font-semibold">
                  {node.epistemicStatus} · F1 TRUTH
                </span>
              </div>
            </div>

            {/* Headline Quote */}
            <div className="mt-4 border-l-2 border-[#00E5FF] pl-3 py-0.5 font-serif text-sm text-white/90 italic">
              "{node.headline}"
            </div>

            {/* Core Analytical Synthesis */}
            <p className="mt-3 text-xs text-[#A0A7B8] font-light leading-relaxed">
              {node.summary}
            </p>

            {/* Extended Dossier Details if available */}
            {node.details && (
              <div className="mt-4 space-y-2 font-mono text-[10px] border-t border-[#1F2733] pt-3">
                {node.details.operatorOrControl && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#8E95A5]">OPERATOR:</span>
                    <span className="text-white text-right font-medium">{node.details.operatorOrControl}</span>
                  </div>
                )}
                {node.details.keyRiskFactor && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#8E95A5]">PRIMARY RISK:</span>
                    <span className="text-[#FF9F1C] text-right font-medium">{node.details.keyRiskFactor}</span>
                  </div>
                )}
                {node.source && (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#8E95A5]">DATA PROVENANCE:</span>
                    <span className="text-[#8E95A5] text-right truncate max-w-[200px]">{node.source}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-[#1F2733]">
        {node.route ? (
          <Link
            to={node.route}
            className="flex items-center justify-between w-full rounded-xl bg-[#00E5FF] px-4 py-3 font-mono text-xs font-bold text-[#0A0C10] uppercase tracking-wider hover:bg-[#38BDF8] transition-colors shadow-lg shadow-[#00E5FF]/10"
          >
            <span>Open Domain Intelligence</span>
            <span>→</span>
          </Link>
        ) : (
          <div className="font-mono text-[11px] text-[#8E95A5] text-center bg-[#111622] border border-[#1F2733] py-2.5 rounded-xl">
            Sovereign Ledger Protected · F1 Truth
          </div>
        )}
      </div>
    </div>
  );
}
