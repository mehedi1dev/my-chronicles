import { motion } from "framer-motion";
import { Ghost, Mic } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";

export default function Testimonials() {
  return (
    <section className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-lg text-center">
        <SectionTitle eyebrow="Kind words" title="What people say" align="center" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 border-current/10">
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-violet) 18%, transparent)" }}
            >
              <Ghost size={26} style={{ color: "var(--color-violet)" }} />
            </motion.div>
            <p className="font-display text-lg font-semibold">Nobody has said anything… yet.</p>
            <p className="mt-2 text-sm opacity-65">
              This is the part where glowing client quotes are supposed to go. So far the silence has been deafening —
              possibly because I haven't asked anyone, possibly because they're still drafting something Shakespearean.
            </p>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs opacity-45">
              <Mic size={12} /> Mic's open. Be the first — <a href="/contact" className="underline hover:opacity-100">say hi</a>.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
