import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload, Trash2, RotateCw, RotateCcw, Save, FolderOpen, Ruler,
  X, Copy, ChevronDown, ChevronRight, Image as ImageIcon,
  Home, Bed, UtensilsCrossed, ChefHat, Bath, Briefcase, Package,
  Menu, Grid3x3, DoorOpen, Plus, Sparkles, ZoomIn, ZoomOut, Maximize2, Magnet
} from 'lucide-react';

// ───────── Furniture library ─────────
const LIBRARY = {
  'Living Room': {
    icon: Home,
    items: [
      { name: 'Sofa', w: 84, h: 38, color: '#8B7355' },
      { name: 'Loveseat', w: 60, h: 38, color: '#8B7355' },
      { name: 'Sectional L', w: 96, h: 96, color: '#8B7355' },
      { name: 'Armchair', w: 35, h: 35, color: '#A0826D' },
      { name: 'Coffee Table', w: 48, h: 24, color: '#6B4423' },
      { name: 'End Table', w: 24, h: 24, color: '#6B4423' },
      { name: 'TV Stand', w: 60, h: 18, color: '#3F3F3F' },
      { name: 'Bookshelf', w: 36, h: 12, color: '#6B4423' },
      { name: 'Floor Lamp', w: 16, h: 16, color: '#C9A961' },
      { name: 'Rug 5×8', w: 60, h: 96, color: '#D4B896' },
      { name: 'Rug 8×10', w: 96, h: 120, color: '#D4B896' },
    ]
  },
  'Bedroom': {
    icon: Bed,
    items: [
      { name: 'King Bed', w: 76, h: 80, color: '#D4C5B0' },
      { name: 'Queen Bed', w: 60, h: 80, color: '#D4C5B0' },
      { name: 'Full Bed', w: 54, h: 75, color: '#D4C5B0' },
      { name: 'Twin Bed', w: 38, h: 75, color: '#D4C5B0' },
      { name: 'Nightstand', w: 24, h: 20, color: '#6B4423' },
      { name: 'Dresser', w: 60, h: 20, color: '#6B4423' },
      { name: 'Tall Dresser', w: 36, h: 20, color: '#6B4423' },
      { name: 'Wardrobe', w: 48, h: 24, color: '#6B4423' },
      { name: 'Vanity', w: 40, h: 18, color: '#8B6F47' },
    ]
  },
  'Dining': {
    icon: UtensilsCrossed,
    items: [
      { name: 'Dining Table · 6', w: 72, h: 36, color: '#8B6F47' },
      { name: 'Dining Table · 4', w: 48, h: 36, color: '#8B6F47' },
      { name: 'Round Table', w: 48, h: 48, color: '#8B6F47' },
      { name: 'Dining Chair', w: 18, h: 18, color: '#5C4033' },
      { name: 'Buffet', w: 60, h: 20, color: '#6B4423' },
      { name: 'Bar Stool', w: 16, h: 16, color: '#5C4033' },
    ]
  },
  'Kitchen': {
    icon: ChefHat,
    items: [
      { name: 'Refrigerator', w: 36, h: 30, color: '#B8B8B8' },
      { name: 'Stove', w: 30, h: 26, color: '#7A7A7A' },
      { name: 'Dishwasher', w: 24, h: 24, color: '#B8B8B8' },
      { name: 'Kitchen Sink', w: 33, h: 22, color: '#C0C0C0' },
      { name: 'Island', w: 60, h: 30, color: '#D4C5B0' },
      { name: 'Island Lg', w: 84, h: 36, color: '#D4C5B0' },
      { name: 'Counter 3ft', w: 36, h: 25, color: '#D4C5B0' },
      { name: 'Counter 5ft', w: 60, h: 25, color: '#D4C5B0' },
    ]
  },
  'Bath': {
    icon: Bath,
    items: [
      { name: 'Toilet', w: 20, h: 28, color: '#F5F5F5' },
      { name: 'Bathtub', w: 60, h: 30, color: '#F5F5F5' },
      { name: 'Shower', w: 36, h: 36, color: '#E0E0E0' },
      { name: 'Vanity', w: 36, h: 22, color: '#8B6F47' },
      { name: 'Double Vanity', w: 60, h: 22, color: '#8B6F47' },
      { name: 'Pedestal Sink', w: 22, h: 20, color: '#F5F5F5' },
    ]
  },
  'Office': {
    icon: Briefcase,
    items: [
      { name: 'Desk', w: 48, h: 24, color: '#6B4423' },
      { name: 'Large Desk', w: 60, h: 30, color: '#6B4423' },
      { name: 'L-Desk', w: 60, h: 60, color: '#6B4423' },
      { name: 'Office Chair', w: 24, h: 24, color: '#3F3F3F' },
      { name: 'Filing Cabinet', w: 18, h: 24, color: '#707070' },
    ]
  },
  'Other': {
    icon: Package,
    items: [
      { name: 'Washer', w: 27, h: 27, color: '#B8B8B8' },
      { name: 'Dryer', w: 27, h: 27, color: '#B8B8B8' },
      { name: 'Piano', w: 58, h: 24, color: '#1A1A1A' },
      { name: 'Treadmill', w: 32, h: 70, color: '#3F3F3F' },
    ]
  },
};

// ───────── Pre-loaded house ─────────
const BENBROOK_PPI = 1.5;
const ftIn = (ft, inches = 0) => ft * 12 + inches;
const BENBROOK_HOUSE = [
  { name: 'Living Room',    wIn: ftIn(17, 4), hIn: ftIn(14, 1), x: 80,  y: 70 },
  { name: 'Breakfast Nook', wIn: ftIn(11, 6), hIn: ftIn(6, 2),  x: 410, y: 70 },
  { name: 'Pantry/Laundry', wIn: ftIn(5, 7),  hIn: ftIn(9, 3),  x: 620, y: 70 },
  { name: 'Master',         wIn: ftIn(11, 2), hIn: ftIn(15, 6), x: 80,  y: 350 },
  { name: 'Guest 1',        wIn: ftIn(11, 9), hIn: ftIn(11, 7), x: 300, y: 350 },
  { name: 'Guest 2',        wIn: ftIn(11, 3), hIn: ftIn(11, 8), x: 530, y: 350 },
];
const BENBROOK_OPENINGS = [
  { kind: 'window', name: 'Window', wIn: ftIn(9, 7), hIn: 4, x: 80 + (ftIn(17,4)*BENBROOK_PPI)/2, y: 70 },
  { kind: 'window', name: 'Window', wIn: ftIn(3, 0), hIn: 4, x: 80, y: 70 + 20*BENBROOK_PPI + (ftIn(3,0)*BENBROOK_PPI)/2, rotation: 90 },
];

// ───────── Palette ─────────
const INK = '#1A1715';
const PAPER = '#F4EFE6';
const CANVAS_BG = '#FAF7F0';
const MUTED = '#8B8680';
const LINE = '#D9D1C2';
const ACCENT = '#B85C3B';
const ROOM_FILL = '#FFFFFF20';

// ───────── Helpers ─────────
const formatFtIn = (totalInches) => {
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - ft * 12);
  if (inches === 0) return `${ft}'`;
  return `${ft}'${inches}"`;
};

const getContrastColor = (hex) => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? INK : PAPER;
};

const DEFAULT_PPI = 1.5;
const GRID_FT = 12; // 1 foot grid in inches

// ═══════════ Main Component ═══════════
export default function FloorPlanner() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(0.7);

  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [pixelsPerInch, setPixelsPerInch] = useState(DEFAULT_PPI);

  // Viewport: pan + zoom independent of item scale
  const [viewport, setViewport] = useState({ x: 40, y: 40, zoom: 1 });
  const viewportRef = useRef({ x: 40, y: 40, zoom: 1 });
  useEffect(() => { viewportRef.current = viewport; }, [viewport]);

  // Snap to grid
  const [snapToGrid, setSnapToGrid] = useState(false);
  const snapToGridRef = useRef(false);
  useEffect(() => { snapToGridRef.current = snapToGrid; }, [snapToGrid]);

  const [calibrationMode, setCalibrationMode] = useState(false);
  const [calibrationPoints, setCalibrationPoints] = useState([]);
  const [calibrationFeet, setCalibrationFeet] = useState('10');
  const [snapStraight, setSnapStraight] = useState(true);

  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [layoutName, setLayoutName] = useState('Untitled Plan');
  const [savedLayouts, setSavedLayouts] = useState([]);

  const [expandedSections, setExpandedSections] = useState({ rooms: true, openings: false, furniture: false });
  const [expandedCats, setExpandedCats] = useState({ 'Living Room': true });
  const [showGrid, setShowGrid] = useState(true);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1100 : true);
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1100 : true);

  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const [customItemOpen, setCustomItemOpen] = useState(false);

  const canvasRef = useRef(null);
  const nextId = useRef(1);
  const fileInputRef = useRef(null);
  const pixelsPerInchRef = useRef(DEFAULT_PPI);
  useEffect(() => { pixelsPerInchRef.current = pixelsPerInch; }, [pixelsPerInch]);

  // Keep items accessible in keydown handler without stale closures
  const itemsRef = useRef([]);
  useEffect(() => { itemsRef.current = items; }, [items]);
  const selectedIdRef = useRef(null);
  useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  // ───── Effects ─────
  useEffect(() => {
    const onResize = () => {
      const wide = window.innerWidth >= 1100;
      setIsWide(wide);
      if (wide) setSidebarOpen(true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.list('plan:');
        if (res && res.keys) setSavedLayouts(res.keys);
      } catch {}
    })();
  }, []);

  // Arrow key movement
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const id = selectedIdRef.current;
      if (!id) return;

      const ppi = pixelsPerInchRef.current;
      const gridPx = ppi * GRID_FT;
      const step = snapToGridRef.current ? gridPx : 2;

      let dx = 0, dy = 0;
      if (e.key === 'ArrowLeft')  { dx = -step; e.preventDefault(); }
      if (e.key === 'ArrowRight') { dx =  step; e.preventDefault(); }
      if (e.key === 'ArrowUp')    { dy = -step; e.preventDefault(); }
      if (e.key === 'ArrowDown')  { dy =  step; e.preventDefault(); }

      if (dx !== 0 || dy !== 0) {
        setItems((prev) => prev.map((f) => {
          if (f.id !== id) return f;
          let nx = f.x + dx;
          let ny = f.y + dy;
          if (snapToGridRef.current) {
            nx = Math.round(nx / gridPx) * gridPx;
            ny = Math.round(ny / gridPx) * gridPx;
          }
          return { ...f, x: nx, y: ny };
        }));
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && !e.repeat) {
        e.preventDefault();
        setItems((prev) => prev.filter((f) => f.id !== id));
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Scroll-wheel zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      setViewport((prev) => {
        const newZoom = Math.max(0.1, Math.min(8, prev.zoom * factor));
        const ratio = newZoom / prev.zoom;
        return {
          zoom: newZoom,
          x: mouseX - (mouseX - prev.x) * ratio,
          y: mouseY - (mouseY - prev.y) * ratio,
        };
      });
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  // Prevent iOS Safari from scrolling/bouncing the page while interacting with the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prevent = (e) => e.preventDefault();
    canvas.addEventListener('touchmove', prevent, { passive: false });
    canvas.addEventListener('touchstart', prevent, { passive: false });
    return () => {
      canvas.removeEventListener('touchmove', prevent);
      canvas.removeEventListener('touchstart', prevent);
    };
  }, []);

  // ───── Coordinate helpers ─────
  const screenToWorld = useCallback((screenX, screenY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const vp = viewportRef.current;
    return {
      x: (screenX - rect.left - vp.x) / vp.zoom,
      y: (screenY - rect.top  - vp.y) / vp.zoom,
    };
  }, []);

  const snapPos = useCallback((x, y) => {
    const gridPx = pixelsPerInchRef.current * GRID_FT;
    if (!snapToGridRef.current) return { x, y };
    return {
      x: Math.round(x / gridPx) * gridPx,
      y: Math.round(y / gridPx) * gridPx,
    };
  }, []);

  // ───── General helpers ─────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const newId = () => nextId.current++;

  const addItem = (data) => {
    const vp = viewportRef.current;
    const canvas = canvasRef.current;
    const rect = canvas ? canvas.getBoundingClientRect() : { width: 800, height: 600 };
    // Place at center of current viewport in world coords
    const wx = (rect.width  / 2 - vp.x) / vp.zoom;
    const wy = (rect.height / 2 - vp.y) / vp.zoom;
    const item = { id: newId(), kind: 'furniture', rotation: 0, x: wx, y: wy, ...data };
    setItems((prev) => [...prev, item]);
    setSelectedId(item.id);
    if (!isWide) setSidebarOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBackgroundImage(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const loadBenbrookHouse = () => {
    setPixelsPerInch(BENBROOK_PPI);
    const rooms = BENBROOK_HOUSE.map((r) => ({
      id: newId(), kind: 'room', rotation: 0, color: 'transparent', ...r,
      x: r.x + (r.wIn * BENBROOK_PPI) / 2,
      y: r.y + (r.hIn * BENBROOK_PPI) / 2,
    }));
    const openings = BENBROOK_OPENINGS.map((o) => ({
      id: newId(), rotation: 0, color: '#8DB3D1', ...o,
    }));
    setItems([...rooms, ...openings]);
    setViewport({ x: 40, y: 40, zoom: 1 });
    setLayoutName('Benbrook House');
    setSelectedId(null);
    if (!isWide) setSidebarOpen(false);
    showToast('Loaded your house — drag rooms to arrange.');
  };

  const resetView = () => setViewport({ x: 40, y: 40, zoom: 1 });

  const zoomBy = (factor) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setViewport((prev) => {
      const newZoom = Math.max(0.1, Math.min(8, prev.zoom * factor));
      const ratio = newZoom / prev.zoom;
      return { zoom: newZoom, x: cx - (cx - prev.x) * ratio, y: cy - (cy - prev.y) * ratio };
    });
  };

  // ───── Pointer handlers ─────
  // Uses window-level listeners so events are never lost, regardless of where
  // the pointer roams — this is what makes pan/drag reliable on iOS Safari.

  const attachWindowListeners = (onMove, onUp) => {
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const detachWindowListeners = (onMove, onUp) => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
  };

  const onItemPointerDown = (e, id) => {
    if (calibrationMode) return;
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(id);
    const item = itemsRef.current.find((f) => f.id === id);
    if (!item) return;
    const w = screenToWorld(e.clientX, e.clientY);
    const offsetX = w.x - item.x;
    const offsetY = w.y - item.y;
    const pid = e.pointerId;

    const onMove = (ev) => {
      if (ev.pointerId !== pid) return;
      const wPos = screenToWorld(ev.clientX, ev.clientY);
      const snapped = snapPos(wPos.x - offsetX, wPos.y - offsetY);
      setItems((prev) => prev.map((f) => (f.id === id ? { ...f, x: snapped.x, y: snapped.y } : f)));
    };
    const onUp = () => detachWindowListeners(onMove, onUp);
    attachWindowListeners(onMove, onUp);
  };

  const onCanvasPointerDown = (e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();

    if (calibrationMode) {
      const rect = canvasRef.current.getBoundingClientRect();
      const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const HIT = 22;
      for (let i = 0; i < calibrationPoints.length; i++) {
        const d = calibrationPoints[i];
        if (Math.hypot(d.x - p.x, d.y - p.y) <= HIT) {
          const idx = i;
          const pid = e.pointerId;
          // capture snapStraight at drag start via ref so it's always current
          const onMove = (ev) => {
            if (ev.pointerId !== pid) return;
            const rr = canvasRef.current.getBoundingClientRect();
            let pt = { x: ev.clientX - rr.left, y: ev.clientY - rr.top };
            setCalibrationPoints((prev) => {
              const other = prev[1 - idx];
              if (snapStraight && other) {
                const dx = Math.abs(pt.x - other.x);
                const dy = Math.abs(pt.y - other.y);
                pt = dx < dy ? { x: other.x, y: pt.y } : { x: pt.x, y: other.y };
              }
              return prev.map((dd, ii) => (ii === idx ? pt : dd));
            });
          };
          const onUp = () => detachWindowListeners(onMove, onUp);
          attachWindowListeners(onMove, onUp);
          return;
        }
      }
      setCalibrationPoints((prev) => (prev.length >= 2 ? prev : [...prev, p]));
      return;
    }

    // Pan
    setSelectedId(null);
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startVX = viewportRef.current.x;
    const startVY = viewportRef.current.y;
    const pid = e.pointerId;

    const onMove = (ev) => {
      if (ev.pointerId !== pid) return;
      const dx = ev.clientX - startClientX;
      const dy = ev.clientY - startClientY;
      setViewport((prev) => ({ ...prev, x: startVX + dx, y: startVY + dy }));
    };
    const onUp = () => detachWindowListeners(onMove, onUp);
    attachWindowListeners(onMove, onUp);
  };

  // ───── Calibration ─────
  const completeCalibration = () => {
    if (calibrationPoints.length !== 2) return;
    const feet = parseFloat(calibrationFeet);
    if (!feet || feet <= 0) return;
    const [p1, p2] = calibrationPoints;
    const pxDist = Math.hypot(p2.x - p1.x, p2.y - p1.y) / viewport.zoom;
    setPixelsPerInch(pxDist / (feet * 12));
    setCalibrationMode(false);
    setCalibrationPoints([]);
    showToast('Scale set.');
  };

  const cancelCalibration = () => {
    setCalibrationMode(false);
    setCalibrationPoints([]);
  };

  // ───── Item operations ─────
  const rotateSelected = (deg) => {
    if (!selectedId) return;
    setItems((prev) => prev.map((f) => (f.id === selectedId ? { ...f, rotation: f.rotation + deg } : f)));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((f) => f.id !== selectedId));
    setSelectedId(null);
  };

  const duplicateSelected = () => {
    if (!selectedId) return;
    const item = items.find((f) => f.id === selectedId);
    if (!item) return;
    const offset = pixelsPerInch * 12; // 1 ft offset
    const newItem = { ...item, id: newId(), x: item.x + offset, y: item.y + offset };
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const updateSelected = (changes) => {
    if (!selectedId) return;
    setItems((prev) => prev.map((f) => (f.id === selectedId ? { ...f, ...changes } : f)));
  };

  // ───── Save / load ─────
  const saveLayout = async () => {
    const name = (layoutName || 'Untitled').trim();
    const key = `plan:${name}`;
    const payload = { items, pixelsPerInch, viewport, name, savedAt: Date.now() };
    try {
      await window.storage.set(key, JSON.stringify({ ...payload, backgroundImage }));
      showToast(`Saved "${name}"`);
    } catch {
      try {
        await window.storage.set(key, JSON.stringify(payload));
        showToast(`Saved "${name}" (image too large)`);
      } catch {
        showToast('Save failed.');
        return;
      }
    }
    try {
      const res = await window.storage.list('plan:');
      if (res && res.keys) setSavedLayouts(res.keys);
    } catch {}
  };

  const loadLayout = async (key) => {
    try {
      const res = await window.storage.get(key);
      if (res && res.value) {
        const data = JSON.parse(res.value);
        setItems(data.items || data.furniture || []);
        setPixelsPerInch(data.pixelsPerInch || DEFAULT_PPI);
        setViewport(data.viewport || { x: 40, y: 40, zoom: 1 });
        setBackgroundImage(data.backgroundImage || null);
        setLayoutName(data.name || 'Loaded');
        const allItems = data.items || data.furniture || [];
        nextId.current = Math.max(0, ...allItems.map((f) => f.id)) + 1;
        setSelectedId(null);
        setShowSavedPanel(false);
        showToast(`Loaded "${data.name}"`);
      }
    } catch {
      showToast('Load failed.');
    }
  };

  const deleteLayout = async (key, ev) => {
    ev.stopPropagation();
    try {
      await window.storage.delete(key);
      const res = await window.storage.list('plan:');
      if (res && res.keys) setSavedLayouts(res.keys);
    } catch {}
  };

  const clearAll = () => {
    if (items.length === 0 && !backgroundImage) return;
    setConfirmDialog({
      title: 'Clear plan?',
      body: 'This removes the floor plan image, all rooms, openings, and furniture.',
      confirmLabel: 'Clear',
      onConfirm: () => {
        setItems([]);
        setBackgroundImage(null);
        setSelectedId(null);
        setLayoutName('Untitled Plan');
        setViewport({ x: 40, y: 40, zoom: 1 });
        setConfirmDialog(null);
      },
    });
  };

  const selected = items.find((f) => f.id === selectedId) || null;

  // ───── Render helpers ─────
  const renderItem = (item) => {
    const w = item.wIn * pixelsPerInch;
    const h = item.hIn * pixelsPerInch;
    const isSelected = item.id === selectedId;
    const baseStyle = {
      position: 'absolute',
      left: item.x - w / 2,
      top: item.y - h / 2,
      width: w,
      height: h,
      transform: `rotate(${item.rotation}deg)`,
      cursor: dragState.current?.id === item.id ? 'grabbing' : 'grab',
      touchAction: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      userSelect: 'none',
    };

    if (item.kind === 'room') {
      return (
        <div
          key={item.id}
          onPointerDown={(e) => onItemPointerDown(e, item.id)}
          style={{
            ...baseStyle,
            background: ROOM_FILL,
            border: isSelected ? `4px solid ${ACCENT}` : `4px solid ${INK}`,
            boxShadow: isSelected ? `0 0 0 4px ${ACCENT}33` : 'none',
            zIndex: 1,
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <span className="font-display" style={{ fontSize: Math.min(28, Math.max(11, Math.min(w, h) / 9)), fontStyle: 'italic', fontWeight: 400, color: INK, opacity: 0.7, textAlign: 'center', padding: '0 8px', lineHeight: 1.05, pointerEvents: 'none' }}>
            {item.name}
          </span>
          {Math.min(w, h) > 70 && (
            <span className="font-mono" style={{ fontSize: Math.min(10, Math.max(8, Math.min(w, h) / 22)), color: MUTED, pointerEvents: 'none' }}>
              {formatFtIn(item.wIn)} × {formatFtIn(item.hIn)}
            </span>
          )}
        </div>
      );
    }

    if (item.kind === 'door') {
      return (
        <div key={item.id} onPointerDown={(e) => onItemPointerDown(e, item.id)} style={{ ...baseStyle, background: isSelected ? `${ACCENT}10` : 'transparent', border: isSelected ? `2px solid ${ACCENT}` : 'none', zIndex: 4 }}>
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
            <line x1="0" y1={h - 1.5} x2={w} y2={h - 1.5} stroke={INK} strokeWidth="2.5" />
            <line x1={w - 1.5} y1={h - 1.5} x2={w - 1.5} y2="0" stroke={INK} strokeWidth="2" />
            <path d={`M ${w - 1.5},0 A ${w - 1.5},${h - 1.5} 0 0 1 0,${h - 1.5}`} fill="none" stroke={ACCENT} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
          </svg>
        </div>
      );
    }

    if (item.kind === 'window') {
      return (
        <div key={item.id} onPointerDown={(e) => onItemPointerDown(e, item.id)} style={{ ...baseStyle, background: '#E8F2F8', border: isSelected ? `2px solid ${ACCENT}` : `1.5px solid ${INK}`, zIndex: 4 }}>
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <line x1="0" y1={h/2} x2={w} y2={h/2} stroke={INK} strokeWidth="1" opacity="0.6"/>
            <line x1={w*0.33} y1="0" x2={w*0.33} y2={h} stroke={INK} strokeWidth="0.5" opacity="0.4"/>
            <line x1={w*0.66} y1="0" x2={w*0.66} y2={h} stroke={INK} strokeWidth="0.5" opacity="0.4"/>
          </svg>
        </div>
      );
    }

    // Default: furniture
    return (
      <div
        key={item.id}
        onPointerDown={(e) => onItemPointerDown(e, item.id)}
        style={{
          ...baseStyle,
          background: item.color,
          border: isSelected ? `2px solid ${ACCENT}` : `1px solid ${INK}88`,
          boxShadow: isSelected ? `0 0 0 4px ${ACCENT}33, 0 2px 8px ${INK}22` : `0 1px 2px ${INK}15`,
          zIndex: 5,
        }}
      >
        <span className="font-mono" style={{ fontSize: Math.min(10, Math.max(7, Math.min(w, h) / 6)), color: getContrastColor(item.color), textAlign: 'center', padding: 2, lineHeight: 1.1, pointerEvents: 'none', letterSpacing: '0.02em' }}>
          {item.name}
        </span>
      </div>
    );
  };

  const sortedItems = [...items].sort((a, b) => {
    const order = { room: 0, window: 1, door: 2, furniture: 3 };
    return (order[a.kind] ?? 5) - (order[b.kind] ?? 5);
  });

  // Grid background that tracks viewport pan+zoom
  const gridSize = pixelsPerInch * GRID_FT * viewport.zoom;
  const gridOffsetX = ((viewport.x % gridSize) + gridSize) % gridSize;
  const gridOffsetY = ((viewport.y % gridSize) + gridSize) % gridSize;

  const calibLine = calibrationPoints.length === 2 ? (
    <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ zIndex: 50 }}>
      <line x1={calibrationPoints[0].x} y1={calibrationPoints[0].y} x2={calibrationPoints[1].x} y2={calibrationPoints[1].y} stroke={ACCENT} strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  ) : null;

  return (
    <div
      className="w-full flex flex-col overflow-hidden relative"
      style={{ height: '100dvh', background: PAPER, color: INK, fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif", WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none', touchAction: 'none', overscrollBehavior: 'none' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html, body, #root { overscroll-behavior: none; overflow: hidden; touch-action: none; height: 100%; }
        .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .font-mono { font-family: 'Geist Mono', ui-monospace, monospace; }
        .no-scrollbar::-webkit-scrollbar { width: 4px; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: ${LINE}; border-radius: 2px; }
        .no-scrollbar::-webkit-scrollbar-track { background: transparent; }
        button, input, select { font-family: inherit; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 1px; }
        button:active { transform: scale(0.97); }
        .item-tap:active { background: ${PAPER}; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-sheet { animation: slideUp 220ms cubic-bezier(.2,.8,.2,1); }
        .anim-drawer { animation: slideInLeft 220ms cubic-bezier(.2,.8,.2,1); }
        .anim-fade { animation: fadeIn 180ms ease; }
      `}</style>

      {/* TOP BAR */}
      <header className="flex items-center justify-between flex-shrink-0" style={{ padding: '10px 14px', background: PAPER, borderBottom: `1px solid ${LINE}`, minHeight: 56 }}>
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={() => setSidebarOpen((v) => !v)} style={iconBtn(sidebarOpen && !isWide ? INK : 'transparent', sidebarOpen && !isWide ? PAPER : INK, sidebarOpen && !isWide ? INK : LINE)} aria-label="Toggle library"><Menu size={18} /></button>
          <div className="flex items-center gap-2 min-w-0">
            <div style={{ width: 22, height: 22, borderRadius: 3, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, border: `1.5px solid ${PAPER}` }} />
            </div>
            <input value={layoutName} onChange={(e) => setLayoutName(e.target.value)} className="font-display" style={{ background: 'transparent', border: 'none', fontSize: 18, fontWeight: 500, color: INK, padding: '4px 0', minWidth: 0, width: '100%', maxWidth: 240 }} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={() => zoomBy(0.85)} style={iconBtn('transparent', INK, LINE)} aria-label="Zoom out"><ZoomOut size={16} /></button>
          <span className="font-mono" style={{ fontSize: 10, color: MUTED, width: 36, textAlign: 'center' }}>
            {Math.round(viewport.zoom * 100)}%
          </span>
          <button onClick={() => zoomBy(1.18)} style={iconBtn('transparent', INK, LINE)} aria-label="Zoom in"><ZoomIn size={16} /></button>
          <button onClick={resetView} style={iconBtn('transparent', MUTED, LINE)} aria-label="Reset view" title="Reset view"><Maximize2 size={14} /></button>
          <div style={{ width: 1, height: 24, background: LINE, margin: '0 2px' }} />
          <button onClick={() => setShowGrid(!showGrid)} style={iconBtn(showGrid ? INK : 'transparent', showGrid ? PAPER : INK, showGrid ? INK : LINE)} aria-label="Toggle grid" title="Toggle grid"><Grid3x3 size={16} /></button>
          <button
            onClick={() => setSnapToGrid((v) => !v)}
            style={iconBtn(snapToGrid ? ACCENT : 'transparent', snapToGrid ? PAPER : MUTED, snapToGrid ? ACCENT : LINE)}
            aria-label="Snap to grid"
            title={snapToGrid ? 'Snap to grid: ON' : 'Snap to grid: OFF'}
          >
            <Magnet size={16} />
          </button>
          <div style={{ width: 1, height: 24, background: LINE, margin: '0 2px' }} />
          <button onClick={saveLayout} style={textBtn(LINE)}><Save size={14} /> Save</button>
          <button onClick={() => setShowSavedPanel(true)} style={textBtn(LINE)}><FolderOpen size={14} /> Load</button>
          <button onClick={clearAll} style={iconBtn('transparent', MUTED, LINE)} aria-label="Clear plan"><Trash2 size={16} /></button>
        </div>
      </header>

      {/* MAIN AREA */}
      <div className="flex-1 flex relative overflow-hidden">
        {sidebarOpen && !isWide && (
          <div className="absolute inset-0 anim-fade" style={{ background: `${INK}55`, zIndex: 30 }} onClick={() => setSidebarOpen(false)} />
        )}
        {sidebarOpen && (
          <aside
            className={`flex flex-col flex-shrink-0 no-scrollbar ${!isWide ? 'anim-drawer' : ''}`}
            style={{ width: 320, maxWidth: '85vw', background: PAPER, borderRight: `1px solid ${LINE}`, overflowY: 'auto', position: isWide ? 'relative' : 'absolute', top: 0, bottom: 0, left: 0, zIndex: 40, boxShadow: !isWide ? `0 0 40px ${INK}33` : 'none', touchAction: 'pan-y' }}
          >
            {!isWide && (
              <div className="flex justify-end px-3 pt-3">
                <button onClick={() => setSidebarOpen(false)} style={{ width: 32, height: 32, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} />
                </button>
              </div>
            )}

            {/* PLAN IMAGE */}
            <Section title="PLAN IMAGE" expanded={expandedSections.plan} onToggle={() => setExpandedSections((p) => ({ ...p, plan: !p.plan }))}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <div className="flex flex-col gap-2">
                <button onClick={() => fileInputRef.current?.click()} style={solidBtn()}>
                  <Upload size={15} />{backgroundImage ? 'Replace image' : 'Upload plan image'}
                </button>
                {backgroundImage && (
                  <>
                    <button onClick={() => calibrationMode ? cancelCalibration() : setCalibrationMode(true)} style={{ ...outlineBtn(calibrationMode ? ACCENT : LINE), background: calibrationMode ? ACCENT : 'transparent', color: calibrationMode ? PAPER : INK }}>
                      <Ruler size={15} />{calibrationMode ? 'Cancel scaling' : 'Set scale'}
                    </button>
                    <div className="flex items-center gap-2 pt-2">
                      <ImageIcon size={13} color={MUTED} />
                      <span className="font-mono" style={{ fontSize: 10, color: MUTED }}>OPACITY</span>
                      <input type="range" min="0.1" max="1" step="0.05" value={bgOpacity} onChange={(e) => setBgOpacity(parseFloat(e.target.value))} style={{ flex: 1, accentColor: ACCENT, height: 28 }} />
                    </div>
                  </>
                )}
              </div>
              <div className="font-mono mt-3" style={{ fontSize: 10, color: MUTED }}>
                1 ft = <span style={{ color: INK }}>{(pixelsPerInch * 12).toFixed(1)} px</span>
              </div>
            </Section>

            {/* ROOMS */}
            <Section title="ROOMS" expanded={expandedSections.rooms} onToggle={() => setExpandedSections((p) => ({ ...p, rooms: !p.rooms }))}>
              <div className="flex flex-col gap-2">
                <button onClick={() => setAddRoomOpen(true)} style={solidBtn()}>
                  <Plus size={15} /> Add rectangular room
                </button>
                <button onClick={loadBenbrookHouse} style={outlineBtn(LINE)}>
                  <Sparkles size={15} /> Load Benbrook House
                </button>
              </div>
              <p className="font-mono" style={{ fontSize: 10, color: MUTED, marginTop: 10, lineHeight: 1.5 }}>
                FOR L-SHAPES OR CLOSETS, ADD MULTIPLE RECTANGLES AND OVERLAP THEM.
              </p>
            </Section>

            {/* DOORS & WINDOWS */}
            <Section title="DOORS &amp; WINDOWS" expanded={expandedSections.openings} onToggle={() => setExpandedSections((p) => ({ ...p, openings: !p.openings }))}>
              <div className="flex flex-col gap-2">
                <button onClick={() => addItem({ kind: 'door', name: 'Door', wIn: 36, hIn: 36, color: '#8B4513' })} style={outlineBtn(LINE)}>
                  <DoorOpen size={15} /> Add door (36")
                </button>
                <button onClick={() => addItem({ kind: 'door', name: 'Door', wIn: 30, hIn: 30, color: '#8B4513' })} style={outlineBtn(LINE)}>
                  <DoorOpen size={15} /> Add door (30")
                </button>
                <button onClick={() => addItem({ kind: 'window', name: 'Window', wIn: 36, hIn: 6, color: '#8DB3D1' })} style={outlineBtn(LINE)}>
                  <WindowIcon /> Add window (36")
                </button>
                <button onClick={() => addItem({ kind: 'window', name: 'Window', wIn: 60, hIn: 6, color: '#8DB3D1' })} style={outlineBtn(LINE)}>
                  <WindowIcon /> Add window (60")
                </button>
              </div>
              <p className="font-mono" style={{ fontSize: 10, color: MUTED, marginTop: 10, lineHeight: 1.5 }}>
                EDIT THE SIZE ONCE PLACED. ROTATE 90° TO PUT ON A SIDE WALL.
              </p>
            </Section>

            {/* FURNITURE */}
            <Section title="FURNITURE" expanded={expandedSections.furniture} onToggle={() => setExpandedSections((p) => ({ ...p, furniture: !p.furniture }))}>
              <button onClick={() => setCustomItemOpen(true)} style={{ ...outlineBtn(INK), borderStyle: 'dashed', marginBottom: 8 }}>
                <Plus size={15} /> Custom item…
              </button>
              <div className="flex flex-col gap-1">
                {Object.entries(LIBRARY).map(([cat, { icon: Icon, items: catItems }]) => {
                  const open = !!expandedCats[cat];
                  return (
                    <div key={cat}>
                      <button onClick={() => setExpandedCats((p) => ({ ...p, [cat]: !p[cat] }))} className="w-full flex items-center gap-2" style={{ minHeight: 40, padding: '0 4px', background: 'transparent', border: 'none', cursor: 'pointer', color: INK, textAlign: 'left' }}>
                        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <Icon size={14} style={{ color: MUTED }} />
                        <span className="font-display" style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>{cat}</span>
                      </button>
                      {open && (
                        <div className="flex flex-col gap-1 pl-3 pb-2">
                          {catItems.map((it) => (
                            <button key={it.name} onClick={() => addItem({ kind: 'furniture', name: it.name, wIn: it.w, hIn: it.h, color: it.color })} className="item-tap flex items-center justify-between text-left" style={{ minHeight: 44, padding: '0 12px', background: 'transparent', border: `1px solid ${LINE}`, fontSize: 13, cursor: 'pointer', color: INK }}>
                              <span className="flex items-center gap-2.5">
                                <span style={{ width: 12, height: 12, background: it.color, border: `1px solid ${INK}22`, flexShrink: 0 }} />
                                {it.name}
                              </span>
                              <span className="font-mono" style={{ fontSize: 11, color: MUTED }}>{it.w}×{it.h}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>
          </aside>
        )}

        {/* CANVAS */}
        <main className="flex-1 flex flex-col relative" style={{ background: CANVAS_BG, minWidth: 0 }}>
          {calibrationMode && (
            <div className="px-4 py-2 flex items-center justify-center gap-3 anim-fade flex-wrap" style={{ background: ACCENT, color: PAPER }}>
              <div className="flex items-center gap-2">
                <Ruler size={14} />
                <span className="font-mono" style={{ fontSize: 12, letterSpacing: '0.05em' }}>
                  {calibrationPoints.length === 0 && 'TAP TO PLACE FIRST POINT'}
                  {calibrationPoints.length === 1 && 'TAP TO PLACE SECOND POINT'}
                  {calibrationPoints.length === 2 && 'DRAG DOTS TO ADJUST · ENTER DISTANCE BELOW'}
                </span>
              </div>
              <button onClick={() => setSnapStraight((v) => !v)} className="font-mono" style={{ background: snapStraight ? PAPER : 'transparent', color: snapStraight ? ACCENT : PAPER, border: `1px solid ${PAPER}`, padding: '4px 10px', fontSize: 11, cursor: 'pointer', letterSpacing: '0.05em' }}>
                STRAIGHT {snapStraight ? 'ON' : 'OFF'}
              </button>
            </div>
          )}

          <div
            ref={canvasRef}
            onPointerDown={onCanvasPointerDown}
            className="flex-1 relative overflow-hidden"
            style={{
              background: CANVAS_BG,
              backgroundImage: showGrid
                ? `linear-gradient(${LINE}88 1px, transparent 1px), linear-gradient(90deg, ${LINE}88 1px, transparent 1px)`
                : 'none',
              backgroundSize: showGrid ? `${gridSize}px ${gridSize}px` : 'auto',
              backgroundPosition: showGrid ? `${gridOffsetX}px ${gridOffsetY}px` : 'auto',
              cursor: calibrationMode ? 'crosshair' : panState.current ? 'grabbing' : 'default',
              touchAction: 'none',
            }}
          >
            {/* World transform layer */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
                transformOrigin: '0 0',
                willChange: 'transform',
              }}
            >
              {backgroundImage && (
                <img
                  src={backgroundImage}
                  alt="Floor plan"
                  draggable={false}
                  style={{ position: 'absolute', top: 0, left: 0, opacity: bgOpacity, pointerEvents: 'none', userSelect: 'none', maxWidth: 'none' }}
                />
              )}
              {sortedItems.map(renderItem)}
            </div>

            {/* Empty state (screen space) */}
            {!backgroundImage && items.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8" style={{ color: MUTED, textAlign: 'center' }}>
                <div className="font-display mb-2" style={{ fontSize: 38, fontStyle: 'italic', fontWeight: 300, color: INK, opacity: 0.2 }}>begin here</div>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
                  TAP <span style={{ color: INK }}>≡</span> · ADD A ROOM OR LOAD YOUR HOUSE
                </div>
              </div>
            )}

            {/* Snap indicator */}
            {snapToGrid && (
              <div className="absolute font-mono anim-fade" style={{ top: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: ACCENT, letterSpacing: '0.12em', background: `${PAPER}ee`, padding: '3px 8px', border: `1px solid ${ACCENT}44`, pointerEvents: 'none' }}>
                SNAP ON · 1 FT GRID
              </div>
            )}

            {/* Calibration markers (screen space) */}
            {calibrationMode && (
              <>
                {calibrationPoints.map((p, i) => (
                  <div key={i} style={{ position: 'absolute', left: p.x - 11, top: p.y - 11, width: 22, height: 22, borderRadius: '50%', background: ACCENT, border: `3px solid ${PAPER}`, pointerEvents: 'none', boxShadow: `0 2px 6px ${INK}44`, zIndex: 50 }} />
                ))}
                {calibLine}
                {calibrationPoints.length === 2 && (
                  <div className="absolute flex items-center gap-2 px-3 py-2 anim-fade" style={{ top: 16, left: '50%', transform: 'translateX(-50%)', background: INK, color: PAPER, boxShadow: `0 4px 16px ${INK}66`, zIndex: 60 }}>
                    <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.05em' }}>DISTANCE</span>
                    <input autoFocus type="number" inputMode="decimal" value={calibrationFeet} onChange={(e) => setCalibrationFeet(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') completeCalibration(); }} className="font-mono" style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${PAPER}`, color: PAPER, fontSize: 16, width: 60, textAlign: 'right', padding: '4px 6px' }} />
                    <span className="font-mono" style={{ fontSize: 11 }}>ft</span>
                    <button onClick={completeCalibration} className="font-mono" style={{ background: ACCENT, color: PAPER, border: 'none', padding: '6px 12px', fontSize: 11, cursor: 'pointer', letterSpacing: '0.05em', minHeight: 32 }}>SET</button>
                  </div>
                )}
              </>
            )}

            {/* Scale ruler */}
            <div className="absolute flex items-center" style={{ bottom: 14, left: 14, pointerEvents: 'none' }}>
              <div style={{ width: pixelsPerInch * 12 * 5 * viewport.zoom, height: 4, background: INK }} />
              <span className="font-mono" style={{ fontSize: 10, color: INK, marginLeft: 8 }}>5 ft</span>
            </div>

            {/* Item count + hint */}
            <div className="absolute font-mono" style={{ top: 14, right: 14, fontSize: 10, color: MUTED, letterSpacing: '0.1em', background: `${PAPER}cc`, padding: '4px 8px', pointerEvents: 'none', lineHeight: 1.6 }}>
              {items.length} ITEM{items.length === 1 ? '' : 'S'}{'\n'}
              <span style={{ opacity: 0.6 }}>drag canvas to pan · scroll to zoom · arrows to nudge</span>
            </div>
          </div>

          {selected && (
            <div className="anim-sheet" style={{ background: PAPER, borderTop: `1px solid ${LINE}`, boxShadow: `0 -2px 12px ${INK}11`, padding: '12px 14px 14px', paddingBottom: 'max(14px, env(safe-area-inset-bottom))' }}>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono" style={{ fontSize: 9, color: MUTED, letterSpacing: '0.12em', background: LINE, padding: '2px 6px' }}>
                    {selected.kind.toUpperCase()}
                  </span>
                  <input value={selected.name} onChange={(e) => updateSelected({ name: e.target.value })} className="font-display" style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${LINE}`, fontSize: 19, fontWeight: 500, color: INK, padding: '2px 0', maxWidth: 220 }} />
                </div>
                <button onClick={() => setSelectedId(null)} style={{ width: 36, height: 36, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <DimEditor label="W" totalInches={selected.wIn} onChange={(v) => updateSelected({ wIn: Math.max(1, v) })} />
                <DimEditor label="H" totalInches={selected.hIn} onChange={(v) => updateSelected({ hIn: Math.max(1, v) })} />
                {selected.kind !== 'room' && selected.kind !== 'window' && selected.kind !== 'door' && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono" style={{ fontSize: 10, color: MUTED }}>COLOR</span>
                    <input type="color" value={selected.color || '#888'} onChange={(e) => updateSelected({ color: e.target.value })} style={{ width: 36, height: 32, padding: 0, border: `1px solid ${LINE}`, background: 'transparent', cursor: 'pointer' }} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={() => rotateSelected(-15)} style={iconBtn('transparent', INK, LINE)} aria-label="Rotate -15°"><RotateCcw size={16} /></button>
                <span className="font-mono" style={{ fontSize: 12, color: MUTED, minWidth: 44, textAlign: 'center' }}>
                  {(((selected.rotation % 360) + 360) % 360).toFixed(0)}°
                </span>
                <button onClick={() => rotateSelected(15)} style={iconBtn('transparent', INK, LINE)} aria-label="Rotate +15°"><RotateCw size={16} /></button>
                <button onClick={() => updateSelected({ rotation: Math.round(selected.rotation / 90) * 90 + 90 })} className="font-mono" style={{ height: 44, padding: '0 14px', background: 'transparent', border: `1px solid ${LINE}`, fontSize: 12, cursor: 'pointer', color: INK, letterSpacing: '0.05em' }}>±90°</button>
                <div style={{ flex: 1 }} />
                <button onClick={duplicateSelected} style={textBtn(LINE)}><Copy size={15} /> Duplicate</button>
                <button onClick={deleteSelected} style={{ minHeight: 44, padding: '0 14px', background: ACCENT, border: 'none', color: PAPER, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {showSavedPanel && (
        <Modal onClose={() => setShowSavedPanel(false)}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display" style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em' }}>Saved plans</h2>
            <button onClick={() => setShowSavedPanel(false)} style={iconBtn('transparent', INK, 'transparent')}><X size={18} /></button>
          </div>
          {savedLayouts.length === 0 ? (
            <p className="font-mono" style={{ fontSize: 12, color: MUTED }}>No saved plans yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {savedLayouts.map((key) => {
                const name = key.replace(/^plan:/, '');
                return (
                  <div key={key} onClick={() => loadLayout(key)} className="flex items-center justify-between item-tap" style={{ minHeight: 56, padding: '0 16px', border: `1px solid ${LINE}`, cursor: 'pointer' }}>
                    <span className="font-display" style={{ fontSize: 17, fontWeight: 500 }}>{name}</span>
                    <button onClick={(ev) => deleteLayout(key, ev)} style={{ width: 40, height: 40, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </Modal>
      )}

      {addRoomOpen && (
        <AddRoomModal
          onClose={() => setAddRoomOpen(false)}
          onAdd={({ name, wIn, hIn }) => {
            const vp = viewportRef.current;
            const canvas = canvasRef.current;
            const rect = canvas ? canvas.getBoundingClientRect() : { width: 800, height: 600 };
            const wx = (rect.width  / 2 - vp.x) / vp.zoom;
            const wy = (rect.height / 2 - vp.y) / vp.zoom;
            const item = { id: newId(), kind: 'room', name: name || 'Room', wIn, hIn, x: wx, y: wy, rotation: 0, color: 'transparent' };
            setItems((prev) => [...prev, item]);
            setSelectedId(item.id);
            setAddRoomOpen(false);
            if (!isWide) setSidebarOpen(false);
          }}
        />
      )}

      {customItemOpen && (
        <CustomItemModal
          onClose={() => setCustomItemOpen(false)}
          onAdd={({ name, wIn, hIn, color }) => {
            addItem({ kind: 'furniture', name, wIn, hIn, color });
            setCustomItemOpen(false);
          }}
        />
      )}

      {confirmDialog && (
        <Modal onClose={() => setConfirmDialog(null)} maxWidth={380}>
          <h3 className="font-display mb-2" style={{ fontSize: 22, fontWeight: 500 }}>{confirmDialog.title}</h3>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 18, lineHeight: 1.4 }}>{confirmDialog.body}</p>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setConfirmDialog(null)} style={{ minHeight: 44, padding: '0 18px', background: 'transparent', border: `1px solid ${LINE}`, fontSize: 14, cursor: 'pointer', color: INK }}>Cancel</button>
            <button onClick={confirmDialog.onConfirm} style={{ minHeight: 44, padding: '0 18px', background: ACCENT, border: 'none', color: PAPER, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>{confirmDialog.confirmLabel}</button>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="absolute font-mono px-4 py-2 anim-fade" style={{ bottom: 'max(24px, env(safe-area-inset-bottom))', left: '50%', transform: 'translateX(-50%)', background: INK, color: PAPER, fontSize: 12, letterSpacing: '0.05em', zIndex: 100, boxShadow: `0 4px 14px ${INK}44`, pointerEvents: 'none' }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ═══════════ Sub-components ═══════════

function Section({ title, expanded, onToggle, children }) {
  return (
    <div style={{ borderBottom: `1px solid ${LINE}` }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between" style={{ padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer', color: INK }}>
        <span className="font-mono" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.12em', fontWeight: 500 }}>{title}</span>
        {expanded ? <ChevronDown size={14} color={MUTED} /> : <ChevronRight size={14} color={MUTED} />}
      </button>
      {expanded && <div style={{ padding: '0 20px 16px' }}>{children}</div>}
    </div>
  );
}

function Modal({ onClose, children, maxWidth = 480 }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center anim-fade" style={{ background: `${INK}77`, zIndex: 60, padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: PAPER, width: '100%', maxWidth, maxHeight: '85dvh', padding: 24, boxShadow: `0 20px 60px ${INK}44`, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

function AddRoomModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [wFt, setWFt] = useState('12');
  const [wIn, setWIn] = useState('0');
  const [hFt, setHFt] = useState('10');
  const [hIn, setHIn] = useState('0');

  const submit = () => {
    const wTotal = (parseInt(wFt) || 0) * 12 + (parseInt(wIn) || 0);
    const hTotal = (parseInt(hFt) || 0) * 12 + (parseInt(hIn) || 0);
    if (wTotal < 12 || hTotal < 12) return;
    onAdd({ name: name.trim(), wIn: wTotal, hIn: hTotal });
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 500 }}>New room</h2>
        <button onClick={onClose} style={iconBtn('transparent', INK, 'transparent')}><X size={18} /></button>
      </div>
      <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>NAME</label>
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Master Bedroom" className="font-display" style={{ width: '100%', minHeight: 44, padding: '8px 12px', fontSize: 17, background: 'transparent', border: `1px solid ${LINE}`, color: INK, marginBottom: 16 }} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
      <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>WIDTH</label>
      <div className="flex items-center gap-2 mb-4">
        <input type="number" inputMode="decimal" value={wFt} onChange={(e) => setWFt(e.target.value)} className="font-mono" style={{ width: 70, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        <span className="font-mono" style={{ fontSize: 14, color: MUTED }}>ft</span>
        <input type="number" inputMode="decimal" value={wIn} onChange={(e) => setWIn(e.target.value)} className="font-mono" style={{ width: 70, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        <span className="font-mono" style={{ fontSize: 14, color: MUTED }}>in</span>
      </div>
      <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>HEIGHT (DEPTH)</label>
      <div className="flex items-center gap-2 mb-6">
        <input type="number" inputMode="decimal" value={hFt} onChange={(e) => setHFt(e.target.value)} className="font-mono" style={{ width: 70, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        <span className="font-mono" style={{ fontSize: 14, color: MUTED }}>ft</span>
        <input type="number" inputMode="decimal" value={hIn} onChange={(e) => setHIn(e.target.value)} className="font-mono" style={{ width: 70, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        <span className="font-mono" style={{ fontSize: 14, color: MUTED }}>in</span>
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onClose} style={{ minHeight: 44, padding: '0 18px', background: 'transparent', border: `1px solid ${LINE}`, fontSize: 14, cursor: 'pointer', color: INK }}>Cancel</button>
        <button onClick={submit} style={{ minHeight: 44, padding: '0 18px', background: INK, border: 'none', color: PAPER, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>Add room</button>
      </div>
    </Modal>
  );
}

function CustomItemModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [wIn, setWIn] = useState('48');
  const [hIn, setHIn] = useState('24');
  const [color, setColor] = useState('#8B7355');

  const submit = () => {
    const w = parseFloat(wIn);
    const h = parseFloat(hIn);
    if (!w || !h || w < 1 || h < 1) return;
    onAdd({ name: (name.trim() || 'Item'), wIn: w, hIn: h, color });
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 500 }}>Custom item</h2>
        <button onClick={onClose} style={iconBtn('transparent', INK, 'transparent')}><X size={18} /></button>
      </div>
      <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>NAME</label>
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mom's antique cabinet" className="font-display" style={{ width: '100%', minHeight: 44, padding: '8px 12px', fontSize: 17, background: 'transparent', border: `1px solid ${LINE}`, color: INK, marginBottom: 16 }} />
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div>
          <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>WIDTH (IN)</label>
          <input type="number" inputMode="decimal" value={wIn} onChange={(e) => setWIn(e.target.value)} className="font-mono" style={{ width: 90, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        </div>
        <div>
          <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>DEPTH (IN)</label>
          <input type="number" inputMode="decimal" value={hIn} onChange={(e) => setHIn(e.target.value)} className="font-mono" style={{ width: 90, minHeight: 44, padding: '8px', fontSize: 16, background: 'transparent', border: `1px solid ${LINE}`, color: INK, textAlign: 'center' }} />
        </div>
        <div>
          <label className="font-mono block mb-1" style={{ fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>COLOR</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 60, height: 44, padding: 0, border: `1px solid ${LINE}`, background: 'transparent', cursor: 'pointer' }} />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onClose} style={{ minHeight: 44, padding: '0 18px', background: 'transparent', border: `1px solid ${LINE}`, fontSize: 14, cursor: 'pointer', color: INK }}>Cancel</button>
        <button onClick={submit} style={{ minHeight: 44, padding: '0 18px', background: INK, border: 'none', color: PAPER, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>Place</button>
      </div>
    </Modal>
  );
}

function DimEditor({ label, totalInches, onChange }) {
  const ft = Math.floor(totalInches / 12);
  const inches = +(totalInches - ft * 12).toFixed(1);
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono" style={{ fontSize: 10, color: MUTED }}>{label}</span>
      <input type="number" inputMode="decimal" value={ft} onChange={(e) => { const v = parseFloat(e.target.value) || 0; onChange(v * 12 + inches); }} className="font-mono" style={{ width: 50, minHeight: 36, background: 'transparent', border: `1px solid ${LINE}`, padding: '4px 6px', fontSize: 14, color: INK, textAlign: 'center' }} />
      <span className="font-mono" style={{ fontSize: 10, color: MUTED }}>ft</span>
      <input type="number" inputMode="decimal" value={inches} onChange={(e) => { const v = parseFloat(e.target.value) || 0; onChange(ft * 12 + v); }} className="font-mono" style={{ width: 56, minHeight: 36, background: 'transparent', border: `1px solid ${LINE}`, padding: '4px 6px', fontSize: 14, color: INK, textAlign: 'center' }} />
      <span className="font-mono" style={{ fontSize: 10, color: MUTED }}>in</span>
    </div>
  );
}

function WindowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
    </svg>
  );
}

// ═══════════ Style helpers ═══════════
const iconBtn = (bg, fg, border) => ({
  width: 40, height: 40, padding: 0,
  background: bg, border: `1px solid ${border}`, color: fg,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
});
const textBtn = (border) => ({
  height: 40, padding: '0 14px', background: 'transparent', border: `1px solid ${border}`,
  color: INK, cursor: 'pointer', fontSize: 13, fontWeight: 500,
  display: 'flex', alignItems: 'center', gap: 6, minHeight: 40,
});
const solidBtn = () => ({
  minHeight: 44, padding: '0 14px', background: INK, color: PAPER,
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
  display: 'flex', alignItems: 'center', gap: 8,
});
const outlineBtn = (border) => ({
  minHeight: 44, padding: '0 14px', background: 'transparent',
  border: `1px solid ${border}`, color: INK, cursor: 'pointer',
  fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
});
