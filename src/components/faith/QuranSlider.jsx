import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { quranVerses } from "../../data/faith";

export default function QuranSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % quranVerses.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const next = () => setIndex((i) => (i + 1) % quranVerses.length);
  const prev = () => setIndex((i) => (i - 1 + quranVerses.length) % quranVerses.length);
  const v = quranVerses[index];

  return (
    <div
      className="mx-auto max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8 text-center border-current/10">
            <BookOpen size={22} className="mx-auto mb-4 opacity-40" />
            <p dir="rtl" className="font-display text-2xl leading-relaxed sm:text-3xl min-h-[68px] sm:min-h-[84px] flex items-center justify-center">
              {v.arabic}
            </p>
            <p className="mt-3 font-mono text-sm opacity-60">{v.transliteration}</p>
            <p className="mt-3 text-base italic opacity-80">"{v.translation}"</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide opacity-50">{v.reference}</p>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button onClick={prev} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronLeft size={16} /></button>
        <div className="flex gap-1.5">
          {quranVerses.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-current" : "bg-current/25"}`} />
          ))}
        </div>
        <button onClick={next} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
