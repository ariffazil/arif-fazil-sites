import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MACRO_INDICATORS } from '@/data/worldIntelData';

export function PalantirTelemetryHud() {
  const [utcTime, setUtcTime] = useState('');
  const [mytTime, setMytTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
      setMytTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kuala_Lumpur',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' MYT'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sealedCount = MACRO_INDICATORS.filter((m) => m.status === 'SEAL').length;

  return (
    <div className="border-b border-[#1F2733] bg-[#0A0D14] px-4 py-2.5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Left: System Identification & Live Pulse */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00E5FF]"></span>
            </span>
            <span className="text-white font-bold tracking-wider">PALANTIR WORLD INTEL</span>
            <span className="rounded bg-[#00E5FF]/10 text-[#00E5FF] px-1.5 py-0.5 text-[9px] border border-[#00E5FF]/30 font-semibold">
              120+ TOOLS
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#8E95A5] text-[11px]">
            <span>·</span>
            <span className="text-[#34D399] font-medium">{sealedCount}/{MACRO_INDICATORS.length} SIGNALS SEALED</span>
            <span>·</span>
            <span className="text-[#A78BFA]">47 SENSOR STREAMS</span>
          </div>
        </div>

        {/* Center: Live Macro Ticker */}
        <div className="flex items-center gap-5 overflow-x-auto py-1 scrollbar-none">
          {MACRO_INDICATORS.slice(0, 5).map((ind) => (
            <Link
              key={ind.id}
              to={ind.link}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity whitespace-nowrap text-[11px]"
            >
              <span className="text-[#8E95A5]">{ind.code}:</span>
              <span className="text-white font-semibold">{ind.value}</span>
              <span className={`text-[10px] font-bold ${ind.isPositive ? 'text-[#34D399]' : 'text-[#FF9F1C]'}`}>
                {ind.change}
              </span>
            </Link>
          ))}
        </div>

        {/* Right: Dual Synchronized Precision Clocks */}
        <div className="flex items-center gap-3 text-[11px] text-[#8E95A5] font-mono">
          <div className="rounded bg-[#111622] px-2 py-0.5 border border-[#1F2733] text-white">
            {mytTime || '00:00:00 MYT'}
          </div>
          <div className="hidden md:block text-[#566175]">
            {utcTime || '00:00:00 UTC'}
          </div>
        </div>
      </div>
    </div>
  );
}
