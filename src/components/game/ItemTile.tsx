import { Card, CardBody, Box, Text } from "@mond-design-system/theme";
import type { Item } from "../../types";
import { getTextLengthProps } from "../../utils";

interface ItemTileProps {
  item: Item;
  isSelected: boolean;
  isShaking?: boolean;
  onClick: () => void;
}

export function ItemTile({
  item,
  isSelected,
  isShaking,
  onClick,
}: ItemTileProps) {
  const textLengthProps = getTextLengthProps(item.title);

  return (
    <Card
      aspectRatio="square"
      isSelected={isSelected}
      shake={isShaking && isSelected}
      onClick={onClick}
      hoverable
      variant="elevated"
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
