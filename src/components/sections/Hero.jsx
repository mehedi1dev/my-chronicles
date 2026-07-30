import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Plane, Gamepad2, PartyPopper } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profile } from "../../data/profile";
import Doodles from "../ui/Doodles";
import AnimatedButton from "../ui/AnimatedButton";
import CoffeeMug from "../ui/CoffeeMug";

const ROLES = ["Full Stack Developer", "React & Next.js Engineer", "AI & Computer Vision Explorer", "Coffee-Powered Coder"];

function useTypewriter(words, speed = 55, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 1.6);
    } else {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

const CODE_LINES = [
  { indent: 0, text: "const engineer = {" },
  { indent: 1, text: "name: 'Mehedi'," },
  { indent: 1, text: "stack: ['React', 'Node', 'ASP.NET']," },
  { indent: 1, text: "loves: ['coffee', 'mountains', 'sea']," },
  { indent: 1, text: "goal: 'AI-powered full stack engineer'," },
  { indent: 0, text: "};" },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
      <Doodles theme="coding" />

      {/* ambient blobs */}
      <div
        className="animate-blob absolute -top-24 -left-24 h-80 w-80 opacity-30 blur-3xl"
        style={{ background: "var(--color-amber)" }}
      />
      <div
        className="animate-blob absolute -bottom-24 -right-16 h-96 w-96 opacity-20 blur-3xl"
        style={{ background: "var(--color-teal)", animationDelay: "3s" }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-2">
        {/* Left: intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm tracking-wide opacity-60">Hi, I'm</p>
          <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            {profile.name}
            <span className="block text-gradient">builds software</span>
            that travels well.
          </h1>
          <div className="mt-5 h-8 font-mono text-lg opacity-75">
            {typed}
            <span className="animate-blink" style={{ color: "var(--color-amber)" }}>|</span>
          </div>
          <p className="mt-5 max-w-lg text-base opacity-70">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AnimatedButton as={Link} to="/works">
              See my work
            </AnimatedButton>
            <AnimatedButton as="a" href={profile.resumeUrl} download variant="outline">
              <Download size={15} /> Resume
            </AnimatedButton>
          </div>

          <div className="mt-9 flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100"><FaGithub size={20} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100"><FaLinkedin size={20} /></a>
            <a href={`mailto:${profile.email}`} className="opacity-70 hover:opacity-100"><Mail size={20} /></a>
          </div>
        </motion.div>

        {/* Right: signature element — terminal + boarding pass + visiting card */}
        <div className="relative h-[430px] sm:h-[470px]">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass animate-float absolute left-0 top-0 w-[85%] max-w-sm rounded-2xl p-3.5 shadow-2xl"
          >
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 font-mono text-[10px] opacity-50">profile.ts</span>
            </div>
            <div className="space-y-1 font-mono text-[13px] leading-relaxed">
              {CODE_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  style={{ paddingLeft: line.indent * 16 }}
                >
                  <span style={{ color: line.indent ? "var(--color-teal)" : "var(--color-amber)" }}>
                    {line.text}
                  </span>
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* '</>' coding badge — blinking cursor, same treatment as the coffee mug */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="animate-float glass absolute -left-3 top-[108px] flex h-11 w-11 items-center justify-center rounded-full shadow-xl sm:top-[122px]"
          >
            <span className="font-mono text-xs font-bold" style={{ color: "var(--color-teal)" }}>
              &lt;/&gt;<span className="animate-blink" style={{ color: "var(--color-amber)" }}>|</span>
            </span>
          </motion.div>

          {/* Smaller animated coffee mug with rising steam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="animate-float-slower glass absolute right-0 top-0 flex items-center justify-center rounded-full shadow-xl"
            style={{ height: 92, width: 92 }}
          >
            <CoffeeMug size={50} />
          </motion.div>

          {/* Travel badge — gently banking plane */}
          <motion.div
            animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute right-[88px] top-[78px] flex h-10 w-10 items-center justify-center rounded-full shadow-lg sm:top-[86px]"
          >
            <Plane size={16} style={{ color: "var(--color-teal)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass animate-float-slow absolute top-[108px] right-0 w-56 rounded-2xl p-4 shadow-2xl sm:top-[120px]"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Boarding Pass</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-semibold">DHK</p>
                <p className="text-[10px] opacity-50">Home</p>
              </div>
              <span className="opacity-40">✈</span>
              <div className="text-right">
                <p className="font-display text-lg font-semibold">???</p>
                <p className="text-[10px] opacity-50">Next stop</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between border-t border-dashed border-current/20 pt-1.5 text-[10px] opacity-50">
              <span>Seat: 4A</span>
              <span>Gate: Curiosity</span>
            </div>
          </motion.div>

          {/* Game badge — controller pulse */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute left-[44%] top-[220px] flex h-10 w-10 items-center justify-center rounded-full shadow-lg sm:top-[240px]"
          >
            <Gamepad2 size={16} style={{ color: "var(--color-violet)" }} />
          </motion.div>

          <VisitingCard />
          <FunCard />
        </div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}

// Ticket "notch" — mimics a punched hole by matching the page background,
// so the perforation line looks like it cuts through the card.
function TicketNotch({ side }) {
  const pos = side === "left" ? "-left-2" : "-right-2";
  return (
    <>
      <span
        className={`dark:hidden absolute ${pos} top-1/2 h-4 w-4 -translate-y-1/2 rounded-full`}
        style={{ background: "var(--color-paper)" }}
      />
      <span
        className={`hidden dark:block absolute ${pos} top-1/2 h-4 w-4 -translate-y-1/2 rounded-full`}
        style={{ background: "var(--color-ink)" }}
      />
    </>
  );
}

function FunCard() {
  const items = ["Coffee chats", "Pair programming", "Co-op game nights", "Trip planning talk"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 5 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.8, delay: 0.65 }}
      className="glass animate-float absolute bottom-0 right-0 w-52 overflow-visible rounded-t-2xl pb-3.5 shadow-2xl"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 90%, 93% 100%, 86% 88%, 79% 100%, 72% 88%, 65% 100%, 58% 88%, 51% 100%, 44% 88%, 37% 100%, 30% 88%, 23% 100%, 16% 88%, 9% 100%, 2% 88%, 0 96%)",
        border: "2px dashed color-mix(in srgb, var(--color-coral) 65%, transparent)",
      }}
    >
      {/* colored wash so the torn edge actually reads as a tear */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-coral) 30%, transparent), transparent)" }}
      />
      <div className="relative p-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "color-mix(in srgb, var(--color-coral) 22%, transparent)" }}
          >
            <PartyPopper size={15} style={{ color: "var(--color-coral)" }} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold">Open for fun</p>
            <p className="text-[9px] font-mono uppercase tracking-wider opacity-45">Admit one · No expiry</p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-dashed border-current/25">
        <TicketNotch side="left" />
        <TicketNotch side="right" />
      </div>

      <ul className="space-y-1 px-3.5 pt-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2 text-[11px] opacity-65">
            <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-coral)" }} />
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function VisitingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.8, delay: 0.55 }}
      className="glass animate-float-slow absolute bottom-0 left-2 w-56 rounded-2xl p-4 shadow-2xl sm:left-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-base font-semibold">{profile.name}</p>
          <p className="text-[11px] opacity-55">{profile.fullTitle}</p>
        </div>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: "var(--color-amber)", color: "var(--color-ink)" }}
        >
          {profile.name.slice(0, 1)}
        </span>
      </div>
      <div className="mt-2.5 border-t border-dashed border-current/20 pt-2.5">
        <a href={`mailto:${profile.email}`} className="block truncate text-[11px] opacity-60 hover:opacity-100">
          {profile.email}
        </a>
        <div className="mt-2 flex items-center gap-2.5">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="opacity-60 hover:opacity-100">
            <FaGithub size={14} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="opacity-60 hover:opacity-100">
            <FaLinkedin size={14} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="opacity-60 hover:opacity-100">
            <Mail size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
