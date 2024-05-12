const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

const set = document.getElementById("btnS")
const targetTime = new Date(); 
let target = targetTime.getTime();
const display = document.getElementById("start-counter");
const startButton = document.getElementById("btn");

let intervalId;


function t () {
    let hours = parseInt(h.value, 10);
    let minutes = parseInt(m.value, 10);
    let seconds = parseInt(s.value, 10);

    target = 0;
    target = targetTime.getTime();
    
    target = target+convertTimeToMs((isNaN(hours)?0:hours), (isNaN(minutes)? 0: minutes) ,(isNaN(seconds)? 0: seconds));
    
}

function convertTimeToMs(hours, minutes, seconds) {
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0) {
        throw new Error("Invalid input: Please enter valid numbers for hours, minutes, and seconds.");
    }
    
    const milliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    return milliseconds;
}

function updateDisplay() {
    const now = new Date();
    const diff = target-now.getTime();
    let seconds = Math.floor(diff / 1000);

    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    display.textContent = formattedTime;

    if (diff <= 0) {
        clearInterval(intervalId);
        display.textContent = "Time's Up!";
        startButton.disabled = true; 
    }
}

set.addEventListener("click", function(){
    clearInterval(intervalId);
})


startButton.addEventListener("click", function () {
    t();
    intervalId = setInterval(updateDisplay, 1000);
 });
