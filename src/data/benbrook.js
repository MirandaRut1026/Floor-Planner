import { PX_PER_FOOT } from './furniture.js';

const f = (ft) => ft * PX_PER_FOOT;

// Benbrook House — a realistic single-story layout
export const BENBROOK_ITEMS = [
  // ── Rooms ────────────────────────────────────────────────────────────────
  { id: 'r01', type: 'room', name: 'Living Room',   x: f(0),  y: f(0),  width: f(16), height: f(20), color: '#E8F4F8', rotation: 0 },
  { id: 'r02', type: 'room', name: 'Kitchen',        x: f(16), y: f(0),  width: f(14), height: f(12), color: '#FFF8E7', rotation: 0 },
  { id: 'r03', type: 'room', name: 'Dining Room',    x: f(16), y: f(12), width: f(14), height: f(8),  color: '#F0F8F0', rotation: 0 },
  { id: 'r04', type: 'room', name: 'Garage',         x: f(30), y: f(0),  width: f(22), height: f(22), color: '#F5F5F5', rotation: 0 },
  { id: 'r05', type: 'room', name: 'Master Bedroom', x: f(0),  y: f(20), width: f(14), height: f(14), color: '#F8F0F8', rotation: 0 },
  { id: 'r06', type: 'room', name: 'Master Bath',    x: f(14), y: f(20), width: f(9),  height: f(9),  color: '#F0F8FF', rotation: 0 },
  { id: 'r07', type: 'room', name: 'Bedroom 2',      x: f(23), y: f(20), width: f(12), height: f(12), color: '#FFF0F8', rotation: 0 },
  { id: 'r08', type: 'room', name: 'Bedroom 3',      x: f(0),  y: f(34), width: f(12), height: f(12), color: '#F8F8E8', rotation: 0 },
  { id: 'r09', type: 'room', name: 'Hall Bath',      x: f(14), y: f(29), width: f(8),  height: f(8),  color: '#F0F8FF', rotation: 0 },
  { id: 'r10', type: 'room', name: 'Hallway',        x: f(12), y: f(34), width: f(8),  height: f(4),  color: '#EEEEEE', rotation: 0 },
  { id: 'r11', type: 'room', name: 'Laundry',        x: f(22), y: f(34), width: f(8),  height: f(6),  color: '#F5F5FF', rotation: 0 },

  // ── Furniture ────────────────────────────────────────────────────────────
  // Living Room
  { id: 'f01', type: 'furniture', name: 'Sofa',          x: f(1),    y: f(5),    width: f(7),   height: f(3),   color: '#8B7355', rotation: 0 },
  { id: 'f02', type: 'furniture', name: 'Coffee Table',  x: f(2),    y: f(8.5),  width: f(4),   height: f(2),   color: '#DEB887', rotation: 0 },
  { id: 'f03', type: 'furniture', name: 'TV Stand',      x: f(1),    y: f(0.5),  width: f(5),   height: f(1.5), color: '#5C4033', rotation: 0 },
  { id: 'f04', type: 'furniture', name: 'Armchair',      x: f(11),   y: f(6),    width: f(3),   height: f(3),   color: '#9B8260', rotation: 0 },
  // Kitchen
  { id: 'f05', type: 'furniture', name: 'Refrigerator',  x: f(27.5), y: f(0.5),  width: f(2.5), height: f(2.5), color: '#C0C0C0', rotation: 0 },
  { id: 'f06', type: 'furniture', name: 'Range/Stove',   x: f(24),   y: f(0.5),  width: f(2.5), height: f(2.5), color: '#808080', rotation: 0 },
  { id: 'f07', type: 'furniture', name: 'Kitchen Island',x: f(17.5), y: f(5),    width: f(4),   height: f(2.5), color: '#F5F5DC', rotation: 0 },
  { id: 'f08', type: 'furniture', name: 'Sink',          x: f(21),   y: f(0.5),  width: f(2),   height: f(1.5), color: '#B8D4E8', rotation: 0 },
  // Dining
  { id: 'f09', type: 'furniture', name: 'Dining Table',  x: f(17.5), y: f(13),   width: f(3),   height: f(6),   color: '#A0522D', rotation: 0 },
  // Master Bedroom
  { id: 'f10', type: 'furniture', name: 'King Bed',      x: f(1),    y: f(23),   width: f(6.3), height: f(6.7), color: '#4A90D9', rotation: 0 },
  { id: 'f11', type: 'furniture', name: 'Nightstand',    x: f(8),    y: f(23),   width: f(2),   height: f(2),   color: '#8B6914', rotation: 0 },
  { id: 'f12', type: 'furniture', name: 'Dresser',       x: f(1),    y: f(30.5), width: f(4),   height: f(1.5), color: '#8B6914', rotation: 0 },
  // Master Bath
  { id: 'f13', type: 'furniture', name: 'Toilet',        x: f(21),   y: f(21),   width: f(1.5), height: f(2.5), color: '#FFFFF0', rotation: 0 },
  { id: 'f14', type: 'furniture', name: 'Bathtub',       x: f(14.5), y: f(21),   width: f(2.5), height: f(5),   color: '#E0F0FF', rotation: 0 },
  { id: 'f15', type: 'furniture', name: 'Double Vanity', x: f(14.5), y: f(26.5), width: f(4),   height: f(1.5), color: '#F5F5F5', rotation: 0 },
  // Bedroom 2
  { id: 'f16', type: 'furniture', name: 'Queen Bed',     x: f(24),   y: f(22),   width: f(5),   height: f(6.7), color: '#4A90D9', rotation: 0 },
  // Bedroom 3
  { id: 'f17', type: 'furniture', name: 'Twin Bed',      x: f(1),    y: f(36),   width: f(3.2), height: f(6.3), color: '#5AA0E9', rotation: 0 },
  // Hall Bath
  { id: 'f18', type: 'furniture', name: 'Toilet',        x: f(14.5), y: f(29.5), width: f(1.5), height: f(2.5), color: '#FFFFF0', rotation: 0 },
  { id: 'f19', type: 'furniture', name: 'Shower 3×3',    x: f(19),   y: f(29.5), width: f(3),   height: f(3),   color: '#B8D4E8', rotation: 0 },
  // Laundry
  { id: 'f20', type: 'furniture', name: 'Washer',        x: f(22.5), y: f(34.5), width: f(2),   height: f(2),   color: '#E0E0E0', rotation: 0 },
  { id: 'f21', type: 'furniture', name: 'Dryer',         x: f(25),   y: f(34.5), width: f(2),   height: f(2),   color: '#E0E0E0', rotation: 0 },
];
