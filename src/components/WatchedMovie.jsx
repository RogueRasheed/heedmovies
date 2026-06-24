export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li
      className="
        relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto]
        gap-x-6 items-center
        px-8 py-4
        border-b border-[var(--color-background-100)]
      "
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="w-full row-span-2 rounded"
      />
      <h3 className="text-lg font-semibold text-[var(--color-text)]">
        {movie.title}
      </h3>
      <div className="flex items-center gap-6 text-sm text-[var(--color-text-dark)]">
        <p className="flex items-center gap-1">
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-1">
          <span>🌟</span>
          <span>{movie.userRating.toFixed(1)}</span>
        </p>
        <p className="flex items-center gap-1">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        onClick={() => onDeleteWatched(movie.imdbID)}
        className="
          absolute right-6
          w-7 h-7 rounded-full
          bg-[var(--color-red)] hover:bg-[var(--color-red-dark)]
          text-[var(--color-background-900)]
          text-sm font-bold
          border-none cursor-pointer
          transition-all duration-300
          flex items-center justify-center
        "
      >
        &times;
      </button>
    </li>
  );
}