import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import JourneyGitGraph from "../components/ui/JourneyGitGraph";
import { journey } from "../data/journey";

export default function MyJourney() {
  return (
    <>
      <SEO title="My Journey" description="A git-branch-style timeline from university to current job, including overlapping chapters like working while studying." />
      <PageHero
        eyebrow="My Journey"
        title="From lecture halls to production deploys"
        subtitle="University, jobs, side quests, and the odd hobby that didn't quite stick — laid out chronologically, with overlapping chapters (like a Master's done alongside a full-time job) running side by side in matching colors."
        theme="education"
      />

      <section className="py-16 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="Timeline" title="The whole timeline" />
          <JourneyGitGraph events={journey} />
        </div>
      </section>
    </>
  );
}
