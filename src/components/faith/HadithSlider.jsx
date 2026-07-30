import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { hadithQuotes } from "../../data/faith";

export default function HadithSlider() {
  const [start, setStart] = useState(0);
  const perView = 3; // desktop shows 3, CSS hides extras on mobile down to 1

  const next = () => setStart((s) => (s + 1) % hadithQuotes.length);
  const prev = () => setStart((s) => (s - 1 + hadithQuotes.length) % hadithQuotes.length);

  const visible = Array.from({ length: perView }, (_, i) => hadithQuotes[(start + i) % hadithQuotes.length]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((h, i) => (
            <motion.div
              key={`${start}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ delay: i * 0.06 }}
              className={i === 0 ? "" : "hidden sm:block"}
            >
              <GlassCard className="flex h-full flex-col p-6 border-current/10">
                <Quote size={18} className="mb-3 opacity-40" />
                <p className="flex-1 text-sm leading-relaxed opacity-80">"{h.text}"</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-wide opacity-50">{h.reference}</p>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={prev} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronLeft size={16} /></button>
        <div className="flex gap-1.5">
          {hadithQuotes.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === start ? "bg-current" : "bg-current/25"}`} />
          ))}
        </div>
        <button onClick={next} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
