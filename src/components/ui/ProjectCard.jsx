import { motion } from "framer-motion";
import { ExternalLink, Users, Clock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import GlassCard from "./GlassCard";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <GlassCard className="group h-full p-6 flex flex-col gap-4 border-current/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-wide opacity-50">{project.category}</p>
            <h3 className="mt-1 text-xl font-display font-semibold">{project.title}</h3>
          </div>
          <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub repository">
              <FaGithub size={18} />
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Live demo">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <p className="text-sm opacity-75">{project.description}</p>

        <div className="grid grid-cols-1 gap-2 text-xs opacity-70 sm:grid-cols-2">
          <p><span className="font-medium opacity-100">Challenge:</span> {project.challenges}</p>
          <p><span className="font-medium opacity-100">Solution:</span> {project.solution}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
        </div>

        <div className="flex items-center gap-4 text-xs opacity-60 pt-2 border-t border-current/10">
          <span className="flex items-center gap-1"><Clock size={12} /> {project.timeline}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {project.role} · Team of {project.team}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
