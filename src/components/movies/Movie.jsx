export default function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      className="
  grid grid-cols-[5rem_1fr] grid-rows-[auto_auto]
  gap-x-5 items-center
  px-6 py-4
  h-24
  cursor-pointer
  transition-all duration-300
  hover:bg-[var(--color-background-100)]
"
    >
      {movie.Poster && movie.Poster !== "N/A" ? (
  <img
    src={movie.Poster}
    alt={`${movie.Title} poster`}
    className="w-full h-full object-cover row-span-2 rounded"
  />
) : (
  <div className="w-full h-full row-span-2 rounded bg-[var(--color-background-100)] flex items-center justify-center text-2xl">
    🎬
  </div>
)}
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