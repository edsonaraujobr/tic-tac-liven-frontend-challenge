import { useState } from "react";
import { GameState, Player, Square } from "../models/player.model";

const useGameState = (): GameState => {
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState<Player>("X");
  const [currentBoard, setCurrentBoard] = useState<(Square | null)[]>(
    Array(9).fill(null)
  );

  const resetGame = () => {
    setStepNumber(0);
    setCurrentBoard(Array(9).fill(null));
  };

  const computeMove = (player: Player, squareId: any) => {
    if (currentBoard[squareId]) {
      return;
    }

    const newBoard = [...currentBoard];
    newBoard[squareId] = player;
    setCurrentBoard(newBoard);

    setNextPlayer(player === "X" ? "O" : "X");

    setStepNumber((prev) => prev + 1);
  };

  return {
    nextPlayer,
    stepNumber,
    currentBoard,
    computeMove,
    resetGame
  };
};

export default useGameState;
