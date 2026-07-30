import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import GlassCard from "./GlassCard";
import { profile } from "../../data/profile";

const ITEMS = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, color: "var(--color-amber)" },
  { icon: FaWhatsapp, label: "WhatsApp", value: profile.whatsapp, href: `https://wa.me/${profile.whatsapp.replace(/[^\d]/g, "")}`, color: "#3fbfb0" },
  { icon: FaFacebook, label: "Facebook", value: profile.facebook.replace("https://", ""), href: profile.facebook, color: "#4267B2" },
  { icon: FaLinkedin, label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin, color: "#0A66C2" },
  { icon: FaGithub, label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, color: "#333" },
  { icon: MapPin, label: "Address", value: profile.address, href: `https://maps.google.com/?q=${encodeURIComponent(profile.address)}`, color: "var(--color-coral)" },
];

export default function SocialInfoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((item, i) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          title={item.value}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
          className="group block"
        >
          <GlassCard className="relative overflow-hidden p-5 border-current/10">
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ background: "color-mix(in srgb, currentColor 10%, transparent)" }}
              >
                <item.icon size={18} style={{ color: item.color }} />
              </span>
              <div className="min-w-0">
                <p className="text-xs opacity-55">{item.label}</p>
                <p className="truncate text-sm font-medium">{item.label === "Address" ? "Tap to open in Maps" : item.value}</p>
              </div>
            </div>
            {/* hover reveal of full url/value */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-current/5 px-5 py-2 text-[11px] opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.value}
            </div>
          </GlassCard>
        </motion.a>
      ))}
    </div>
  );
}
