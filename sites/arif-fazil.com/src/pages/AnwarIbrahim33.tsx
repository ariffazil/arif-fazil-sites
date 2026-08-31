import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ANWAR_SHADOWS, ANWAR_SUMMARY, type ShadowAxis } from '@/data/anwarShadows33';

const AXIS_META: Record<ShadowAxis, { label: string; emoji: string; color: string; border: string; bg: string }> = {
  sosiopolitik: { label: 'Sosiopolitik', emoji: '🏛️', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-900/20' },
  ekonomi: { label: 'Ekonomi', emoji: '💸', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-900/20' },
  peribadi: { label: 'Peribadi', emoji: '🗝️', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-900/20' },
};

const VERDICT_STYLE = {
  bg: 'bg-red-900/30',
  text: 'text-red-400',
  label: 'TENGGELAM — 33 Bilik Terkunci',
};

export function AnwarIbrahim33() {
  const [filter, setFilter] = useState<ShadowAxis | 'ALL'>('ALL');
  const shadows = filter === 'ALL' ? ANWAR_SHADOWS : ANWAR_SHADOWS.filter(s => s.axis === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-forge-black min-h-screen">
      {/* HERO */}
      <section className="py-16 md:py-20 border-b-2 border-forge-iron bg-forge-steel">
        <div className="site-frame">
          <div className="section-label">JUNG SHADOW · PSIKOLOGI BAYANG · 33 ANALISIS</div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-[0.85] tracking-tighter mb-4 text-forge-white">
            33 Bayang<br />Anwar Ibrahim
          </h1>
          <p className="font-body text-lg text-forge-dim max-w-3xl leading-relaxed mb-4">
            {ANWAR_SUMMARY.jungLaw}
          </p>
          <p className="font-mono text-[0.6rem] text-forge-dim uppercase tracking-widest mb-6">
            3 AXIS · 11 BAYANG SETIAP SATU · DARI REKOD AWAM
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/politics/shadow"
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-forge-orange/40 text-forge-orange hover:bg-forge-orange hover:text-forge-black transition-colors">
              ← Semua PM Bayang
            </Link>
          </div>
        </div>
      </section>

      {/* SUMMARY CARD */}
      <section className="py-10 border-b border-forge-iron">
        <div className="site-frame">
          <div className={`p-6 rounded-lg border-2 ${VERDICT_STYLE.bg} border-red-500/30`}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded ${VERDICT_STYLE.text} border border-red-500/40`}>
                {VERDICT_STYLE.label}
              </span>
              <span className="font-mono text-xs text-forge-dim uppercase tracking-wider">
                {ANWAR_SUMMARY.tenure} · PM ke-10 Malaysia
              </span>
            </div>
            <p className="font-serif text-lg md:text-xl text-forge-white leading-relaxed">
              {ANWAR_SUMMARY.coreInsight}
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-6 border-b border-forge-iron sticky top-0 bg-forge-black/95 backdrop-blur-sm z-10">
        <div className="site-frame flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${filter === 'ALL' ? 'border-forge-orange bg-forge-orange text-forge-black' : 'border-forge-iron text-forge-dim hover:border-forge-orange/40'}`}>
            Semua 33
          </button>
          {(Object.keys(AXIS_META) as ShadowAxis[]).map(axis => (
            <button key={axis}
              onClick={() => setFilter(axis)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${filter === axis ? `${AXIS_META[axis].border} ${AXIS_META[axis].bg} ${AXIS_META[axis].color}` : 'border-forge-iron text-forge-dim hover:border-forge-orange/40'}`}>
              {AXIS_META[axis].emoji} {AXIS_META[axis].label} (11)
            </button>
          ))}
        </div>
      </section>

      {/* SHADOW CARDS */}
      <section className="py-12">
        <div className="site-frame">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {shadows.map((shadow, idx) => {
              const meta = AXIS_META[shadow.axis];
              return (
                <motion.article
                  key={shadow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.8) }}
                  className={`border-2 ${meta.border} bg-forge-steel p-6 flex flex-col group hover:border-forge-orange/50 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-[0.6rem] tracking-widest ${meta.color}`}>
                      {meta.emoji} BAYANG {String(shadow.id).padStart(2, '0')}
                    </span>
                    <span className={`font-mono text-[0.5rem] uppercase tracking-wider px-2 py-0.5 rounded border ${meta.border} ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forge-white leading-tight mb-3 group-hover:text-forge-orange transition-colors">
                    {shadow.title}
                  </h3>
                  <p className="font-body text-sm text-forge-dim leading-relaxed flex-1">
                    {shadow.body}
                  </p>
                  <div className="mt-4 pt-3 border-t border-forge-iron/60">
                    <span className="font-mono text-[0.55rem] text-forge-dim/60 uppercase tracking-wider block mb-1">Sumber</span>
                    <span className="font-body text-xs text-forge-dim/70 italic">{shadow.source}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="py-12 border-t-2 border-forge-iron">
        <div className="site-frame">
          <h3 className="font-mono text-xs uppercase tracking-widest text-forge-orange mb-4">Sumber Penuh</h3>
          <div className="flex flex-wrap gap-2">
            {ANWAR_SUMMARY.sources.map(src => (
              <span key={src} className="font-mono text-[0.6rem] text-forge-dim border border-forge-iron px-3 py-1 rounded">
                {src}
              </span>
            ))}
          </div>
          <p className="mt-8 font-mono text-[0.55rem] text-forge-dim uppercase tracking-widest text-center">
            DITEMPA BUKAN DIBERI — Yang benar dikarang, bukan diberi
          </p>
        </div>
      </section>
    </motion.div>
  );
}
