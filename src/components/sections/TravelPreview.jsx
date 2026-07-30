import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { travelStories } from "../../data/travels";
import SectionTitle from "../ui/SectionTitle";
import AnimatedButton from "../ui/AnimatedButton";
import GlassCard from "../ui/GlassCard";
import Doodles from "../ui/Doodles";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

export default function TravelPreview() {
  const latest = travelStories.slice(-3).reverse();

  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-8">
      <Doodles theme="travel" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Beyond the screen" title="Places that keep me curious" />
          <AnimatedButton as={Link} to="/travels" variant="outline">
            View travels <ArrowRight size={15} />
          </AnimatedButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {latest.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="h-full p-5 border-current/10">
                <p className="font-display font-semibold">{s.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-3 text-xs opacity-55">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {s.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> {s.date}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm opacity-70">{s.experience}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
