
const DEFAULT_DURATION = 7000; // Set initial countdown time in seconds

function getTimerData() {
  const stored = localStorage.getItem('remote-timer');
  return stored ? JSON.parse(stored) : null;
}

function setTimerData(data) {
  localStorage.setItem('remote-timer', JSON.stringify(data));
}

function initTimer() {
  const existing = getTimerData();
  if (!existing || !existing.startedAt) {
    const now = Date.now();
    setTimerData({ startedAt: now, offset: 0 });
  }
}

function getRemainingSeconds() {
  const data = getTimerData();
  if (!data) return DEFAULT_DURATION;
  const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
  return Math.max(0, DEFAULT_DURATION - elapsed - (data.offset || 0));
}

function startTimer() {
  initTimer();
  const el = document.getElementById("timer");

  function update() {
    const seconds = getRemainingSeconds();
    el.textContent = seconds > 0 ? seconds : "Time's up!";
    if (seconds > 0) {
      setTimeout(update, 1000);
    }
  }

  update();
}

function subtractTime() {
  const data = getTimerData();
  if (data) {
    data.offset = (data.offset || 0) + 10;
    setTimerData(data);
  }
}
