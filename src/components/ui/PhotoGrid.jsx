import { motion } from "framer-motion";

export default function PhotoGrid({ photos }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {photos.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="group relative aspect-square overflow-hidden rounded-xl"
        >
          <img src={p.url} alt={p.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/75 to-transparent p-2.5 transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-[11px] text-white">{p.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
