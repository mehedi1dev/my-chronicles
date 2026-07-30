import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Calendar, ArrowRight, ExternalLink, Globe2, Mountain, Waves, Droplet, CloudRain, Building2, ChevronDown } from "lucide-react";
import { destinations } from "../../data/travels";
import Modal from "./Modal";

// Icon + label lookup for whatever category tags show up in the data.
// Add a new destination with a new `category` tag and it renders automatically,
// falling back to a generic pin icon for anything not listed here.
const CATEGORY_META = {
  mountain: { label: "Mountains", icon: Mountain },
  sea: { label: "Sea", icon: Waves },
  lake: { label: "Lake", icon: Droplet },
  waterfall: { label: "Waterfall", icon: CloudRain },
  city: { label: "City", icon: Building2 },
};

// Bangladesh bounding box — the map's default view on load.
const BANGLADESH_BOUNDS = [
  [20.3, 88.0],
  [26.7, 92.7],
];

// A single consistent pin icon for every destination.
function pinIcon(color) {
  return L.divIcon({
    className: "",
    html: `<svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.3 21.7 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="5.5" fill="white"/>
    </svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -32],
  });
}
const destinationIcon = pinIcon("#f2a65a");

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 7, { duration: 1.1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position ? position.join(",") : null]);
  return null;
}

export default function TravelMap() {
  const [expanded, setExpanded] = useState("all");
  const [active, setActive] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);

  // Build the category list dynamically from whatever tags exist in the data.
  const categories = useMemo(() => {
    const tags = [...new Set(destinations.map((d) => d.category))];
    const all = { id: "all", label: "All", icon: Globe2, items: destinations };
    const rest = tags.map((tag) => ({
      id: tag,
      label: CATEGORY_META[tag]?.label || tag.charAt(0).toUpperCase() + tag.slice(1),
      icon: CATEGORY_META[tag]?.icon || MapPin,
      items: destinations.filter((d) => d.category === tag),
    }));
    return [all, ...rest];
  }, []);

  const visiblePins = useMemo(
    () => categories.find((c) => c.id === expanded)?.items || destinations,
    [categories, expanded]
  );

  const openPin = (d) => {
    setActive(d);
    setFlyTarget([d.lat, d.lng]);
  };

  const toggleCategory = (id) => {
    setExpanded((cur) => (cur === id ? null : id));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
      {/* Category accordion — each one expands to show its own locations */}
      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
          const isExpanded = expanded === cat.id;
          return (
            <div key={cat.id}>
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-all ${
                  isExpanded
                    ? "border-transparent bg-[var(--color-amber)] text-[var(--color-ink)]"
                    : "border-current/10 bg-current/5 hover:bg-current/10"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isExpanded ? "bg-black/10" : "bg-current/10"}`}
                >
                  <cat.icon size={15} />
                </span>
                <span className="flex-1 whitespace-nowrap font-medium">{cat.label}</span>
                <span className="text-[10px] opacity-60">{cat.items.length}</span>
                <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 mt-1.5 max-h-40 overflow-y-auto flex flex-col gap-1 border-l border-current/15 pl-3 py-1">
                      {cat.items.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => openPin(d)}
                          className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-all ${
                            active?.id === d.id
                              ? "bg-current/15 font-semibold"
                              : "bg-current/0 hover:bg-current/10 opacity-75"
                          }`}
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: "var(--color-amber)" }}
                          />
                          <span className="whitespace-nowrap">{d.name}</span>
                          {active?.id === d.id && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-teal)" }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Map area */}
      <div className="relative overflow-hidden rounded-3xl border border-current/10">
        <MapContainer
          bounds={BANGLADESH_BOUNDS}
          scrollWheelZoom
          className="z-0 h-[420px] w-full sm:h-[480px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {flyTarget && <FlyTo position={flyTarget} />}
          {visiblePins.map((d) => (
            <Marker
              key={d.id}
              position={[d.lat, d.lng]}
              icon={destinationIcon}
              eventHandlers={{ click: () => openPin(d) }}
            >
              <Popup>
                <div className="text-sm font-medium">{d.name}, {d.country}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs opacity-60">
              <span className="flex items-center gap-1"><Calendar size={12} /> {active.date}</span>
            </div>
            <h3 className="font-display text-xl font-semibold">{active.name}, {active.country}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm opacity-60">
              {active.from} <ArrowRight size={12} /> {active.to}
            </p>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{active.description}</p>

            <a
              href={`https://www.google.com/maps?q=${active.lat},${active.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "var(--color-teal)" }}
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>

            <p className="mt-4 mb-2 font-mono text-xs uppercase tracking-wide opacity-50">Photos</p>
            <div
              className={`grid gap-2 ${
                active.images.length <= 2
                  ? "grid-cols-2"
                  : active.images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2"
              }`}
            >
              {active.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${active.name} ${i + 1}`}
                  loading="lazy"
                  className={`w-full rounded-xl object-cover ${active.images.length <= 2 ? "h-36" : "h-24"}`}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
