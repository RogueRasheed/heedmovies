export default function WatchedMovie({ movie, onDeleteWatched, onSelectMovie }) {
  return (
    <li className="
      relative flex items-center gap-4
      px-4 py-3
      hover:bg-[var(--color-background-100)]
      transition-all duration-200
      cursor-pointer
      rounded-xl
    "
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="w-12 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-dark)]">
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
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteWatched(movie.imdbID);
        }}
        className="
          w-7 h-7 rounded-full shrink-0
          bg-[var(--color-red)] hover:bg-[var(--color-red-dark)]
          text-white text-sm font-bold
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