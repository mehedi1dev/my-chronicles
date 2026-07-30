import SEO from "../components/ui/SEO";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechHighlights from "../components/sections/TechHighlights";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import TravelPreview from "../components/sections/TravelPreview";
import ActivitiesPreview from "../components/sections/ActivitiesPreview";
import ExperienceHighlights from "../components/sections/ExperienceHighlights";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import ContactPreview from "../components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <SEO title="Home" description="Mehedi — Full Stack Software Developer building products with React, .NET, and AI. Explore projects, skills, travels, and more." />
      <Hero />
      <About />
      <TechHighlights />
      <ProjectsPreview />
      <TravelPreview />
      <ActivitiesPreview />
      <ExperienceHighlights />
      <Stats />
      <Testimonials />
      <ContactPreview />
    </>
  );
}
