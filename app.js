let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGame = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".winner");

let turn0 = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "X";
      turn0 = false;
    } else {
      box.innerText = "O";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    const checkwinner = () => {
      for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerHTML;
        let pos2Value = boxes[pattern[1]].innerHTML;
        let pos3Value = boxes[pattern[2]].innerHTML;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
          if (pos1Value === pos2Value && pos2Value === pos3Value) {
            showWinner(pos1Value);
            return true;
          }
        }
      }
    };

    let isWinner = checkwinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`
  msgContainer.style.display = "block";
  disableboxes();
}

const gameDraw = () => {
  msg.innerText = `Game Draw`
  msgContainer.style.display = "block";
  disableboxes();
}

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


const resetGame = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  count = 0;  // Reset count
  turn0 = true;  // Reset turn
  msgContainer.style.display = "none";
};

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);


