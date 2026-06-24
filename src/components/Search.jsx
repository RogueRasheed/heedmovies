import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputEl}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="
        justify-self-center
        bg-[var(--color-primary-light)]
        text-[var(--color-text)]
        placeholder-[var(--color-text-dark)]
        border-none outline-none
        rounded-lg px-6 py-3
        text-lg w-80 md:w-96
        transition-all duration-300
        focus:shadow-2xl focus:-translate-y-0.5
      "
    />
  );
}