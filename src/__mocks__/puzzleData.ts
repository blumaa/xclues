import type { Item, Group, SavedPuzzle } from "../types";

export const mockItems: Item[] = [
  { id: 1, title: "Pulp Fiction", year: 1994 },
  { id: 2, title: "Kill Bill", year: 2003 },
  { id: 3, title: "Reservoir Dogs", year: 1992 },
  { id: 4, title: "Django Unchained", year: 2012 },
  { id: 5, title: "The Godfather", year: 1972 },
  { id: 6, title: "Goodfellas", year: 1990 },
  { id: 7, title: "Casino", year: 1995 },
  { id: 8, title: "Scarface", year: 1983 },
  { id: 9, title: "Inception", year: 2010 },
  { id: 10, title: "The Matrix", year: 1999 },
  { id: 11, title: "Tenet", year: 2020 },
  { id: 12, title: "Memento", year: 2000 },
  { id: 13, title: "Interstellar", year: 2014 },
  { id: 14, title: "Arrival", year: 2016 },
  { id: 15, title: "2001: A Space Odyssey", year: 1968 },
  { id: 16, title: "Contact", year: 1997 },
];

export const mockGroups: Group[] = [
  { id: "1", items: mockItems.slice(0, 4), connection: "Directed by Quentin Tarantino", difficulty: "easy", color: "yellow" },
  { id: "2", items: mockItems.slice(4, 8), connection: "Classic mob films", difficulty: "medium", color: "green" },
  { id: "3", items: mockItems.slice(8, 12), connection: "Mind-bending narratives", difficulty: "hard", color: "blue" },
  { id: "4", items: mockItems.slice(12, 16), connection: "Films about space/time", difficulty: "hardest", color: "purple" },
];

export const mockPuzzle: SavedPuzzle = {
  id: "mock-puzzle-1",
  items: mockItems,
  groups: mockGroups,
  createdAt: Date.now(),
};
