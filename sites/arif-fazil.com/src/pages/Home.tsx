import { Link } from 'react-router-dom'
import { LiveClock } from '@/components/LiveClock'
import { LiveClockHero } from '@/components/LiveClockHero'
import { discoveries } from '@/data/discoveries'
import { agenticMirrors } from '@/components/ArrowNavbar'

/**
 * Home — ARIF FAZIL sovereign surface.
 *
 * Sequence (SITE_CONSTITUTION RULE 1 · 30-second comprehension):
 *   Hero (who/what/why) → Decisions under noise (governing idea)
 *   → Wells record (real-world grounding FIRST) → Systems (forged from that work)
 *   → Proof (bounded, not absolute) → Disclaimer.
 *
 * Sacred preserved (SITE_IDENTITY): the human, the motto, the system line,
 * the dark geological visual identity, the organs, /000 and /999.
 * Review fix 2026-08-17 (Copilot external audit): hero-first, canonical
 * discoveries data, bounded claims, original voice (no external quote),
 * personal-site disclaimer, provenance note on wells.
 */

interface SystemCard {
  name: string
  sigil: string
  accent: string
  badge: string
  blurb: string
  to: string
  toLabel: string
  mirror: string
  mirrorLabel: string
}

const SYSTEMS: SystemCard[] = [
  {
    name: 'arifOS',
    sigil: 'Ψ',
    accent: '#E4572E',
    badge: 'PORT 8088 · KERNEL',
    blurb: 'The constitutional law layer for AI systems. Thirteen hard floors (F1–F13) that every consequential tool call must pass.',
    to: '/AAA',
    toLabel: 'Read Doctrine',
    mirror: 'https://arifos.arif-fazil.com',
    mirrorLabel: 'Mirror :8088',
  },
  {
    name: 'GEOX',
    sigil: 'G',
    accent: '#E4572E',
    badge: 'PORT 7072 · EARTH',
    blurb: 'Earth intelligence grounded in rocks, wells and seismic data. Zoeppritz physics, interpretation, deep-time basin models.',
    to: '/earth',
    toLabel: 'View Earth',
    mirror: 'https://geox.arif-fazil.com',
    mirrorLabel: 'Mirror GEOX',
  },
  {
    name: 'WEALTH',
    sigil: 'W',
    accent: '#C9A227',
    badge: 'PORT 7074 · CAPITAL',
    blurb: 'Capital signals — commodity physics (oil, gas, gold), claims registry, and macroeconomic reality. It computes; it never allocates.',
    to: '/world',
    toLabel: 'View World',
    mirror: 'https://wealth.arif-fazil.com',
    mirrorLabel: 'Mirror WEALTH',
  },
  {
    name: 'WELL',
    sigil: '◉',
    accent: '#31C48D',
    badge: 'PORT 7075 · VITALITY',
    blurb: 'Substrate telemetry and homeostasis — wear-and-tear monitoring, readiness, and self-repair signals.',
    to: '/work',
    toLabel: 'View Substrate',
    mirror: 'https://well.arif-fazil.com',
    mirrorLabel: 'Mirror WELL',
  },
  {
    name: 'A-FORGE',
    sigil: 'F',
    accent: '#E4572E',
    badge: 'PORT 7071 · EXECUTION',
    blurb: 'The hands. Controlled mutation, canary deployments, and rollback — execution only after governance clears it.',
    to: '/work',
    toLabel: 'View Executions',
    mirror: 'https://forge.arif-fazil.com',
    mirrorLabel: 'Mirror FORGE',
  },
  {
    name: 'AAA',
    sigil: 'A',
    accent: '#91B0F2',
    badge: 'AGENCY & SKILLS',
    blurb: 'Sovereign agency — agent cards (333-AGI, 555-ASI, 777-FORGE, 888-APEX) and the skill-catalog mesh.',
    to: '/AAA',
    toLabel: 'View Canon',
    mirror: 'https://aaa.arif-fazil.com',
    mirrorLabel: 'Mirror AAA',
  },
]

export function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEAE2]">
      {/* ── HERO — who, what, why (30s, zero jargon) ─────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1F2733] bg-[#0A0B0D] py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #EDEAE2 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="mx-auto max-w-[1360px] px-6 relative z-10">
          {/* Status bar: identity + live clock (live clock is always-current, never stale) */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F2733]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9AA0A8]">
              <span className="w-2 h-2 rounded-full bg-[#E4572E]" />
              <span>SOVEREIGN SURFACE · ARIF FAZIL</span>
            </div>
            <LiveClock withDate className="text-[#9AA0A8]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: identity & purpose */}
            <div className="lg:col-span-7">
              <h1 className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] uppercase tracking-tight text-[#EDEAE2] mb-6">
                Arif<br />
                <span className="text-[#9AA0A8]">Fazil</span>
              </h1>
              <p className="font-mono text-xs text-[#E4572E] uppercase tracking-widest mb-4">
                Exploration Geoscientist · PETRONAS Carigali · Basin Analysis · Offshore Malaysia
              </p>
              <p className="font-sans text-lg md:text-xl text-[#9AA0A8] leading-relaxed max-w-2xl mb-4">
                I find signals in difficult subsurface data.
                I build systems that refuse to pretend certainty.
              </p>
              <p className="font-sans text-base text-[#9AA0A8]/70 leading-relaxed max-w-2xl mb-8">
                Both are the same work: reading what the ground actually says — not what the model wants it to say.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/work"
                  className="px-5 py-2.5 rounded bg-[#E4572E] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E4572E]/90 transition-colors"
                >
                  Explore the Work →
                </Link>
                <Link
                  to="/earth"
                  className="px-5 py-2.5 rounded border border-[#1F2733] bg-transparent text-[#9AA0A8] font-mono text-xs uppercase tracking-wider hover:text-[#EDEAE2] hover:border-[#EDEAE2]/30 transition-colors"
                >
                  See the Wells
                </Link>
              </div>
            </div>

            {/* Right: Live Dynamic Clock Hero */}
            <div className="lg:col-span-5 lg:border-l lg:border-[#1F2733] lg:pl-8 space-y-6">
              <LiveClockHero />

              <div className="rounded-lg border border-[#1F2733] bg-[#11151C]/80 p-4 space-y-2.5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] flex items-center justify-between">
                  <span>Operating Constitution</span>
                  <span className="text-[#C9A227]">F1 — F13</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px] uppercase">
                  <div className="flex items-center gap-2 text-[#EDEAE2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#31C48D]" />
                    <span>Evidence 1st</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#EDEAE2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                    <span>Humans Rule</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#EDEAE2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
                    <span>Ditempa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DECISIONS UNDER NOISE — the governing idea ──────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0E1116]" id="idea">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-3">
            The Governing Idea
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#EDEAE2] mb-6">
            Decisions under noise
          </h2>
          <p className="font-sans text-lg md:text-xl text-[#9AA0A8] leading-relaxed max-w-3xl">
            The subsurface is incomplete. Markets are noisy. Institutions simplify. AI fills gaps too confidently.
          </p>
          <p className="font-sans text-base text-[#EDEAE2]/85 leading-relaxed max-w-3xl mt-4">
            My work is to preserve the evidence, name the uncertainty, and improve the decision.
          </p>
        </div>
      </section>

      {/* ── THE WELLS RECORD — real-world grounding FIRST ────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0A0B0D]" id="wells">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-2">
                Subsurface Ledger
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#EDEAE2]">
                The Wells Record
              </h2>
            </div>
            <Link to="/earth" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
              Explore 3D Basin & Earth Maps →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discoveries.map((d) => (
              <article
                key={d.id}
                className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-[#EDEAE2]">
                      {d.title}
                    </h3>
                    <span className="font-mono text-xs text-[#9AA0A8] whitespace-nowrap">{d.year}</span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#9AA0A8]/70 mb-3">
                    {d.location}
                  </p>
                  <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed line-clamp-3">
                    {d.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#1F2733] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#9AA0A8]/70">
                    {d.evidence.length} evidence item{d.evidence.length === 1 ? '' : 's'}
                  </span>
                  <a
                    href={d.link ?? 'https://geox.arif-fazil.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider"
                  >
                    {d.linkLabel ?? 'Explore GEOX'} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 font-mono text-[11px] leading-relaxed text-[#9AA0A8]/60 max-w-3xl">
            Results reflect publicly reported outcomes and personal professional contribution — not institutional
            claims on behalf of PETRONAS. Internal technical detail is withheld. Last verified 2026-08-17.
          </p>
        </div>
      </section>

      {/* ── SYSTEMS — forged from that work ─────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0E1116]" id="systems">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-2">
                Governed Architecture
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#EDEAE2]">
                Systems forged from real work
              </h2>
            </div>
            <p className="font-sans text-sm text-[#9AA0A8] max-w-md">
              Every system began as a practical problem met in the field. AI computes. Evidence constrains. Humans decide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYSTEMS.map((s) => (
              <div
                key={s.name}
                className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded border font-mono text-sm font-bold"
                      style={{ color: s.accent, borderColor: `${s.accent}40`, background: `${s.accent}0d` }}
                    >
                      {s.sigil}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                    {s.name}
                  </h3>
                  <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                    {s.blurb}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                  <Link to={s.to} className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                    {s.toLabel} →
                  </Link>
                  <a href={s.mirror} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                    {s.mirrorLabel} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF — bounded, not absolute ───────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0A0B0D]" id="proof">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-3">
            Proof, not performance
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#EDEAE2] mb-6">
            Evidence over assertion
          </h2>
          <p className="font-sans text-base text-[#9AA0A8] leading-relaxed max-w-3xl mb-8">
            Material claims link to evidence, or are marked as interpretation. Where evidence is incomplete,
            the system returns UNKNOWN or HOLD — it does not invent an answer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] mb-2">For humans</div>
              <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">Read the work and its meaning.</p>
              <Link to="/words" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">Read Words →</Link>
            </div>
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] mb-2">For agents</div>
              <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">Ingest structured context and identity.</p>
              <Link to="/000" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">/000 Context →</Link>
            </div>
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] mb-2">For verification</div>
              <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">Inspect provenance and sealed evidence.</p>
              <Link to="/999" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">/999 Proof →</Link>
            </div>
          </div>

          {/* Agentic mirror (organs) */}
          <div className="rounded-lg border border-[#1F2733] bg-[#0E1116] p-5 mb-10">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] mb-3">
              Agentic Web — Federation Organs
            </div>
            <div className="flex flex-wrap gap-2">
              {agenticMirrors.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded bg-[#161B22] border border-[#1F2733] text-[11px] font-mono uppercase text-[#9AA0A8] hover:text-[#EDEAE2] hover:border-[#E4572E]/50 transition-colors"
                  title={m.desc}
                >
                  {m.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-5">
            <p className="font-mono text-[11px] leading-relaxed text-[#9AA0A8]/70 max-w-3xl">
              Personal site of Muhammad Arif bin Fazil. Views and interpretations are personal unless explicitly
              identified as published institutional material. No confidential subsurface or commercial information
              is presented. Ditempa bukan diberi — forged, not given.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home
