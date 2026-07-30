import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoCarousel({ photos }) {
  const trackRef = useRef(null);
  const scrollBy = (dir) => trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="mb-3 hidden justify-end gap-2 sm:flex">
        <button onClick={() => scrollBy(-1)} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronLeft size={16} /></button>
        <button onClick={() => scrollBy(1)} className="rounded-full border border-current/15 p-2 hover:bg-current/5"><ChevronRight size={16} /></button>
      </div>
      <div ref={trackRef} className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {photos.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative h-64 w-[85%] shrink-0 overflow-hidden rounded-2xl sm:w-[420px]"
          >
            <img src={p.url} alt={p.caption} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-medium text-white">{p.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
