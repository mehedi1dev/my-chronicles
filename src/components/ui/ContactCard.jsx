import GlassCard from "./GlassCard";

export default function ContactCard({ icon: Icon, title, value, href }) {
  const content = (
    <GlassCard className="p-5 flex items-center gap-4 border-current/10 w-full">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "color-mix(in srgb, var(--color-amber) 18%, transparent)" }}
      >
        <Icon size={18} style={{ color: "var(--color-amber)" }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs opacity-60">{title}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </GlassCard>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block w-full">{content}</a>
  ) : (
    content
  );
}
