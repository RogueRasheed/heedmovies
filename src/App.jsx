import { useState } from "react";
import Sidebar from "./components/navigation/Sidebar";
import MovieList from "./components/movies/MovieList";
import MovieModal from "./components/movies/MovieModal";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Navbar from "./components/navigation/Navbar";

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
    <div className="flex min-h-screen bg-(--color-background-900) text-(--color-text)">
      
      {/* Sidebar */}
      <Sidebar
        view={view}
        setView={setView}
        watchedCount={watched.length}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col px-12 py-4 overflow-y-auto">
        
        {/* Header */}
              <Navbar query={query} setQuery={setQuery} />
        {/* Results count */}
        {query.length >= 3 && !isLoading && !error && view === "search" && (
          <p className="text-sm text-[var(--color-text-dark)] mb-4 tracking-wide">
            Found <strong className="text-[var(--color-text)]">{movies.length}</strong> results for{" "}
            <strong className="text-[var(--color-text)]">"{query}"</strong>
          </p>
        )}

        {/* Content area */}
        {view === "search" ? (
  <div className="bg-[var(--color-background-500)] rounded-2xl flex-1 overflow-hidden flex flex-col">
    {isLoading && <Loader />}
    {!isLoading && !error && query.length >= 3 && (
      <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
    )}
    {!isLoading && !error && query.length < 3 && (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 opacity-40">
        <span className="text-9xl">🎬</span>
        <p className="text-2xl tracking-widest uppercase font-semibold">Search for a movie</p>
      </div>
    )}
    {error && <ErrorMessage message={error} />}
  </div>
) : (
  <div className="bg-[var(--color-background-500)] rounded-2xl flex-1 overflow-hidden flex flex-col">
    {watched.length === 0 ? (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 opacity-40">
        <span className="text-9xl">👁</span>
        <p className="text-2xl tracking-widest uppercase font-semibold">No movies watched yet</p>
      </div>
    ) : (
      <MovieList
        movies={watched.map((m) => ({
          imdbID: m.imdbID,
          Title: m.title,
          Poster: m.poster,
          Year: m.year,
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