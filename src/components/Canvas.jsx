import { useRef, useEffect, useCallback, memo } from 'react';
import { PX_PER_FOOT } from '../data/furniture.js';

const GRID = PX_PER_FOOT; // 20px = 1 foot

function snapVal(v) {
  return Math.round(v / GRID) * GRID;
}

// ── Item renderer ────────────────────────────────────────────────────────────

const ItemShape = memo(function ItemShape({ item, selected, onPointerDown }) {
  const { x, y, width: w, height: h, rotation, color, name, type } = item;
  const cx = w / 2, cy = h / 2;
  const transform = `translate(${x},${y}) rotate(${rotation},${cx},${cy})`;

  const handlePD = useCallback((e) => {
    e.stopPropagation();
    onPointerDown(e, item.id);
  }, [item.id, onPointerDown]);

  const selRing = selected
    ? <rect x={-2} y={-2} width={w + 4} height={h + 4} fill="none" stroke="#3b82f6" strokeWidth={2 / 1} strokeDasharray="6,3" style={{ pointerEvents: 'none' }} />
    : null;

  if (type === 'room') {
    const fontSize = Math.max(6, Math.min(14, w / 8, h / 4));
    const subSize = Math.max(5, fontSize * 0.75);
    const wFt = (w / GRID).toFixed(0);
    const hFt = (h / GRID).toFixed(0);
    return (
      <g transform={transform} onPointerDown={handlePD} style={{ cursor: 'grab' }}>
        <rect x={0} y={0} width={w} height={h} fill={color || '#E8F4F8'} stroke="#4B5563" strokeWidth={1.5} />
        {selRing}
        <text x={cx} y={cy - subSize * 0.7} textAnchor="middle" dominantBaseline="middle"
          fontSize={fontSize} fill="#1e293b" fontWeight="600" fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {name}
        </text>
        <text x={cx} y={cy + subSize * 0.9} textAnchor="middle" dominantBaseline="middle"
          fontSize={subSize} fill="#475569" fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {wFt}′ × {hFt}′
        </text>
      </g>
    );
  }

  if (type === 'door') {
    // Door: thin rectangle at bottom + quarter-arc swing
    const arcPath = `M 0,0 L ${w},0 A ${w},${w} 0 0 1 0,${w}`;
    return (
      <g transform={transform} onPointerDown={handlePD} style={{ cursor: 'grab' }}>
        <path d={arcPath} fill="rgba(222,184,135,0.18)" stroke="#92691a" strokeWidth={0.8} strokeDasharray="4,2" style={{ pointerEvents: 'none' }} />
        <rect x={0} y={0} width={w} height={h} fill="#DEB887" stroke="#8B6914" strokeWidth={selected ? 2 : 1} />
        {selRing}
        <text x={cx} y={-5} textAnchor="middle" fontSize={7} fill="#4B5563" fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>{name}</text>
      </g>
    );
  }

  if (type === 'window') {
    return (
      <g transform={transform} onPointerDown={handlePD} style={{ cursor: 'grab' }}>
        <rect x={0} y={0} width={w} height={h} fill="#dbeafe" stroke="#3b82f6" strokeWidth={selected ? 2 : 1} />
        <line x1={w / 3} y1={0} x2={w / 3} y2={h} stroke="#3b82f6" strokeWidth={0.8} style={{ pointerEvents: 'none' }} />
        <line x1={(2 * w) / 3} y1={0} x2={(2 * w) / 3} y2={h} stroke="#3b82f6" strokeWidth={0.8} style={{ pointerEvents: 'none' }} />
        {selRing}
        <text x={cx} y={-5} textAnchor="middle" fontSize={7} fill="#4B5563" fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>{name}</text>
      </g>
    );
  }

  if (type === 'slidingdoor') {
    return (
      <g transform={transform} onPointerDown={handlePD} style={{ cursor: 'grab' }}>
        <rect x={0} y={0} width={w} height={h} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={selected ? 2 : 1} />
        <rect x={0} y={0} width={w / 2} height={h} fill="none" stroke="#3b82f6" strokeWidth={0.7} style={{ pointerEvents: 'none' }} />
        <line x1={4} y1={h * 0.15} x2={4} y2={h * 0.85} stroke="#3b82f6" strokeWidth={0.8} style={{ pointerEvents: 'none' }} />
        <line x1={w / 2 - 4} y1={h * 0.15} x2={w / 2 - 4} y2={h * 0.85} stroke="#3b82f6" strokeWidth={0.8} style={{ pointerEvents: 'none' }} />
        {selRing}
        <text x={cx} y={-5} textAnchor="middle" fontSize={7} fill="#4B5563" fontFamily="system-ui,sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>{name}</text>
      </g>
    );
  }

  // Furniture / custom
  const fontSize = Math.max(5, Math.min(11, w / 5, h / 3));
  return (
    <g transform={transform} onPointerDown={handlePD} style={{ cursor: 'grab' }}>
      <rect x={0} y={0} width={w} height={h} fill={color || '#DEB887'}
        stroke={selected ? '#3b82f6' : '#6B7280'} strokeWidth={selected ? 2 : 1} rx={2} />
      {selRing}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fontSize={fontSize} fill="#1e293b" fontFamily="system-ui,sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}>
        {name}
      </text>
    </g>
  );
});

// ── Selection corner handles ──────────────────────────────────────────────────

function SelectionHandles({ item }) {
  const { x, y, width: w, height: h, rotation } = item;
  const cx = w / 2, cy = h / 2;
  const corners = [[0, 0], [w, 0], [w, h], [0, h]];
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation},${cx},${cy})`} style={{ pointerEvents: 'none' }}>
      {corners.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={5} fill="white" stroke="#3b82f6" strokeWidth={1.5} />
      ))}
    </g>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────────

export default function Canvas({
  items, selectedId, pan, zoom, snapToGrid, gridVisible, background,
  setSelectedId, setPan, setZoom, updateItem,
}) {
  const svgRef = useRef(null);
  const dragRef = useRef(null);   // { itemId, offX, offY }
  const panRef = useRef(null);    // { sx, sy, px, py }
  const pointersRef = useRef(new Map()); // pointerId → {x,y}
  const pinchRef = useRef(null);  // last pinch distance

  // Live refs so callbacks don't go stale
  const panLive = useRef(pan);
  const zoomLive = useRef(zoom);
  useEffect(() => { panLive.current = pan; }, [pan]);
  useEffect(() => { zoomLive.current = zoom; }, [zoom]);

  const toWorld = (sx, sy) => {
    const p = panLive.current, z = zoomLive.current;
    return { x: (sx - p.x) / z, y: (sy - p.y) / z };
  };

  const svgPt = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = useCallback((e, itemId = null) => {
    if (e.button > 1) return;
    const pt = svgPt(e);
    pointersRef.current.set(e.pointerId, pt);
    svgRef.current?.setPointerCapture(e.pointerId);

    if (pointersRef.current.size >= 2) {
      dragRef.current = null;
      panRef.current = null;
      pinchRef.current = null;
      return;
    }

    if (itemId) {
      setSelectedId(itemId);
      const item = items.find(i => i.id === itemId);
      if (item) {
        const w = toWorld(pt.x, pt.y);
        dragRef.current = { itemId, offX: w.x - item.x, offY: w.y - item.y };
      }
    } else {
      setSelectedId(null);
      const p = panLive.current;
      panRef.current = { sx: pt.x, sy: pt.y, px: p.x, py: p.y };
    }
  }, [items, setSelectedId]);

  const onPointerMove = useCallback((e) => {
    const pt = svgPt(e);
    pointersRef.current.set(e.pointerId, pt);
    const ptrs = [...pointersRef.current.values()];

    if (ptrs.length >= 2) {
      const dist = Math.hypot(ptrs[1].x - ptrs[0].x, ptrs[1].y - ptrs[0].y);
      if (pinchRef.current !== null) {
        const ratio = dist / pinchRef.current;
        const mx = (ptrs[0].x + ptrs[1].x) / 2;
        const my = (ptrs[0].y + ptrs[1].y) / 2;
        const z = zoomLive.current;
        const newZ = Math.min(6, Math.max(0.08, z * ratio));
        const p = panLive.current;
        setPan({ x: mx + (p.x - mx) * (newZ / z), y: my + (p.y - my) * (newZ / z) });
        setZoom(newZ);
      }
      pinchRef.current = dist;
      return;
    }
    pinchRef.current = null;

    if (dragRef.current) {
      const w = toWorld(pt.x, pt.y);
      let nx = w.x - dragRef.current.offX;
      let ny = w.y - dragRef.current.offY;
      if (snapToGrid) { nx = snapVal(nx); ny = snapVal(ny); }
      updateItem(dragRef.current.itemId, { x: nx, y: ny });
    } else if (panRef.current) {
      const pr = panRef.current;
      setPan({ x: pr.px + (pt.x - pr.sx), y: pr.py + (pt.y - pr.sy) });
    }
  }, [snapToGrid, updateItem, setPan, setZoom]);

  const onPointerUp = useCallback((e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    dragRef.current = null;
    panRef.current = null;
  }, []);

  // Wheel zoom (mouse / trackpad)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const z = zoomLive.current;
      const newZ = Math.min(6, Math.max(0.08, z * factor));
      const r = el.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      const p = panLive.current;
      setPan({ x: cx + (p.x - cx) * (newZ / z), y: cy + (p.y - cy) * (newZ / z) });
      setZoom(newZ);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setPan, setZoom]);

  // Grid pattern math (screen-space so it tracks pan+zoom)
  const gridPx = GRID * zoom;       // 1-foot grid in screen pixels
  const bigPx  = GRID * 5 * zoom;   // 5-foot major grid
  const gOffX  = ((pan.x % gridPx) + gridPx) % gridPx;
  const gOffY  = ((pan.y % gridPx) + gridPx) % gridPx;
  const bOffX  = ((pan.x % bigPx)  + bigPx)  % bigPx;
  const bOffY  = ((pan.y % bigPx)  + bigPx)  % bigPx;

  const rooms = items.filter(i => i.type === 'room');
  const others = items.filter(i => i.type !== 'room');
  const selected = items.find(i => i.id === selectedId) ?? null;

  return (
    <svg
      ref={svgRef}
      className="canvas-svg"
      style={{ flex: 1, display: 'block', background: '#f8fafc' }}
      onPointerDown={(e) => onPointerDown(e, null)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <defs>
        {/* 1-foot minor grid */}
        <pattern id="minorGrid" x={gOffX} y={gOffY} width={gridPx} height={gridPx} patternUnits="userSpaceOnUse">
          <path d={`M ${gridPx} 0 L 0 0 0 ${gridPx}`} fill="none" stroke="#d1d5db" strokeWidth={0.5} />
        </pattern>
        {/* 5-foot major grid */}
        <pattern id="majorGrid" x={bOffX} y={bOffY} width={bigPx} height={bigPx} patternUnits="userSpaceOnUse">
          <rect width={bigPx} height={bigPx} fill="url(#minorGrid)" />
          <path d={`M ${bigPx} 0 L 0 0 0 ${bigPx}`} fill="none" stroke="#9ca3af" strokeWidth={1} />
        </pattern>
      </defs>

      {/* Grid overlay */}
      {gridVisible && (
        <rect width="100%" height="100%" fill="url(#majorGrid)" style={{ pointerEvents: 'none' }} />
      )}

      {/* World-space content */}
      <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
        {/* Background floor-plan image */}
        {background && (
          <image
            href={background.url}
            x={0} y={0}
            width={3000} height={3000}
            opacity={background.opacity}
            preserveAspectRatio="xMinYMin meet"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Rooms first so furniture renders on top */}
        {rooms.map(item => (
          <ItemShape key={item.id} item={item} selected={item.id === selectedId} onPointerDown={onPointerDown} />
        ))}
        {others.map(item => (
          <ItemShape key={item.id} item={item} selected={item.id === selectedId} onPointerDown={onPointerDown} />
        ))}

        {/* Corner handles for selected item */}
        {selected && <SelectionHandles item={selected} />}
      </g>
    </svg>
  );
}
