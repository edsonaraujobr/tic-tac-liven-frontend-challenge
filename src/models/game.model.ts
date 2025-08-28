export type Player = "X" | "O";

export type Square = Player | null;

export interface GameState {
  currentBoard: Square[];
  stepNumber: number;
  nextPlayer: Player;
  computeMove: (player: Player, squareId: number) => void;
  resetGame: () => void;
}
