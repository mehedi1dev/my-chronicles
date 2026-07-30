import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, LayoutGrid } from "lucide-react";
import { namesOfAllah } from "../../data/faith";
import Modal from "../ui/Modal";
import GlassCard from "../ui/GlassCard";

export default function NamesOfAllah({ compact = false }) {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % namesOfAllah.length), 3200);
    return () => clearInterval(t);
  }, []);

  const n = namesOfAllah[index];
  const size = compact ? { outer: "h-36 w-36 sm:h-40 sm:w-40", inner: "h-28 w-28 sm:h-32 sm:w-32" } : { outer: "h-44 w-44 sm:h-52 sm:w-52", inner: "h-36 w-36 sm:h-44 sm:w-44" };

  return (
    <div className="mx-auto max-w-xl text-center">
      <div className={`relative mx-auto flex items-center justify-center ${size.outer}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full opacity-60 blur-md"
          style={{
            background: "conic-gradient(from 0deg, var(--color-teal), var(--color-amber), var(--color-violet), var(--color-teal))",
          }}
        />
        <div className={`glass relative flex flex-col items-center justify-center rounded-full shadow-2xl ${size.inner}`}>
          <span className="absolute top-4 rounded-full bg-current/10 px-2 py-0.5 font-mono text-[10px] opacity-60">
            {index + 1} / {namesOfAllah.length}
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className="px-3"
            >
              <p className="font-display text-2xl font-semibold sm:text-3xl">{n.arabic}</p>
              <p className="mt-1 text-xs font-medium opacity-70">{n.transliteration}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-sm opacity-75"
        >
          <Sparkles size={13} style={{ color: "var(--color-amber)" }} /> {n.meaning}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setShowAll(true)}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-current/15 px-4 py-2 text-xs font-medium hover:bg-current/5"
      >
        <LayoutGrid size={13} /> See all 99 names
      </button>

      <Modal open={showAll} onClose={() => setShowAll(false)}>
        <p className="mb-4 text-center font-display text-lg font-semibold">Asma ul Husna — The 99 Names</p>
        <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
          {namesOfAllah.map((name, i) => (
            <GlassCard key={name.transliteration} className="p-3 text-center border-current/10">
              <p className="font-mono text-[10px] opacity-40">{i + 1}</p>
              <p className="mt-1 font-display text-base font-semibold">{name.arabic}</p>
              <p className="mt-0.5 text-[11px] font-medium opacity-70">{name.transliteration}</p>
              <p className="mt-0.5 text-[10px] opacity-50">{name.meaning}</p>
            </GlassCard>
          ))}
        </div>
      </Modal>
    </div>
  );
}
