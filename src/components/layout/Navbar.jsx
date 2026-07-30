import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Home, GraduationCap, Briefcase, Bus,
  Gamepad2, Star, Award, Route, Camera,
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import CoffeeMug from "../ui/CoffeeMug";

const NAV = [
  { label: "Home", path: "/", icon: Home, color: "var(--color-teal)" },
  { label: "Education", path: "/education", icon: GraduationCap, color: "var(--color-amber)" },
  { label: "Work & Skills", path: "/works", icon: Briefcase, color: "var(--color-violet)" },
  { label: "Travels", path: "/travels", icon: Bus, color: "var(--color-coral)" },
  { label: "Entertainment", path: "/entertainment", icon: Gamepad2, color: "var(--color-teal)" },
  { label: "Faith", path: "/faith", icon: Star, color: "var(--color-amber)" },
  { label: "My Journey", path: "/journey", icon: Route, color: "var(--color-teal)" },
  { label: "Photography", path: "/activities/photography", icon: Camera, color: "var(--color-violet)" },
];

function NavLabel({ label, Icon, isActive, color }) {
  return (
    <>
      <span className={isActive ? "font-bold" : ""} style={{ color: isActive ? "var(--color-amber)" : undefined }}>
        {label}
      </span>
      <Icon
        className="pointer-events-none absolute -top-0.5 -right-1.5 opacity-80 transition-all duration-200 ease-out group-hover:-top-1.5 group-hover:-right-3"
        style={{ width: "0.7em", height: "0.7em", color }}
      />
      {isActive && (
        <span
          className="absolute left-1/2 h-[2px] w-1/2 -translate-x-1/2 rounded-full"
          style={{ background: "var(--color-amber)", bottom: "-6px" }}
        />
      )}
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight">
          <CoffeeMug size={22} />
          Mehedi
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <button className="group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm opacity-80 hover:opacity-100">
                  <span className="relative">
                    {item.label}
                    <item.icon
                      className="pointer-events-none absolute -top-0.5 -right-1.5 opacity-80 transition-all duration-200 ease-out group-hover:-top-1.5 group-hover:-right-3"
                      style={{ width: "0.7em", height: "0.7em", color: item.color }}
                    />
                  </span>
                  <ChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="glass absolute left-0 mt-1 w-44 overflow-hidden rounded-xl p-1"
                    >
                      {item.children.map((c) => (
                        <NavLink
                          key={c.path}
                          to={c.path}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm opacity-80 hover:opacity-100 hover:bg-current/5"
                        >
                          <c.icon size={13} style={{ color: c.color }} />
                          {c.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative rounded-full px-3.5 py-2 text-sm transition-opacity hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    <NavLabel label={item.label} Icon={item.icon} isActive={isActive} color={item.color} />
                  </span>
                )}
              </NavLink>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="hidden items-center gap-1 rounded-full border border-current/15 px-3 py-1.5 text-xs opacity-70 md:flex"
          >
            <kbd className="font-mono">Ctrl</kbd>
            <span className="opacity-50">+</span>
            <kbd className="font-mono">K</kbd>
          </button>
          <ThemeToggle />
          <NavLink
            to="/contact"
            className="hidden rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] dark:bg-[var(--color-amber)] dark:text-[var(--color-ink)] md:inline-flex"
          >
            Contact
          </NavLink>
          <button className="lg:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6">
              {NAV.flatMap((item) => (item.children ? item.children : [item])).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm hover:bg-current/5 ${
                      isActive ? "font-bold opacity-100" : "opacity-80"
                    }`
                  }
                  style={({ isActive }) => ({ color: isActive ? "var(--color-amber)" : undefined })}
                >
                  <item.icon size={14} style={{ color: item.color }} />
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-[var(--color-ink)] px-4 py-2.5 text-center text-sm font-medium text-[var(--color-paper)] dark:bg-[var(--color-amber)] dark:text-[var(--color-ink)]"
              >
                Contact
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
