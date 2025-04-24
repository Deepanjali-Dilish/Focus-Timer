let startTime = null;
let interval = null;
let timerCount = 1;
let activeLogIndex = null;
let previousStop = null;
let previousDuration = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const output = document.getElementById('output');
const liveTimer = document.getElementById('liveTimer');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function saveLog(log, index) {
  const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
  if (index !== undefined) logs[index] = log;
  else logs.push(log);
  localStorage.setItem('timerLogs', JSON.stringify(logs));
}

function deleteLog(index) {
  const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
  logs.splice(index, 1);  
  localStorage.setItem('timerLogs', JSON.stringify(logs));

  loadLogs();
}

function addLogToDOM(log, index) {
  const logDiv = document.createElement('div');
  logDiv.className = 'log';
  logDiv.innerHTML = `
    <strong>Timer ${index + 1}</strong>
    <p class="gap">Start Time: ${log.start}</p>
    <p class="gap">Stop Time: ${log.stop}</p>
    <p class="gap">Duration: <span class="duration">${log.duration}</span></p>
    <button class="deleteBtn">Delete Timer</button>
  `;
  
  const deleteBtn = logDiv.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();  
    deleteLog(index); 
  });

  logDiv.addEventListener('click', () => {
    document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
    logDiv.classList.add('active');
    activeLogIndex = index;

    const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
    const selectedLog = logs[index];

    previousStop = selectedLog.rawStop;
    previousDuration = selectedLog.rawDuration;

    startTime = new Date(); 
    liveTimer.textContent = formatTime(previousDuration);
    startBtn.textContent = 'Resume';
    stopBtn.disabled = true;
    startBtn.disabled = false;
  });
  
  output.appendChild(logDiv);
}


function loadLogs() {
  output.innerHTML = '';
  const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
  logs.forEach((log, index) => addLogToDOM(log, index));
  timerCount = logs.length;
}

startBtn.addEventListener('click', () => {
  startTime = new Date();

  startBtn.disabled = true;
  stopBtn.disabled = false;

  interval = setInterval(() => {
    const elapsed = new Date() - startTime;
    const total = activeLogIndex !== null ? previousDuration + elapsed : elapsed;
    liveTimer.textContent = formatTime(total);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  const stopTime = new Date();
  clearInterval(interval);

  let totalDuration;
  if (activeLogIndex !== null) {
    const newElapsed = stopTime - previousStop;
    totalDuration = previousDuration + newElapsed;
  } else {
    totalDuration = stopTime - startTime;
  }

  const formattedDuration = formatTime(totalDuration);

  if (activeLogIndex !== null) {
    const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
    const log = logs[activeLogIndex];
    log.stop = stopTime.toLocaleString();
    log.duration = formattedDuration;
    log.rawStop = stopTime.getTime();
    log.rawDuration = totalDuration;
    saveLog(log, activeLogIndex);
  } else {
    const log = {
      start: startTime.toLocaleString(),
      stop: stopTime.toLocaleString(),
      duration: formattedDuration,
      rawStart: startTime.getTime(),
      rawStop: stopTime.getTime(),
      rawDuration: totalDuration
    };
    saveLog(log);
    timerCount++;
  }

  previousStop = null;
  previousDuration = 0;
  activeLogIndex = null;

  document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
  startBtn.textContent = 'Start';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  liveTimer.textContent = '00:00:00';
  loadLogs();
});

loadLogs();


