import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sunrise, Sun, CloudSun, Sunset, Moon, Clock, MapPin, Navigation, Loader2 } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import PrayerClock from "./PrayerClock";
import { fallbackPrayerTimes } from "../../data/faith";
import { toBengaliDate } from "../../utils/bengaliDate";

const ICONS = { Fajr: Sunrise, Sunrise: Sun, Dhuhr: Sun, Asr: CloudSun, Maghrib: Sunset, Isha: Moon };

const CITIES = [
  { city: "Dhaka", country: "Bangladesh" },
  { city: "Chittagong", country: "Bangladesh" },
  { city: "Mecca", country: "Saudi Arabia" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Kuala Lumpur", country: "Malaysia" },
  { city: "Cairo", country: "Egypt" },
  { city: "London", country: "United Kingdom" },
  { city: "New York", country: "United States" },
];

function extractTimings(data) {
  const t = data.timings;
  return {
    Fajr: t.Fajr, Sunrise: t.Sunrise, Dhuhr: t.Dhuhr,
    Asr: t.Asr, Maghrib: t.Maghrib, Isha: t.Isha,
  };
}

export default function PrayerTimes() {
  const [times, setTimes] = useState(fallbackPrayerTimes);
  const [dates, setDates] = useState(null);
  const [source, setSource] = useState("fallback");
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [placeLabel, setPlaceLabel] = useState("Dhaka, Bangladesh");
  const [selectedCity, setSelectedCity] = useState("Dhaka");

  const loadByCity = (city, country) => {
    setLoading(true);
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) throw new Error("bad response");
        setTimes(extractTimings(data.data));
        setDates(data.data.date);
        setPlaceLabel(`${city}, ${country}`);
        setSource("live");
      })
      .catch(() => setSource("fallback"))
      .finally(() => setLoading(false));
  };

  const loadByCoords = (lat, lng) => {
    setLoading(true);
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) throw new Error("bad response");
        setTimes(extractTimings(data.data));
        setDates(data.data.date);
        setPlaceLabel("Your location");
        setSource("live");
      })
      .catch(() => setSource("fallback"))
      .finally(() => {
        setLoading(false);
        setLocating(false);
      });
  };

  useEffect(() => {
    loadByCity("Dhaka", "Bangladesh");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude),
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  const onCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    const match = CITIES.find((c) => c.city === city);
    if (match) loadByCity(match.city, match.country);
  };

  const gregorian = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const bengali = toBengaliDate().formatted;
  const hijri = dates
    ? `${dates.hijri.day} ${dates.hijri.month.en} ${dates.hijri.year} AH`
    : "Hijri date loading…";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-current/15 bg-current/5 px-3 py-2">
          <MapPin size={14} style={{ color: "var(--color-amber)" }} />
          <select
            value={selectedCity}
            onChange={onCityChange}
            className="bg-transparent text-sm outline-none"
          >
            {CITIES.map((c) => (
              <option key={c.city} value={c.city}>{c.city}, {c.country}</option>
            ))}
          </select>
        </div>
        <button
          onClick={useMyLocation}
          disabled={locating}
          className="flex items-center gap-1.5 rounded-full border border-current/15 px-3.5 py-2 text-xs hover:bg-current/5 disabled:opacity-50"
        >
          {locating ? <Loader2 size={13} className="animate-spin" /> : <Navigation size={13} />}
          Use my location
        </button>
      </div>

      <div className="mb-6 grid gap-3 text-center sm:grid-cols-3">
        <GlassCard className="p-4 border-current/10">
          <p className="font-mono text-[10px] uppercase tracking-wide opacity-45">English</p>
          <p className="mt-1 text-sm font-medium">{gregorian}</p>
        </GlassCard>
        <GlassCard className="p-4 border-current/10">
          <p className="font-mono text-[10px] uppercase tracking-wide opacity-45">বাংলা</p>
          <p className="mt-1 text-sm font-medium">{bengali}</p>
        </GlassCard>
        <GlassCard className="p-4 border-current/10">
          <p className="font-mono text-[10px] uppercase tracking-wide opacity-45">Hijri</p>
          <p className="mt-1 text-sm font-medium">{hijri}</p>
        </GlassCard>
      </div>

      <div className="mb-6 flex justify-center">
        <PrayerClock times={times} />
      </div>

      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 ${loading ? "opacity-50" : ""}`}>
        {Object.entries(times).map(([name, time], i) => {
          const Icon = ICONS[name] || Clock;
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-4 text-center border-current/10">
                <Icon size={18} className="mx-auto mb-2" style={{ color: "var(--color-amber)" }} />
                <p className="text-xs opacity-60">{name}</p>
                <p className="mt-1 font-display text-lg font-semibold">{time}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs opacity-45">
        {source === "live"
          ? `Live timings for ${placeLabel} via the Aladhan API.`
          : `Showing typical Dhaka timings — live lookup unavailable right now.`}
      </p>
    </div>
  );
}
