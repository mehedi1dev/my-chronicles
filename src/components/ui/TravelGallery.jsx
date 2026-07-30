import { motion } from "framer-motion";

export default function TravelGallery({ destinations }) {
  const photos = destinations
    .filter((d) => d.visited)
    .flatMap((d) => d.images.map((url, i) => ({ url, caption: `${d.name}, ${d.country}`, key: `${d.id}-${i}` })))
    .slice(0, 15);

  return (
    <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
      {photos.map((p, i) => (
        <motion.div
          key={p.key}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 8) * 0.05 }}
          className="group relative overflow-hidden rounded-xl break-inside-avoid"
        >
          <img src={p.url} alt={p.caption} loading="lazy" className="w-full object-cover" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="p-3 text-xs font-medium text-white">{p.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
