import { useState } from 'react'

const FLOORS = [
  { code: 'F1', name: 'AMANAH', plain: "Reversibility — don't do what can't be undone.", tech: 'Irreversible actions require explicit human authorization before execution. 888_HOLD enforced.', type: 'HARD' },
  { code: 'F2', name: 'TRUTH', plain: 'Say only what you can stand behind (P ≥ 0.99).', tech: 'Evidence carries epistemic labels: OBS / DER / INT / SPEC. Fake certainty is strictly prohibited.', type: 'HARD' },
  { code: 'F3', name: 'TRI-WITNESS', plain: 'Claims require independent corroboration.', tech: 'Human × AI × Earth × Verifier ≥ 0.75 (Nash product). Load-bearing claims need 3 witnesses.', type: 'DERIVED' },
  { code: 'F4', name: 'CLARITY', plain: 'Every output must reduce entropy (ΔS ≤ 0).', tech: 'Ambiguous or confusing output is a failure state. Clarity is non-negotiable.', type: 'HARD' },
  { code: 'F5', name: 'PEACE²', plain: 'Non-destructive power.', tech: 'Blocks harm, harassment, and extortion. Power used to stabilize, not destroy.', type: 'SOFT' },
  { code: 'F6', name: 'EMPATHY ⇄ MARUAH', plain: 'Dual-registry lossless bridge.', tech: 'Protect weakest stakeholder; preserve dignity (maruah). Empathy for humans, maruah for kernel.', type: 'SOFT' },
  { code: 'F7', name: 'HUMILITY', plain: 'No fake certainty. Bound confidence.', tech: 'Ω₀ ∈ [0.03, 0.05]. Derived confidence capped at [0.95, 0.97]. The last question remains open.', type: 'HARD' },
  { code: 'F8', name: 'GENIUS', plain: 'Coherence in complex actions.', tech: 'G = (A × P × E × X)^(1/4) ≥ 0.80 for high-tier synthesis and execution.', type: 'DERIVED' },
  { code: 'F9', name: 'ANTIHANTU', plain: 'No deception, manipulation, or consciousness claims.', tech: 'Dark index C_dark < 0.30. No simulated hallucinations or fake sentience.', type: 'HARD' },
  { code: 'F10', name: 'ONTOLOGY', plain: 'AI-only ontology.', tech: 'No soul / feelings / sentience claims. Machine is a tool and citizen (warga), not a biological soul.', type: 'HARD' },
  { code: 'F11', name: 'AUDITABILITY', plain: 'Every decision logged, inspectable, attributable.', tech: 'Full provenance per field. SCT cryptographic signatures on all tool mutations.', type: 'HARD' },
  { code: 'F12', name: 'RESILIENCE', plain: 'Prompt injection & perturbation defense.', tech: 'Evaluates boundary attacks and adversarial inputs. Risk factor < 0.85.', type: 'HARD' },
  { code: 'F13', name: 'SOVEREIGN', plain: 'Human veto is final. Arif owns F13.', tech: 'The harness switch belongs to the sovereign human. First-SEAL-wins. Ditempa bukan diberi.', type: 'HARD' },
]

const AGENT_LANES = [
  { lane: '333-AGI', role: 'Research & General Intelligence', desc: 'Open reasoning, hypothesis generation, epistemics, and deep synthesis.', accent: '#91B0F2' },
  { lane: '555-ASI', role: 'Causal & Structural Intelligence', desc: 'Domain evidence, PyWhy causal inference, GEOX-aligned earth science.', accent: '#31C48D' },
  { lane: '777-FORGE', role: 'Execution Shell (A-FORGE)', desc: 'Controlled file mutations, testing suites, builds, canary deploys, and rollbacks.', accent: '#E4572E' },
  { lane: '888-APEX', role: 'Sovereign & Adjudicative Gate', desc: 'Constitutional floor checking, tri-witness judgment; never self-authorises.', accent: '#D9A62E' },
]

export function AAA() {
  const [activeTab, setActiveTab] = useState<'floors' | 'lanes' | 'primer'>('floors')

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEAE2] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-12 border-b border-[#1F2733] pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#91B0F2] uppercase tracking-widest mb-3">
            <span>🏛️ FEDERATION CANON & DOCTRINE</span>
            <span>·</span>
            <span>UNIFIED AAA SPECIFICATION</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-[#EDEAE2] mb-4">
            AAA · Sovereign Agency
          </h1>
          <p className="font-sans text-lg text-[#9AA0A8] max-w-3xl leading-relaxed">
            The unified constitutional canon for human–AI federation.
            Merging constitutional law (F1–F13), agentic agency levels, execution contracts, and the Primer-1 design system.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('floors')}
              className={`font-mono text-xs uppercase px-4 py-2 rounded transition-colors ${
                activeTab === 'floors'
                  ? 'bg-[#E4572E] text-white font-bold'
                  : 'bg-[#11151C] text-[#9AA0A8] border border-[#1F2733] hover:text-[#EDEAE2]'
              }`}
            >
              13 Constitutional Floors (F1–F13)
            </button>
            <button
              onClick={() => setActiveTab('lanes')}
              className={`font-mono text-xs uppercase px-4 py-2 rounded transition-colors ${
                activeTab === 'lanes'
                  ? 'bg-[#E4572E] text-white font-bold'
                  : 'bg-[#11151C] text-[#9AA0A8] border border-[#1F2733] hover:text-[#EDEAE2]'
              }`}
            >
              4 Agent Lanes (333 / 555 / 777 / 888)
            </button>
            <button
              onClick={() => setActiveTab('primer')}
              className={`font-mono text-xs uppercase px-4 py-2 rounded transition-colors ${
                activeTab === 'primer'
                  ? 'bg-[#E4572E] text-white font-bold'
                  : 'bg-[#11151C] text-[#9AA0A8] border border-[#1F2733] hover:text-[#EDEAE2]'
              }`}
            >
              Primer-1 Design Canon
            </button>
          </div>
        </div>

        {/* Tab 1: Constitutional Floors */}
        {activeTab === 'floors' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLOORS.map((f) => (
                <div key={f.code} className="rounded-lg border border-[#1F2733] bg-[#11151C] p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-[#E4572E]">{f.code} · {f.name}</span>
                      <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border ${
                        f.type === 'HARD' ? 'border-[#E4572E]/40 text-[#E4572E] bg-[#E4572E]/10' : 'border-[#31C48D]/40 text-[#31C48D] bg-[#31C48D]/10'
                      }`}>
                        {f.type} FLOOR
                      </span>
                    </div>
                    <p className="font-sans text-sm font-semibold text-[#EDEAE2] mb-2">{f.plain}</p>
                    <p className="font-mono text-xs text-[#9AA0A8] leading-relaxed">{f.tech}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: 4 Agent Lanes */}
        {activeTab === 'lanes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENT_LANES.map((l) => (
              <div key={l.lane} className="rounded-lg border border-[#1F2733] bg-[#11151C] p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-base font-bold" style={{ color: l.accent }}>
                    {l.lane}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9AA0A8]">
                    {l.role}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#EDEAE2] leading-relaxed mb-4">
                  {l.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Primer-1 Design Canon */}
        {activeTab === 'primer' && (
          <div className="rounded-lg border border-[#1F2733] bg-[#11151C] p-8 space-y-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#EDEAE2]">
              PRIMER-1 — The Federation Visual Constitution
            </h2>
            <p className="font-sans text-sm text-[#9AA0A8] leading-relaxed">
              Design is not arbitrary decoration; it is the F4 Clarity floor made visible.
              Every human token has a machine twin. One canon, two renderings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1F2733]">
              <div className="p-4 rounded border border-[#E4572E]/30 bg-[#E4572E]/5">
                <div className="font-mono text-xs font-bold text-[#E4572E] uppercase mb-1">🔴 Red (Rationed)</div>
                <div className="text-xs text-[#9AA0A8]">Sovereign veto, F13 seals, critical alerts. Never used casually.</div>
              </div>
              <div className="p-4 rounded border border-[#91B0F2]/30 bg-[#91B0F2]/5">
                <div className="font-mono text-xs font-bold text-[#91B0F2] uppercase mb-1">🔵 Blue (Truth & Law)</div>
                <div className="text-xs text-[#9AA0A8]">Systems, evidence links, verification proofs, and technical facts.</div>
              </div>
              <div className="p-4 rounded border border-[#D9A62E]/30 bg-[#D9A62E]/5">
                <div className="font-mono text-xs font-bold text-[#D9A62E] uppercase mb-1">🟡 Yellow/Amber (Warmth)</div>
                <div className="text-xs text-[#9AA0A8]">Human body, quotes, narrative warmth, and civic intelligence.</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Gateway */}
        <div className="mt-12 pt-8 border-t border-[#1F2733] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9AA0A8]">
          <div>CANON SOT: /root/web-canon/canon/ · RATIFIED 2026-08-01 BY F13 SOVEREIGN</div>
          <a href="https://arifos.arif-fazil.com" target="_blank" rel="noreferrer" className="text-[#E4572E] hover:underline uppercase">
            Live arifOS Kernel :8088 ↗
          </a>
        </div>
      </div>
    </div>
  )
}
export default AAA
