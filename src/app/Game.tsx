import { useState } from "react";
import useGameState from "../hooks/use-game-state.hooks";

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ id, value, onClick }: any) {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Board = ({ squares, onSquareClick }: any) => {
  const renderSquare = (squareId: number) => {
    return (
      <Square
        id={squareId}
        value={squares[squareId]}
        onClick={() => onSquareClick(squareId)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const { currentBoard, stepNumber, nextPlayer, computeMove, resetGame } =
    useGameState();
  const [message, setMessage] = useState("");

  const handleSquareClick = (squareId: number) => {
    if (calculateWinner(currentBoard) || stepNumber === 9) {
      resetGame();
      return;
    }
    if (currentBoard[squareId] && stepNumber !== 9) {
      setMessage("This square already chosen.");
      return;
    }
    setMessage("");
    computeMove(nextPlayer, squareId);
  };

  const renderStatusMessage = () => {
    const winner = calculateWinner(currentBoard);
    if (winner) {
      return (
        <>
          {" "}
          Winner: {winner}. <br /> Click any square to start new game.{" "}
        </>
      );
    } else if (stepNumber === 9) {
      return (
        <>
          {" "}
          Draw: Game over. <br /> Click any square to start new game.{" "}
        </>
      );
    } else {
      return <>Next player: {nextPlayer === "X" ? "❌" : "⭕"}</>;
    }
  };

  return (
    <>
      <h1>
        TIC-TAC-LIVEN{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard} onSquareClick={handleSquareClick} />
        </div>
        <div className="game-info">
          <div>Current step: {stepNumber}</div>
          <div>{renderStatusMessage()}</div>
          {message && <div style={{ color: "red" }}>{message}</div>}
        </div>
      </div>
    </>
  );
};

export default Game;
