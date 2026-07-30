import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, Compass, LayoutList } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Modal from "../ui/Modal";
import { prophetsJourney } from "../../data/faith";

export default function ProphetsJourney() {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);

  const p = prophetsJourney[index];
  const total = prophetsJourney.length;
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));
  const restart = () => setIndex(0);

  const indexFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const fraction = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return Math.round(fraction * (total - 1));
  };

  const startDrag = (e) => {
    setDragging(true);
    const move = (ev) => {
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      setIndex(indexFromClientX(clientX));
    };
    const stop = () => {
      setDragging(false);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", stop);
    move(e);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Journey path — click or drag the handle to jump to any prophet */}
      <div className="mb-8">
        <div
          ref={trackRef}
          onClick={(e) => setIndex(indexFromClientX(e.clientX))}
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-current/10 py-3"
          style={{ marginTop: -12, marginBottom: -12 }}
        >
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-current/10" />
          <motion.div
            className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-teal), var(--color-amber))" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: dragging ? 0 : 0.5 }}
          />
          <motion.div
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="absolute top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-grab items-center justify-center rounded-full shadow active:cursor-grabbing"
            style={{ background: "var(--color-amber)" }}
            animate={{ left: `calc(${progress}% - 10px)` }}
            transition={{ duration: dragging ? 0 : 0.5 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-mono opacity-45">
          <span>Adam</span>
          <span>Step {index + 1} of {total}</span>
          <span>Muhammad ﷺ</span>
        </div>
      </div>

      {/* Current stop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: dragging ? 0 : 0.4 }}
        >
          <GlassCard className="p-8 text-center border-current/10">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-teal) 18%, transparent)" }}
            >
              <Compass size={22} style={{ color: "var(--color-teal)" }} />
            </motion.div>
            <p className="font-display text-xl font-semibold">{p.name}</p>
            <p className="mt-1 font-display text-lg opacity-70">{p.arabic}</p>
            <p className="mt-4 text-sm leading-relaxed opacity-80">{p.topic}</p>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={restart}
          className="flex items-center gap-1.5 rounded-full border border-current/15 px-4 py-2 text-xs hover:bg-current/5"
        >
          <RotateCcw size={13} /> Start from Adam
        </button>
        <button
          onClick={back}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-full border border-current/15 px-4 py-2 text-xs hover:bg-current/5 disabled:opacity-40"
        >
          <ArrowLeft size={13} /> Back
        </button>
        <button
          onClick={next}
          disabled={isLast}
          className="flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-medium disabled:opacity-40"
          style={{ background: "var(--color-amber)", color: "var(--color-ink)" }}
        >
          {isLast ? "Journey complete" : "Guide me forward"} {!isLast && <ArrowRight size={13} />}
        </button>
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center gap-1.5 rounded-full border border-current/15 px-4 py-2 text-xs hover:bg-current/5"
        >
          <LayoutList size={13} /> See all prophets
        </button>
      </div>

      <Modal open={showAll} onClose={() => setShowAll(false)}>
        <p className="mb-4 text-center font-display text-lg font-semibold">Every Prophet Named in the Qur'an</p>
        <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
          {prophetsJourney.map((prophet, i) => (
            <button
              key={prophet.name}
              onClick={() => { setIndex(i); setShowAll(false); }}
              className="block w-full rounded-xl border border-current/10 bg-current/5 p-4 text-left hover:bg-current/10"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display font-semibold">{i + 1}. {prophet.name}</p>
                <p className="font-display text-sm opacity-60">{prophet.arabic}</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed opacity-70">{prophet.summary}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
