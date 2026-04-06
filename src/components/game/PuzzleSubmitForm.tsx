import { useState } from "react";
import { XButton, XText } from "../ui";
import { GroupInputCard, type GroupInputValue } from "./GroupInputCard";
import type { DifficultyColor } from "../../types";
import type { Genre } from "../../config";
import "./PuzzleSubmitForm.css";

const COLORS: DifficultyColor[] = ["yellow", "green", "blue", "purple"];

const EMPTY_GROUP: GroupInputValue = {
  items: ["", "", "", ""],
  connection: "",
};

export interface PuzzleSubmission {
  genre: Genre;
  groups: Array<{
    items: string[];
    connection: string;
    color: DifficultyColor;
  }>;
}

interface PuzzleSubmitFormProps {
  /** Genre is auto-detected from the domain */
  genre: Genre;
  onSubmit: (submission: PuzzleSubmission) => void;
  isSubmitting?: boolean;
}

export function PuzzleSubmitForm({ genre, onSubmit, isSubmitting = false }: PuzzleSubmitFormProps) {
  const [groups, setGroups] = useState<[GroupInputValue, GroupInputValue, GroupInputValue, GroupInputValue]>([
    { ...EMPTY_GROUP },
    { ...EMPTY_GROUP },
    { ...EMPTY_GROUP },
    { ...EMPTY_GROUP },
  ]);

  const handleGroupChange = (index: number, value: GroupInputValue) => {
    const newGroups = [...groups] as [GroupInputValue, GroupInputValue, GroupInputValue, GroupInputValue];
    newGroups[index] = value;
    setGroups(newGroups);
  };

  const isGroupValid = (group: GroupInputValue): boolean => {
    return (
      group.connection.trim().length > 0 &&
      group.items.every((item) => item.trim().length > 0)
    );
  };

  const isFormValid = groups.every(isGroupValid);

  const handleSubmit = () => {
    if (!isFormValid) return;

    const submission: PuzzleSubmission = {
      genre,
      groups: groups.map((group, index) => ({
        items: group.items.map((item) => item.trim()),
        connection: group.connection.trim(),
        color: COLORS[index],
      })),
    };

    onSubmit(submission);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--xclues-spacing-md)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--xclues-spacing-sm)" }}>
        <XText size="sm" weight="semibold">
          Create 4 groups of 4 items each
        </XText>
        {COLORS.map((color, index) => (
          <GroupInputCard
            key={color}
            color={color}
            value={groups[index]}
            onChange={(value) => handleGroupChange(index, value)}
          />
        ))}
      </div>

      <XButton
        variant="primary"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Puzzle"}
      </XButton>
    </div>
  );
}
