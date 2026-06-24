import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MovieList from "./components/movies/MovieList";
import MovieModal from "./components/MovieModal";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [view, setView] = useState("search"); // "search" | "watched"

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-background-900)] text-[var(--color-text)]">
      
      {/* Sidebar */}
      <Sidebar
        view={view}
        setView={setView}
        watchedCount={watched.length}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🍿</span>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Heed<span className="text-[var(--color-primary-light)]">Movies</span>
            </h1>
          </div>
          <Search query={query} setQuery={setQuery} />
        </div>

        {/* Results count */}
        {query.length >= 3 && !isLoading && !error && view === "search" && (
          <p className="text-sm text-[var(--color-text-dark)] mb-4 tracking-wide">
            Found <strong className="text-[var(--color-text)]">{movies.length}</strong> results for{" "}
            <strong className="text-[var(--color-text)]">"{query}"</strong>
          </p>
        )}

        {/* Content area */}
        {view === "search" ? (
          <>
            {isLoading && <Loader />}
            {!isLoading && !error && query.length >= 3 && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {!isLoading && !error && query.length < 3 && (
              <div className="flex flex-col items-center justify-center flex-1 gap-3 opacity-30">
                <span className="text-7xl">🎬</span>
                <p className="text-lg tracking-widest uppercase">Search for a movie</p>
              </div>
            )}
            {error && <ErrorMessage message={error} />}
          </>
        ) : (
          // Watched view
          <div className="flex flex-col gap-4">
            {watched.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-3 opacity-30 mt-20">
                <span className="text-7xl">👁</span>
                <p className="text-lg tracking-widest uppercase">No movies watched yet</p>
              </div>
            ) : (
              <MovieList
                movies={watched.map((m) => ({
                  imdbID: m.imdbID,
                  Title: m.title,
                  Poster: m.poster,
                  Year: m.year,
                  userRating: m.userRating,
                  imdbRating: m.imdbRating,
                  runtime: m.runtime,
                }))}
                onSelectMovie={handleSelectMovie}
                isWatchedView
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            )}
          </div>
        )}
      </main>

      {/* Movie modal */}
      {selectedId && (
        <MovieModal
          selectedId={selectedId}
          onCloseMovie={handleCloseMovie}
          onAddWatched={handleAddWatched}
          watched={watched}
        />
      )}
    </div>
  );
}