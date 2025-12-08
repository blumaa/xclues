import { useState } from "react";
import { Box, Button, Text } from "@mond-design-system/theme";
import { GroupInputCard, type GroupInputValue, type DifficultyColor } from "./GroupInputCard";
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
    <Box display="flex" flexDirection="column" gap="md">
      <Box display="flex" flexDirection="column" gap="sm">
        <Text size="sm" weight="semibold">
          Create 4 groups of 4 items each
        </Text>
        {COLORS.map((color, index) => (
          <GroupInputCard
            key={color}
            color={color}
            value={groups[index]}
            onChange={(value) => handleGroupChange(index, value)}
          />
        ))}
      </Box>

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Puzzle"}
      </Button>
    </Box>
  );
}
