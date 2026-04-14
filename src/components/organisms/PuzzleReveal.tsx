"use client";

import { GroupCard } from "../molecules/GroupCard";
import { XHeading } from "../atoms";
import { getSeoConfig } from "../../config/seoConfig";
import { formatDateForDisplay } from "../../utils/dateValidation";
import type { SavedPuzzle } from "../../types";
import type { Genre } from "../../config/seoConfig";
import type { DifficultyColor } from "../../types";
import "./PuzzleReveal.css";

const DIFFICULTY_ORDER: DifficultyColor[] = ["yellow", "green", "blue", "purple"];

interface PuzzleRevealProps {
  puzzle: SavedPuzzle;
  genre: Genre;
  date: string;
}

export function PuzzleReveal({ puzzle, genre, date }: PuzzleRevealProps) {
  const config = getSeoConfig(genre);
  const sortedGroups = [...puzzle.groups].sort(
    (a, b) => DIFFICULTY_ORDER.indexOf(a.color) - DIFFICULTY_ORDER.indexOf(b.color)
  );

  return (
    <div className="puzzle-reveal">
      <XHeading level={1} align="center">
        {config.siteName} &mdash; {formatDateForDisplay(date)}
      </XHeading>

      <div className="puzzle-reveal__grid">
        {sortedGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      <a href={`/${genre}`} className="puzzle-reveal__back-link">
        Play today&apos;s puzzle
      </a>
    </div>
  );
}
