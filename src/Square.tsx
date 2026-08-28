export default function Square({
  value,
  winner,
  onSquareClick,
}: {
  value: string | null;
  winner: boolean;
  onSquareClick: () => void;
}) {
  return (
    <button
      className={"square" + (winner ? " winner" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
