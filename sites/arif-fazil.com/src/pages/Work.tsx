import { Link } from 'react-router-dom'
import { agenticMirrors } from '@/components/ArrowNavbar'

const WELLS_DATA = [
  { name: 'BEKANTAN-1', year: '2019', basin: 'Malay Basin', depth: '1,420m', status: 'Oil Discovery', note: 'Shallowest flowing oil discovery in the Malay Basin. Proved low-resistivity pay model.' },
  { name: 'BINTANG-EAST-1', year: '2021', basin: 'Malay Basin', depth: '2,850m', status: 'Gas Discovery', note: 'Pre-salt commercial gas flow under extreme pressure constraints.' },
  { name: 'GELAMA-MERAH-1', year: '2023', basin: 'Sabah Deepwater', depth: '3,100m', status: 'Hydrocarbon Flow', note: 'Deepwater turbidite channel calibration with zero safety incidents.' },
  { name: 'LAYANG-DEEP-2', year: '2024', basin: 'Sarawak Basin', depth: '3,400m', status: 'Gas Discovery', note: 'Carbonate build-up exploration with AVO seismic inversion.' },
]

export function Work() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEAE2] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-12 border-b border-[#1F2733] pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#31C48D] uppercase tracking-widest mb-3">
            <span>⚙️ WORK · SYSTEMS · THE WELLS</span>
            <span>·</span>
            <span>OPERATIONAL LEDGER</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-[#EDEAE2] mb-4">
            The Work & The Record
          </h1>
          <p className="font-sans text-lg text-[#9AA0A8] max-w-3xl leading-relaxed">
            Thirteen years of offshore petroleum drilling decisions and the computational architecture built to govern autonomous intelligence.
            Every well flowed. Every system is sealed.
          </p>
        </div>

        {/* Section 1: The Wells Record */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#EDEAE2]">
              1. Offshore Wells Ledger (Petronas Carigali)
            </h2>
            <Link to="/earth" className="font-mono text-xs text-[#E4572E] hover:underline uppercase">
              3D Earth & Basin Maps →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WELLS_DATA.map((w) => (
              <div key={w.name} className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-base font-bold text-[#EDEAE2]">{w.name}</span>
                  <span className="font-mono text-xs text-[#31C48D] px-2 py-0.5 rounded border border-[#31C48D]/30 bg-[#31C48D]/10">
                    {w.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs text-[#9AA0A8] mb-3 pb-3 border-b border-[#1F2733]">
                  <div>Year: <span className="text-[#EDEAE2]">{w.year}</span></div>
                  <div>Basin: <span className="text-[#EDEAE2]">{w.basin}</span></div>
                  <div>Depth: <span className="text-[#EDEAE2]">{w.depth}</span></div>
                </div>
                <p className="font-sans text-xs text-[#9AA0A8] leading-relaxed">
                  {w.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Federation Systems Architecture */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#EDEAE2]">
              2. Sovereign AI Systems (The Federation)
            </h2>
            <Link to="/AAA" className="font-mono text-xs text-[#91B0F2] hover:underline uppercase">
              Read AAA Doctrine →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agenticMirrors.map((m) => (
              <div key={m.label} className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-mono text-sm font-bold uppercase text-[#EDEAE2]">{m.name}</span>
                  </div>
                  <p className="font-sans text-xs text-[#9AA0A8] leading-relaxed mb-4">
                    {m.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1F2733]">
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-[#E4572E] hover:underline uppercase tracking-wider flex items-center justify-between"
                  >
                    <span>Launch Portal</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
export default Work
