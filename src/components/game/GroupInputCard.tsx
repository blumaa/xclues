import { XText, XInput } from "../ui";
import type { ChangeEvent } from "react";
import type { DifficultyColor } from "../../types";
import { Dot } from "../Dot";
import "./GroupInputCard.css";

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
    <div className={`group-input-card group-input-card--${color}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--xclues-spacing-xs)", marginBottom: "var(--xclues-spacing-2)" }}>
        <Dot size="sm" variant="color" color={color} />
        <XText weight="semibold" size="sm">
          {COLOR_LABELS[color]}
        </XText>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--xclues-spacing-xs)" }}>
        <XInput
          placeholder="Connection (e.g., 'Directed by Spielberg')"
          value={value.connection}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleConnectionChange(e.target.value)}
          inputSize="sm"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--xclues-spacing-xs)" }}>
          {value.items.map((item, index) => (
            <XInput
              key={index}
              placeholder={`Item ${index + 1}`}
              value={item}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleItemChange(index, e.target.value)}
              inputSize="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
