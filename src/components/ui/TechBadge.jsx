export default function TechBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-current/10 bg-current/5 px-3 py-1 text-xs font-mono ${className}`}
    >
      {children}
    </span>
  );
}
