window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = Array(9).fill("");
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "Player X Won";
  const PLAYERO_WON = "Player O Won";
  const TIE = "TIE";

  /**
   * BOARD INDEXES
   *
   *  [0] [1] [2]
   *  [3] [4] [5]
   *  [6] [7] [8]
   */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const winningCondition = winningConditions[i];
      const a = board[winningCondition[0]];
      const b = board[winningCondition[1]];
      const c = board[winningCondition[2]];

      if (a === "" || b === "" || c === "") continue;

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = "Player <span class='playerO'>O</span> won!";
        break;

      case PLAYERX_WON:
        announcer.innerHTML = "Player <span class='playerX'>X</span> won!";
        break;

      case TIE:
        announcer.innerHTML = "Tie!";
        break;
    }

    announcer.classList.remove("hide");
  };

  const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "o") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (!isValidAction(tile) || !isGameActive) return false;

    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  };

  const resetBoard = () => {
    board = Array(9).fill("");
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") changePlayer();

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });

  resetButton.addEventListener("click", resetBoard);
});
