import { motion } from "framer-motion";

const STATUS_COLOR = {
  "Future target": "var(--color-violet)",
  Practicing: "var(--color-coral)",
};

function colorFor(status) {
  return STATUS_COLOR[status] || "var(--color-teal)";
}

export default function SkillCard({ name, status, years, projects }) {
  const tag = status || (years ? `${years} yrs experience` : "Practicing");
  const color = colorFor(tag);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-current/10 bg-current/5 p-4"
    >
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">{name}</span>
        <span
          className="whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
        >
          {tag}
        </span>
      </div>
      {projects && (
        <p className="mt-2 text-xs opacity-50">{projects} projects</p>
      )}
    </motion.div>
  );
}
