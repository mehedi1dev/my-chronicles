import { useMemo, useState } from "react";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ProjectCard from "../components/ui/ProjectCard";
import CompactSkills from "../components/ui/CompactSkills";
import WorkPrinciples from "../components/ui/WorkPrinciples";
import Tag from "../components/ui/Tag";
import { projects, workPrinciples } from "../data/projects";

const CATEGORIES = ["All", "Featured", "Enterprise", "AI", "Open Source", "Case Study"];

export default function Works() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <SEO title="Work & Skills" description="Full tech stack breakdown plus featured projects, enterprise systems, AI experiments, and open source work." />
      <PageHero
        eyebrow="My Works & Skills"
        title="What I know, and what I've built with it"
        subtitle="A quick look at the stack, followed by the projects, products, and experiments that came out of it."
        theme="coding"
      />

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="01 — Skills" title="The stack, at a glance" subtitle="Grouped by layer — frontend, backend, database, cloud, AI, DevOps, and tools." />
          <CompactSkills />
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="02 — My Works" title="Projects, products & experiments" subtitle="A mix of enterprise systems, AI experiments, open source tools, and case studies." />
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Tag key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Tag>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="03 — How I work" title="A few principles I actually stick to" align="center" />
          <WorkPrinciples principles={workPrinciples} />
        </div>
      </section>
    </>
  );
}
