import { Box } from "@mond-design-system/theme";
import { ItemTile } from "./ItemTile";
import type { Item } from "../../types";

interface ItemGridProps {
  items: Item[];
  selectedItemIds: number[];
  isShaking: boolean;
  jumpingItemIds: number[];
  onSelectItem: (itemId: number) => void;
}

export function ItemGrid({
  items,
  selectedItemIds,
  isShaking,
  jumpingItemIds,
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
          isJumping={jumpingItemIds.includes(item.id)}
          onClick={() => onSelectItem(item.id)}
        />
      ))}
    </Box>
  );
}
