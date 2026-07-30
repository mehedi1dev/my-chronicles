import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Camera, Star, Route } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Doodles from "../ui/Doodles";

const CARDS = [
  { icon: Gamepad2, title: "Entertainment", desc: "Playable games, movies, shows and anime picks.", path: "/entertainment", color: "var(--color-violet)" },
  { icon: Camera, title: "Photography", desc: "Nature, street & travel frames.", path: "/activities/photography", color: "var(--color-teal)" },
  { icon: Star, title: "Faith", desc: "Qur'an, prayer times, and quiet reminders.", path: "/faith", color: "var(--color-amber)" },
  { icon: Route, title: "My Journey", desc: "University to current job, mapped out.", path: "/journey", color: "var(--color-coral)" },
];

export default function ActivitiesPreview() {
  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-8">
      <Doodles theme="gaming" />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle eyebrow="Life outside the IDE" title="What fills the rest of my time" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link to={c.path} className="glass block h-full rounded-2xl p-6 border-current/10">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `color-mix(in srgb, ${c.color} 18%, transparent)` }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <p className="mt-4 font-display text-lg font-semibold">{c.title}</p>
                <p className="mt-1 text-sm opacity-65">{c.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
