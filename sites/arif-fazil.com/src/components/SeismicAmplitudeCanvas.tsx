import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface WellMarker {
  name: string;
  cdp: number; // x position in CDP (0..100)
  targetMs: number; // depth in TWT ms
  result: 'OIL & GAS' | 'DISCOVERY' | 'BASEMENT PLAY' | 'HINGE OPENER';
  status: string;
  formation: string;
  color: string;
}

const WELLS: WellMarker[] = [
  { name: 'BEKANTAN-1', cdp: 24, targetMs: 1850, result: 'DISCOVERY', status: 'FLOWED · 42° API', formation: 'Group E/H Deltaic Sand', color: '#31C48D' },
  { name: 'PUTERI BASEMENT-1', cdp: 48, targetMs: 3100, result: 'BASEMENT PLAY', status: 'PROVEN · Fractured Granite', formation: 'Pre-Tertiary Basement', color: '#E4572E' },
  { name: 'LEBAH EMAS-1', cdp: 72, targetMs: 2450, result: 'HINGE OPENER', status: 'NEW PLAY 2025 · Fault Seal', formation: 'Western Hinge Group I', color: '#C9A227' },
  { name: 'BUNGA TASBIH-1', cdp: 88, targetMs: 1520, result: 'OIL & GAS', status: 'CALIBRATED · High GOR', formation: 'Group D Sandstone', color: '#00D4AA' }
];

type ColorRamp = 'POLARITY_RWB' | 'IMPEDANCE_DARK' | 'AVO_FLUID' | 'SPECTRAL_RGB';

export function SeismicAmplitudeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [colorRamp, setColorRamp] = useState<ColorRamp>('IMPEDANCE_DARK');
  const [showWiggles, setShowWiggles] = useState(true);
  const [showHorizons, setShowHorizons] = useState(true);
  const [showFaults, setShowFaults] = useState(true);
  const [showWells, setShowWells] = useState(true);
  const [selectedWell, setSelectedWell] = useState<WellMarker | null>(null);

  // Probe telemetry state on mouse move
  const [probe, setProbe] = useState({
    active: false,
    cdp: 1840,
    twtMs: 1650,
    amplitude: 0.84,
    impedance: '4,820 m/s·g/cc',
    fluidFactor: '+0.42 (Hydrocarbon Indicative)',
    formation: 'Group E Deltaic Sands',
    xPx: 0,
    yPx: 0
  });

  // Generate synthetic seismic grid data
  const gridWidth = 160;
  const gridHeight = 100;

  const seismicData = useMemo(() => {
    const data: Float32Array[] = [];
    for (let x = 0; x < gridWidth; x++) {
      const col = new Float32Array(gridHeight);
      const xNorm = x / gridWidth;

      for (let y = 0; y < gridHeight; y++) {
        const yNorm = y / gridHeight;

        // Structural dip & anticlinal folding
        const anticline = Math.exp(-Math.pow((xNorm - 0.35) * 5, 2)) * 0.12;
        const hingeRoll = Math.sin((xNorm - 0.7) * Math.PI) * 0.08 * (xNorm > 0.6 ? 1 : 0);
        const faultStep = xNorm > 0.68 ? 0.09 : 0;
        const structOffset = anticline + hingeRoll + faultStep;

        // Stratigraphic Horizons Frequency components
        const horizon1 = Math.sin((yNorm - structOffset) * 45); // Shallow deltaic
        const horizon2 = Math.cos((yNorm - structOffset * 1.2) * 28) * 1.5; // Main reservoir
        const horizon3 = Math.sin((yNorm - structOffset * 0.8) * 75) * 0.6; // High-res beds
        const basement = Math.sin((yNorm - 0.78) * 18) * 2.2; // Basement top

        // Gas chimney anomaly / bright spot at crest (x ~ 0.24, y ~ 0.45)
        const crestDist = Math.hypot(xNorm - 0.26, yNorm - 0.46);
        const brightSpot = Math.exp(-crestDist * 18) * 3.5 * Math.sin(yNorm * 90);

        // Combined synthetic seismic amplitude reflection (-1.0 .. +1.0)
        let amp = (horizon1 * 0.4 + horizon2 * 0.6 + horizon3 * 0.3 + basement * 0.5 + brightSpot);
        
        // Damping and envelope
        amp = Math.max(-1.0, Math.min(1.0, amp / 2.2));
        col[y] = amp;
      }
      data.push(col);
    }
    return data;
  }, []);

  // Palette mapper function
  const getRgb = useCallback((val: number, ramp: ColorRamp): [number, number, number] => {
    // val in [-1.0 .. 1.0]
    const norm = (val + 1) / 2; // 0..1

    if (ramp === 'POLARITY_RWB') {
      // European Polarity: -1 = Red (Trough/Soft), 0 = White/Gray, +1 = Blue (Peak/Hard)
      if (val < 0) {
        const r = 239;
        const g = Math.round(68 + (255 - 68) * (1 + val));
        const b = Math.round(68 + (255 - 68) * (1 + val));
        return [r, g, b];
      } else {
        const r = Math.round(59 + (255 - 59) * (1 - val));
        const g = Math.round(130 + (255 - 130) * (1 - val));
        const b = 246;
        return [r, g, b];
      }
    } else if (ramp === 'IMPEDANCE_DARK') {
      // Sovereign Gold/Cyan Contrast (Trinity palette)
      if (val < 0) {
        // Red / Amber Soft gas sand
        const intensity = -val;
        return [
          Math.round(232 * intensity + 15 * (1 - intensity)),
          Math.round(87 * intensity + 18 * (1 - intensity)),
          Math.round(46 * intensity + 24 * (1 - intensity))
        ];
      } else {
        // Cyan / Gold dense limestone / caprock
        const intensity = val;
        return [
          Math.round(0 * intensity + 15 * (1 - intensity)),
          Math.round(212 * intensity + 18 * (1 - intensity)),
          Math.round(170 * intensity + 24 * (1 - intensity))
        ];
      }
    } else if (ramp === 'AVO_FLUID') {
      // Hydrocarbon anomaly highlighting (Fluids = Bright Gold/Yellow, Background = Deep Slate)
      if (val < -0.3) {
        return [232, 184, 75]; // Class III AVO Bright Gold
      } else if (val > 0.5) {
        return [49, 196, 141]; // High impedance seal
      } else {
        const gray = Math.round(25 + norm * 45);
        return [gray, gray + 4, gray + 12];
      }
    } else {
      // Spectral RGB (Red=Low Freq, Green=Mid, Blue=High)
      const r = Math.round(Math.sin(norm * Math.PI) * 255);
      const g = Math.round(Math.sin((norm + 0.33) * Math.PI) * 255);
      const b = Math.round(Math.sin((norm + 0.66) * Math.PI) * 255);
      return [r, g, b];
    }
  }, []);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let timeOffset = 0;

    const render = () => {
      timeOffset += 0.015;
      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas
      ctx.fillStyle = '#090B10';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Amplitude Density Grid
      const cellW = width / gridWidth;
      const cellH = height / gridHeight;

      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const amp = seismicData[x][y];
          const [r, g, b] = getRgb(amp, colorRamp);

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x * cellW, y * cellH, Math.ceil(cellW) + 0.5, Math.ceil(cellH) + 0.5);
        }
      }

      // 2. Draw Classic Geophysical Wiggle Traces Overlay (every 4th trace)
      if (showWiggles) {
        const traceStep = 4;
        for (let x = 2; x < gridWidth; x += traceStep) {
          const traceX = x * cellW + cellW / 2;

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 0.8;

          for (let y = 0; y < gridHeight; y++) {
            const amp = seismicData[x][y];
            const px = traceX + amp * cellW * 2.2;
            const py = y * cellH;

            if (y === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          // Fill positive peaks with subtle gold/white
          ctx.save();
          ctx.beginPath();
          for (let y = 0; y < gridHeight; y++) {
            const amp = seismicData[x][y];
            const px = Math.max(traceX, traceX + amp * cellW * 2.2);
            const py = y * cellH;
            if (y === 0) ctx.moveTo(traceX, py);
            else ctx.lineTo(px, py);
          }
          ctx.lineTo(traceX, height);
          ctx.fillStyle = colorRamp === 'IMPEDANCE_DARK' ? 'rgba(201, 162, 39, 0.18)' : 'rgba(255, 255, 255, 0.15)';
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Draw Tracked Horizons (Key Geological Boundaries)
      if (showHorizons) {
        const horizons = [
          { name: 'Sea Floor (0 ms)', yFrac: 0.12, color: '#38BDF8', struct: false },
          { name: 'Top Group E Deltaic (1,450 ms)', yFrac: 0.38, color: '#00D4AA', struct: true },
          { name: 'Main Reservoir Gas Sand (1,850 ms)', yFrac: 0.48, color: '#F59E0B', struct: true },
          { name: 'Group L/M Lacustrine Source (2,800 ms)', yFrac: 0.70, color: '#E4572E', struct: true },
          { name: 'Economic Basement (3,400 ms)', yFrac: 0.85, color: '#818CF8', struct: true }
        ];

        horizons.forEach(hz => {
          ctx.beginPath();
          ctx.strokeStyle = hz.color;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 3]);

          for (let x = 0; x < gridWidth; x++) {
            const xNorm = x / gridWidth;
            let offset = 0;
            if (hz.struct) {
              const anticline = Math.exp(-Math.pow((xNorm - 0.35) * 5, 2)) * 0.12;
              const hingeRoll = Math.sin((xNorm - 0.7) * Math.PI) * 0.08 * (xNorm > 0.6 ? 1 : 0);
              const faultStep = xNorm > 0.68 ? 0.09 : 0;
              offset = anticline + hingeRoll + faultStep;
            }
            const px = x * cellW;
            const py = (hz.yFrac - offset) * height;

            if (x === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash
        });
      }

      // 4. Draw Fault Planes
      if (showFaults) {
        // Western Hinge Major Normal Fault
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
        ctx.lineWidth = 2.2;
        ctx.moveTo(width * 0.66, height * 0.25);
        ctx.lineTo(width * 0.74, height * 0.95);
        ctx.stroke();

        // Fault Label
        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText('WESTERN HINGE FAULT (F1-SEAL)', width * 0.67, height * 0.28);
      }

      // 5. Draw Founder Wells (Wireline Boreholes)
      if (showWells) {
        WELLS.forEach(well => {
          const wellXPx = (well.cdp / 100) * width;
          const targetYPx = (well.targetMs / 4000) * height;
          const isSelected = selectedWell?.name === well.name;

          // Surface Derrick Icon
          ctx.fillStyle = well.color;
          ctx.beginPath();
          ctx.arc(wellXPx, 14, isSelected ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();

          // Borehole Path
          ctx.beginPath();
          ctx.strokeStyle = isSelected ? well.color : 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = isSelected ? 2.5 : 1.2;
          ctx.moveTo(wellXPx, 14);

          // Simulated slight s-curve deviation down to target
          const midY = targetYPx * 0.5;
          ctx.bezierCurveTo(wellXPx + 4, midY, wellXPx - 4, targetYPx - 20, wellXPx, targetYPx);
          ctx.stroke();

          // Pay Zone Discovery Glow
          ctx.beginPath();
          ctx.arc(wellXPx, targetYPx, isSelected ? 8 : 5, 0, Math.PI * 2);
          ctx.fillStyle = well.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Wellhead Label
          ctx.fillStyle = isSelected ? '#FFFFFF' : '#EDEAE2';
          ctx.font = `${isSelected ? 'bold' : 'normal'} 10px JetBrains Mono, monospace`;
          ctx.fillText(well.name, wellXPx + 8, 18);
        });
      }

      // Request next frame (subtle breathing animation for fluids)
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [seismicData, colorRamp, showWiggles, showHorizons, showFaults, showWells, selectedWell, getRgb]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = Math.max(480, Math.min(620, window.innerHeight * 0.65));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Mouse Probe Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
      setProbe(p => ({ ...p, active: false }));
      return;
    }

    const cdpNorm = x / canvas.width;
    const twtNorm = y / canvas.height;

    const cdpVal = Math.round(1000 + cdpNorm * 2000);
    const twtVal = Math.round(twtNorm * 4000);

    // Stratigraphic lookup
    let formation = 'Water Column';
    let impedance = '1,500 m/s (Brine)';
    let fluidFactor = '0.00 (Water)';

    if (twtVal > 480 && twtVal <= 1600) {
      formation = 'Group E/I Coastal Deltaic';
      impedance = '2,850 m/s·g/cc (Sand/Shale)';
      fluidFactor = '+0.15 (Mild Anomaly)';
    } else if (twtVal > 1600 && twtVal <= 2600) {
      formation = 'Group H/F Fluvio-Deltaic Reservoir';
      impedance = '3,420 m/s·g/cc (Pay Sandstone)';
      fluidFactor = '+0.68 (CLASS III GAS BRIGHT SPOT)';
    } else if (twtVal > 2600 && twtVal <= 3300) {
      formation = 'Group L/M Syn-Rift Lacustrine Source';
      impedance = '4,100 m/s·g/cc (Organic Shales)';
      fluidFactor = '-0.12 (Overpressured Oil Source)';
    } else if (twtVal > 3300) {
      formation = 'Pre-Tertiary Basement (Granite)';
      impedance = '5,850 m/s·g/cc (Crystalline)';
      fluidFactor = '-0.40 (Acoustic Reflector)';
    }

    // Check nearest well
    const nearestWell = WELLS.find(w => Math.abs((w.cdp / 100) * canvas.width - x) < 30);

    setProbe({
      active: true,
      cdp: cdpVal,
      twtMs: twtVal,
      amplitude: Number((Math.sin(cdpNorm * 12 + twtNorm * 18) * 0.9).toFixed(2)),
      impedance,
      fluidFactor,
      formation,
      xPx: x,
      yPx: y
    });

    if (nearestWell) setSelectedWell(nearestWell);
    else setSelectedWell(null);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#C9A227]/30 bg-[#07080C] shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
      {/* Top Geological Calibration Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2733] bg-[#0D0F16] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[#9AA0A8]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-[#E4572E] animate-ping" />
          <span className="font-bold text-white">PETRONAS CARIGALI BASIN SECTION</span>
          <span className="text-[#6A665E]">·</span>
          <span className="text-[#C9A227]">PSTM 3D KIRCHHOFF VOLUME</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[10px]">
          <span>INLINE 320</span>
          <span>·</span>
          <span>CDP 1000–3000</span>
          <span>·</span>
          <span className="text-[#31C48D]">2.0 MS SAMPLE · 13-YR RECORD</span>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div 
        ref={containerRef} 
        className="relative w-full cursor-crosshair select-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setProbe(p => ({ ...p, active: false }))}
      >
        <canvas ref={canvasRef} className="block w-full h-[520px]" />

        {/* Depth / TWT Axis Scale on Left */}
        <div className="pointer-events-none absolute left-3 top-3 bottom-3 flex flex-col justify-between font-mono text-[9px] text-[#6A665E] bg-[#07080C]/80 px-2 py-1.5 rounded border border-[#1F2733]/60 backdrop-blur-sm">
          <div>0 ms (0m)</div>
          <div>1,000 ms (~1.1km)</div>
          <div>2,000 ms (~2.4km)</div>
          <div>3,000 ms (~3.8km)</div>
          <div>4,000 ms (~5.2km)</div>
        </div>

        {/* Probe Telemetry Tooltip (Follows Mouse) */}
        {probe.active && (
          <div 
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full mb-3 rounded-lg border border-[#C9A227]/60 bg-[#0C0E15]/95 p-3 font-mono text-[11px] shadow-2xl backdrop-blur-md min-w-[240px]"
            style={{ left: `${probe.xPx}px`, top: `${probe.yPx}px` }}
          >
            <div className="flex items-center justify-between border-b border-[#1F2733] pb-1.5 mb-1.5">
              <span className="font-bold text-[#C9A227]">CDP {probe.cdp}</span>
              <span className="text-white">{probe.twtMs} ms TWT</span>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="text-[#38BDF8]">{probe.formation}</div>
              <div className="text-[#EDEAE2]">Acoustic Imp: <span className="text-white">{probe.impedance}</span></div>
              <div className="text-[#31C48D]">Fluid Factor: <span className="text-white font-semibold">{probe.fluidFactor}</span></div>
            </div>
          </div>
        )}

        {/* Highlighted Well Dossier Box (Bottom Left) */}
        {selectedWell && (
          <div className="absolute bottom-4 left-16 z-20 rounded-lg border border-[#31C48D] bg-[#0C0E15]/95 p-4 shadow-xl backdrop-blur-md max-w-sm">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono text-xs font-bold text-white">{selectedWell.name}</span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#31C48D]/20 text-[#31C48D] border border-[#31C48D]/40 uppercase">
                {selectedWell.result}
              </span>
            </div>
            <div className="font-sans text-xs text-[#9AA0A8] mt-1">{selectedWell.formation}</div>
            <div className="font-mono text-[10px] text-[#C9A227] mt-2 flex items-center justify-between border-t border-[#1F2733] pt-1.5">
              <span>DEPTH: {selectedWell.targetMs} ms</span>
              <span>{selectedWell.status}</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Strip & Geological Layers Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1F2733] bg-[#0B0D14] p-4 font-mono text-xs text-[#EDEAE2]">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-[#6A665E] tracking-wider">Palette:</span>
          <div className="flex rounded border border-[#1F2733] bg-[#07080C] p-0.5 text-[10px]">
            <button
              onClick={() => setColorRamp('IMPEDANCE_DARK')}
              className={`px-2.5 py-1 rounded transition-colors ${colorRamp === 'IMPEDANCE_DARK' ? 'bg-[#C9A227] text-black font-bold' : 'text-[#9AA0A8] hover:text-white'}`}
            >
              Gold/Cyan
            </button>
            <button
              onClick={() => setColorRamp('POLARITY_RWB')}
              className={`px-2.5 py-1 rounded transition-colors ${colorRamp === 'POLARITY_RWB' ? 'bg-[#38BDF8] text-black font-bold' : 'text-[#9AA0A8] hover:text-white'}`}
            >
              Red-White-Blue
            </button>
            <button
              onClick={() => setColorRamp('AVO_FLUID')}
              className={`px-2.5 py-1 rounded transition-colors ${colorRamp === 'AVO_FLUID' ? 'bg-[#31C48D] text-black font-bold' : 'text-[#9AA0A8] hover:text-white'}`}
            >
              AVO Fluid
            </button>
            <button
              onClick={() => setColorRamp('SPECTRAL_RGB')}
              className={`px-2.5 py-1 rounded transition-colors ${colorRamp === 'SPECTRAL_RGB' ? 'bg-[#E4572E] text-white font-bold' : 'text-[#9AA0A8] hover:text-white'}`}
            >
              Spectral
            </button>
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA0A8] hover:text-white">
            <input
              type="checkbox"
              checked={showWiggles}
              onChange={e => setShowWiggles(e.target.checked)}
              className="accent-[#C9A227] rounded"
            />
            <span>Wiggle Traces</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA0A8] hover:text-white">
            <input
              type="checkbox"
              checked={showHorizons}
              onChange={e => setShowHorizons(e.target.checked)}
              className="accent-[#00D4AA] rounded"
            />
            <span>Horizons</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA0A8] hover:text-white">
            <input
              type="checkbox"
              checked={showFaults}
              onChange={e => setShowFaults(e.target.checked)}
              className="accent-[#EF4444] rounded"
            />
            <span>Fault Planes</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA0A8] hover:text-white">
            <input
              type="checkbox"
              checked={showWells}
              onChange={e => setShowWells(e.target.checked)}
              className="accent-[#31C48D] rounded"
            />
            <span>Wellbores (4)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
