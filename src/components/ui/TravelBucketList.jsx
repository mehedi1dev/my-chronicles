import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GlassCard from "./GlassCard";

export default function TravelBucketList({ destinations }) {
  const dreaming = destinations.filter((d) => !d.visited);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dreaming.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <GlassCard className="h-full p-5 border-current/10">
            <span
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-violet) 18%, transparent)" }}
            >
              <Sparkles size={15} style={{ color: "var(--color-violet)" }} />
            </span>
            <p className="font-display font-semibold">{d.name}</p>
            <p className="text-xs opacity-55">{d.country}</p>
            <p className="mt-2 text-xs leading-relaxed opacity-70">{d.description}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
