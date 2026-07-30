// Turns a flat list of {start, end} events into a lane-assigned layout so
// overlapping date ranges (e.g. a degree done alongside a job) render side
// by side instead of stacking awkwardly.

function toFraction(ym) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map(Number);
  return y + (m - 1) / 12;
}

export function layoutJourney(events) {
  const now = new Date();
  const nowFraction = now.getFullYear() + now.getMonth() / 12;

  const items = events
    .map((e) => ({
      ...e,
      startF: toFraction(e.start),
      endF: e.end ? toFraction(e.end) : nowFraction + 0.4,
    }))
    .sort((a, b) => a.startF - b.startF);

  const laneEnds = []; // end fraction of the last event in each lane
  items.forEach((item) => {
    let laneIndex = laneEnds.findIndex((end) => end <= item.startF);
    if (laneIndex === -1) {
      laneIndex = laneEnds.length;
    }
    laneEnds[laneIndex] = item.endF;
    item.lane = laneIndex;
  });

  const min = Math.min(...items.map((i) => i.startF));
  const max = Math.max(...items.map((i) => i.endF));
  const laneCount = laneEnds.length;

  return { items, min, max, laneCount };
}
