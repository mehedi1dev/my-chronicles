import { motion } from "framer-motion";
import { Code2, Coffee } from "lucide-react";
import { profile } from "../../data/profile";

export default function ProfilePortrait() {
  const initial = profile.name.slice(0, 1);
  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
      {/* rotating conic-gradient light ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full opacity-70 blur-md"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-amber), var(--color-coral), var(--color-teal), var(--color-violet), var(--color-amber))",
        }}
      />
      {/* soft ambient glow */}
      <div
        className="absolute inset-3 rounded-full blur-2xl opacity-40"
        style={{ background: "var(--color-amber)" }}
      />

      {/* portrait disc */}
      <div className="glass relative flex h-56 w-56 items-center justify-center rounded-full shadow-2xl sm:h-64 sm:w-64">
        <span className="font-display text-6xl font-bold text-gradient">{initial}</span>
      </div>

      {/* floating tech badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="glass absolute -left-2 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
      >
        <Code2 size={18} style={{ color: "var(--color-teal)" }} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="glass absolute -right-3 bottom-6 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
      >
        <Coffee size={18} style={{ color: "var(--color-amber)" }} />
      </motion.div>

      {/* status pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs shadow-lg"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-teal)" }} />
        Open to work
      </motion.div>
    </div>
  );
}
