import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TradingViewChart } from '@/components/TradingViewChart';

type CommodityDef = {
  slug: string;
  name: string;
  symbol: string;
  tradingViewSymbol: string;
  description: string;
  source: string;
  color: string;
  yahoo: string;
  price: string;
  delta: string;
  pct: string;
  verdict: 'SEAL' | 'SABAR' | 'HOLD';
  verdictColor: string;
  bias: string;
  s1: string;
  s2: string;
  r1: string;
  r2: string;
  driver: string;
  ground: { title: string; desc: string };
  mind: { title: string; desc: string };
  capital: { title: string; desc: string };
  sovereign: { title: string; desc: string };
};

const COMMODITIES: Record<string, CommodityDef> = {
  oil: {
    slug: 'oil',
    name: 'Brent Crude Oil',
    symbol: 'BZ=F',
    tradingViewSymbol: 'TVC:UKOIL',
    description: 'Brent crude futures — global benchmark for oil prices. Drives Malaysian petroleum revenue and fiscal budget buffers.',
    source: 'yfinance: BZ=F',
    color: '#C4791A',
    yahoo: 'BZ=F',
    price: '$88.52',
    delta: '+$1.45',
    pct: '+1.64%',
    verdict: 'SEAL',
    verdictColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
    bias: 'BULLISH MANDATE',
    s1: '$88.38', s2: '$87.04', r1: '$89.39', r2: '$90.27',
    driver: 'Primary Driver: Middle East geopolitical risk premium · OPEC+ supply discipline · PETRONAS dividend buffer',
    ground: { title: 'Global Energy Pulse', desc: 'Brent crude benchmark directly influences PETRONAS dividend contributions to Putrajaya and RON95/BUDI95 fuel subsidy thresholds.' },
    mind: { title: 'Trading Desk Risk', desc: 'O&G equity tickers (Dayang, Dialog, Sapura) exhibit strong 0.82 correlation to Brent spot price movements.' },
    capital: { title: 'PETRONAS PROPA Impact', desc: 'Internal corporate KPI narratives intensify when Brent swings. Distinguish core operational signal from executive spin.' },
    sovereign: { title: 'Frontier Drilling Budget', desc: 'Sustained oil above $85/bbl funds offshore exploration campaigns in the Malay and Sabah basins.' },
  },
  gas: {
    slug: 'gas',
    name: 'Natural Gas / LNG',
    symbol: 'NG=F',
    tradingViewSymbol: 'TVC:NGAS',
    description: 'Natural gas futures — benchmark for LNG pricing. Influences Sarawak gas revenue, SEARAH economics, and TNB power tariffs.',
    source: 'yfinance: NG=F',
    color: '#00D4AA',
    yahoo: 'NG=F',
    price: '$3.42',
    delta: '+$0.08',
    pct: '+2.40%',
    verdict: 'SABAR',
    verdictColor: 'bg-amber-950 text-amber-400 border-amber-500/40',
    bias: 'NEUTRAL ACCUMULATION',
    s1: '$3.20', s2: '$3.00', r1: '$3.60', r2: '$3.85',
    driver: 'Primary Driver: Asian LNG demand · Bintulu MLNG cargo dispatch · Seasonal thermal cooling demand',
    ground: { title: 'LNG Export Benchmarks', desc: 'Japan-Korea Marker (JKM) and Henry Hub futures dictate Sarawak state gas sales and Bintulu export revenues.' },
    mind: { title: 'Power Generation Net Cost', desc: 'Natural gas inputs drive 55%+ of Peninsular Malaysia electricity generation costs under IBR tariff rebalancing.' },
    capital: { title: 'SEARAH Asset Economics', desc: 'Gas realization prices determine asset valuation multiples across domestic upstream gas fields.' },
    sovereign: { title: 'Sarawak PDA Sovereignty', desc: 'State-federal gas distribution rights between PETROS and PETRONAS depend on long-term gas netback margins.' },
  },
  gold: {
    slug: 'gold',
    name: 'Gold (XAU/USD)',
    symbol: 'GC=F',
    tradingViewSymbol: 'OANDA:XAUUSD',
    description: 'Gold futures — sovereign hedge and zero-counterparty risk asset. Tracked in USD/oz and RM/gram for capital preservation.',
    source: 'yfinance: GC=F',
    color: '#D4A853',
    yahoo: 'GC=F',
    price: '$2,485.40',
    delta: '+$14.20',
    pct: '+0.58%',
    verdict: 'SEAL',
    verdictColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
    bias: 'SOVEREIGN HEDGE',
    s1: '$2,450.00', s2: '$2,420.00', r1: '$2,500.00', r2: '$2,525.00',
    driver: 'Primary Driver: Central bank gold accumulation · US Fed rate cut expectations · Geopolitical safe-haven demand',
    ground: { title: 'Zero Counterparty Risk', desc: 'Physical gold remains the ultimate store of value, free from sovereign debt default or fiat debasement risk.' },
    mind: { title: 'Currency Hedging', desc: 'Gold in MYR terms (RM 348/gram) protects domestic purchasing power against Ringgit volatility.' },
    capital: { title: 'Portfolio Protection', desc: 'Allocating 5-10% to gold lowers overall portfolio drawdowns during equity market corrections.' },
    sovereign: { title: 'Central Bank Reserves', desc: 'Global monetary authorities continue net gold purchases to diversify away from USD reserve dominance.' },
  },
  klci: {
    slug: 'klci',
    name: 'Bursa Malaysia (FBM KLCI)',
    symbol: '^KLSE',
    tradingViewSymbol: 'MYX:FBMKLCI',
    description: 'FTSE Bursa Malaysia KLCI — benchmark index of Malaysia top 30 blue-chip equities and capital market pulse.',
    source: 'yfinance: ^KLSE',
    color: '#3B82F6',
    yahoo: '^KLSE',
    price: '1,598.40',
    delta: '+4.50',
    pct: '+0.26%',
    verdict: 'SEAL',
    verdictColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
    bias: 'BULLISH RECOVERY',
    s1: '1,580.00', s2: '1,565.00', r1: '1,615.00', r2: '1,630.00',
    driver: 'Primary Driver: Blue-chip accumulation · OPR stability at 2.75% · Domestic demand resilience',
    ground: { title: 'Domestic Equities & Blue Chips', desc: 'Index anchored by banking, O&G, and utility blue chips. Retail & institutional volume steady above RM2.4B daily average.' },
    mind: { title: 'Monetary Stance & Rates', desc: 'BNM OPR maintained at 2.75% provides low-volatility monetary buffer. Foreign inflow responding to defensive valuation multiples.' },
    capital: { title: 'Corporate Earnings & Yield', desc: 'Average dividend yield across top 30 constituent stocks holding at ~4.1%, preserving capital against bond yield volatility.' },
    sovereign: { title: 'Fiscal Buffer & Policy', desc: 'Federal fiscal target aligned with 4.5%–5.0% GDP growth projection. State election resolution removes near-term political risk discount.' },
  },
  usdmyr: {
    slug: 'usdmyr',
    name: 'Ringgit FX (USD/MYR)',
    symbol: 'USDMYR=X',
    tradingViewSymbol: 'FX_IDC:USDMYR',
    description: 'Malaysian Ringgit exchange rate against US Dollar — imported inflation barometer, BNM OPR buffer, and trade surplus anchor.',
    source: 'yfinance: USDMYR=X',
    color: '#F59E0B',
    yahoo: 'USDMYR=X',
    price: '4.4250',
    delta: '-0.0125',
    pct: '-0.28%',
    verdict: 'SABAR',
    verdictColor: 'bg-amber-950 text-amber-400 border-amber-500/40',
    bias: 'STABLE CONTROL',
    s1: '4.3800', s2: '4.3500', r1: '4.4500', r2: '4.5000',
    driver: 'Primary Driver: US Federal Reserve rate pause (3.50%-3.75%) · BNM OPR 2.75% · Export trade surplus buffer',
    ground: { title: 'Imported Inflation & Prices', desc: 'Every 0.10 MYR shift impacts imported food, electronics, and capital equipment costs. Current 1.90% inflation rate reflects moderate FX passthrough.' },
    mind: { title: 'Fed vs BNM Rate Differential', desc: 'US Fed funds rate at 3.50%–3.75% against Bank Negara OPR at 2.75%. Differential narrowing reduces capital outflow pressure.' },
    capital: { title: 'PETRONAS & Exporter Translation', desc: 'PETRONAS USD revenue stream provides natural hedge for national accounts. Exporters converting USD receipts support domestic Ringgit liquidity.' },
    sovereign: { title: 'Trade Surplus & Reserves', desc: 'Malaysia H1 trade surplus reaching MYR 147.1B (+27.5% export growth) maintains strong central bank reserve foundation.' },
  },
};

export function CommodityPage({ slug }: { slug: string }) {
  const commodity = COMMODITIES[slug] || COMMODITIES['oil'];
  const [ticker, setTicker] = useState<{ price: string; change: string; changePct: string } | null>(null);

  // Ticker endpoint URL map — finance Capital-routed paths.
  // gold/oil/gas live under /wealth/{slug}/api/* (Caddy routes 1013-1087).
  // usdmyr/klci live under /{slug}/api/* (Caddy routes 1423-1447).
  // Server endpoints are bare /api/ticker (no .json extension).
  const TICKER_URL: Record<string, string> = {
    gold: '/wealth/gold/api/ticker',
    oil: '/wealth/oil/api/ticker',
    gas: '/wealth/gas/api/ticker',
    usdmyr: '/usdmyr/api/ticker',
    klci: '/klci/api/ticker',
  };

  useEffect(() => {
    const url = TICKER_URL[commodity.slug] || `/wealth/${commodity.slug}/api/ticker`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d?.price) {
          setTicker({
            price: d.price.toString(),
            change: d.change > 0 ? `+${d.change}` : d.change?.toString() || '0.00',
            changePct: d.changePct > 0 ? `+${d.changePct}%` : `${d.changePct}%` || '0.00%',
          });
        }
      })
      .catch(() => {});
  }, [commodity.slug]);

  const currentPrice = ticker ? (slug === 'usdmyr' ? ticker.price : `$${ticker.price}`) : commodity.price;
  const currentDelta = ticker ? ticker.change : commodity.delta;
  const currentPct = ticker ? ticker.changePct : commodity.pct;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0A0B0D] min-h-screen text-[#EDEAE2] font-sans selection:bg-[#E27D60] selection:text-[#0A0B0D] pb-20">
      
      {/* LOCAL MARKET NAV TICKER */}
      <div className="bg-[#0E1015] border-b border-[#222733] py-2.5 px-4 font-mono text-xs text-[#8E95A5] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#1F180D] text-[#D4AF37] border border-[#3A2E16] text-[10px] font-bold uppercase tracking-wider">
            ● WEALTH SIGNAL TERMINAL
          </span>
          <span className="text-white">arifOS · Federation Market Intelligence · {commodity.name}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <a href="/oil/" className={`px-2.5 py-1 rounded transition-colors ${slug === 'oil' ? 'bg-[#E27D60] text-[#0A0B0D] font-bold' : 'text-[#8E95A5] hover:text-white'}`}>OIL</a>
          <a href="/gas/" className={`px-2.5 py-1 rounded transition-colors ${slug === 'gas' ? 'bg-[#E27D60] text-[#0A0B0D] font-bold' : 'text-[#8E95A5] hover:text-white'}`}>GAS</a>
          <a href="/gold/" className={`px-2.5 py-1 rounded transition-colors ${slug === 'gold' ? 'bg-[#E27D60] text-[#0A0B0D] font-bold' : 'text-[#8E95A5] hover:text-white'}`}>GOLD</a>
          <a href="/usdmyr/" className={`px-2.5 py-1 rounded transition-colors ${slug === 'usdmyr' ? 'bg-[#E27D60] text-[#0A0B0D] font-bold' : 'text-[#8E95A5] hover:text-white'}`}>USD/MYR</a>
          <a href="/klci/" className={`px-2.5 py-1 rounded transition-colors ${slug === 'klci' ? 'bg-[#E27D60] text-[#0A0B0D] font-bold' : 'text-[#8E95A5] hover:text-white'}`}>KLCI</a>
        </div>
      </div>

      {/* HERO & LIVE VERDICT */}
      <section className="py-12 md:py-16 border-b border-[#222733] bg-[#0E1117]/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-mono text-xs text-[#E27D60] uppercase tracking-widest mb-1">
                WEALTH MARKET SIGNAL · {commodity.symbol}
              </div>
              <h1 className="text-4xl md:text-6xl font-normal font-serif uppercase tracking-tight text-white">
                {commodity.name}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3.5 py-1.5 rounded font-mono text-xs font-bold border uppercase tracking-wider ${commodity.verdictColor}`}>
                VERDICT: {commodity.verdict}
              </span>
            </div>
          </div>

          <p className="font-light text-base md:text-lg text-[#A0A7B8] max-w-3xl leading-relaxed mb-8">
            {commodity.description}
          </p>

          {/* PRICE CARD */}
          <div className="bg-[#12151D] border border-[#222733] rounded-2xl p-6 md:p-8 mb-6 shadow-xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="font-mono text-xs text-[#8E95A5] uppercase tracking-wider mb-2">Live Price Quote</div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-4xl md:text-5xl font-bold text-white">{currentPrice}</span>
                  <span className="font-mono text-lg md:text-xl font-bold text-[#4ECCA3]">{currentDelta}</span>
                  <span className="font-mono text-sm text-[#8E95A5]">({currentPct})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#181D26] border border-[#2B3448] text-white font-mono text-xs uppercase font-bold tracking-wider">
                  BIAS: {commodity.bias}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1F2533] font-mono text-xs text-[#D4AF37]">
              {commodity.driver}
            </div>

            {/* KEY LEVELS */}
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-[#8E95A5] uppercase">Key Levels:</span>
              <span className="px-2.5 py-1 rounded bg-[#0E1F1A] border border-[#1E4D3E] text-[#4ECCA3]">S1: {commodity.s1}</span>
              <span className="px-2.5 py-1 rounded bg-[#0E1F1A] border border-[#1E4D3E] text-[#4ECCA3]">S2: {commodity.s2}</span>
              <span className="px-2.5 py-1 rounded bg-[#241313] border border-[#522323] text-[#F87171]">R1: {commodity.r1}</span>
              <span className="px-2.5 py-1 rounded bg-[#241313] border border-[#522323] text-[#F87171]">R2: {commodity.r2}</span>
            </div>
          </div>

          {/* ── REAL INTERACTIVE TRADINGVIEW CHART ── */}
          <TradingViewChart
            symbol={commodity.tradingViewSymbol}
            height={560}
          />

        </div>
      </section>

      {/* 4-PLANE DECISION DRIVERS GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-xs text-[#E27D60] uppercase tracking-widest mb-2">4-PLANE DECISION MATRIX</div>
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-white mb-8">$\Delta \rightarrow \Omega \rightarrow \Xi \rightarrow \Psi$ Signal Breakdown</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-[#0E1117] border border-[#222733] rounded-2xl p-6 shadow-md">
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider mb-2">Δ GROUND · PHYSICAL DATA</div>
              <h3 className="text-base font-bold text-white mb-2">{commodity.ground.title}</h3>
              <p className="font-sans text-sm text-[#A0A7B8] font-light leading-relaxed">{commodity.ground.desc}</p>
            </div>

            <div className="bg-[#0E1117] border border-[#222733] rounded-2xl p-6 shadow-md">
              <div className="text-[#38BDF8] font-bold uppercase tracking-wider mb-2">Ω MIND · TECHNICAL & RISK</div>
              <h3 className="text-base font-bold text-white mb-2">{commodity.mind.title}</h3>
              <p className="font-sans text-sm text-[#A0A7B8] font-light leading-relaxed">{commodity.mind.desc}</p>
            </div>

            <div className="bg-[#0E1117] border border-[#222733] rounded-2xl p-6 shadow-md">
              <div className="text-[#4ECCA3] font-bold uppercase tracking-wider mb-2">Ξ CAPITAL · EARNINGS & ALIGNMENT</div>
              <h3 className="text-base font-bold text-white mb-2">{commodity.capital.title}</h3>
              <p className="font-sans text-sm text-[#A0A7B8] font-light leading-relaxed">{commodity.capital.desc}</p>
            </div>

            <div className="bg-[#0E1117] border border-[#222733] rounded-2xl p-6 shadow-md">
              <div className="text-[#A78BFA] font-bold uppercase tracking-wider mb-2">Ψ SOVEREIGN · FISCAL POLICY</div>
              <h3 className="text-base font-bold text-white mb-2">{commodity.sovereign.title}</h3>
              <p className="font-sans text-sm text-[#A0A7B8] font-light leading-relaxed">{commodity.sovereign.desc}</p>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}

export default CommodityPage;
