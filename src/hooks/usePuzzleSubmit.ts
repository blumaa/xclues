/**
 * Hook for submitting user-created puzzles
 *
 * Allows anonymous users to submit puzzle suggestions for admin review.
 */

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase/client";
import type { PuzzleSubmission } from "../components/game/PuzzleSubmitForm";
import type { Json } from "../lib/supabase/types";

interface SubmittedGroup {
  id: string;
  items: Array<{ id: number; title: string }>;
  connection: string;
  color: "yellow" | "green" | "blue" | "purple";
  difficulty: "easy" | "medium" | "hard" | "hardest";
}

const COLOR_TO_DIFFICULTY: Record<string, "easy" | "medium" | "hard" | "hardest"> = {
  yellow: "easy",
  green: "medium",
  blue: "hard",
  purple: "hardest",
};

export function usePuzzleSubmit() {
  return useMutation({
    mutationFn: async (submission: PuzzleSubmission) => {
      // Convert submission to database format
      const groups: SubmittedGroup[] = submission.groups.map((group, index) => ({
        id: crypto.randomUUID(),
        items: group.items.map((title, itemIndex) => ({
          id: Date.now() + index * 10 + itemIndex,
          title,
        })),
        connection: group.connection,
        color: group.color,
        difficulty: COLOR_TO_DIFFICULTY[group.color],
      }));

      // Insert puzzle with source = 'user'
      // Using type assertion because supabase types don't perfectly match our schema
      const { error } = await (supabase.from("puzzles") as ReturnType<typeof supabase.from>).insert({
        group_ids: [] as string[],
        groups: groups as unknown as Json,
        genre: submission.genre,
        status: "pending" as const,
        source: "user" as const,
      });

      if (error) {
        throw new Error(`Failed to submit puzzle: ${error.message}`);
      }
    },
  });
}
