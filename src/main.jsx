import React from 'react';
import ReactDOM from 'react-dom/client';
import './storage.js';
import FloorPlanner from './FloorPlanner.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FloorPlanner />
  </React.StrictMode>
);
