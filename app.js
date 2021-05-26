// initialize gameboard
const gameBoard = (() => {
  const renderBoard = (turnHistory) => {
    const squares = document.getElementsByClassName("square");
    turnHistory.forEach((turn) => {
      const squareId = turn.square;
      squares[squareId].innerHTML = turn.value;
    });
  };
  return { renderBoard };
})();

const playerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};

let Player1 = "";
let Player2 = "";

// gameboard controller
const gameController = (() => {
  const form = document.getElementById("startForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const player1Name = document.getElementById("player1Name").value
      ? document.getElementById("player1Name").value
      : "Player 1";
    const player2Name = document.getElementById("player2Name").value
      ? document.getElementById("player2Name").value
      : "Player 1";
    Player1 = playerFactory(player1Name, "X");
    Player2 = playerFactory(player2Name, "O");
    form.setAttribute("style", "display:none");
    document.getElementById("board").setAttribute("style", "display:grid");
  });

  //initialize the game board with values
  const turnHistory = [
    { square: 0, value: "" },
    { square: 1, value: "" },
    { square: 2, value: "" },
    { square: 3, value: "" },
    { square: 4, value: "" },
    { square: 5, value: "" },
    { square: 6, value: "" },
    { square: 7, value: "" },
    { square: 8, value: "" },
  ];

  //initialize the current player
  let player1Turn = true;

  // fire an action when users click a square
  for (let i = 0; i < 9; i++) {
    document.getElementById(`square${i}`).addEventListener("click", () => {
      // do something when user clicks
      addTurn(i, player1Turn ? Player1.getMark() : Player2.getMark());

      // swap whos turn it is
      player1Turn = !player1Turn;

      //render the board
      gameBoard.renderBoard(turnHistory);

      //check for a winner
      checkForWinner();
    });
  }

  // set a squares value
  const addTurn = (square, mark) => {
    // find targeted square
    const targetSquare = turnHistory.find((turn) => turn.square == square);
    // ensure square is blank, if so - update the value
    if (!targetSquare.value) {
      targetSquare.value = mark;
    }
  };

  // calculate winner
  const checkForWinner = () => {
    const player1Moves = turnHistory
      .filter((turn) => turn.value === "X")
      .map((turn) => turn.square);

    const player2Moves = turnHistory
      .filter((turn) => turn.value === "O")
      .map((turn) => turn.square);

    const numTurns = turnHistory.filter((turn) => turn.value);
    console.log(numTurns.length);
    const checkMoves = (player, moves) => {
      const alertWinner = () =>
        setTimeout(() => alert(`${player} has won the game!`), 200);
      if (
        (moves.includes(0) && moves.includes(1) && moves.includes(2)) ||
        (moves.includes(3) && moves.includes(4) && moves.includes(5)) ||
        (moves.includes(6) && moves.includes(7) && moves.includes(8)) ||
        (moves.includes(0) && moves.includes(4) && moves.includes(8)) ||
        (moves.includes(2) && moves.includes(4) && moves.includes(6))
      ) {
        alertWinner();
      } else if (numTurns.length === 9) {
        setTimeout(() =>
          alert("Game ends in tie! Better luck next time guys.", 200)
        );
      }
    };
    checkMoves(Player1.getName(), player1Moves);
    checkMoves(Player2.getName(), player2Moves);
  };

  return { turnHistory };
})();
