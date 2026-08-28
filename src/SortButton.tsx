export default function SortButton({
  sortSetting,
  onSort,
}: {
  sortSetting: boolean;
  onSort: () => void;
}) {
  return (
    <button className="sort" onClick={onSort}>
      Sort moves {sortSetting ? "⬇" : "⬆"}
    </button>
  );
}
