import { useLocalStorageState } from "./useLocalStorageState";

export function useWatchlist() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [watchlist, setWatchlist] = useLocalStorageState([], "watchlist");

  function addToWatchlist(movie) {
    setWatchlist((watchlist) => [...watchlist, movie]);
  }

  function removeFromWatchlist(id) {
    setWatchlist((watchlist) => watchlist.filter((movie) => movie.imdbID !== id));
  }

  function addWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function deleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function moveToWatched(movie) {
    setWatchlist((watchlist) => watchlist.filter((m) => m.imdbID !== movie.imdbID));
    setWatched((watched) => [...watched, movie]);
  }

 

  return {
    watched,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    addWatched,
    deleteWatched,
    moveToWatched,
  };
}