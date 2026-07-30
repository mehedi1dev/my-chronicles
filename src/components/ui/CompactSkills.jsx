import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { skillGroups } from "../../data/profile";

export default function CompactSkills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, i) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <GlassCard className="h-full p-4 border-current/10">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wide opacity-50">{group.title}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((s) => (
                <span key={s.name} className="rounded-full bg-current/5 px-2.5 py-1 text-xs">
                  {s.name}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
