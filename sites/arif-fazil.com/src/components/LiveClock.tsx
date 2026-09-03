import { useState, useEffect } from 'react';

const MYT_TZ = 'Asia/Kuala_Lumpur'; // MYT = UTC+8, no DST — Intl formatting is machine-TZ independent (fixes UTC-labelled-MYT bug)

interface LiveClockProps {
  withDate?: boolean;
  withIso?: boolean;
  className?: string;
}

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: MYT_TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d);
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: MYT_TZ, weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

/**
 * Live MYT clock with date — temporal intelligence for both readers:
 * - human: visible "22:14:33 MYT · Sat 01 Aug 2026"
 * - agent: <time datetime="...">ISO-8601 machine twin</time> (F2/F4: agents
 *   must be able to read the current epoch without asking)
 */
export function LiveClock({ withDate = true, withIso = true, className = '' }: LiveClockProps) {
  const [now, setNow] = useState<Date>(() => new Date());
  const [iso, setIso] = useState(() => new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      setIso(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <time
      dateTime={withIso ? iso : undefined}
      title={withIso ? `ISO-8601 ${iso}` : 'Malaysia Time (UTC+8)'}
      className={`flex items-center gap-2 font-mono text-[0.65rem] text-forge-dim uppercase tracking-widest ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-forge-green shadow-glow-green animate-pulse" aria-hidden="true" />
      <span className="text-forge-white">{formatTime(now)}</span>
      <span>MYT</span>
      {withDate && <span className="hidden sm:inline text-forge-dim/60">· {formatDate(now)}</span>}
    </time>
  );
}
