let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Animate score number change smoothly
function animateScore(element, start, end) {
  let current = start;
  const stepTime = 30; // ms
  const increment = end > start ? 1 : -1;
  if (start === end) return;
  const timer = setInterval(() => {
    current += increment;
    element.innerText = current;
    if (current === end) clearInterval(timer);
  }, stepTime);
}

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "😐 It's a Draw! Try again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    const oldScore = userScore;
    userScore++;
    animateScore(userScorePara, oldScore, userScore);
    msg.innerText = `🎉 You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  } else {
    const oldScore = compScore;
    compScore++;
    animateScore(compScorePara, oldScore, compScore);
    msg.innerText = `😞 You lost. ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    choice.classList.add("active");
    setTimeout(() => choice.classList.remove("active"), 500);
    playGame(userChoice);
  });

  // Accessibility: allow keyboard enter/space to select
  choice.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choice.click();
    }
  });
});
