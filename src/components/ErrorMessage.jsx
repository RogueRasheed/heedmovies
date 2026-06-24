export default function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center gap-2 p-12">
      <span>🛑</span>
      <p className="text-lg text-[var(--color-red)]">{message}</p>
    </div>
  );
}