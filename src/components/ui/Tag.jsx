export default function Tag({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-[var(--color-amber)] text-[var(--color-ink)]"
          : "bg-current/5 hover:bg-current/10"
      }`}
    >
      {children}
    </button>
  );
}
