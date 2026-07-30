import { useRef, useState } from "react";
import { MapPin, Calendar, CloudSun, Camera, ChevronLeft, ChevronRight, Waves } from "lucide-react";
import Modal from "./Modal";
import GlassCard from "./GlassCard";
import TravelAllModal from "./TravelAllModal";

export default function TravelTimelineCarousel({ stories }) {
  const [active, setActive] = useState(null);
  const [showRiver, setShowRiver] = useState(false);
  const trackRef = useRef(null);

  const scrollBy = (dir) => trackRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm opacity-60">Click any stop for the full story.</p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRiver(true)}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium"
            style={{ background: "var(--color-teal)", color: "var(--color-ink)" }}
          >
            <Waves size={14} /> See all travels
          </button>
          <button
            onClick={() => scrollBy(-1)}
            className="flex items-center gap-1 rounded-full border border-current/15 px-3 py-2 text-xs font-medium hover:bg-current/5"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="flex items-center gap-1 rounded-full border border-current/15 px-3 py-2 text-xs font-medium hover:bg-current/5"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-[46px] h-px bg-current/15" />
        <div ref={trackRef} className="no-scrollbar flex gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth">
          {stories.map((s) => (
            <button key={s.id} onClick={() => setActive(s)} className="relative w-60 shrink-0 text-left">
              <div className="flex items-center gap-2">
                <span
                  className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full ring-4"
                  style={{ background: "var(--color-amber)", "--tw-ring-color": "var(--color-paper)" }}
                />
                <span className="font-mono text-xs opacity-50">{s.date}</span>
              </div>
              <GlassCard className="mt-3 flex h-40 flex-col p-4 border-current/10 transition-transform hover:-translate-y-1">
                <p className="font-display text-sm font-semibold">{s.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs opacity-55">
                  <MapPin size={11} /> {s.location}
                </p>
                <p className="mt-2 line-clamp-2 text-xs opacity-65">{s.experience}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px]" style={{ color: "var(--color-teal)" }}>
                  <Camera size={11} /> View details
                </span>
              </GlassCard>
            </button>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div>
            <div
              className="mb-5 flex h-40 w-full items-center justify-center rounded-2xl text-4xl"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--color-amber) 35%, transparent), color-mix(in srgb, var(--color-teal) 35%, transparent))",
              }}
            >
              📸
            </div>
            <h3 className="font-display text-xl font-semibold">{active.title}</h3>
            <div className="mt-2 flex flex-wrap gap-3 text-xs opacity-60">
              <span className="flex items-center gap-1"><MapPin size={12} /> {active.location}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {active.date}</span>
              <span className="flex items-center gap-1"><CloudSun size={12} /> {active.weather}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-80">{active.experience}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wide opacity-50">Memories</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {active.memories.map((m) => (
                <li key={m} className="rounded-full bg-current/5 px-3 py-1 text-xs opacity-70">{m}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <Modal open={showRiver} onClose={() => setShowRiver(false)}>
        <p className="mb-1 text-center font-display text-lg font-semibold">All My Travels</p>
        <TravelAllModal stories={stories} />
      </Modal>
    </div>
  );
}
