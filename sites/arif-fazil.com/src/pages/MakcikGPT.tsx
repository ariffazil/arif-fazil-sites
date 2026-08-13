import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { makcikArticlesMeta } from '@/data/makcikgpt/index';

export function MakcikGPT() {
  useEffect(() => {
    document.title = 'MakcikGPT — Civilization Intelligence | arifOS';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-forge-black min-h-screen"
    >
      {/* Hero */}
      <section className="py-24 border-b-2 border-[#1E293B] bg-[#0F172A] relative overflow-hidden">
        {/* Tri-color background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EF4444]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="site-frame relative z-10">
          <div className="section-label text-[#38BDF8] flex items-center gap-2 font-mono text-xs font-bold tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
            CIVIC INTELLIGENCE · Ξ WEALTH · MAKCIKGPT
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6 text-white">
            Makcik<br />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#EAB308] to-[#EF4444] bg-clip-text text-transparent">
              GPT
            </span>
          </h1>
          <p className="font-body text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
            Investigative journalism for jiran-jiran. When RM70 billion moves
            and nobody asks questions, MakcikGPT asks in Bahasa Makcik.
            Published directly. No Medium gate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-[#38BDF8]/10 border border-[#38BDF8] text-[#38BDF8] font-mono text-xs font-semibold rounded-sm">
              🔵 BLUE · OBSERVE
            </span>
            <span className="px-3 py-1 bg-[#EF4444]/10 border border-[#EF4444] text-[#EF4444] font-mono text-xs font-semibold rounded-sm">
              🔴 RED · FALSIFY
            </span>
            <span className="px-3 py-1 bg-[#EAB308]/10 border border-[#EAB308] text-[#EAB308] font-mono text-xs font-semibold rounded-sm">
              🟡 YELLOW · SEAL ({makcikArticlesMeta.length} ARTICLES)
            </span>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-[#090D16]">
        <div className="site-frame space-y-8">
          {makcikArticlesMeta.map((article, idx) => {
            // Tri-color accent rotation: Blue (#38BDF8), Red (#EF4444), Yellow (#EAB308)
            const colors = [
              { border: 'border-[#38BDF8]/40 hover:border-[#38BDF8]', badge: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30', link: 'text-[#38BDF8]' },
              { border: 'border-[#EF4444]/40 hover:border-[#EF4444]', badge: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30', link: 'text-[#EF4444]' },
              { border: 'border-[#EAB308]/40 hover:border-[#EAB308]', badge: 'bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/30', link: 'text-[#EAB308]' },
            ];
            const theme = colors[idx % 3];

            return (
              <Link
                key={article.slug}
                to={`/world/makcikgpt/${article.slug}`}
                className={`brutalist-card border ${theme.border} bg-[#0F172A]/80 p-8 block transition-all hover:translate-x-1`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-mono text-[0.65rem] px-2 py-0.5 border font-bold uppercase tracking-wider ${theme.badge}`}>
                        {article.domain}
                      </span>
                      <span className="font-mono text-[0.65rem] text-[#94A3B8] uppercase tracking-wider">
                        {article.language === 'ms' ? 'Bahasa Makcik' : 'English'} · Sealed {article.seal}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-tight hover:text-[#38BDF8] transition-colors">
                      {article.title}
                    </h2>
                  </div>
                  <time
                    dateTime={article.date}
                    className="font-mono text-xs text-[#94A3B8] whitespace-nowrap"
                  >
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <p className="font-technical text-sm text-[#E2E8F0] font-medium mb-3">
                  {article.subtitle}
                </p>

                <p className="font-body text-[#94A3B8] text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[#334155] text-[#94A3B8] bg-[#1E293B]/50"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className={`font-mono text-xs font-bold ${theme.link} ml-auto flex items-center gap-1`}>
                    Read article →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Context */}
      <section className="py-16 border-t-2 border-forge-iron">
        <div className="site-frame max-w-2xl">
          <div className="section-label mb-6">Constitutional Floor</div>
          <div className="space-y-4 text-forge-dim text-sm leading-relaxed">
            <p>
              Every MakcikGPT article is sealed under <strong className="text-forge-white">999_SEAL</strong>.
              Evidence chains trace to primary sources. No claims without receipts.
            </p>
            <p>
              <strong className="text-forge-white">F1 AMANAH:</strong> Reversible-first. All sources documented.
              <br />
              <strong className="text-forge-white">F2 TRUTH:</strong> Evidence-labeled OBS/DER/INT/SPEC.
              <br />
              <strong className="text-forge-white">F6 MARUAH:</strong> Names named only with public-record evidence.
              <br />
              <strong className="text-forge-white">F11 AUDIT:</strong> Full provenance chain in SEARAH-TRUTH-DB.md.
            </p>
          </div>

          <div className="mt-12 flex gap-4">
            <Link to="/economics" className="button-forge text-xs py-2">
              ← Back to WEALTH
            </Link>
            <a
              href="https://medium.com/@arifbfazil"
              target="_blank"
              rel="noreferrer"
              className="button-forge button-forge--accent text-xs py-2"
            >
              Medium ↗
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default MakcikGPT;
