import { useState } from "react";

// Custom modules
import type { SquareType } from "./SquareType";
import Board from "./Board";
import SortButton from "./SortButton";

export default function Game() {
  const [history, setHistory] = useState<Array<SquareType>>([
    { move: 0, squares: Array(9).fill(null) },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  // Boolean sortSetting:
  //  - True is ascending order
  //  - False is descending order
  const [sortSetting, setSortSetting] = useState<boolean>(true);
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
        <SortButton
          sortSetting={sortSetting}
          onSort={() => setSortSetting(!sortSetting)}
        />
        <ol>
          {historyCopy.map((history_i) => (
            <li key={history_i.move}>
              {history_i.move === currentMove ? (
                history_i.move === 0 ? (
                  "You are at game start"
                ) : (
                  "You are at move #" + history_i.move
                )
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
