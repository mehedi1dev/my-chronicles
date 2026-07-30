import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Footprints, Plane, Sunrise, Mountain, Quote } from "lucide-react";
import GlassCard from "./GlassCard";
import { travelMotivations } from "../../data/travels";

const ANIMATIONS = {
  compass: (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
      <Compass size={26} />
    </motion.div>
  ),
  footsteps: (
    <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
      <Footprints size={26} />
    </motion.div>
  ),
  plane: (
    <motion.div animate={{ x: [-4, 4, -4], y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
      <Plane size={26} />
    </motion.div>
  ),
  sunrise: (
    <motion.div animate={{ y: [4, -2, 4], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
      <Sunrise size={26} />
    </motion.div>
  ),
  mountain: (
    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
      <Mountain size={26} />
    </motion.div>
  ),
};

const STATIC_ICONS = {
  compass: <Compass size={18} />,
  footsteps: <Footprints size={18} />,
  plane: <Plane size={18} />,
  sunrise: <Sunrise size={18} />,
  mountain: <Mountain size={18} />,
};

export default function TravelMotivation({ compact = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % travelMotivations.length), 5000);
    return () => clearInterval(t);
  }, []);

  const m = travelMotivations[index];

  if (compact) {
    return (
      <div className="mb-5 w-full">
        <GlassCard className="flex items-center gap-4 border-current/10 px-5 py-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "color-mix(in srgb, var(--color-teal) 18%, transparent)", color: "var(--color-teal)" }}
          >
            {STATIC_ICONS[m.anim]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm italic opacity-80 sm:text-base">"{m.quote}"</p>
            <p className="font-mono text-[10px] uppercase tracking-wide opacity-45">— {m.author}</p>
          </div>
          <div className="hidden shrink-0 gap-1.5 sm:flex">
            {travelMotivations.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-all ${i === index ? "w-4 bg-current" : "bg-current/25"}`}
              />
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8 border-current/10">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-teal) 18%, transparent)", color: "var(--color-teal)" }}
            >
              {ANIMATIONS[m.anim]}
            </div>
            <Quote size={16} className="mx-auto mb-2 opacity-30" />
            <p className="font-display text-lg leading-relaxed sm:text-xl">"{m.quote}"</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide opacity-50">— {m.author}</p>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
      <div className="mt-5 flex justify-center gap-1.5">
        {travelMotivations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-all ${i === index ? "w-5 bg-current" : "bg-current/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
