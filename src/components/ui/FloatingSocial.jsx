import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { profile } from "../../data/profile";

const LINKS = [
  { icon: FaGithub, href: profile.github, label: "GitHub" },
  { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Gmail" },
];

export default function FloatingSocial() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed bottom-6 left-6 z-40 hidden flex-col items-center gap-3 sm:flex"
    >
      {LINKS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="glass flex h-11 w-11 items-center justify-center rounded-full border-current/10 shadow-lg transition-transform hover:-translate-y-1 hover:scale-105"
        >
          <Icon size={17} />
        </a>
      ))}
      <span className="mt-1 h-10 w-px bg-current/15" />
    </motion.div>
  );
}
