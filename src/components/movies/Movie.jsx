export default function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      className="
        grid grid-cols-[4rem_1fr] grid-rows-[auto_auto]
        gap-x-6 items-center
        px-8 py-4
        border-b border-[var(--color-background-100)]
        cursor-pointer
        transition-all duration-300
        hover:bg-[var(--color-background-100)]
      "
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full row-span-2 rounded"
      />
      <h3 className="text-lg font-semibold text-[var(--color-text)]">
        {movie.Title}
      </h3>
      <div className="flex items-center gap-4">
        <p className="flex items-center gap-1 text-sm text-[var(--color-text-dark)]">
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}