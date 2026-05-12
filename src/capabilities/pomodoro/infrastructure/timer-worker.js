let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;
  isRunning = true;

  const { activeTask, secondsRemaining } = event.data;
  if (!activeTask) return;

  const endDate = activeTask.startDate + secondsRemaining * 1_000;
  let countDownSeconds = Math.ceil((endDate - Date.now()) / 1_000);

  function tick() {
    self.postMessage(countDownSeconds);
    countDownSeconds = Math.floor((endDate - Date.now()) / 1_000);
    setTimeout(tick, 1_000);
  }

  tick();
};
