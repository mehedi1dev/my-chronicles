import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function GratitudeList({ items }) {
  return (
    <GlassCard className="mx-auto max-w-xl p-6 border-current/10 sm:p-8">
      <p className="mb-5 flex items-center justify-center gap-1.5 text-center font-display text-base font-semibold">
        <Heart size={15} style={{ color: "var(--color-coral)" }} /> Grateful for, right now
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2.5 text-sm opacity-80"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-coral)" }} />
            {item}
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
