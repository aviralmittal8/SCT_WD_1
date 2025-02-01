let minute = 0, second = 0, millisecond = 0;
let timer;
let isRunning = false;

const minuteDisplay = document.querySelector(".minute");
const secondDisplay = document.querySelector(".sec");
const millisecondDisplay = document.querySelector(".msec");

const startButton = document.querySelector(".button:nth-child(2)");
const resetButton = document.querySelector(".button:nth-child(1)");
const lapButton = document.querySelector(".button:nth-child(3)");
const clearLapButton = document.querySelector(".lap-clear");
const lapsContainer = document.querySelector(".laps");
const modeToggle = document.querySelector(".mode-toggle");
const body = document.body;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = "Pause";
        timer = setInterval(updateTime, 10);
    } else {
        isRunning = false;
        startButton.textContent = "Start";
        clearInterval(timer);
    }
}

function updateTime() {
    millisecond += 10;
    if (millisecond >= 1000) {
        millisecond = 0;
        second++;
    }
    if (second >= 60) {
        second = 0;
        minute++;
    }

    minuteDisplay.textContent = formatTime(minute) + " :";
    secondDisplay.textContent = " " + formatTime(second) + " :";
    millisecondDisplay.textContent = " " + formatMilliseconds(millisecond);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Start";
    minute = second = millisecond = 0;
    updateDisplay();
}

function updateDisplay() {
    minuteDisplay.textContent = "00 :";
    secondDisplay.textContent = " 00 :";
    millisecondDisplay.textContent = " 00";
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function formatMilliseconds(time) {
    return time < 100 ? "0" + Math.floor(time / 10) : Math.floor(time / 10);
}

function addLap() {
    if (!isRunning) return;

    const lapItem = document.createElement("li");
    lapItem.classList.add("lapitem");

    const lapNumber = document.createElement("span");
    lapNumber.classList.add("number");
    lapNumber.textContent = "#" + (lapsContainer.children.length + 1);

    const timeStamp = document.createElement("span");
    timeStamp.classList.add("time-stamp");
    timeStamp.textContent = formatTime(minute) + ":" + formatTime(second) + ":" + formatMilliseconds(millisecond);

    lapItem.appendChild(lapNumber);
    lapItem.appendChild(timeStamp);
    lapsContainer.appendChild(lapItem);
}

function clearLaps() {
    lapsContainer.innerHTML = "";
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modeToggle.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

startButton.addEventListener("click", startStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", addLap);
clearLapButton.addEventListener("click", clearLaps);
