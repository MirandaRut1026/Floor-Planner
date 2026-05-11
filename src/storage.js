const KEY = 'floorplanner_v2';

export function savePlan(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
}

export function loadPlan() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Load failed:', e);
    return null;
  }
}

export function clearPlan() {
  localStorage.removeItem(KEY);
}
