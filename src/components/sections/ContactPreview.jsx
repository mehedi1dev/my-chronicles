import { Link } from "react-router-dom";
import { Mail, MapPin, Send } from "lucide-react";
import { profile } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import Doodles from "../ui/Doodles";
import GlassCard from "../ui/GlassCard";

export default function ContactPreview() {
  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-8">
      <Doodles theme="contact" />
      <div className="relative mx-auto max-w-3xl">
        <SectionTitle eyebrow="Let's talk" title="Have a project in mind?" align="center" />
        <GlassCard className="flex flex-col items-center gap-6 border-current/10 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 rounded-full bg-current/5 px-4 py-2.5 text-sm hover:bg-current/10"
            >
              <Mail size={15} style={{ color: "var(--color-amber)" }} />
              {profile.email}
            </a>
            <span className="flex items-center gap-2.5 rounded-full bg-current/5 px-4 py-2.5 text-sm">
              <MapPin size={15} style={{ color: "var(--color-teal)" }} />
              {profile.location}
            </span>
          </div>
          <AnimatedButton as={Link} to="/contact" className="shrink-0">
            Say hello <Send size={14} />
          </AnimatedButton>
        </GlassCard>
        <p className="mt-4 text-center text-sm opacity-60">
          Currently available for full-stack and AI-integration projects. Usually reply within a day.
        </p>
      </div>
    </section>
  );
}
