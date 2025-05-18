 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rock Paper Scissors Game</title>
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js" defer></script>
  <script src="app.js" defer></script>
</head>
<body>
  <h1>Rock Paper Scissors</h1>
  <div class="choices">
    <div class="choice" id="rock" tabindex="0">
      <img src="rock.png" alt="Rock" />
    </div>
    <div class="choice" id="paper" tabindex="0">
      <img src="paper.png" alt="Paper" />
    </div>
    <div class="choice" id="scissors" tabindex="0">
      <img src="scissors.png" alt="Scissors" />
    </div>
  </div>
  <div class="score-board">
    <div class="score">
      <p id="user-score">0</p>
      <p>You</p>
    </div>
    <div class="score">
      <p id="comp-score">0</p>
      <p>Comp</p>
    </div>
  </div>
  <div class="msg-container">
    <p id="msg">Play your move</p>
  </div>
</body>
</html>
/* Reset and center text */
* {
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  /* Gradient from light beige to soft pink */
  background: linear-gradient(135deg, #DFD0B8, #F7C1D1);
  font-family: Arial, sans-serif;
  min-height: 100vh;
  margin: 0;
}



h1 {
  background-color: #DA6C6C;
  color: #222831;
  height: 5rem;
  line-height: 5rem;
  font-size: 2.5rem;
  font-weight: bold;
}

/* Choices container */
.choices {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 5rem;
}


.choice {
  height: 165px;
  width: 165px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.choice:hover {
  cursor: pointer;
  background: linear-gradient(45deg, #ed1ce3, #DA6C6C);
}



img {
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
}


.choice:hover img {
  transform: scale(1.1);
}


.score-board {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 3rem;
  gap: 5rem;
}

/* Score numbers */
#user-score,
#comp-score {
  font-size: 4rem;
}

/* Message container */
.msg-container {
  margin-top: 5rem;
}

/* Message box */
#msg {
  background-color: #081b31;
  color: #fff;
  font-size: 2rem;
  display: inline;
  padding: 1rem 2rem;
  border-radius: 1rem;
  max-width: 90vw;
  word-wrap: break-word;
}


@media (max-width: 900px) {
  /* Reduce gaps on medium screens */
  .choices {
    gap: 2rem;
    margin-top: 3rem;
  }

  .choice {
    width: 130px;
    height: 130px;
  }

  img {
    width: 115px;
    height: 115px;
  }

  .score-board {
    gap: 3rem;
    font-size: 1.5rem;
  }

  #user-score,
  #comp-score {
    font-size: 3rem;
  }

  #msg {
    font-size: 1.6rem;
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 600px) {
  
  .choices {
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  .choice {
    width: 120px;
    height: 120px;
  }

  img {
    width: 100px;
    height: 100px;
  }

  .score-board {
    flex-direction: column;
    gap: 1.5rem;
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  #user-score,
  #comp-score {
    font-size: 3rem;
  }

  h1 {
    font-size: 2rem;
    height: auto;
    line-height: 2.5rem;
    padding: 1rem 0;
  }

  #msg {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }
}
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


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


  choice.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choice.click();
    }
  });
});
