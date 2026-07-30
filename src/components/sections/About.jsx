import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle";
import Doodles from "../ui/Doodles";
import ProfilePortrait from "../ui/ProfilePortrait";
import { experienceSince } from "../../utils/experience";
import { Sparkles } from "lucide-react";

const EXPERIENCE_START = "2023-05-01";

export default function About() {
  const experience = experienceSince(EXPERIENCE_START);

  return (
    <section id="about" className="relative overflow-hidden py-24 px-5 md:px-8">
      <Doodles theme="education" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle eyebrow="About me" title="A developer who works best near a window and a coffee cup." />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
          style={{ background: "color-mix(in srgb, var(--color-amber) 16%, transparent)" }}
        >
          <Sparkles size={15} style={{ color: "var(--color-amber)" }} />
          <span className="text-sm">
            <span className="font-display font-semibold" style={{ color: "var(--color-amber)" }}>{experience}</span>
            {" "}of hands-on experience — and counting
          </span>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <ProfilePortrait />
          </motion.div>

          <div className="order-2 space-y-4 md:order-1 md:col-span-1">
            {profile.bio.slice(0, 2).map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-base leading-relaxed opacity-80"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="order-3 space-y-4 md:col-span-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base leading-relaxed opacity-80"
            >
              {profile.bio[2]}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wide opacity-50">Current goal</p>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{profile.goal}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
