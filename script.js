// config
const DEFAULT_DURATION = 32 * 3600; // 32 hours in seconds

// shared localStorage state key
const STORAGE_KEY = 'remote-timer-state';

function initState() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      startAt: now,
      offset: 0
    }));
  }
}

function readState() {
  const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return { startAt: s.startAt, offset: s.offset };
}

function writeState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// public functions

function startTimer() {
  initState();
  const el = document.getElementById('timer');

  function update() {
    const s = readState();
    const elapsed = Math.floor((Date.now() - s.startAt) / 1000);
    const rem = Math.max(0, DEFAULT_DURATION - elapsed - s.offset);
    el.textContent = formatTime(rem);
    if (rem > 0) setTimeout(update, 1000);
  }

  update();
}

function subtractTime(seconds) {
  const s = readState();
  s.offset += seconds;
  writeState(s);
}

function resetSubtract(hours=4) {
  // subtract exactly 'hours' hours
  subtractTime(hours * 3600);
}

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2,'0');
  const m = String(Math.floor((sec % 3600)/60)).padStart(2,'0');
  const s = String(sec % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}
