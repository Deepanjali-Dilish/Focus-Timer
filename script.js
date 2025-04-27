let startTime = null;
let interval = null;
let timerCount = 1;
let activeLogIndex = null;
let previousTotalDuration = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const output = document.getElementById('output');
const liveTimer = document.getElementById('liveTimer');

function formatTime(ms) {
  const totalSeconds = Math.round(ms / 1000); 
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatDateTime(dateObj) {
  const date = dateObj.toLocaleDateString('en-GB').split('/').join('/');
  const time = dateObj.toTimeString().split(' ')[0];
  return `${date}, ${time}`;
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
    <div class="log-header">
      <strong>Timer ${index + 1}</strong>
      <div class="arrow-container">
        <i class="fa-solid fa-chevron-down arrow"></i>
      </div>
    </div>
    <div class="log-details">
      <p class="gap">Start: ${log.start}</p>
      <p class="gap">Stop: ${log.stop}</p>
      <p class="gap">Duration: <span class="duration">${formatTime(log.duration)}</span></p>
    </div>
  `;

  const arrowContainer = logDiv.querySelector('.arrow-container');
  const logDetails = logDiv.querySelector('.log-details');

  
  if (log.resumeSessions && log.resumeSessions.length > 0) {
    log.resumeSessions.forEach((session, i) => {
      const resumeBlock = document.createElement('div');
      resumeBlock.className = 'gap';
      resumeBlock.innerHTML = `
        <strong>Resume ${i + 1}</strong>
        <p>Resume Start: ${session.resumeStart}</p>
        <p>Resume Stop: ${session.resumeStop}</p>
        <p>Resume Duration: ${formatTime(session.resumeDuration)}</p>
      `;
      logDetails.appendChild(resumeBlock);
    });
  }

  const totalDuration = log.duration + (log.resumeSessions?.reduce((acc, session) => acc + session.resumeDuration, 0) || 0);
  const totalBlock = document.createElement('div');
  totalBlock.className = 'gap';
  totalBlock.innerHTML = `<strong>Total Time: ${formatTime(totalDuration)}</strong>`;
  logDetails.appendChild(totalBlock);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'deleteBtn';
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteLog(index);
  });
  logDiv.appendChild(deleteBtn);

  
  arrowContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    logDetails.style.display = (logDetails.style.display === 'none') ? 'block' : 'none';
  });


  logDiv.addEventListener('click', () => {
    document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
    logDiv.classList.add('active');
    activeLogIndex = index;
    previousTotalDuration = totalDuration;
    liveTimer.textContent = formatTime(previousTotalDuration);
    startBtn.textContent = 'Resume';
    startBtn.disabled = false;
    stopBtn.disabled = true;
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

  if (activeLogIndex !== null) {
    const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
    const log = logs[activeLogIndex];

    log._currentResume = {
      rawStart: startTime.getTime(),
      resumeStart: formatDateTime(startTime)
    };

    saveLog(log, activeLogIndex);
  }

  startBtn.disabled = true;
  stopBtn.disabled = false;

  interval = setInterval(() => {
    const elapsed = new Date() - startTime;
    const total = previousTotalDuration + elapsed;
    liveTimer.textContent = formatTime(total);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  const stopTime = new Date();
  clearInterval(interval);

  const elapsed = stopTime - startTime;
  const formattedStop = formatDateTime(stopTime);

  let logUpdated = false;

  if (activeLogIndex !== null) {
    const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
    const log = logs[activeLogIndex];

    if (!log.resumeSessions) log.resumeSessions = [];

    if (log._currentResume) {
      log._currentResume.resumeStop = formattedStop;
      log._currentResume.resumeDuration = elapsed;
      log.resumeSessions.push(log._currentResume);
      delete log._currentResume;
    }

    saveLog(log, activeLogIndex);
    logUpdated = true;
  } else {
    const log = {
      start: formatDateTime(startTime),
      stop: formattedStop,
      duration: elapsed,
      resumeSessions: []
    };
    saveLog(log);
    timerCount++;
    logUpdated = true;
  }

  previousTotalDuration = 0;
  activeLogIndex = null;

  startBtn.textContent = 'Start';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  liveTimer.textContent = '00:00:00';

  if (logUpdated) {
    loadLogs(); 

    const lastLogDiv = document.querySelector('.log:last-child');
    if (lastLogDiv) {
      const arrowContainer = lastLogDiv.querySelector('.arrow-container');
      const logDetails = lastLogDiv.querySelector('.log-details');
      
  
      logDetails.style.display = 'block'; 
      arrowContainer.querySelector('.arrow').classList.add('expanded');  
    }
  }
});


loadLogs();

