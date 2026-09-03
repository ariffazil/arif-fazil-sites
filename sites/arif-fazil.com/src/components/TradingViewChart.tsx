import { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol: string;
  theme?: 'dark' | 'light';
  interval?: string;
  timezone?: string;
  height?: number;
}

export const TradingViewChart = memo(function TradingViewChart({
  symbol,
  theme = 'dark',
  interval = 'D',
  timezone = 'Asia/Kuala_Lumpur',
  height = 540,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: timezone,
      theme: theme,
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
      backgroundColor: '#0A0B0D',
      gridColor: 'rgba(34, 39, 51, 0.4)',
      studies: [
        'RSI@tv-basicstudies',
        'MASimple@tv-basicstudies',
      ],
    });

    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, theme, interval, timezone]);

  return (
    <div className="relative w-full rounded-2xl border border-[#222733] bg-[#0A0B0D] overflow-hidden shadow-2xl my-8">
      <div className="p-3.5 border-b border-[#222733] bg-[#0E1117] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ECCA3] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ECCA3]"></span>
          </span>
          <span className="text-white font-bold uppercase tracking-wider">{symbol} · REAL-TIME TRADINGVIEW CHART</span>
        </div>
        <div className="text-[11px] text-[#8E95A5] flex items-center gap-3">
          <span>Candles · Volume · RSI · MA</span>
          <span>·</span>
          <span className="text-[#4ECCA3]">LIVE FEED</span>
        </div>
      </div>
      <div style={{ height: `${height}px` }} className="w-full relative">
        <div ref={containerRef} className="tradingview-widget-container w-full h-full" />
      </div>
    </div>
  );
});

export default TradingViewChart;
