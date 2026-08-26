import { useState, useEffect } from 'react';

const MYT_OFFSET = 8; // UTC+8

function getEpochData() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const myt = new Date(utc + (3600000 * MYT_OFFSET));
  
  // Calculate day of year (Julian day)
  const startOfYear = new Date(myt.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((myt.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  
  // Unix timestamp (seconds)
  const unixSec = Math.floor(now.getTime() / 1000);
  const unixMs = String(now.getMilliseconds()).padStart(3, '0');

  // Format parts
  const hours = String(myt.getHours()).padStart(2, '0');
  const minutes = String(myt.getMinutes()).padStart(2, '0');
  const seconds = String(myt.getSeconds()).padStart(2, '0');

  const utcHours = String(now.getUTCHours()).padStart(2, '0');
  const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
  const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');

  const weekday = myt.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
  const day = String(myt.getDate()).padStart(2, '0');
  const month = myt.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const year = myt.getFullYear();

  return {
    hours,
    minutes,
    seconds,
    utcHours,
    utcMinutes,
    utcSeconds,
    weekday,
    day,
    month,
    year,
    dayOfYear,
    unixSec,
    unixMs,
    iso: now.toISOString()
  };
}

export function LiveClockHero() {
  const [data, setData] = useState(getEpochData);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setData(getEpochData());
      setTick(t => !t);
    }, 100); // 100ms for smooth sub-second updates

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#C9A227]/30 bg-gradient-to-b from-[#121622] via-[#0E1018] to-[#07080C] p-5 sm:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-md">
      {/* Subtle Scanline Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,162,39,0.2) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#1F2733] pb-3 mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9AA0A8]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#31C48D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#31C48D]"></span>
          </span>
          <span className="font-bold text-[#EDEAE2]">LIVE TEMPORAL NODE</span>
        </div>

        <div className="flex items-center gap-2 text-[#8A8578]">
          <span className="text-[#C9A227] font-semibold">MYT (UTC+8)</span>
          <span>·</span>
          <span className="text-[#31C48D]">ONLINE</span>
        </div>
      </div>

      {/* Main Digital Clock Readout — Spacious Centered Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 py-1 font-mono font-bold tracking-tight text-[#EDEAE2]">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl tabular-nums drop-shadow-[0_0_20px_rgba(201,162,39,0.25)] text-white">
              {data.hours}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#6A665E] font-medium">HRS</span>
          </div>

          {/* Delimiter */}
          <span className={`text-3xl sm:text-4xl md:text-5xl text-[#C9A227] pb-3 transition-opacity duration-200 ${tick ? 'opacity-100' : 'opacity-40'}`}>
            :
          </span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl tabular-nums drop-shadow-[0_0_20px_rgba(201,162,39,0.25)] text-white">
              {data.minutes}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#6A665E] font-medium">MIN</span>
          </div>

          {/* Delimiter */}
          <span className={`text-3xl sm:text-4xl md:text-5xl text-[#C9A227] pb-3 transition-opacity duration-200 ${tick ? 'opacity-100' : 'opacity-40'}`}>
            :
          </span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl tabular-nums text-[#C9A227] drop-shadow-[0_0_20px_rgba(201,162,39,0.4)]">
              {data.seconds}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#C9A227] font-semibold">SEC</span>
          </div>

          {/* Sub-seconds ms */}
          <div className="flex flex-col items-start pl-1 pb-3 text-[#8A8578]">
            <span className="text-sm sm:text-base font-normal tabular-nums text-[#6A665E]">
              .{data.unixMs.slice(0, 2)}
            </span>
            <span className="text-[7px] uppercase tracking-widest text-[#6A665E]">MS</span>
          </div>
        </div>

        {/* Date & Location Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs sm:text-sm text-[#EDEAE2]">
          <span className="px-2 py-0.5 rounded bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] font-semibold text-[11px] tracking-wider uppercase">
            {data.weekday}
          </span>
          <span className="font-medium text-white tracking-wide">
            {data.day} {data.month} {data.year}
          </span>
          <span className="text-[#6A665E]">·</span>
          <span className="text-[11px] text-[#9AA0A8]">
            Kuala Lumpur (03°08'N 101°41'E)
          </span>
        </div>

        {/* Bottom Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1F2733]">
          {/* UTC Zulu */}
          <div className="rounded border border-[#1F2733] bg-[#0A0B0D] p-2 text-center">
            <div className="font-mono text-[8px] text-[#6A665E] uppercase tracking-wider">UTC / ZULU</div>
            <div className="font-mono text-xs font-bold text-[#EDEAE2] tabular-nums mt-0.5">
              {data.utcHours}:{data.utcMinutes}:{data.utcSeconds}
            </div>
          </div>

          {/* Unix Timestamp */}
          <div className="rounded border border-[#1F2733] bg-[#0A0B0D] p-2 text-center">
            <div className="font-mono text-[8px] text-[#6A665E] uppercase tracking-wider">EPOCH SEC</div>
            <div className="font-mono text-xs font-bold text-[#C9A227] tabular-nums mt-0.5 truncate">
              {data.unixSec}
            </div>
          </div>

          {/* DOY & Heartbeat */}
          <div className="rounded border border-[#1F2733] bg-[#0A0B0D] p-2 text-center">
            <div className="font-mono text-[8px] text-[#6A665E] uppercase tracking-wider">DOY / ENTROPY</div>
            <div className="font-mono text-xs font-bold text-[#31C48D] tabular-nums mt-0.5">
              D{String(data.dayOfYear).padStart(3, '0')} · &Delta;S&le;0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
