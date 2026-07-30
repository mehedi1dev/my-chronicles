import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import GlassCard from "./GlassCard";

export default function GamesPlayedCarousel({ games }) {
  const trackRef = useRef(null);
  const scrollBy = (dir) => trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="mb-4 hidden justify-end gap-2 sm:flex">
        <button onClick={() => scrollBy(-1)} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronLeft size={16} /></button>
        <button onClick={() => scrollBy(1)} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronRight size={16} /></button>
      </div>
      <div ref={trackRef} className="no-scrollbar flex gap-5 overflow-x-auto pb-3">
        {games.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="w-48 shrink-0"
          >
            <GlassCard className="flex h-80 flex-col overflow-hidden border-current/10">
              <img src={g.image} alt={g.name} loading="lazy" className="h-40 w-full shrink-0 object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <p className="truncate font-display font-semibold">{g.name}</p>
                <p className="mt-1 flex items-center gap-1 text-xs opacity-55"><Clock size={11} /> {g.hours}h played</p>
                <p className="mt-2 line-clamp-3 text-xs opacity-65">{g.note}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
