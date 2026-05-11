import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, DoorOpen, Square } from 'lucide-react';
import { FURNITURE, DOORS_WINDOWS } from '../data/furniture.js';

function CategorySection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 12px', background: '#1e293b', border: 'none', cursor: 'pointer',
          color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
        }}
      >
        {title}
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '2px 0' }}>{children}</div>}
    </div>
  );
}

function FurnitureBtn({ label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        padding: '6px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
        color: '#cbd5e1', fontSize: 12, textAlign: 'left', gap: 1,
        borderLeft: '2px solid transparent',
        transition: 'background 0.12s, border-color 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.borderLeftColor = '#3b82f6'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderLeftColor = 'transparent'; }}
    >
      <span>{label}</span>
      {sub && <span style={{ color: '#475569', fontSize: 10 }}>{sub}</span>}
    </button>
  );
}

function ftLabel(w, h) {
  const fmt = (v) => {
    const ft = Math.floor(v);
    const inVal = Math.round((v - ft) * 12);
    return inVal > 0 ? `${ft}′${inVal}″` : `${ft}′`;
  };
  return `${fmt(w)} × ${fmt(h)}`;
}

export default function SidePanel({ onAddRoom, onAddCustom, onAddFurniture, onAddDoorWindow }) {
  return (
    <div style={{
      width: 190, flexShrink: 0, background: '#0f172a',
      borderRight: '1px solid #1e293b',
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
    }}
      className="side-scroll"
    >
      {/* Header actions */}
      <div style={{ padding: '10px 10px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button
          onClick={onAddRoom}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
            background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Plus size={15} /> Add Room
        </button>
        <button
          onClick={onAddCustom}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px',
            background: '#1e293b', color: '#94a3b8', border: '1px solid #334155',
            borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Square size={13} /> Custom Item
        </button>
      </div>

      <div style={{ height: 1, background: '#1e293b', margin: '0 10px' }} />

      {/* Doors & Windows */}
      <CategorySection title="Doors & Windows" defaultOpen={true}>
        {DOORS_WINDOWS.map(item => (
          <FurnitureBtn
            key={item.name}
            label={item.name}
            sub={ftLabel(item.w, item.h)}
            onClick={() => onAddDoorWindow(item)}
          />
        ))}
      </CategorySection>

      <div style={{ height: 1, background: '#1e293b' }} />

      {/* Furniture categories */}
      {Object.entries(FURNITURE).map(([cat, list]) => (
        <CategorySection key={cat} title={cat}>
          {list.map(item => (
            <FurnitureBtn
              key={item.name}
              label={item.name}
              sub={ftLabel(item.w, item.h)}
              onClick={() => onAddFurniture(item)}
            />
          ))}
        </CategorySection>
      ))}

      <div style={{ flex: 1 }} />

      <div style={{ padding: '8px 12px', color: '#334155', fontSize: 10, textAlign: 'center' }}>
        Click item to add it to canvas
      </div>
    </div>
  );
}
