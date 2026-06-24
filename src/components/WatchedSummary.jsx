const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div
      className="
        px-8 py-5
        bg-[var(--color-background-100)]
        rounded-xl
        shadow-lg
      "
    >
      <h2 className="uppercase text-sm font-semibold tracking-widest text-[var(--color-text-dark)] mb-3">
        Movies you watched
      </h2>
      <div className="flex items-center gap-6 text-base font-semibold">
        <p className="flex items-center gap-2">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}