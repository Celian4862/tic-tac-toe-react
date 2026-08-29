import { useState } from "react";

// Custom modules
import type { HistoryType } from "./HistoryType";
import Board from "./Board";
import SortButton from "./SortButton";

export default function Game() {
  const [history, setHistory] = useState<Array<HistoryType>>([
    { move: 0, clickedIndex: -1, squares: Array(9).fill(null) },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  // Boolean sortSetting:
  //  - True is ascending order
  //  - False is descending order
  const [sortSetting, setSortSetting] = useState<boolean>(true);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={currentMove % 2 === 0}
          squares={history[currentMove].squares}
          currentMove={currentMove}
          onPlay={(nextSquares: HistoryType) => {
            const nextHistory = [
              ...history.slice(0, currentMove + 1),
              nextSquares,
            ];
            setHistory(nextHistory);
            setCurrentMove(nextHistory.length - 1);
          }}
        />
      </div>
      <div className="board-info">
        <SortButton
          sortSetting={sortSetting}
          onSort={() => setSortSetting(!sortSetting)}
        />
        <ol>
          {/* SquareType[] copy of history:
               - Same array reference as history if ascending
               - Reversed copy of the array if descending
               - Array.prototype.reverse is destructive, which would make it
                 harder to give the currentSquares hook the correct array of
                 squares */}
          {(sortSetting ? history : history.toReversed()).map((history_i) => {
            const formattedMove = [
              `move #${history_i.move} `,
              `(${Math.floor(history_i.clickedIndex / 3) + 1}, `,
              `${(history_i.clickedIndex % 3) + 1})`,
            ].join("");
            return (
              <li key={history_i.move}>
                {history_i.move === currentMove ? (
                  history_i.move === 0 ? (
                    "You are at game start"
                  ) : (
                    `You are at ${formattedMove}`
                  )
                ) : (
                  <button onClick={() => setCurrentMove(history_i.move)}>
                    {history_i.move > 0
                      ? `Go to ${formattedMove}`
                      : "Go to game start"}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
