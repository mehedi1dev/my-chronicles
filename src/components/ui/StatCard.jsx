import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target, inView, duration = 1.6) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / (duration * 1000), 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

export default function StatCard({ label, value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-display font-semibold text-gradient">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-xs md:text-sm opacity-60">{label}</p>
    </motion.div>
  );
}
