import { XCard, XCardBody, XText } from "../ui";
import type { Item } from "../../types";
import { getTextLengthProps } from "../../utils";
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
  const displayTitle = getDisplayTitle(item);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <XText responsive align="center" {...textLengthProps}>
            {displayTitle}
          </XText>
        </div>
      </XCardBody>
    </XCard>
  );
}
