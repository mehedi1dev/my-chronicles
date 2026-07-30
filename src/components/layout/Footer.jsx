import { Link } from "react-router-dom";
import SocialIcons from "../ui/SocialIcons";
import CoffeeMug from "../ui/CoffeeMug";
import { profile } from "../../data/profile";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", path: "/" },
      { label: "Work & Skills", path: "/works" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Education", path: "/education" },
      { label: "My Journey", path: "/journey" },
      { label: "Travels", path: "/travels" },
    ],
  },
  {
    title: "Beyond Code",
    links: [
      { label: "Entertainment", path: "/entertainment" },
      { label: "Faith", path: "/faith" },
      { label: "Photography", path: "/activities/photography" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-current/10 px-5 pb-8 pt-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold">
              <CoffeeMug size={30} />
              Mehedi
            </Link>
            <p className="mt-3 max-w-xs text-sm opacity-60">{profile.tagline}</p>
            <SocialIcons className="mt-5" />
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-mono uppercase tracking-wide opacity-50">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className="text-sm opacity-70 hover:opacity-100">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-current/10 pt-6 text-xs opacity-50 md:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React, Vite & a lot of coffee.</p>
          <p>Designed & developed from {profile.location}.</p>
        </div>
      </div>
    </footer>
  );
}
