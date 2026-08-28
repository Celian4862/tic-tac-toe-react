import type { SquareType } from "./SquareType";
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
  onPlay: (nextSquares: SquareType) => void;
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
    // Modifying squares here modifies the array in the history array, too, but
    // we only want to add this next array to the array of history
    const nextSquares = { move: currentMove + 1, squares: squares.slice() }; // Shallow copy of squares
    nextSquares.squares[i] = xIsNext ? "X" : "O"; // Safely modify the nextSquares array
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: 3 }, (_, i) => i).map((row) => (
        <div key={row} className="board-row">
          {Array.from({ length: 3 }, (_, i) => i + 3 * row).map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
