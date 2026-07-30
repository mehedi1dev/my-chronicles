// Thin adapter — all actual data lives in /db/profile.json.
// Edit that file to change site content; components import from here
// and never need to change.
import db from "../../db/profile.json";

export const profile = db.profile;
export const stats = db.stats;
export const techStack = db.techStack;
export const skillGroups = db.skillGroups;
export const experience = db.experience;
export const currentlyLearning = db.currentlyLearning;
export const now = db.now;
