/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";

type Player = "X" | "O";

const useGameState = (initialPlayer: Player) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState<Player>(initialPlayer);
  const [currentBoard, setCurrentBoard] = useState<(Player | null)[]>(
    Array(9).fill(null)
  );

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
    computeMove
  };
};

export default useGameState;
