import { useState } from 'react';
import { X } from 'lucide-react';
import { PX_PER_FOOT } from '../data/furniture.js';

const DEFAULT_COLORS = [
  '#DEB887', '#8B7355', '#4A90D9', '#2F4F4F',
  '#A0522D', '#808080', '#C0C0C0', '#8B4513',
  '#CC8888', '#6B8E23', '#708090', '#B8860B',
];

function NumIn({ label, value, onChange, min = 0 }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 3 }}>{label}</label>
      <input
        type="number" min={min} value={value}
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

export default function CustomItemModal({ onAdd, onClose }) {
  const [name, setName] = useState('Custom Item');
  const [wFt, setWFt] = useState(3);
  const [wIn, setWIn] = useState(0);
  const [hFt, setHFt] = useState(3);
  const [hIn, setHIn] = useState(0);
  const [color, setColor] = useState('#DEB887');

  const handleAdd = () => {
    const width  = (wFt + wIn / 12) * PX_PER_FOOT;
    const height = (hFt + hIn / 12) * PX_PER_FOOT;
    if (width < PX_PER_FOOT * 0.25 || height < PX_PER_FOOT * 0.25) return;
    onAdd({ name, width, height, color });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0f172a', borderRadius: 12, padding: 24,
        width: 380, maxWidth: '95vw', border: '1px solid #1e293b',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, color: '#e2e8f0', fontSize: 17, fontWeight: 700 }}>Custom Item</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 4 }}>Item name</label>
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

        <div style={{ marginBottom: 10 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Width</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NumIn label="Feet" value={wFt} onChange={setWFt} min={0} />
            <NumIn label="Inches" value={wIn} onChange={setWIn} min={0} />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 5 }}>Height / Depth</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NumIn label="Feet" value={hFt} onChange={setHFt} min={0} />
            <NumIn label="Inches" value={hIn} onChange={setHIn} min={0} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Color</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            {DEFAULT_COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 26, height: 26, borderRadius: 5, background: c, cursor: 'pointer',
                  border: color === c ? '2px solid #3b82f6' : '2px solid #334155',
                }}
              />
            ))}
            <input
              type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ width: 26, height: 26, borderRadius: 5, cursor: 'pointer', border: '2px solid #334155' }}
            />
          </div>
        </div>

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
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
