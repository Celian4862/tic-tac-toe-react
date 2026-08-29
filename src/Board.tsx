import type { HistoryType } from "./HistoryType";
import Square from "./Square";
import calculateWinner from "./calculateWinner";

export default function Board({
  xIsNext,
  squares,
  currentMove,
  onPlay,
}: {
  xIsNext: boolean;
  squares: Array<string | null>;
  currentMove: number;
  onPlay: (nextSquares: HistoryType) => void;
}) {
  /**
   *
   * @param i The square number
   * @returns Void
   */
  function handleClick(i: number) {
    // If the game is already won, or if the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return; // Do nothing
    }
    // Shallow copy of squares
    const nextSquares = {
      move: currentMove + 1,
      clickedIndex: i,
      squares: squares.slice(),
    };
    // Safely modify the nextSquares array
    nextSquares.squares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  return (
    <>
      <div className="status">
        {winner === null
          ? "Next player: " + (xIsNext ? "X" : "O")
          : winner.winner === "Draw"
            ? "Draw"
            : "Winner: " + winner.winner}
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((i) => {
            const cellIndex = i + 3 * row;
            return (
              <Square
                key={cellIndex}
                value={squares[cellIndex]}
                winner={winner?.line?.includes(cellIndex) ?? false}
                onSquareClick={() => handleClick(cellIndex)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
