import { Grid, Magnet, ZoomIn, ZoomOut, RotateCcw, Save, FolderOpen, Home, Image, Trash2, X } from 'lucide-react';

const btn = (active, title, onClick, children) => (
  <button
    title={title}
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
      cursor: 'pointer', border: 'none', transition: 'background 0.15s',
      background: active ? '#3b82f6' : '#1e293b',
      color: active ? '#fff' : '#cbd5e1',
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#334155'; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = '#1e293b'; }}
  >
    {children}
  </button>
);

export default function Toolbar({
  zoom, setZoom, pan, setPan,
  snapToGrid, setSnapToGrid,
  gridVisible, setGridVisible,
  onSave, onLoad, onLoadBenbrook,
  onBackgroundClick, background, setBackground,
  onResetView, onClearAll,
}) {
  const pct = Math.round(zoom * 100);

  const zoomTo = (newZ) => {
    const z = zoom;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const clamped = Math.min(6, Math.max(0.08, newZ));
    setPan({ x: cx + (pan.x - cx) * (clamped / z), y: cy + (pan.y - cy) * (clamped / z) });
    setZoom(clamped);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
      padding: '8px 12px', background: '#0f172a',
      borderBottom: '1px solid #1e293b', flexShrink: 0,
    }}>
      {/* App title */}
      <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 15, marginRight: 6, whiteSpace: 'nowrap' }}>
        Room Designer
      </span>

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Zoom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {btn(false, 'Zoom out', () => zoomTo(zoom / 1.2), <ZoomOut size={14} />)}
        <span style={{
          color: '#cbd5e1', fontSize: 12, minWidth: 44, textAlign: 'center',
          background: '#1e293b', padding: '5px 8px', borderRadius: 6,
        }}>
          {pct}%
        </span>
        {btn(false, 'Zoom in', () => zoomTo(zoom * 1.2), <ZoomIn size={14} />)}
        {btn(false, 'Reset view (100%)', onResetView, <><RotateCcw size={13} /><span>Reset</span></>)}
      </div>

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Grid & Snap */}
      {btn(gridVisible, 'Toggle grid', () => setGridVisible(v => !v), <><Grid size={13} /><span>Grid</span></>)}
      {btn(snapToGrid, 'Toggle snap to grid', () => setSnapToGrid(v => !v), <><Magnet size={13} /><span>Snap</span></>)}

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Save / Load */}
      {btn(false, 'Save plan to device', onSave, <><Save size={13} /><span>Save</span></>)}
      {btn(false, 'Load saved plan', onLoad, <><FolderOpen size={13} /><span>Load</span></>)}

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Presets */}
      {btn(false, 'Load Benbrook House sample', onLoadBenbrook, <><Home size={13} /><span>Benbrook House</span></>)}

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Background image */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {btn(!!background, 'Upload background floor-plan image', onBackgroundClick, <><Image size={13} /><span>BG Image</span></>)}
        {background && (
          <>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>Opacity</span>
            <input
              type="range" min={0} max={1} step={0.05}
              value={background.opacity}
              onChange={e => setBackground(b => ({ ...b, opacity: +e.target.value }))}
              style={{ width: 70, cursor: 'pointer' }}
            />
            <button
              title="Remove background image"
              onClick={() => setBackground(null)}
              style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 2 }}
            >
              <X size={13} />
            </button>
          </>
        )}
      </div>

      <div style={{ width: 1, height: 24, background: '#334155', margin: '0 4px' }} />

      {/* Clear all */}
      {btn(false, 'Clear all items', onClearAll, <><Trash2 size={13} /><span>Clear</span></>)}
    </div>
  );
}
