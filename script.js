// let startTime = null;
// let interval = null;
// let timerCount = 1;
// let activeLogIndex = null;
// let previousStop = null;
// let previousDuration = 0;

// const startBtn = document.getElementById('startBtn');
// const stopBtn = document.getElementById('stopBtn');
// const output = document.getElementById('output');
// const liveTimer = document.getElementById('liveTimer');

// function formatTime(ms) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
//   const seconds = String(totalSeconds % 60).padStart(2, '0');
//   return `${hours}:${minutes}:${seconds}`;
// }

// function saveLog(log, index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   if (index !== undefined) logs[index] = log;
//   else logs.push(log);
//   localStorage.setItem('timerLogs', JSON.stringify(logs));
// }

// function deleteLog(index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.splice(index, 1);  
//   localStorage.setItem('timerLogs', JSON.stringify(logs));

//   loadLogs();
// }

// function addLogToDOM(log, index) {
//   const logDiv = document.createElement('div');
//   logDiv.className = 'log';
//   logDiv.innerHTML = `
//     <strong>Timer ${index + 1}</strong>
//     <p class="gap">Start Time: ${log.start}</p>
//     <p class="gap">Stop Time: ${log.stop}</p>
//     <p class="gap">Duration: <span class="duration">${log.duration}</span></p>
//     <button class="deleteBtn">Delete Timer</button>
//   `;
  
//   const deleteBtn = logDiv.querySelector('.deleteBtn');
//   deleteBtn.addEventListener('click', (event) => {
//     event.stopPropagation();  
//     deleteLog(index); 
//   });

//   logDiv.addEventListener('click', () => {
//     document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
//     logDiv.classList.add('active');
//     activeLogIndex = index;

//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const selectedLog = logs[index];

//     previousStop = selectedLog.rawStop;
//     previousDuration = selectedLog.rawDuration;

//     startTime = new Date(); 
//     liveTimer.textContent = formatTime(previousDuration);
//     startBtn.textContent = 'Resume';
//     stopBtn.disabled = true;
//     startBtn.disabled = false;
//   });
  
//   output.appendChild(logDiv);
// }


// function loadLogs() {
//   output.innerHTML = '';
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.forEach((log, index) => addLogToDOM(log, index));
//   timerCount = logs.length;
// }

// startBtn.addEventListener('click', () => {
//   startTime = new Date();

//   startBtn.disabled = true;
//   stopBtn.disabled = false;

//   interval = setInterval(() => {
//     const elapsed = new Date() - startTime;
//     const total = activeLogIndex !== null ? previousDuration + elapsed : elapsed;
//     liveTimer.textContent = formatTime(total);
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   const stopTime = new Date();
//   clearInterval(interval);

//   let totalDuration;
//   if (activeLogIndex !== null) {
//     const newElapsed = stopTime - previousStop;
//     totalDuration = previousDuration + newElapsed;
//   } else {
//     totalDuration = stopTime - startTime;
//   }

//   const formattedDuration = formatTime(totalDuration);

//   if (activeLogIndex !== null) {
//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const log = logs[activeLogIndex];
//     log.stop = stopTime.toLocaleString();
//     log.duration = formattedDuration;
//     log.rawStop = stopTime.getTime();
//     log.rawDuration = totalDuration;
//     saveLog(log, activeLogIndex);
//   } else {
//     const log = {
//       start: startTime.toLocaleString(),
//       stop: stopTime.toLocaleString(),
//       duration: formattedDuration,
//       rawStart: startTime.getTime(),
//       rawStop: stopTime.getTime(),
//       rawDuration: totalDuration
//     };
//     saveLog(log);
//     timerCount++;
//   }

//   previousStop = null;
//   previousDuration = 0;
//   activeLogIndex = null;

//   document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
//   startBtn.textContent = 'Start';
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   liveTimer.textContent = '00:00:00';
//   loadLogs();
// });

// loadLogs();


// this is my code i need to  change some thing in first session the start time substract  by stop time
// in second session the resume start time is substract by resume stop time and that value is added to the previous duration
// i need to also display the resume time


// let startTime = null;
// let interval = null;
// let timerCount = 1;
// let activeLogIndex = null;
// let previousDuration = 0;

// const startBtn = document.getElementById('startBtn');
// const stopBtn = document.getElementById('stopBtn');
// const output = document.getElementById('output');
// const liveTimer = document.getElementById('liveTimer');

// function formatTime(ms) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
//   const seconds = String(totalSeconds % 60).padStart(2, '0');
//   return `${hours}:${minutes}:${seconds}`;
// }

// function saveLog(log, index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   if (index !== undefined) logs[index] = log;
//   else logs.push(log);
//   localStorage.setItem('timerLogs', JSON.stringify(logs));
// }

// function deleteLog(index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.splice(index, 1);
//   localStorage.setItem('timerLogs', JSON.stringify(logs));
//   loadLogs();
// }

// function addLogToDOM(log, index) {
//   const logDiv = document.createElement('div');
//   logDiv.className = 'log';
//   logDiv.innerHTML = `
//     <strong>Timer ${index + 1}</strong>
//     <p class="gap">Start Time: ${log.start}</p>
//     <p class="gap">Stop Time: ${log.stop}</p>
//     <p class="gap">Duration: <span class="duration">${log.duration}</span></p>
//     <button class="deleteBtn">Delete Timer</button>
//   `;

//   if (log.resumeSessions && log.resumeSessions.length > 0) {
//     log.resumeSessions.forEach((session, i) => {
//       const resumeBlock = document.createElement('div');
//       resumeBlock.className = 'gap';
//       resumeBlock.innerHTML = `
//         <strong>Resume ${i + 1}</strong>
//         <p>Start: ${session.resumeStart}</p>
//         <p>Stop: ${session.resumeStop}</p>
//         <p>Duration: ${session.resumeDuration}</p>
//       `;
//       logDiv.appendChild(resumeBlock);
//     });
//   }

//   const deleteBtn = logDiv.querySelector('.deleteBtn');
//   deleteBtn.addEventListener('click', (event) => {
//     event.stopPropagation();
//     deleteLog(index);
//   });

//   logDiv.addEventListener('click', () => {
//     document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
//     logDiv.classList.add('active');
//     activeLogIndex = index;

//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const selectedLog = logs[index];

//     previousDuration = selectedLog.rawDuration || 0;
//     liveTimer.textContent = formatTime(previousDuration);

//     startBtn.textContent = 'Resume';
//     startBtn.disabled = false;
//     stopBtn.disabled = true;
//   });

//   output.appendChild(logDiv);
// }

// function loadLogs() {
//   output.innerHTML = '';
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.forEach((log, index) => addLogToDOM(log, index));
//   timerCount = logs.length;
// }

// startBtn.addEventListener('click', () => {
//   startTime = new Date();

//   if (activeLogIndex !== null) {
//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const log = logs[activeLogIndex];

//     log._currentResume = {
//       rawStart: startTime.getTime(),
//       resumeStart: startTime.toLocaleString()
//     };

//     saveLog(log, activeLogIndex);
//   }

//   startBtn.disabled = true;
//   stopBtn.disabled = false;

//   interval = setInterval(() => {
//     const elapsed = new Date() - startTime;
//     const total = activeLogIndex !== null ? previousDuration + elapsed : elapsed;
//     liveTimer.textContent = formatTime(total);
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   const stopTime = new Date();
//   clearInterval(interval);

//   const elapsed = stopTime - startTime;
//   const totalDuration = previousDuration + elapsed;
//   const formattedDuration = formatTime(totalDuration);
//   const formattedStop = stopTime.toLocaleString();

//   if (activeLogIndex !== null) {
//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const log = logs[activeLogIndex];

//     if (!log.resumeSessions) log.resumeSessions = [];

//     if (log._currentResume) {
//       log._currentResume.resumeStop = formattedStop;
//       log._currentResume.resumeDuration = formatTime(elapsed);
//       log.resumeSessions.push(log._currentResume);
//       delete log._currentResume;
//     }

//     log.stop = formattedStop;
//     log.duration = formattedDuration;
//     log.rawDuration = totalDuration;

//     saveLog(log, activeLogIndex);
//   } else {
//     const log = {
//       start: startTime.toLocaleString(),
//       stop: formattedStop,
//       duration: formattedDuration,
//       rawDuration: totalDuration,
//       resumeSessions: []
//     };
//     saveLog(log);
//     timerCount++;
//   }

//   previousDuration = 0;
//   activeLogIndex = null;

//   startBtn.textContent = 'Start';
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   liveTimer.textContent = '00:00:00';

//   loadLogs();
// });

// loadLogs();


// let startTime = null;
// let interval = null;
// let timerCount = 1;
// let activeLogIndex = null;
// let previousDuration = 0;

// const startBtn = document.getElementById('startBtn');
// const stopBtn = document.getElementById('stopBtn');
// const output = document.getElementById('output');
// const liveTimer = document.getElementById('liveTimer');

// function formatTime(ms) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
//   const seconds = String(totalSeconds % 60).padStart(2, '0');
//   return `${hours}:${minutes}:${seconds}`;
// }

// function formatDateTime(dateObj) {
//   const date = dateObj.toLocaleDateString('en-GB').split('/').join('/');
//   const time = dateObj.toTimeString().split(' ')[0];
//   return `${date}, ${time}`;
// }

// function saveLog(log, index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   if (index !== undefined) logs[index] = log;
//   else logs.push(log);
//   localStorage.setItem('timerLogs', JSON.stringify(logs));
// }

// function deleteLog(index) {
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.splice(index, 1);
//   localStorage.setItem('timerLogs', JSON.stringify(logs));
//   loadLogs();
// }

// function addLogToDOM(log, index) {
//   const logDiv = document.createElement('div');
//   logDiv.className = 'log';
//   logDiv.innerHTML = `
//     <strong>Timer ${index + 1}</strong>
//     <p class="gap">Start : ${log.start}</p>
//     <p class="gap">Stop : ${log.stop}</p>
//     <p class="gap">Duration : <span class="duration">${formatTime(log.rawDuration)}</span></p>
//     <button class="deleteBtn">Delete Timer</button>
//   `;

//   if (log.resumeSessions && log.resumeSessions.length > 0) {
//     log.resumeSessions.forEach((session, i) => {
//       const resumeBlock = document.createElement('div');
//       resumeBlock.className = 'gap';
//       resumeBlock.innerHTML = `
//         <strong>Resume ${i + 1}</strong>
//         <p>Resume Start : ${session.resumeStart}</p>
//         <p>Resume Stop : ${session.resumeStop}</p>
//         <p>Resume Duration : ${formatTime(session.resumeDuration)}</p>
//       `;
//       logDiv.appendChild(resumeBlock);
//     });
//   }

//   const deleteBtn = logDiv.querySelector('.deleteBtn');
//   deleteBtn.addEventListener('click', (event) => {
//     event.stopPropagation();
//     deleteLog(index);
//   });

//   logDiv.addEventListener('click', () => {
//     document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
//     logDiv.classList.add('active');
//     activeLogIndex = index;

//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const selectedLog = logs[index];

//     previousDuration = selectedLog.rawDuration || 0;
//     liveTimer.textContent = formatTime(previousDuration);

//     startBtn.textContent = 'Resume';
//     startBtn.disabled = false;
//     stopBtn.disabled = true;
//   });

//   output.appendChild(logDiv);
// }

// function loadLogs() {
//   output.innerHTML = '';
//   const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//   logs.forEach((log, index) => addLogToDOM(log, index));
//   timerCount = logs.length;
// }

// startBtn.addEventListener('click', () => {
//   startTime = new Date();

//   if (activeLogIndex !== null) {
//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const log = logs[activeLogIndex];

//     log._currentResume = {
//       rawStart: startTime.getTime(),
//       resumeStart: formatDateTime(startTime)
//     };

//     saveLog(log, activeLogIndex);
//   }

//   startBtn.disabled = true;
//   stopBtn.disabled = false;

//   interval = setInterval(() => {
//     const elapsed = new Date() - startTime;
//     const total = activeLogIndex !== null ? previousDuration + elapsed : elapsed;
//     liveTimer.textContent = formatTime(total);
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   const stopTime = new Date();
//   clearInterval(interval);

//   const elapsed = stopTime - startTime;
//   const formattedStop = formatDateTime(stopTime);
//   const totalDuration = previousDuration + elapsed;

//   if (activeLogIndex !== null) {
//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const log = logs[activeLogIndex];

//     if (!log.resumeSessions) log.resumeSessions = [];

//     if (log._currentResume) {
//       log._currentResume.resumeStop = formattedStop;
//       log._currentResume.resumeDuration = elapsed;
//       log.resumeSessions.push(log._currentResume);
//       delete log._currentResume;
//     }

//     if (!log.stop) {
//       log.stop = formattedStop;
//     }

//     log.rawDuration = totalDuration;

//     saveLog(log, activeLogIndex);
//   } else {
//     const log = {
//       start: formatDateTime(startTime),
//       stop: formattedStop,
//       rawDuration: totalDuration,
//       resumeSessions: []
//     };
//     saveLog(log);
//     timerCount++;
//   }

//   previousDuration = 0;
//   activeLogIndex = null;

//   startBtn.textContent = 'Start';
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   liveTimer.textContent = '00:00:00';

//   loadLogs();
// });

// loadLogs();

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
  const totalSeconds = Math.round(ms / 1000); // changed from Math.floor to Math.round
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

// function addLogToDOM(log, index) {
//   const logDiv = document.createElement('div');
//   logDiv.className = 'log';
//   logDiv.innerHTML = `
//     <strong>Timer ${index + 1}</strong>
//     <p class="gap">Start : ${log.start}</p>
//     <p class="gap">Stop : ${log.stop}</p>
//     <p class="gap">Duration : <span class="duration">${formatTime(log.duration)}</span></p>
//   `;

//   if (log.resumeSessions && log.resumeSessions.length > 0) {
//     log.resumeSessions.forEach((session, i) => {
//       const resumeBlock = document.createElement('div');
//       resumeBlock.className = 'gap';
//       resumeBlock.innerHTML = `
//         <strong>Resume ${i + 1}</strong>
//         <p>Resume Start : ${session.resumeStart}</p>
//         <p>Resume Stop : ${session.resumeStop}</p>
//         <p>Resume Duration : ${formatTime(session.resumeDuration)}</p>
//       `;
//       logDiv.appendChild(resumeBlock);
//     });
//   }

//   const totalDuration = log.duration + (log.resumeSessions?.reduce((acc, session) => acc + session.resumeDuration, 0) || 0);

//   const totalBlock = document.createElement('div');
//   totalBlock.className = 'gap';
//   totalBlock.innerHTML = `<strong>Total Time : ${formatTime(totalDuration)}</strong>`;
//   logDiv.appendChild(totalBlock);

//   const deleteBtn = document.createElement('button');
//   deleteBtn.className = 'deleteBtn';
//   deleteBtn.textContent = 'Delete Timer';
//   deleteBtn.addEventListener('click', (event) => {
//     event.stopPropagation();
//     deleteLog(index);
//   });

//   logDiv.appendChild(deleteBtn);

//   logDiv.addEventListener('click', () => {
//     document.querySelectorAll('.log').forEach(el => el.classList.remove('active'));
//     logDiv.classList.add('active');
//     activeLogIndex = index;

//     const logs = JSON.parse(localStorage.getItem('timerLogs')) || [];
//     const selectedLog = logs[index];

//     previousTotalDuration = selectedLog.duration + (selectedLog.resumeSessions?.reduce((acc, session) => acc + session.resumeDuration, 0) || 0);
//     liveTimer.textContent = formatTime(previousTotalDuration);

//     startBtn.textContent = 'Resume';
//     startBtn.disabled = false;
//     stopBtn.disabled = true;
//   });

//   output.appendChild(logDiv);
//}

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
  } else {
    const log = {
      start: formatDateTime(startTime),
      stop: formattedStop,
      duration: elapsed,
      resumeSessions: []
    };
    saveLog(log);
    timerCount++;
  }

  previousTotalDuration = 0;
  activeLogIndex = null;

  startBtn.textContent = 'Start';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  liveTimer.textContent = '00:00:00';

  loadLogs();
});

loadLogs();

function addLogToDOM(log, index) {
  const logDiv = document.createElement('div');
  logDiv.className = 'log';
  logDiv.innerHTML = `
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <strong>Timer ${index + 1}</strong>
    <span class="arrow"> <i class="fa-solid fa-chevron-down arrow"></i></span>
  </div>
  <div class="log-details" style="display: none;">
    <p class="gap">Start: ${log.start}</p>
    <p class="gap">Stop: ${log.stop}</p>
    <p class="gap">Duration: <span class="duration">${formatTime(log.duration)}</span></p>
  </div>
`;


  const arrow = logDiv.querySelector('.arrow');
  const logDetails = logDiv.querySelector('.log-details');

  // This part: Add resumeSessions inside logDetails
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

  // Arrow click to toggle show/hide
  arrow.addEventListener('click', (event) => {
    event.stopPropagation();
    logDetails.style.display = (logDetails.style.display === 'none') ? 'block' : 'none';
  });

  // normal click to select the log
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


