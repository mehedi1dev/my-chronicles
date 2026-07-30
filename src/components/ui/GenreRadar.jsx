import { motion } from "framer-motion";

const COLORS = ["var(--color-teal)", "var(--color-amber)", "var(--color-violet)", "var(--color-coral)", "var(--color-amber-soft)"];

export default function GenreRadar({ items }) {
  const counts = {};
  items.forEach((item) => {
    item.genre.split(",").forEach((g) => {
      const genre = g.trim();
      counts[genre] = (counts[genre] || 0) + 1;
    });
  });
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] || 1;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {entries.map(([genre, count], i) => {
        const scale = 0.85 + (count / max) * 0.65;
        return (
          <motion.span
            key={genre}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 200 }}
            className="rounded-full px-4 py-2 font-medium"
            style={{
              fontSize: `${scale * 0.9}rem`,
              background: `color-mix(in srgb, ${COLORS[i % COLORS.length]} 16%, transparent)`,
              color: COLORS[i % COLORS.length],
            }}
          >
            {genre}
          </motion.span>
        );
      })}
    </div>
  );
}
