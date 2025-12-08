import { Box, Text } from "@mond-design-system/theme";
import { Input } from "@mond-design-system/theme/client";
import type { ChangeEvent } from "react";
import "./GroupInputCard.css";

export type DifficultyColor = "yellow" | "green" | "blue" | "purple";

const COLOR_LABELS: Record<DifficultyColor, string> = {
  yellow: "Easy",
  green: "Medium",
  blue: "Hard",
  purple: "Expert",
};

export interface GroupInputValue {
  items: [string, string, string, string];
  connection: string;
}

interface GroupInputCardProps {
  color: DifficultyColor;
  value: GroupInputValue;
  onChange: (value: GroupInputValue) => void;
}

export function GroupInputCard({ color, value, onChange }: GroupInputCardProps) {
  const handleItemChange = (index: number, newValue: string) => {
    const newItems = [...value.items] as [string, string, string, string];
    newItems[index] = newValue;
    onChange({ ...value, items: newItems });
  };

  const handleConnectionChange = (newConnection: string) => {
    onChange({ ...value, connection: newConnection });
  };

  return (
    <Box className={`group-input-card group-input-card--${color}`}>
      <Box display="flex" alignItems="center" gap="xs" marginBottom="2">
        <Box className={`group-input-card__color-dot group-input-card__color-dot--${color}`} />
        <Text weight="semibold" size="sm">
          {COLOR_LABELS[color]}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="xs">
        <Input
          placeholder="Connection (e.g., 'Directed by Spielberg')"
          value={value.connection}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleConnectionChange(e.target.value)}
          inputSize="sm"
        />

        <Box display="flex" flexDirection="column" gap="xs">
          {value.items.map((item, index) => (
            <Input
              key={index}
              placeholder={`Item ${index + 1}`}
              value={item}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleItemChange(index, e.target.value)}
              inputSize="sm"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
