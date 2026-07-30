// Approximate Bengali (Bangla) calendar conversion — good enough for display
// purposes. Bengali New Year (Pohela Boishakh) is treated as falling on
// April 14 each Gregorian year.

const BENGALI_MONTHS = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
  "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র",
];

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBengaliNumeral(num) {
  return String(num)
    .split("")
    .map((d) => BENGALI_DIGITS[Number(d)] ?? d)
    .join("");
}

export function toBengaliDate(date = new Date()) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth(); // 0-indexed
  const gDay = date.getDate();

  const afterNewYear = gMonth > 3 || (gMonth === 3 && gDay >= 14);
  const bengaliYear = afterNewYear ? gYear - 593 : gYear - 594;

  const newYearRef = afterNewYear ? new Date(gYear, 3, 14) : new Date(gYear - 1, 3, 14);
  const diffDays = Math.floor((date - newYearRef) / 86400000);

  // Standard month lengths (pre-2019 scheme): first 5 months 31 days,
  // next 6 months 30 days, Falgun 29/30 depending on leap year.
  const isLeap = (gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0;
  const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isLeap ? 30 : 29, 30];

  let remaining = diffDays;
  let monthIndex = 0;
  while (monthIndex < 11 && remaining >= monthLengths[monthIndex]) {
    remaining -= monthLengths[monthIndex];
    monthIndex++;
  }
  const bengaliDay = remaining + 1;

  return {
    day: bengaliDay,
    month: BENGALI_MONTHS[monthIndex],
    year: bengaliYear,
    formatted: `${toBengaliNumeral(bengaliDay)} ${BENGALI_MONTHS[monthIndex]} ${toBengaliNumeral(bengaliYear)}`,
  };
}
