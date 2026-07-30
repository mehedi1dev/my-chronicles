import { experience } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle";
import ExperienceCard from "../ui/ExperienceCard";

export default function ExperienceHighlights() {
  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Journey" title="A quick look at how I got here" />
        <div className="space-y-8">
          {experience.map((item, i) => (
            <ExperienceCard key={item.year} item={item} index={i} isLast={i === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
