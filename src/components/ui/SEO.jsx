import { useEffect } from "react";

// Lightweight per-page SEO — updates the document title and meta description
// on route change. Googlebot renders JS, so this genuinely helps distinct
// pages get indexed with their own title/snippet instead of one generic one.
export default function SEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Mehedi` : "Mehedi — Full Stack Developer & AI Engineer";
    document.title = fullTitle;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:title", fullTitle, "property");
      setMeta("og:description", description, "property");
      setMeta("twitter:title", fullTitle);
      setMeta("twitter:description", description);
    }
  }, [title, description]);

  return null;
}
