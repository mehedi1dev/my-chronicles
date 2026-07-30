import { stats } from "../../data/profile";
import StatCard from "../ui/StatCard";

export default function Stats() {
  return (
    <section className="relative py-20 px-5 md:px-8">
      <div className="glass mx-auto grid max-w-6xl grid-cols-2 gap-8 rounded-3xl p-10 sm:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
