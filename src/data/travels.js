// Thin adapter — actual data lives in /db/travels.json.
// Travel stories are derived from `destinations` here (not stored twice) so
// the interactive map and the stories carousel always share one source.
import db from "../../db/travels.json";

export const destinations = db.destinations;
export const travelMotivations = db.travelMotivations;

export const travelStories = destinations
  .filter((d) => d.visited && d.storyTitle)
  .map((d) => ({
    id: `${d.id}-story`,
    title: d.storyTitle,
    location: `${d.name}, ${d.country}`,
    date: d.date,
    weather: d.weather,
    experience: d.description,
    memories: d.memories || [],
  }));

// Quick stats + turning-point style "passport stamps" derived straight from
// the destinations list — no separate data entry needed.
export const travelStats = [
  { label: "Countries visited", value: new Set(destinations.filter((d) => d.visited).map((d) => d.country)).size },
  { label: "Cities & spots", value: destinations.filter((d) => d.visited).length },
  { label: "Categories explored", value: new Set(destinations.map((d) => d.category)).size },
  { label: "Stories logged", value: travelStories.length },
];
