let btnRef = document.querySelectorAll(".board__cell");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".popup__restart-btn");
let restartBtn = document.querySelector(".game-restart-btn");
let msgRef = document.getElementById("message");

let winSound = document.getElementById("winSound");
let xMoveSound = document.getElementById("xMoveSound");
let oMoveSound = document.getElementById("oMoveSound");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");

  // Pause the winning sound
  winSound.pause();
  winSound.currentTime = 0;
};

const playWinSound = () => {
  winSound.play();
};

const playMoveSound = () => {
  if (xTurn) {
    xMoveSound.play();
  } else {
    oMoveSound.play();
  }
};

const createSparkle = () => {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle"); // Add the 'sparkle' class
  document.body.appendChild(sparkle);

  // Random position on the screen
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";

  // Remove the sparkle element after the animation
  sparkle.addEventListener("animationend", () => {
    sparkle.remove();
  });
};

const winFunction = (letter) => {
  disableButtons();
  playWinSound();
  createSparkle(); // Trigger sparkle animation
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    playMoveSound();
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.disabled = true;
    }

    count += 1;
    if (count == 9) {
      drawFunction();
    }

    winChecker();
  });
});

window.onload = enableButtons;
