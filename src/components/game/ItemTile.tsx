import { Card, CardBody, Box, Text } from "@mond-design-system/theme";
import type { Item } from "../../types";
import { getTextLengthProps } from "../../utils";
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
  const textLengthProps = getTextLengthProps(item.title);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
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
      aria-label={`${item.title}${isSelected ? ", selected" : ""}`}
    >
      <CardBody>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="full"
        >
          <Text responsive align="center" {...textLengthProps}>
            {item.title}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
}
