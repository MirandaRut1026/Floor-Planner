import { useState } from 'react';
import { X } from 'lucide-react';
import { PX_PER_FOOT } from '../data/furniture.js';

const PRESETS = [
  { name: 'Living Room',    w: 16, h: 20 },
  { name: 'Bedroom',        w: 12, h: 14 },
  { name: 'Kitchen',        w: 12, h: 12 },
  { name: 'Bathroom',       w: 8,  h: 10 },
  { name: 'Garage (1-car)', w: 12, h: 22 },
  { name: 'Garage (2-car)', w: 22, h: 22 },
  { name: 'Dining Room',    w: 12, h: 14 },
  { name: 'Office',         w: 10, h: 12 },
  { name: 'Laundry',        w: 8,  h: 8  },
];

const ROOM_COLORS = [
  '#E8F4F8', '#FFF8E7', '#F0F8F0', '#F8F0F8',
  '#F0F8FF', '#FFF0F8', '#F8F8E8', '#F5F5F5', '#FFFFF0',
];

function NumIn({ label, value, onChange, min = 0, max = 999 }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 3 }}>{label}</label>
      <input
        type="number" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        onFocus={e => e.target.select()}
        style={{
          width: '100%', background: '#1e293b', color: '#e2e8f0',
          border: '1px solid #334155', borderRadius: 6, padding: '7px 10px', fontSize: 13, outline: 'none',
        }}
      />
    </div>
  );
}

export default function AddRoomModal({ onAdd, onClose }) {
  const [name, setName] = useState('Room');
  const [wFt, setWFt] = useState(12);
  const [wIn, setWIn] = useState(0);
  const [hFt, setHFt] = useState(14);
  const [hIn, setHIn] = useState(0);
  const [color, setColor] = useState('#E8F4F8');

  const applyPreset = (p) => {
    setName(p.name);
    setWFt(p.w); setWIn(0);
    setHFt(p.h); setHIn(0);
  };

  const handleAdd = () => {
    const width  = (wFt + wIn / 12) * PX_PER_FOOT;
    const height = (hFt + hIn / 12) * PX_PER_FOOT;
    if (width < PX_PER_FOOT || height < PX_PER_FOOT) return;
    onAdd({ name, width, height, color });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0f172a', borderRadius: 12, padding: 24,
        width: 420, maxWidth: '95vw', border: '1px solid #1e293b',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, color: '#e2e8f0', fontSize: 17, fontWeight: 700 }}>Add Room</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Quick presets</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {PRESETS.map(p => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                style={{
                  padding: '4px 9px', background: '#1e293b', border: '1px solid #334155',
                  borderRadius: 5, color: '#94a3b8', fontSize: 11, cursor: 'pointer',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 4 }}>Room name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={e => e.target.select()}
            style={{
              width: '100%', background: '#1e293b', color: '#e2e8f0',
              border: '1px solid #334155', borderRadius: 6, padding: '7px 10px', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        {/* Width */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Width</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NumIn label="Feet" value={wFt} onChange={setWFt} min={0} />
            <NumIn label="Inches" value={wIn} onChange={setWIn} min={0} max={11} />
          </div>
        </div>

        {/* Height */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Height / Depth</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NumIn label="Feet" value={hFt} onChange={setHFt} min={0} />
            <NumIn label="Inches" value={hIn} onChange={setHIn} min={0} max={11} />
          </div>
        </div>

        {/* Color */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Fill color</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ROOM_COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 28, height: 28, borderRadius: 5, background: c, cursor: 'pointer',
                  border: color === c ? '2px solid #3b82f6' : '2px solid #334155',
                }}
              />
            ))}
            <input
              type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ width: 28, height: 28, borderRadius: 5, cursor: 'pointer', border: '2px solid #334155' }}
            />
          </div>
        </div>

        {/* Preview dimensions */}
        <div style={{ color: '#475569', fontSize: 11, marginBottom: 14 }}>
          {wFt}′ {wIn}″ × {hFt}′ {hIn}″ &nbsp;=&nbsp;
          {(wFt + wIn / 12).toFixed(1)} ft × {(hFt + hIn / 12).toFixed(1)} ft
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '9px', background: '#1e293b', border: '1px solid #334155',
              borderRadius: 7, color: '#94a3b8', fontSize: 13, cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            style={{
              flex: 2, padding: '9px', background: '#2563eb', border: 'none',
              borderRadius: 7, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
