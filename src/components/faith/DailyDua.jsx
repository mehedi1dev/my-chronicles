import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, HandHeart } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { dailyDuas } from "../../data/faith";

export default function DailyDua() {
  const [index, setIndex] = useState(0);
  const d = dailyDuas[index];

  const next = () => setIndex((i) => (i + 1) % dailyDuas.length);
  const prev = () => setIndex((i) => (i - 1 + dailyDuas.length) % dailyDuas.length);

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard className="p-8 text-center border-current/10">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-teal) 18%, transparent)" }}
            >
              <HandHeart size={20} style={{ color: "var(--color-teal)" }} />
            </motion.div>
            <p dir="rtl" className="font-display text-xl leading-relaxed sm:text-2xl">{d.arabic}</p>
            <p className="mt-4 text-sm italic opacity-80">"{d.translation}"</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide opacity-50">{d.occasion}</p>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button onClick={prev} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronLeft size={16} /></button>
        <div className="flex gap-1.5">
          {dailyDuas.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-current" : "bg-current/25"}`} />
          ))}
        </div>
        <button onClick={next} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
