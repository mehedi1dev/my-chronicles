import { motion } from "framer-motion";
import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import { educationTimeline, onlineCourses, books, proudestMoment } from "../data/content";
import { BookOpen, Trophy } from "lucide-react";

export default function Education() {
  return (
    <>
      <SEO title="Education" description="Academic timeline, certifications, online courses, and books that shaped how Mehedi builds software." />
      <PageHero
        eyebrow="Education"
        title="Formal study meets self-directed learning"
        subtitle="A timeline of degrees, courses, and books that shaped how I build software."
        theme="education"
      />

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="01 — Timeline" title="Academic timeline" />
          <div className="space-y-6 border-l border-current/15 pl-6">
            {educationTimeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-amber)" }} />
                <p className="font-mono text-xs opacity-50">{item.year}</p>
                <p className="font-display font-semibold">{item.title}</p>
                <p className="text-sm opacity-65">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="02 — Online courses" title="Online courses" />
          <div className="grid gap-4 sm:grid-cols-2">
            {onlineCourses.map((c) => (
              <GlassCard key={c.name} className="p-5 flex items-center justify-between border-current/10">
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs opacity-50">{c.provider}</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-current/5">{c.status}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="03 — Books" title="Books that shaped how I think" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((b) => (
              <GlassCard key={b.title} className="p-5 border-current/10">
                <BookOpen size={16} style={{ color: "var(--color-teal)" }} />
                <p className="mt-3 font-medium text-sm">{b.title}</p>
                <p className="text-xs opacity-50">{b.author}</p>
                <span className="mt-2 inline-block text-xs opacity-60">{b.status}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-2xl">
          <SectionTitle eyebrow="04 — Proudest moment" title="One I still think about" align="center" />
          <GlassCard className="p-6 border-current/10 text-center sm:p-8">
            <Trophy size={20} className="mx-auto mb-3" style={{ color: "var(--color-amber)" }} />
            <p className="font-display font-semibold">{proudestMoment.title}</p>
            <p className="mt-2 text-sm leading-relaxed opacity-75">{proudestMoment.story}</p>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
