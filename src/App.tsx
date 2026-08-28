import { useState } from "react";

type SquareType = {
  move: number;
  squares: Array<string | null>;
};

function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({
  xIsNext,
  squares,
  currentMove,
  onPlay,
}: {
  xIsNext: Boolean;
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

function Sort({
  sortSetting,
  onSort,
}: {
  sortSetting: Boolean;
  onSort: () => void;
}) {
  return (
    <button className="sort" onClick={onSort}>
      Sort moves {sortSetting ? "⬇" : "⬆"}
    </button>
  );
}

function App() {
  const [history, setHistory] = useState<Array<SquareType>>([
    { move: 0, squares: Array(9).fill(null) },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  // Boolean sortSetting:
  //  - True is ascending order
  //  - False is descending order
  const [sortSetting, setSortSetting] = useState<Boolean>(true);
  // SquareType[] historyCopy:
  //  - Same array reference as history if ascending
  //  - Reversed copy of the array if descending
  //  - Array.prototype.reverse is destructive, which would make it harder to
  //    give the currentSquares hook the correct array of squares
  const historyCopy = sortSetting ? history : history.toReversed();

  function handlePlay(nextSquares: SquareType) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      <div className="board-info">
        <Sort
          sortSetting={sortSetting}
          onSort={() => setSortSetting(!sortSetting)}
        />
        <ol>
          {historyCopy.map((history_i) => (
            <li key={history_i.move}>
              {history_i.move === currentMove ? (
                "You are at move #" + history_i.move
              ) : (
                <button onClick={() => jumpTo(history_i.move)}>
                  {history_i.move > 0
                    ? "Go to move #" + history_i.move
                    : "Go to game start"}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
