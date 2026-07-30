import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import GlassCard from "./GlassCard";

export default function MediaRow({ items }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item, i) => (
        <motion.a
          key={item.title}
          href={item.imdbLink}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -4 }}
          className="group flex"
        >
          <GlassCard className="flex h-full w-full flex-col overflow-hidden border-current/10">
            <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-64">
              <img
                src={item.poster}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                <Star size={11} fill="var(--color-amber)" style={{ color: "var(--color-amber)" }} />
                {item.rating.toFixed(1)}
              </span>
              <ExternalLink
                size={14}
                className="absolute right-2 bottom-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <div className="flex flex-1 flex-col p-3">
              <p className="line-clamp-2 font-display text-sm font-semibold leading-snug">{item.title}</p>
              <p className="mt-1 line-clamp-1 text-[11px] opacity-55">{item.year} · {item.genre}</p>
            </div>
          </GlassCard>
        </motion.a>
      ))}
    </div>
  );
}
