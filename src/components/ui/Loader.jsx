import { motion, AnimatePresence } from "framer-motion";
import CoffeeMug from "./CoffeeMug";

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-3 bg-[var(--color-ink)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--color-paper)]"
          >
            <CoffeeMug size={48} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm text-[var(--color-paper)]"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              Mehedi
            </motion.span>
            <span className="ml-1 animate-blink" style={{ color: "var(--color-teal)" }}>_</span>
          </motion.div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-paper)] opacity-40">
            brewing…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
