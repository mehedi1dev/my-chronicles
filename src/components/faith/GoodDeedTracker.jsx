import { motion } from "framer-motion";
import { Sparkles, Circle } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { goodDeeds } from "../../data/faith";

export default function GoodDeedTracker() {
  return (
    <GlassCard className="mx-auto max-w-xl p-6 border-current/10 sm:p-8">
      <p className="mb-1 flex items-center justify-center gap-1.5 text-center font-display text-base font-semibold">
        <Sparkles size={15} style={{ color: "var(--color-amber)" }} /> Small good deeds worth remembering
      </p>
      <p className="mb-5 text-center text-xs opacity-55">A gentle list — no pressure, just a nudge.</p>
      <div className="space-y-2">
        {goodDeeds.map((deed, i) => (
          <motion.div
            key={deed}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-current/10 px-4 py-2.5 text-sm"
          >
            <Circle size={8} fill="var(--color-teal)" style={{ color: "var(--color-teal)" }} />
            <span className="opacity-80">{deed}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
