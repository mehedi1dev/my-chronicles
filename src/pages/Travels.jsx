import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import WorldFootprint from "../components/ui/WorldFootprint";
import TravelGallery from "../components/ui/TravelGallery";
import TravelTimelineCarousel from "../components/ui/TravelTimelineCarousel";
import TravelMap from "../components/ui/TravelMap";
import TravelMotivation from "../components/ui/TravelMotivation";
import { travelStories, destinations } from "../data/travels";

export default function Travels() {
  return (
    <>
      <SEO title="Travels" description="An interactive map, travel stories, and photo gallery from trips across Asia, the Middle East, and beyond." />
      <PageHero
        eyebrow="Travels"
        title="Coding from wherever the view is good"
        subtitle="Mountains, coastlines, and the odd co-working space with excellent coffee."
        theme="travel"
      />

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="01 — Interactive map"
            title="Where I've been & where I'm headed"
            subtitle="Pick a category, expand it to see those spots, then click one to fly the map there."
          />
          <TravelMotivation compact />
          <TravelMap />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="02 — Travel stories" title="A timeline of the trips I remember best" />
          <TravelTimelineCarousel stories={travelStories} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="03 — Travel gallery" title="A scroll through the camera roll" align="center" />
          <TravelGallery destinations={destinations} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="04 — World footprint" title="Everywhere I've actually set foot" align="center" />
          <WorldFootprint destinations={destinations} />
        </div>
      </section>
    </>
  );
}
