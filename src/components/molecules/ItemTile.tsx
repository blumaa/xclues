import { XCard, XCardBody, XText } from "../atoms";
import type { Item } from "../../types";
import { getTextLengthProps, addSoftHyphens } from "../../utils";
import { getDisplayTitle } from "../../utils/displayTitle";
import type { KeyboardEvent } from "react";
import "./ItemTile.css";

interface ItemTileProps {
  item: Item;
  isSelected: boolean;
  isShaking?: boolean;
  isJumping?: boolean;
  isRejected?: boolean;
  onClick: () => void;
}

export function ItemTile({
  item,
  isSelected,
  isShaking,
  isJumping,
  isRejected,
  onClick,
}: ItemTileProps) {
  const displayTitle = addSoftHyphens(getDisplayTitle(item));
  const textLengthProps = getTextLengthProps(displayTitle);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <XCard
      className="item-tile"
      aspectRatio="square"
      isSelected={isSelected}
      shake={(isShaking && isSelected) || isRejected}
      jump={isJumping}
      onClick={onClick}
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
}
