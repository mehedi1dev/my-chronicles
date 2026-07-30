// Auto-calculates "X years, Y months" of experience from a fixed start date.
export function experienceSince(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearLabel = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthLabel = months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";

  return [yearLabel, monthLabel].filter(Boolean).join(", ") || "Just started";
}
