import Movie from "./Movie";
import WatchedMovie from "./WatchedMovie";

export default function MovieList({
  movies,
  onSelectMovie,
  isWatchedView = false,
  watched = [],
  onDeleteWatched,
}) {
  return (
    <ul className="list-none flex flex-col divide-y divide-[var(--color-background-100)]">
      {movies?.map((movie) =>
        isWatchedView ? (
          <WatchedMovie
            key={movie.imdbID}
            movie={watched.find((w) => w.imdbID === movie.imdbID)}
            onDeleteWatched={onDeleteWatched}
            onSelectMovie={onSelectMovie}
          />
        ) : (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        )
      )}
    </ul>
  );
}