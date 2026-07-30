import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  variant = "primary",
  as: As = "button",
  className = "",
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-sm transition-colors duration-300 overflow-hidden";
  const variants = {
    primary:
      "bg-[var(--color-ink)] text-[var(--color-paper)] dark:bg-[var(--color-amber)] dark:text-[var(--color-ink)]",
    outline:
      "border border-current/20 hover:border-current/40 backdrop-blur",
    ghost: "opacity-80 hover:opacity-100",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block magnetic"
    >
      <As className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </As>
    </motion.div>
  );
}
