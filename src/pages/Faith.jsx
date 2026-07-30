import { motion } from "framer-motion";
import SEO from "../components/ui/SEO";
import SectionTitle from "../components/ui/SectionTitle";
import Doodles from "../components/ui/Doodles";
import QuranSlider from "../components/faith/QuranSlider";
import PrayerTimes from "../components/faith/PrayerTimes";
import HadithSlider from "../components/faith/HadithSlider";
import NamesOfAllah from "../components/faith/NamesOfAllah";
import DailyDua from "../components/faith/DailyDua";
import LifeJourney from "../components/faith/LifeJourney";
import ProphetsJourney from "../components/faith/ProphetsJourney";
import IslamicCalendar from "../components/faith/IslamicCalendar";
import GoodDeedTracker from "../components/faith/GoodDeedTracker";
import GratitudeList from "../components/faith/GratitudeList";
import { gratitudeList } from "../data/faith";

export default function Faith() {
  return (
    <div className="relative">
      <SEO title="Faith" description="Qur'an verses, daily prayer times, the Prophets' Journey, and quiet reminders." />
      <Doodles theme="faith" />

      <div className="relative">
        {/* Custom hero: text left, animated Names of Allah spotlight right */}
        <section className="relative overflow-hidden pt-36 pb-16 px-5 md:px-8">
          <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs uppercase tracking-[0.25em] opacity-60"
                style={{ color: "var(--color-amber)" }}
              >
                Faith
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-3 font-display text-4xl font-bold sm:text-5xl"
              >
                A quiet part of the everyday
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 max-w-md text-base opacity-70 mx-auto md:mx-0"
              >
                A few verses, today's prayer times, and words from the Prophet ﷺ — small anchors through the day.
              </motion.p>
            </div>
            <NamesOfAllah compact />
          </div>
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="01 — Qur'an" title="Verses I return to" align="center" />
          <QuranSlider />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="02 — Prayer times" title="Today, wherever you are" align="center" />
          <PrayerTimes />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="03 — A reminder" title="Every soul will taste death" align="center" />
          <LifeJourney />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="04 — Daily Dua" title="Words I keep close" align="center" />
          <DailyDua />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="05 — Prophets' Journey" title="From Adam to Muhammad ﷺ" subtitle="Every prophet named in the Qur'an, one step at a time." align="center" />
          <ProphetsJourney />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="06 — Small acts" title="A little good-deed nudge" align="center" />
          <GoodDeedTracker />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="07 — Hadith" title="Words from the Prophet ﷺ" align="center" />
          <HadithSlider />
        </section>

        <section className="relative py-14 px-5 md:px-8">
          <SectionTitle eyebrow="08 — Islamic Calendar" title="Occasions worth marking" align="center" />
          <IslamicCalendar />
        </section>

        <section className="relative py-14 px-5 md:px-8 pb-28">
          <SectionTitle eyebrow="09 — Gratitude" title="A short list, kept honest" align="center" />
          <GratitudeList items={gratitudeList} />
        </section>
      </div>
    </div>
  );
}
