const instruction = document.getElementById("instruction");
const circle = document.getElementById("breathing-circle");
const startBtn = document.getElementById("start-btn");
const leftBar = document.getElementById("left-bar");
const rightBar = document.getElementById("right-bar");

// Create fill divs
const leftFill = document.createElement("div");
leftFill.classList.add("bar-fill");
leftFill.id = "left-fill";

const rightFill = document.createElement("div");
rightFill.classList.add("bar-fill");
rightFill.id = "right-fill";

// Append fills to bars
leftBar.appendChild(leftFill);
rightBar.appendChild(rightFill);

// Breathing cycle logic
let cycle = 0;
const maxCycles = 3;

function breathe() {
  if (cycle >= maxCycles) {
    instruction.textContent = "Well done! You’ve completed the breathing exercise.";
    startBtn.disabled = false;
    return;
  }

  // Step 1: Breathe In - Circle grows bigger
  instruction.textContent = "Breathe In...";
  circle.style.transform = "scale(1)";  // Grow bigger
  leftFill.style.height = "100%";   
  rightFill.style.height = "0%";    

  setTimeout(() => {
    // Step 2: Hold - Circle stays the same size
    instruction.textContent = "Hold...";
    circle.style.transform = "scale(1)";  // Stay same
    leftFill.style.height = "50%";   
    rightFill.style.height = "50%";  

    setTimeout(() => {
      // Step 3: Breathe Out - Circle shrinks
      instruction.textContent = "Breathe Out...";
      circle.style.transform = "scale(0.5)";  // Shrink smaller
      leftFill.style.height = "0%";   
      rightFill.style.height = "100%"; 

      setTimeout(() => {
        cycle++;
        breathe(); // next cycle
      }, 4000); // Breathe Out duration
    }, 4000); // Hold duration
  }, 4000); // Breathe In duration
}


startBtn.addEventListener("click", () => {
  cycle = 0;
  startBtn.disabled = true;
  instruction.textContent = "Here we go...";

  // Countdown before breathing starts
  let countdown = 3;

  const countdownInterval = setInterval(() => {
    instruction.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      breathe();  // Start breathing cycle
    }
  }, 1000); // 1 second per count
});

