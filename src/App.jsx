import { useState, useEffect, useCallback, useRef } from 'react';
import Canvas from './components/Canvas.jsx';
import Toolbar from './components/Toolbar.jsx';
import SidePanel from './components/SidePanel.jsx';
import PropertiesPanel from './components/PropertiesPanel.jsx';
import AddRoomModal from './components/AddRoomModal.jsx';
import CustomItemModal from './components/CustomItemModal.jsx';
import { savePlan, loadPlan } from './storage.js';
import { BENBROOK_ITEMS } from './data/benbrook.js';
import { PX_PER_FOOT } from './data/furniture.js';

let _id = Date.now();
const uid = () => `item_${_id++}`;

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [pan, setPan] = useState({ x: 100, y: 80 });
  const [zoom, setZoom] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);
  const [background, setBackground] = useState(null); // { url, opacity }
  const [modal, setModal] = useState(null); // 'addRoom' | 'customItem' | null
  const [notification, setNotification] = useState('');
  const bgInputRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          setItems(prev => prev.filter(i => i.id !== selectedId));
          setSelectedId(null);
        }
        return;
      }

      if (e.key === 'Escape') {
        setSelectedId(null);
        return;
      }

      if (selectedId) {
        const step = snapToGrid ? PX_PER_FOOT : 2;
        let dx = 0, dy = 0;
        if (e.key === 'ArrowLeft')  dx = -step;
        if (e.key === 'ArrowRight') dx =  step;
        if (e.key === 'ArrowUp')    dy = -step;
        if (e.key === 'ArrowDown')  dy =  step;
        if (dx !== 0 || dy !== 0) {
          e.preventDefault();
          setItems(prev => prev.map(i =>
            i.id === selectedId ? { ...i, x: i.x + dx, y: i.y + dy } : i
          ));
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, snapToGrid]);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2000);
  };

  const addItem = useCallback((partial) => {
    const id = uid();
    const newItem = {
      rotation: 0,
      color: '#DEB887',
      ...partial,
      id,
    };
    // If no x/y given, center in current view
    if (partial.x == null) {
      newItem.x = (-pan.x / zoom) + 60;
      newItem.y = (-pan.y / zoom) + 60;
    }
    setItems(prev => [...prev, newItem]);
    setSelectedId(id);
    return id;
  }, [pan, zoom]);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  }, []);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setSelectedId(null);
  }, []);

  const duplicateItem = useCallback((id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newId = uid();
    setItems(prev => [...prev, { ...item, id: newId, x: item.x + PX_PER_FOOT, y: item.y + PX_PER_FOOT }]);
    setSelectedId(newId);
  }, [items]);

  const handleSave = () => {
    const ok = savePlan({ items, background });
    notify(ok ? 'Plan saved!' : 'Save failed.');
  };

  const handleLoad = () => {
    const state = loadPlan();
    if (!state) { notify('No saved plan found.'); return; }
    setItems(state.items || []);
    setBackground(state.background || null);
    setSelectedId(null);
    notify('Plan loaded!');
  };

  const handleLoadBenbrook = () => {
    setItems(BENBROOK_ITEMS.map(i => ({ ...i })));
    setSelectedId(null);
    setPan({ x: 100, y: 80 });
    setZoom(0.65);
    notify('Benbrook House loaded!');
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBackground({ url, opacity: 0.35 });
    e.target.value = '';
  };

  const selectedItem = items.find(i => i.id === selectedId) ?? null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
      <Toolbar
        zoom={zoom}
        setZoom={setZoom}
        pan={pan}
        setPan={setPan}
        snapToGrid={snapToGrid}
        setSnapToGrid={setSnapToGrid}
        gridVisible={gridVisible}
        setGridVisible={setGridVisible}
        onSave={handleSave}
        onLoad={handleLoad}
        onLoadBenbrook={handleLoadBenbrook}
        onBackgroundClick={() => bgInputRef.current?.click()}
        background={background}
        setBackground={setBackground}
        onResetView={() => { setPan({ x: 100, y: 80 }); setZoom(1); }}
        onClearAll={() => { setItems([]); setSelectedId(null); notify('Canvas cleared.'); }}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <SidePanel
          onAddRoom={() => setModal('addRoom')}
          onAddCustom={() => setModal('customItem')}
          onAddFurniture={(item) => addItem({
            type: 'furniture',
            name: item.name,
            width: item.w * PX_PER_FOOT,
            height: item.h * PX_PER_FOOT,
            color: item.color,
          })}
          onAddDoorWindow={(item) => addItem({
            type: item.type,
            name: item.name,
            width: item.w * PX_PER_FOOT,
            height: item.h * PX_PER_FOOT,
            color: item.color,
          })}
        />

        <Canvas
          items={items}
          selectedId={selectedId}
          pan={pan}
          zoom={zoom}
          snapToGrid={snapToGrid}
          gridVisible={gridVisible}
          background={background}
          setSelectedId={setSelectedId}
          setPan={setPan}
          setZoom={setZoom}
          updateItem={updateItem}
        />

        {selectedItem && (
          <PropertiesPanel
            item={selectedItem}
            onUpdate={(updates) => updateItem(selectedId, updates)}
            onDelete={() => deleteItem(selectedId)}
            onDuplicate={() => duplicateItem(selectedId)}
          />
        )}
      </div>

      {/* Hidden file input for background image */}
      <input
        ref={bgInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleBackgroundUpload}
      />

      {/* Toast notification */}
      {notification && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', color: '#e2e8f0', padding: '8px 20px',
          borderRadius: 8, fontSize: 14, fontWeight: 500,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: 1000,
          border: '1px solid #334155',
        }}>
          {notification}
        </div>
      )}

      {modal === 'addRoom' && (
        <AddRoomModal
          onAdd={(room) => { addItem({ type: 'room', ...room }); setModal(null); }}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'customItem' && (
        <CustomItemModal
          onAdd={(item) => { addItem({ type: 'custom', ...item }); setModal(null); }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
