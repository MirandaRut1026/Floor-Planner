import { RotateCw, RotateCcw, Copy, Trash2 } from 'lucide-react';
import { PX_PER_FOOT } from '../data/furniture.js';

function toFtIn(px) {
  const totalFt = px / PX_PER_FOOT;
  const ft = Math.floor(totalFt);
  const inch = Math.round((totalFt - ft) * 12);
  return { ft, inch };
}

function toPx(ft, inch) {
  return (Number(ft) + Number(inch) / 12) * PX_PER_FOOT;
}

function Label({ children }) {
  return (
    <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {children}
    </span>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function NumInput({ value, onChange, min = 0, step = 1, style = {} }) {
  return (
    <input
      type="number" min={min} step={step} value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: '#1e293b', color: '#e2e8f0',
        border: '1px solid #334155', borderRadius: 5, padding: '5px 8px',
        fontSize: 12, outline: 'none', ...style,
      }}
      onFocus={e => e.target.select()}
    />
  );
}

function FtInRow({ label, px, onChange }) {
  const { ft, inch } = toFtIn(px);
  const apply = (newFt, newIn) => {
    const v = toPx(newFt, newIn);
    if (v >= PX_PER_FOOT * 0.25) onChange(v);
  };
  return (
    <Row label={label}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <NumInput value={ft} onChange={v => apply(v, inch)} min={0} />
          <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 10, pointerEvents: 'none' }}>ft</span>
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <NumInput value={inch} onChange={v => apply(ft, v)} min={0} max={11} />
          <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: 10, pointerEvents: 'none' }}>in</span>
        </div>
      </div>
    </Row>
  );
}

function IconBtn({ title, onClick, children, danger }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: '7px 4px', borderRadius: 6, fontSize: 11, fontWeight: 500,
        border: 'none', cursor: 'pointer',
        background: danger ? '#450a0a' : '#1e293b',
        color: danger ? '#f87171' : '#94a3b8',
      }}
    >
      {children}
    </button>
  );
}

export default function PropertiesPanel({ item, onUpdate, onDelete, onDuplicate }) {
  const { name, type, width, height, rotation, color } = item;

  const rotate = (delta) => {
    let r = ((rotation + delta) % 360 + 360) % 360;
    onUpdate({ rotation: r });
  };

  return (
    <div
      className="side-scroll"
      style={{
        width: 200, flexShrink: 0, background: '#0f172a',
        borderLeft: '1px solid #1e293b', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}
    >
      <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
          {type}
        </div>
        <input
          value={name}
          onChange={e => onUpdate({ name: e.target.value })}
          style={{
            width: '100%', background: '#1e293b', color: '#e2e8f0',
            border: '1px solid #334155', borderRadius: 5, padding: '5px 8px',
            fontSize: 13, fontWeight: 600, outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 12px' }}>
        <FtInRow label="Width" px={width} onChange={v => onUpdate({ width: v })} />
        <FtInRow label="Height" px={height} onChange={v => onUpdate({ height: v })} />

        <Row label="Rotation">
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button
              onClick={() => rotate(-15)}
              title="Rotate −15°"
              style={{ flex: 1, padding: '5px', background: '#1e293b', border: '1px solid #334155', borderRadius: 5, color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <RotateCcw size={13} />
            </button>
            <span style={{ color: '#e2e8f0', fontSize: 12, minWidth: 44, textAlign: 'center' }}>
              {Math.round(rotation)}°
            </span>
            <button
              onClick={() => rotate(15)}
              title="Rotate +15°"
              style={{ flex: 1, padding: '5px', background: '#1e293b', border: '1px solid #334155', borderRadius: 5, color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <RotateCw size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 90, 180, 270].map(deg => (
              <button
                key={deg}
                onClick={() => onUpdate({ rotation: deg })}
                title={`Set to ${deg}°`}
                style={{
                  flex: 1, padding: '4px 2px', fontSize: 10, borderRadius: 4,
                  background: Math.round(rotation) === deg ? '#3b82f6' : '#1e293b',
                  color: Math.round(rotation) === deg ? '#fff' : '#64748b',
                  border: '1px solid #334155', cursor: 'pointer',
                }}
              >
                {deg}°
              </button>
            ))}
          </div>
        </Row>

        <Row label="Color">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="color"
              value={color || '#DEB887'}
              onChange={e => onUpdate({ color: e.target.value })}
              style={{ width: 36, height: 30, borderRadius: 5, cursor: 'pointer', border: '1px solid #334155' }}
            />
            <input
              type="text"
              value={color || '#DEB887'}
              onChange={e => onUpdate({ color: e.target.value })}
              style={{
                flex: 1, background: '#1e293b', color: '#e2e8f0',
                border: '1px solid #334155', borderRadius: 5, padding: '5px 8px', fontSize: 12, outline: 'none',
              }}
            />
          </div>
        </Row>

        <div style={{ background: '#1e293b', borderRadius: 6, padding: '7px 10px', fontSize: 11, color: '#64748b' }}>
          {(width / PX_PER_FOOT).toFixed(1)} ft × {(height / PX_PER_FOOT).toFixed(1)} ft
          <br />
          {(width / PX_PER_FOOT * 12).toFixed(0)}″ × {(height / PX_PER_FOOT * 12).toFixed(0)}″
        </div>
      </div>

      <div style={{ padding: '0 12px 12px', display: 'flex', gap: 6 }}>
        <IconBtn title="Duplicate" onClick={onDuplicate}>
          <Copy size={12} /> Dupe
        </IconBtn>
        <IconBtn title="Delete item" onClick={onDelete} danger>
          <Trash2 size={12} /> Del
        </IconBtn>
      </div>

      <div style={{ margin: '0 12px 12px', background: '#1e293b', borderRadius: 6, padding: '7px 10px', fontSize: 10, color: '#475569', lineHeight: 1.6 }}>
        Arrow keys: move<br />
        Delete: remove<br />
        Escape: deselect
      </div>
    </div>
  );
}
