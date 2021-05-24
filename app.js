// initialize gameboard
const gameBoard = (() => {
  const renderBoard = (turnHistory) => {
    const squares = document.getElementsByClassName("square");
    turnHistory.forEach((turn, index) => {
      const squareId = turn.square;
      squares[squareId].innerHTML = turn.value;
    });
  };
  return { renderBoard };
})();

const gameController = (() => {
  const turnHistory = [];
  for (let i = 0; i < 9; i++) {
    document.getElementById(`square${i}`).addEventListener("click", () => {
      // do something when user clicks
      if (turnHistory.length % 2 === 0) {
        addTurn(i, "X");
      } else {
        addTurn(i, "O");
      }
      gameBoard.renderBoard(turnHistory);
    });
  }

  const addTurn = (square, value) => {
    turnHistory.push({ square, value });
    console.log(turnHistory.length);
  };

  return { turnHistory };
})();

const Player = (name) => {
  const getName = () => name;
  const turn = (square, value) => {};
};

// gameBoard.renderBoard(gameController.turnHistory);
