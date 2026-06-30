import Search from "../Search";

export default function Navbar({ query, setQuery }) {
  return (
    <div className="flex items-center justify-between px-2 py-4 mb-6 border-b border-[var(--color-background-100)]">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🍿</span>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Heed<span className="text-[var(--color-primary-light)]">Movies</span>
        </h1>
      </div>
      <Search query={query} setQuery={setQuery} />
    </div>
  );
}