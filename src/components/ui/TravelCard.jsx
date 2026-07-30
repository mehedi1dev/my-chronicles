import { motion } from "framer-motion";
import { MapPin, Calendar, CloudSun } from "lucide-react";
import GlassCard from "./GlassCard";

export default function TravelCard({ story, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06 }}
    >
      <GlassCard className="p-6 h-full border-current/10">
        <h3 className="text-lg font-display font-semibold">{story.title}</h3>
        <div className="mt-2 flex flex-wrap gap-3 text-xs opacity-60">
          <span className="flex items-center gap-1"><MapPin size={12} /> {story.location}</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {story.date}</span>
          <span className="flex items-center gap-1"><CloudSun size={12} /> {story.weather}</span>
        </div>
        <p className="mt-3 text-sm opacity-80">{story.experience}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {story.memories.map((m) => (
            <li key={m} className="rounded-full bg-current/5 px-3 py-1 text-xs opacity-70">{m}</li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}
