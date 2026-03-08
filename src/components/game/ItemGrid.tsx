import { Box } from "@mond-design-system/theme";
import { ItemTile } from "./ItemTile";
import type { Item } from "../../types";
import "./ItemGrid.css";

interface ItemGridProps {
  items: Item[];
  selectedItemIds: number[];
  isShaking: boolean;
  jumpingItemIds: number[];
  rejectedItemId: number | null;
  onSelectItem: (itemId: number) => void;
}

export function ItemGrid({
  items,
  selectedItemIds,
  isShaking,
  jumpingItemIds,
  rejectedItemId,
  onSelectItem,
}: ItemGridProps) {
  return (
    <Box display="grid" gap="sm" gridTemplateColumns="repeat(4, 1fr)" responsiveWidth className="item-grid">
      {items.map((item) => (
        <ItemTile
          key={item.id}
          item={item}
          isSelected={selectedItemIds.includes(item.id)}
          isShaking={isShaking}
          isJumping={jumpingItemIds.includes(item.id)}
          isRejected={item.id === rejectedItemId}
          onClick={() => onSelectItem(item.id)}
        />
      ))}
    </Box>
  );
}
