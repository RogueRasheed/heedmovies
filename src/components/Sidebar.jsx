import { useState } from "react";

const navItems = [
  { id: "search", icon: "🔍", label: "Search" },
  { id: "watched", icon: "👁", label: "Watchlist" },
];

export default function Sidebar({ view, setView, watchedCount }) {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        relative flex flex-col gap-2
        bg-[var(--color-background-500)]
        border-r border-[var(--color-background-100)]
        py-8 px-3
        transition-all duration-300 ease-in-out
        overflow-hidden
        shrink-0
      "
      style={{ width: hovered ? "200px" : "64px" }}
    >
      {/* Logo icon */}
      <div className="flex items-center justify-center mb-6 h-10">
        <span className="text-3xl shrink-0">🍿</span>
      </div>

      {/* Nav items */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`
            flex items-center gap-3
            px-3 py-3 rounded-xl
            border-none cursor-pointer
            transition-all duration-200
            w-full text-left shrink-0
            ${view === item.id
              ? "bg-[var(--color-primary)] text-white"
              : "bg-transparent text-[var(--color-text-dark)] hover:bg-[var(--color-background-100)] hover:text-white"
            }
          `}
        >
          <span className="text-xl shrink-0 w-6 text-center">{item.icon}</span>
          <span
            className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, maxWidth: hovered ? "120px" : "0px" }}
          >
            {item.label}
          </span>

          {/* Watched count badge */}
          {item.id === "watched" && watchedCount > 0 && (
            <span
              className="
                ml-auto shrink-0
                bg-[var(--color-primary-light)]
                text-white text-xs font-bold
                rounded-full w-5 h-5
                flex items-center justify-center
                transition-all duration-300
              "
              style={{ opacity: hovered ? 1 : 0 }}
            >
              {watchedCount}
            </span>
          )}
        </button>
      ))}
    </aside>
  );
}