import { useState, useEffect, useRef } from "react";
import StarRating from "../StarRating";
import Loader from "../Loader";
import { useKey } from "../../hooks/useKey";

const KEY = import.meta.env.VITE_OMDB_KEY;

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  watched,
  watchlist,
  onAddToWatchlist,
  onMoveToWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);
  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const isInWatchlist = watchlist.map((m) => m.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
  } = movie;

  function handleAddToWatchlist() {
  const newWatchlistMovie = {
    imdbID: selectedId,
    title,
    poster,
    year,
  };
  onAddToWatchlist(newWatchlistMovie);
  onCloseMovie();
}

function handleMarkWatched() {
  const newWatchedMovie = {
    imdbID: selectedId,
    title,
    poster,
    year,
    runtime: Number(runtime.split(" ")[0]),
    userRating,
    imdbRating: Number(imdbRating),
    countRatingDecisions: countRef.current,
  };
  onMoveToWatched(newWatchedMovie);
  onCloseMovie();
}

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    const controller = new AbortController();
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
    return () => controller.abort();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title} | Heed Movies`;
    return () => {
      document.title = "Heed Movies";
    };
  }, [title]);

  return (
    <div className="text-sm leading-relaxed overflow-y-auto h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          <header className="flex relative">
            <button
              onClick={onCloseMovie}
              className="
                absolute top-2 left-2
                w-8 h-8 rounded-full
                bg-white text-[var(--color-background-500)]
                text-2xl font-bold
                flex items-center justify-center
                cursor-pointer border-none
                shadow-lg z-10
                transition-all duration-200
                hover:scale-110
              ">
              &larr;
            </button>
            <img
              src={poster}
              alt={`${title} poster`}
              className="w-1/3"
            />
            <div className="flex-1 flex flex-col gap-3 p-6 bg-[var(--color-background-100)]">
              <h2 className="text-2xl font-bold leading-tight">{title}</h2>
              <p className="text-[var(--color-text-dark)] text-sm">
                {released} &bull; {runtime}
              </p>
              <p className="text-[var(--color-text-dark)] text-sm">{genre}</p>
              <p className="flex items-center gap-1 font-semibold">
                <span>🌟</span>
                <span>{imdbRating} IMDb rating</span>
              </p>
            </div>
          </header>

          {/* Section */}
          <section className="flex flex-col gap-4 p-8">
            <div className="bg-[var(--color-background-100)] rounded-xl p-5 flex flex-col gap-4 items-center font-semibold">
              {isWatched ? (
                // Already watched and rated
                <p className="text-[var(--color-text-dark)]">
                  You rated this movie {watchedUserRating} 🌟
                </p>
              ) : isInWatchlist ? (
                // In watchlist — show rating UI to mark as watched
                <>
                  <StarRating maxRating={10} size={20} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button
                      onClick={handleMarkWatched}
                      className="
                        bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)]
                        text-[var(--color-text)]
                        border-none rounded-full
                        px-6 py-2 text-sm font-bold
                        cursor-pointer transition-all duration-300
                      "
                    >
                      ✓ Mark as Watched
                    </button>
                  )}
                </>
              ) : (
                // New movie — show add to watchlist button
                <button
                  onClick={handleAddToWatchlist}
                  className="
                    bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)]
                    text-[var(--color-text)]
                    border-none rounded-full
                    px-6 py-2 text-sm font-bold
                    cursor-pointer transition-all duration-300
                  "
                >
                  + Add to Watchlist
                </button>
              )}
            </div>
            <p className="text-[var(--color-text-dark)]">
              <strong className="text-[var(--color-text)]">Plot</strong> —{" "}
              {plot}
            </p>
            <p className="text-[var(--color-text-dark)]">
              <strong className="text-[var(--color-text)]">Starring</strong>{" "}
              {actors}
            </p>
          </section>
        </>
      )}
    </div>
  );
}