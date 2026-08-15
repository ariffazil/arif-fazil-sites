import { Link } from 'react-router-dom'
import { QuoteCard } from '@/components/QuoteCard'
import { LiveClock } from '@/components/LiveClock'
import { agenticMirrors } from '@/components/ArrowNavbar'

const WELLS_RECORD = [
  { name: 'BEKANTAN-1', year: '2019', basin: 'Malay Basin', depth: '1,420m', status: 'Oil Discovery (Shallowest Flowing)', role: 'Lead Geoscientist' },
  { name: 'BINTANG-EAST-1', year: '2021', basin: 'Malay Basin', depth: '2,850m', status: 'Gas Discovery (Commercial Flow)', role: 'Lead Explorationist' },
  { name: 'GELAMA-MERAH-1', year: '2023', basin: 'Sabah Deepwater', depth: '3,100m', status: 'Hydrocarbon Flow Confirmed', role: 'Subsurface Specialist' },
  { name: 'LAYANG-DEEP-2', year: '2024', basin: 'Sarawak Basin', depth: '3,400m', status: 'Pre-salt Gas Discovery', role: 'Peer Review / Lead' },
]

export function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEAE2]">
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1F2733] bg-[#0A0B0D] py-16 md:py-24">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #EDEAE2 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="mx-auto max-w-[1360px] px-6 relative z-10">
          {/* Top Status Bar: Section label + Live Clock */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F2733]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9AA0A8]">
              <span className="w-2 h-2 rounded-full bg-[#E4572E]" />
              <span>SOVEREIGN SURFACE · ARIF FAZIL</span>
            </div>
            <LiveClock withDate className="text-[#9AA0A8]" />
          </div>

          {/* Main Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Identity & Purpose */}
            <div className="lg:col-span-7">
              <h1 className="font-display font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] uppercase tracking-tight text-[#EDEAE2] mb-6">
                Arif<br />
                <span className="text-[#9AA0A8]">Fazil</span>
              </h1>
              <p className="font-mono text-xs text-[#E4572E] uppercase tracking-widest mb-4">
                Petronas Carigali · Basin Analysis · Offshore Malaysia
              </p>
              <p className="font-sans text-lg md:text-xl text-[#9AA0A8] leading-relaxed max-w-2xl mb-8">
                I find oil and gas in places people said were finished.
                I also build the systems that keep AI honest.
                Both are the same kind of work: reading what the ground actually says, not what the model wants it to say.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/earth"
                  className="px-5 py-2.5 rounded bg-[#E4572E] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E4572E]/90 transition-colors"
                >
                  See the Wells →
                </Link>
                <Link
                  to="/work"
                  className="px-5 py-2.5 rounded border border-[#1F2733] bg-[#11151C] text-[#EDEAE2] font-mono text-xs uppercase tracking-wider font-semibold hover:border-[#9AA0A8]/50 transition-colors"
                >
                  What I Built
                </Link>
                <Link
                  to="/words"
                  className="px-5 py-2.5 rounded border border-[#1F2733] bg-transparent text-[#9AA0A8] font-mono text-xs uppercase tracking-wider hover:text-[#EDEAE2] hover:border-[#EDEAE2]/30 transition-colors"
                >
                  Read Words & Essays
                </Link>
              </div>
            </div>

            {/* Right Column: Philosophy & Core Beliefs */}
            <div className="lg:col-span-5 lg:border-l lg:border-[#1F2733] lg:pl-10 space-y-6">
              <QuoteCard
                topic="Personal Philosophy"
                quote="Accept everything about yourself – I mean everything. You are you and that is the beginning and the end – no apologies, no regrets."
                author="Henry Kissinger"
                source="attributed"
              />

              <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-5 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8]">
                  Three Non-Negotiable Invariants
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#31C48D]" />
                  <span className="font-mono text-xs uppercase text-[#EDEAE2]">Evidence before narrative</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E4572E]" />
                  <span className="font-mono text-xs uppercase text-[#EDEAE2]">F1–F13 Constitutional law</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  <span className="font-mono text-xs uppercase text-[#EDEAE2]">Ditempa bukan diberi</span>
                </div>
              </div>

              {/* Direct Mirror Link Bar */}
              <div className="rounded-lg border border-[#1F2733] bg-[#0E1116] p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] mb-2.5 flex items-center justify-between">
                  <span>🪞 Agentic Web Mirror</span>
                  <span className="text-[#31C48D]">7 Organs Live</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agenticMirrors.map((m) => (
                    <a
                      key={m.label}
                      href={m.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 rounded bg-[#161B22] border border-[#1F2733] text-[11px] font-mono uppercase text-[#9AA0A8] hover:text-[#EDEAE2] hover:border-[#E4572E]/50 transition-colors"
                      title={m.desc}
                    >
                      {m.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SYSTEMS (FEDERATION ORGANS) ───────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0E1116]" id="systems">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-2">
                Governed Architecture
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#EDEAE2]">
                The Systems
              </h2>
            </div>
            <p className="font-sans text-sm text-[#9AA0A8] max-w-md">
              Six autonomous organs operating under one sovereign rule: AI executes, humans decide.
              No black boxes. Every consequential action is sealed and verifiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* arifOS */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">⚖️</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    PORT 8088 · KERNEL
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  arifOS
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  The constitutional law layer for AI systems. 13 hard floors (F1–F13) that every tool call must pass.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/AAA" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  Read Doctrine →
                </Link>
                <a href="https://arifos.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror :8088 ↗
                </a>
              </div>
            </div>

            {/* GEOX */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🌍</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    PORT 7072 · EARTH
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  GEOX
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  Autonomous earth intelligence. Zoeppritz physics constraints, seismic interpretation, deep-time basin models.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/earth" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  View Earth Surface →
                </Link>
                <a href="https://geox.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror GEOX ↗
                </a>
              </div>
            </div>

            {/* WEALTH */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">💰</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    PORT 7074 · CAPITAL
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  WEALTH
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  Capital claims registry, commodity physics tracking (Oil, Gas, Gold), macroeconomic reality and SEARAH auditing.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/world" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  View World & Claims →
                </Link>
                <a href="https://wealth.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror WEALTH ↗
                </a>
              </div>
            </div>

            {/* WELL */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🫀</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    PORT 7075 · VITALITY
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  WELL
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  Substrate telemetry, metabolic homeostasis, wear-and-tear monitoring, and physiological self-repair.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/work" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  View Substrate →
                </Link>
                <a href="https://well.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror WELL ↗
                </a>
              </div>
            </div>

            {/* A-FORGE */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">👐</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    PORT 7071 · EXECUTION
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  A-FORGE
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  The hands of the federation. Controlled mutations, test harnesses, zero-downtime canary deployments, and rollback engines.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/work" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  View Executions →
                </Link>
                <a href="https://forge.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror FORGE ↗
                </a>
              </div>
            </div>

            {/* AAA */}
            <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between hover:border-[#9AA0A8]/40 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🏛️</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9AA0A8] px-2 py-0.5 rounded border border-[#1F2733] bg-[#0A0B0D]">
                    AGENCY & SKILLS
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#EDEAE2] mb-2 group-hover:text-[#E4572E] transition-colors">
                  AAA
                </h3>
                <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed mb-4">
                  Sovereign agency, agent cards (333-AGI, 555-ASI, 777-FORGE, 888-APEX), and skill catalog mesh.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1F2733] flex items-center justify-between">
                <Link to="/AAA" className="font-mono text-xs text-[#EDEAE2] hover:underline uppercase tracking-wider">
                  View AAA Canon →
                </Link>
                <a href="https://aaa.arif-fazil.com" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
                  Mirror AAA ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE RECORD OF WELLS ───────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-[#1F2733] bg-[#0A0B0D]" id="wells">
        <div className="mx-auto max-w-[1360px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#E4572E] mb-2">
                13 Years Subsurface Ledger
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#EDEAE2]">
                The Wells Record
              </h2>
            </div>
            <Link to="/earth" className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider">
              Explore 3D Basin & Earth Maps →
            </Link>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#1F2733] bg-[#11151C]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-[#1F2733] bg-[#0E1116] text-[#9AA0A8] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Well Name</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Basin</th>
                  <th className="py-3.5 px-4">Target Depth</th>
                  <th className="py-3.5 px-4">Flow Status</th>
                  <th className="py-3.5 px-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2733]">
                {WELLS_RECORD.map((w) => (
                  <tr key={w.name} className="hover:bg-[#161B22] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#EDEAE2]">{w.name}</td>
                    <td className="py-3.5 px-4 text-[#9AA0A8]">{w.year}</td>
                    <td className="py-3.5 px-4 text-[#9AA0A8]">{w.basin}</td>
                    <td className="py-3.5 px-4 text-[#9AA0A8]">{w.depth}</td>
                    <td className="py-3.5 px-4 text-[#31C48D]">{w.status}</td>
                    <td className="py-3.5 px-4 text-[#9AA0A8]">{w.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home
