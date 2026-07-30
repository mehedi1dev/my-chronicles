import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import SocialInfoGrid from "../components/ui/SocialInfoGrid";
import WavingHand from "../components/ui/WavingHand";
import { profile } from "../data/profile";

const FAQ = [
  { q: "What's your typical response time?", a: "Usually within 24 hours on weekdays." },
  { q: "Do you take on short-term contract work?", a: "Yes — both short engagements and longer partnerships work well." },
  { q: "Can you help with AI/computer vision specifically?", a: "That's actually my favorite kind of project right now." },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="border-current/10 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between p-5 text-left">
        <span className="font-medium text-sm">{item.q}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-5 text-sm opacity-65">{item.a}</p>}
    </GlassCard>
  );
}

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Mehedi — email, WhatsApp, LinkedIn, GitHub, and more." />
      <PageHero eyebrow="Contact" title="Let's build something together" theme="contact"
        subtitle="Whether it's a full product, an AI integration, or just a technical chat over coffee — I'd love to hear from you." />

      <section className="py-10 px-5 md:px-8">
        <div className="mx-auto max-w-4xl">
          <GlassCard className="mb-10 flex flex-col items-center gap-4 p-8 text-center border-current/10 sm:flex-row sm:text-left">
            <WavingHand size={88} className="shrink-0" />
            <div>
              <p className="font-display text-xl font-semibold">Hey, I'm {profile.name} 👋</p>
              <p className="mt-1 text-sm opacity-65">
                Every card below is clickable — reach me wherever's easiest for you.
              </p>
            </div>
          </GlassCard>

          <SocialInfoGrid />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="FAQ" title="A few common questions" />
          <div className="space-y-3">
            {FAQ.map((item) => <FaqItem key={item.q} item={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
