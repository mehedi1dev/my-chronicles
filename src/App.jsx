import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import BackToTop from "./components/ui/BackToTop";
import Loader from "./components/ui/Loader";
import CommandPalette from "./components/ui/CommandPalette";
import FloatingSocial from "./components/ui/FloatingSocial";
import { useKonamiCode } from "./hooks/useKonamiCode";

// Home stays eager for the fastest possible first paint on the landing page.
import Home from "./pages/Home";
// Everything else is code-split — smaller initial bundle, faster load, better
// Core Web Vitals (which Google does factor into ranking).
const Education = lazy(() => import("./pages/Education"));
const Works = lazy(() => import("./pages/Works"));
const Travels = lazy(() => import("./pages/Travels"));
const Entertainment = lazy(() => import("./pages/Entertainment"));
const Faith = lazy(() => import("./pages/Faith"));
const Photography = lazy(() => import("./pages/activities/Photography"));
const MyJourney = lazy(() => import("./pages/MyJourney"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function KonamiEasterEgg() {
  const active = useKonamiCode();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-6 left-1/2 z-[300] -translate-x-1/2 rounded-full px-6 py-3 font-mono text-sm shadow-2xl"
          style={{ background: "var(--color-amber)", color: "var(--color-ink)" }}
        >
          🎮 Konami activated — you found the easter egg, fellow developer.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader show={loading} />
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <FloatingSocial />
      <KonamiEasterEgg />
      <Navbar />
      <ScrollToTop />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/works" element={<Works />} />
            <Route path="/travels" element={<Travels />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/faith" element={<Faith />} />
            <Route path="/activities/photography" element={<Photography />} />
            <Route path="/journey" element={<MyJourney />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
