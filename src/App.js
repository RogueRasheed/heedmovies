import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY = '1dd8af34';


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error } = useMovies(query);

    const [watched, setWatched] = useLocalStorageState([]);

 
   function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  
  }
  function handleCloseMovie() {
    setSelectedId(null);  
  }
   
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    //localStorage.setItem('watched', JSON.stringify( [...watched, movie]));
  }


  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id ));
  }
   
  
   
  return (
    <>
     <NavBar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
     </NavBar>
    
     <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && 
          (<MovieList movies={movies} onSelectMovie={handleSelectMovie} />)}
          {error && <ErrorMessage message={error} />}
        </Box>
    
        <Box>
             {selectedId ? (
              <MovieDetails selectedId={selectedId}
               onCloseMovie={handleCloseMovie}
               onAddWatched={handleAddWatched}
               watched={watched} />
              ) : (
                <>
              <WatchedSummary watched={watched}/>
             <WatchedMoviesList watched={watched} 
                onDeleteWatched={handleDeleteWatched}/>
              </>
              )}
        </Box>
      </Main>
     
    </>
  );
}

function Loader() {
  return <p className="loader">
    <span>Loading...</span>
    </p>
}

function ErrorMessage({message}) {
  return (
    <p className="error">
      <span>🛑</span>{message}
      </p>
  );
}

function NavBar({ children }){
   
   return <nav className="nav-bar">
        <Logo/>
            {children}
        </nav>;
}



function Logo() {
  return (
    <nav className="logo">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>Heed Movies</h1>
        </div>
    </nav>
  )
}



function NumResults({movies}){
  return ( 
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>    
  );
}

// Focus the search input when the query changes and El means element

function Search({query, setQuery}) {
  const inputEl = useRef(null);
    
  useKey('Enter', function() {
    inputEl.current.focus();
    setQuery("");
  });
  
    return (
     <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEl}
        />
  )
}
function Main({children}){

return (
   <main className="main">
        {children}
      </main>
)}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return (
   <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>

          {isOpen && children}
        </div>
  );
}

function MovieList({movies, onSelectMovie}) {

  return(
   <ul className="list list-movies">
              {movies?.map((movie) => (
               <Movie movie={movie} key={movie.imdbID} 
               onSelectMovie={onSelectMovie}/>
              ))}
            </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
     <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
                <div>
                  <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
    );
  }

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  useEffect(
    function() {
      if(userRating) countRef.current++;
    },
    [userRating]
  );


  const isWatched = watched.map((movie) => movie.imdbID)
    .includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  
  const{ 
    Title: title,
    Year: year,
    Poster: poster, 
    Runtime: runtime, 
    imdbRating, 
    Plot: plot, 
    Released: released,
    Actors: actors, 
    Genre: genre 
  } = movie;
  
  const isTop = imdbRating>8;
  console.log(isTop);
  

  function handleAdd() {
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
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
useKey("Escape", onCloseMovie);


  useEffect(function() {
    const controller = new AbortController();
    async function getMovieDetails() {
      setIsLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
      { signal: controller.signal }
    );
    const data = await res.json();
    setMovie(data);
    setIsLoading(false);
    }
     getMovieDetails();   
  }, [selectedId]);

useEffect(function() {
  if(!title) return;
  document.title = `${title ? title : "Heed Movies"} | Heed Movies`;
  return function() {
    document.title = "Heed Movies";
}
}
, [title]);
  return (
    <div className="details">
      {isLoading ? <Loader /> :
      <>

      <header>
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <img src={poster} alt={`${movie} poster`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{released} &bull; {runtime}</p>
        <p>{genre}</p>
        <p><span>🌟</span>{imdbRating} IMDb rating</p>
      </div>
      </header>
      <section>
       <div className="rating">
         {!isWatched ? (
         <>
         <StarRating maxRating={10}  size={16} onSetRating={setUserRating}/>
         {userRating > 0 && (
           <button className="btn-add" onClick={handleAdd}>
            + Add to watched
           </button>
         )}
           
           </>
          ) : (<p>You rated this movie {watchedUserRating} 🌟</p>)}
  
       </div>
        <p>Plot by{plot}</p>
        <p>Starring {actors}</p>
      </section>
      </>
      }
      </div>
  );
}


function WatchedSummary({ watched }) {
  
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return(
   <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
  <ul className="list">
                {watched.map((movie) => (
                 <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
                ))}
              </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.ImdbRating.toFixed(2)}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating.toFixed(2)}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
                        &times; 
                        </button>
                    </div>
                  </li>
  );
}

