import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function WorldFootprint({ destinations }) {
  const visited = destinations.filter((d) => d.visited);
  const countries = [...new Set(visited.map((d) => d.country))];

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2.5">
        {countries.map((country, i) => (
          <motion.span
            key={country}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-full px-4 py-2 text-sm font-medium"
            style={{ background: "color-mix(in srgb, var(--color-teal) 14%, transparent)", color: "var(--color-teal)" }}
          >
            {country}
          </motion.span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {visited.map((d, i) => (
          <motion.span
            key={d.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-1.5 rounded-full border border-current/10 bg-current/5 px-3 py-1.5 text-xs"
          >
            <MapPin size={11} style={{ color: "var(--color-amber)" }} /> {d.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
