import { XCard, XCardBody, XText } from "../atoms";
import type { Item } from "../../types";
import { getTextLengthProps, addSoftHyphens } from "../../utils";
import { getDisplayTitle } from "../../utils/displayTitle";
import { memo } from "react";
import type { KeyboardEvent } from "react";
import "./ItemTile.css";

interface ItemTileProps {
  item: Item;
  isSelected: boolean;
  isShaking?: boolean;
  isJumping?: boolean;
  isRejected?: boolean;
  /**
   * Stable selection handler. Receiving the id (rather than a pre-bound
   * onClick) lets the parent pass the store action directly, so memo can skip
   * re-rendering tiles whose own props are unchanged.
   */
  onSelect: (itemId: number) => void;
}

export const ItemTile = memo(function ItemTile({
  item,
  isSelected,
  isShaking,
  isJumping,
  isRejected,
  onSelect,
}: ItemTileProps) {
  const displayTitle = addSoftHyphens(getDisplayTitle(item));
  const textLengthProps = getTextLengthProps(displayTitle);

  const tileClasses = [
    "item-tile",
    textLengthProps.isLongText && "item-tile--long",
    textLengthProps.isVeryLongText && "item-tile--very-long",
  ].filter(Boolean).join(" ");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(item.id);
    }
  };

  return (
    <XCard
      className={tileClasses}
      aspectRatio="square"
      isSelected={isSelected}
      shake={(isShaking && isSelected) || isRejected}
      jump={isJumping}
      onClick={() => onSelect(item.id)}
      onKeyDown={handleKeyDown}
      hoverable
      variant="elevated"
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${displayTitle}${isSelected ? ", selected" : ""}`}
    >
      <XCardBody>
        <div className="item-tile-content">
          <XText 
            responsive 
            align="center" 
            isLongText={textLengthProps.isLongText}
            isVeryLongText={textLengthProps.isVeryLongText}
          >
            {displayTitle}
          </XText>
        </div>
      </XCardBody>
    </XCard>
  );
});
