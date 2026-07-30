import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search, Home, GraduationCap, Briefcase, Plane, Gamepad2, Moon as MoonIcon,
  Camera, BookOpen, Brain, Award, Route, Mail, Download, SunMoon,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { profile } from "../../data/profile";

const ROUTES = [
  { label: "Home", path: "/", desc: "Back to the landing page", icon: Home },
  { label: "Education", path: "/education", desc: "Timeline, courses & books", icon: GraduationCap },
  { label: "Work & Skills", path: "/works", desc: "Tech stack, projects & case studies", icon: Briefcase },
  { label: "Travels", path: "/travels", desc: "Interactive map & travel stories", icon: Plane },
  { label: "Entertainment", path: "/entertainment", desc: "Games, movies, shows & anime", icon: Gamepad2 },
  { label: "Faith", path: "/faith", desc: "Qur'an, prayer times & hadith", icon: MoonIcon },
  { label: "Photography", path: "/activities/photography", desc: "Photo galleries", icon: Camera },
  { label: "My Journey", path: "/journey", desc: "University to current job", icon: Route },
  { label: "Contact", path: "/contact", desc: "Email, socials & FAQ", icon: Mail },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => { setOpen(false); setQuery(""); };

  const ACTIONS = useMemo(
    () => [
      { label: "Toggle theme", desc: "Switch between light & dark", icon: SunMoon, run: () => { toggleTheme(); close(); } },
      { label: "Download resume", desc: "Opens the PDF in a new tab", icon: Download, run: () => { window.open(profile.resumeUrl, "_blank"); close(); } },
      { label: "Email me", desc: profile.email, icon: Mail, run: () => { window.location.href = `mailto:${profile.email}`; close(); } },
      { label: "Open GitHub", desc: "View my repositories", icon: FaGithub, run: () => { window.open(profile.github, "_blank"); close(); } },
      { label: "Open LinkedIn", desc: "Connect with me", icon: FaLinkedin, run: () => { window.open(profile.linkedin, "_blank"); close(); } },
    ],
    [toggleTheme]
  );

  const results = useMemo(() => {
    const q = query.toLowerCase();
    const routeMatches = ROUTES.filter((r) => r.label.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q))
      .map((r) => ({ ...r, run: () => go(r.path) }));
    const actionMatches = ACTIONS.filter((a) => a.label.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
    return [...routeMatches, ...actionMatches];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, ACTIONS]);

  const go = (path) => {
    navigate(path);
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-24"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg rounded-2xl p-2 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-current/10 px-3 py-3">
              <Search size={16} className="opacity-50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or run a command…"
                className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
              />
              <kbd className="rounded border border-current/20 px-1.5 py-0.5 text-[10px] opacity-50">esc</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-4 py-3 text-sm opacity-50">No matches.</p>
              )}
              {results.map((r) => (
                <button
                  key={r.label}
                  onClick={r.run}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-current/5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-current/5">
                    <r.icon size={15} className="opacity-70" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{r.label}</span>
                    <span className="block truncate text-xs opacity-50">{r.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
