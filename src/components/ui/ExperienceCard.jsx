import { motion } from "framer-motion";

export default function ExperienceCard({ item, index = 0, isLast = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative pl-8"
    >
      <span
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full"
        style={{ background: "var(--color-amber)" }}
      />
      {!isLast && <span className="absolute left-[5px] top-4 h-full w-px bg-current/15" />}
      <p className="font-mono text-xs uppercase tracking-wide opacity-50">{item.year}</p>
      <h4 className="mt-1 font-display text-lg font-semibold">{item.role}</h4>
      <p className="text-sm opacity-60">{item.org}</p>
      <p className="mt-1 text-sm opacity-75">{item.desc}</p>
    </motion.div>
  );
}
