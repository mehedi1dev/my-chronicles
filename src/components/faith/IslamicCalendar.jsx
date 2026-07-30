import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Loader2 } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { islamicCalendar } from "../../data/faith";

// Current approximate Hijri year — used as the starting point for conversion;
// if an event's date this Hijri year has already passed, we roll to next year.
function currentHijriYearGuess() {
  const gYear = new Date().getFullYear();
  return gYear - 579; // rough Gregorian → Hijri offset
}

export default function IslamicCalendar() {
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const hijriYear = currentHijriYearGuess();

    Promise.all(
      islamicCalendar.map(async (event) => {
        for (const yearGuess of [hijriYear, hijriYear + 1]) {
          try {
            const res = await fetch(
              `https://api.aladhan.com/v1/hToG/${event.hijriDay}-${String(event.hijriMonth).padStart(2, "0")}-${yearGuess}`
            );
            const data = await res.json();
            if (data.code === 200) {
              const g = data.data.gregorian;
              const gregorianDate = new Date(`${g.year}-${g.month.number}-${g.day}`);
              if (gregorianDate >= new Date(new Date().toDateString())) {
                return [event.name, `${g.day} ${g.month.en} ${g.year}`];
              }
            }
          } catch {
            // try next guess / fall through to unavailable
          }
        }
        return [event.name, null];
      })
    ).then((pairs) => {
      if (!cancelled) {
        setDates(Object.fromEntries(pairs));
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {islamicCalendar.map((event, i) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <GlassCard className="h-full p-5 border-current/10 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-amber) 18%, transparent)" }}
              >
                <Moon size={16} style={{ color: "var(--color-amber)" }} />
              </motion.div>
              <p className="font-display text-sm font-semibold">{event.name}</p>
              <p className="mt-1 font-mono text-[11px]" style={{ color: "var(--color-teal)" }}>
                {loading ? (
                  <Loader2 size={11} className="mx-auto animate-spin" />
                ) : (
                  dates[event.name] || "Date varies by moon sighting"
                )}
              </p>
              <p className="mt-1.5 text-xs opacity-65">{event.note}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs opacity-45">
        Gregorian dates converted live via the Aladhan API — actual dates depend on local moon sighting.
      </p>
    </div>
  );
}
