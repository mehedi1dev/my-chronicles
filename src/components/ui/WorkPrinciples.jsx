import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import GlassCard from "./GlassCard";

export default function WorkPrinciples({ principles }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {principles.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
        >
          <GlassCard className="h-full p-5 border-current/10">
            <span
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-amber) 18%, transparent)" }}
            >
              <Compass size={15} style={{ color: "var(--color-amber)" }} />
            </span>
            <p className="font-display font-semibold">{p.title}</p>
            <p className="mt-1.5 text-sm opacity-70">{p.detail}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
