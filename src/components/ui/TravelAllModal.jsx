import { motion } from "framer-motion";
import { MapPin, Calendar, CloudSun } from "lucide-react";

export default function TravelAllModal({ stories }) {
  return (
    <div className="space-y-6 border-l border-current/15 pl-6">
      {stories.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="relative"
        >
          <span
            className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--color-amber)" }}
          />
          <p className="font-mono text-xs opacity-50">{s.date}</p>
          <p className="font-display font-semibold">{s.title}</p>
          <div className="mt-1 flex flex-wrap gap-3 text-xs opacity-55">
            <span className="flex items-center gap-1"><MapPin size={11} /> {s.location}</span>
            <span className="flex items-center gap-1"><CloudSun size={11} /> {s.weather}</span>
          </div>
          <p className="mt-1.5 text-sm opacity-70">{s.experience}</p>
        </motion.div>
      ))}
    </div>
  );
}
