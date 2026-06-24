import { useEffect } from "react";
import MovieDetails from "../MovieDetails";
import { useKey } from "../../hooks/useKey";

export default function MovieModal({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  useKey("Escape", onCloseMovie);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCloseMovie}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-2xl max-h-[85vh]
          bg-[var(--color-background-500)]
          rounded-2xl overflow-y-auto
          z-50 shadow-2xl
        "
      >
        <MovieDetails
          selectedId={selectedId}
          onCloseMovie={onCloseMovie}
          onAddWatched={onAddWatched}
          watched={watched}
        />
      </div>
    </>
  );
}
