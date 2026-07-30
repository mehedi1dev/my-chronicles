import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import AnimatedButton from "../ui/AnimatedButton";
import { ArrowRight } from "lucide-react";

export default function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Selected work" title="Featured projects" />
          <AnimatedButton as={Link} to="/works" variant="outline">
            All projects <ArrowRight size={15} />
          </AnimatedButton>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
