import { Box } from "@mond-design-system/theme";
import { ItemTile } from "./ItemTile";
import type { Item } from "../../types";

interface ItemGridProps {
  items: Item[];
  selectedItemIds: number[];
  isShaking: boolean;
  onSelectItem: (itemId: number) => void;
}

export function ItemGrid({
  items,
  selectedItemIds,
  isShaking,
  onSelectItem,
}: ItemGridProps) {
  return (
    <Box display="grid" gap="sm" gridTemplateColumns="repeat(4, 1fr)" responsiveWidth>
      {items.map((item) => (
        <ItemTile
          key={item.id}
          item={item}
          isSelected={selectedItemIds.includes(item.id)}
          isShaking={isShaking}
          onClick={() => onSelectItem(item.id)}
        />
      ))}
    </Box>
  );
}
