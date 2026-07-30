import { techStack } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle";
import SkillCard from "../ui/SkillCard";

export default function TechHighlights() {
  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Tech stack"
          title="Tools I reach for daily"
          subtitle="From pixel-level UI polish to backend systems and the AI layer wrapping around them."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((t) => (
            <SkillCard key={t.name} name={t.name} status={t.status} />
          ))}
        </div>
      </div>
    </section>
  );
}
