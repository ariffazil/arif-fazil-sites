import { useState, useMemo } from 'react';
import { LIVE_INTEL_STREAM } from '@/data/worldIntelData';

export function PalantirLiveFeed() {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return LIVE_INTEL_STREAM.filter((evt) => {
      if (selectedDomain !== 'ALL' && evt.domain !== selectedDomain) return false;
      if (
        searchQuery.trim() &&
        !evt.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !evt.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !evt.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedDomain, searchQuery]);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-[#FF3B3B]/10 text-[#FF3B3B] border-[#FF3B3B]/40';
      case 'ELEVATED':
        return 'bg-[#FF9F1C]/10 text-[#FF9F1C] border-[#FF9F1C]/40';
      default:
        return 'bg-[#34D399]/10 text-[#34D399] border-[#34D399]/40';
    }
  };

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'Energy':
        return 'text-[#FF9F1C]';
      case 'Military':
        return 'text-[#FF3B3B]';
      case 'Geopolitical':
        return 'text-[#00E5FF]';
      case 'Cyber':
        return 'text-[#2DD4BF]';
      case 'Capital':
        return 'text-[#F0B840]';
      default:
        return 'text-[#A78BFA]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F2733] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-ping"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00E5FF]">
              REAL-TIME SITUATION FEED · 30+ DOMAINS
            </span>
          </div>
          <h2 className="mt-1 font-serif text-3xl text-white font-normal">
            Global Intelligence Wire
          </h2>
          <p className="text-xs text-[#8E95A5] mt-1 font-mono">
            Direct telemetry from open-source sensors, AIS maritime tracking, seismic monitors & policy ledgers.
          </p>
        </div>

        {/* Search & Domain Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search intel wire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-[#1F2733] bg-[#0E121A] px-3 py-1.5 font-mono text-xs text-white placeholder-[#566175] focus:border-[#00E5FF] focus:outline-none w-48 sm:w-60"
          />

          <div className="flex rounded-lg border border-[#1F2733] bg-[#0E121A] p-1 font-mono text-[11px]">
            {['ALL', 'Energy', 'Geopolitical', 'Military', 'Cyber', 'Capital'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedDomain === d
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF] font-bold'
                    : 'text-[#8E95A5] hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl border border-[#1F2733] bg-[#0E121A]/90 p-6 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all shadow-lg group relative overflow-hidden"
          >
            <div>
              {/* Event Header */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[#8E95A5] mb-3">
                <span className={`font-bold uppercase ${getDomainColor(evt.domain)}`}>
                  [{evt.domain}]
                </span>
                <span className={`rounded px-1.5 py-0.5 border font-bold ${getSeverityBadge(evt.severity)}`}>
                  {evt.severity}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg text-white font-normal leading-snug group-hover:text-[#00E5FF] transition-colors">
                {evt.title}
              </h3>

              {/* Location & Time */}
              <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-[#566175]">
                <span>📍 {evt.location}</span>
                <span>·</span>
                <span>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</span>
              </div>

              {/* Summary Body */}
              <p className="mt-3 text-xs text-[#A0A7B8] font-light leading-relaxed">
                {evt.summary}
              </p>
            </div>

            {/* Source Footer */}
            <div className="mt-5 pt-3 border-t border-[#1F2733] flex items-center justify-between font-mono text-[10px] text-[#8E95A5]">
              <span className="text-[#00E5FF]">{evt.tag}</span>
              <span className="truncate max-w-[150px]">{evt.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
