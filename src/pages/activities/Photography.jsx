import PageHero from "../../components/ui/PageHero";
import SEO from "../../components/ui/SEO";
import SectionTitle from "../../components/ui/SectionTitle";
import GlassCard from "../../components/ui/GlassCard";
import PhotoCarousel from "../../components/ui/PhotoCarousel";
import PhotoGrid from "../../components/ui/PhotoGrid";
import { photography } from "../../data/content";
import { photoHighlights, photoSections } from "../../data/photography";

export default function Photography() {
  return (
    <>
      <SEO title="Photography" description="Nature, street, and travel photography galleries shot between deploys." />
      <PageHero eyebrow="Activities · Photography" title="Framing the in-between moments" theme="travel"
        subtitle="Nature, street, and travel photography shot between deploys." />

      <section className="py-14 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="01 — Highlights" title="A quick scroll through my favorites" />
          <PhotoCarousel photos={photoHighlights} />
        </div>
      </section>

      <section className="py-14 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="02 — My favorites" title="The ones I keep coming back to" />
          <PhotoGrid photos={photoSections.favorites} />
        </div>
      </section>

      <section className="py-14 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="03 — Nature" title="Mountains, forests, and cloud seas" />
          <PhotoGrid photos={photoSections.nature} />
        </div>
      </section>

      <section className="py-14 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="04 — Beach" title="Slower days by the water" />
          <PhotoGrid photos={photoSections.beach} />
        </div>
      </section>

      <section className="py-14 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="05 — Camera & gear" title="What I shoot with" />
          <div className="flex flex-wrap gap-3">
            {photography.gear.map((it) => (
              <GlassCard key={it} className="px-4 py-2.5 text-sm border-current/10">{it}</GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
