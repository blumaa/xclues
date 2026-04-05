import { Box, Card, Heading, Text } from "@mond-design-system/theme";
import type { Group } from "../../types";
import "./GroupCard.css";
import { getTextLengthProps } from "../../utils";
import { getDisplayTitle } from "../../utils/displayTitle";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const textLengthProps = getTextLengthProps(group.connection);
  return (
    <Card
      className={`group-card ${group.color}`}
      role="status"
      aria-label={`Found group: ${group.connection}`}
    >
      <Box
        display="flex"
        flexDirection="column"
        paddingRight="2"
        paddingLeft="2"
        paddingTop="1"
        paddingBottom="1"
        alignItems="center"
        justifyContent="center"
        height="full"
      >
        <Heading
          level={3}
          responsive
          color="black.900"
          align="center"
          {...textLengthProps}
        >
          <span className="group-card-connection">{group.connection}</span>
        </Heading>
        <div className="group-card-items">
          {group.items.map((item, index) => {
            return (
              <Text key={item.id} responsive color="black.900">
                {getDisplayTitle(item)}
                {index < group.items.length - 1 && ", "}
              </Text>
            );
          })}
        </div>
      </Box>
    </Card>
  );
}
