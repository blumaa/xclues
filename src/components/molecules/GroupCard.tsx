import { XCard, XHeading, XText } from "../atoms";
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
    <XCard
      className={`group-card ${group.color}`}
      role="status"
      aria-label={`Found group: ${group.connection}`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "0.5rem",
          paddingLeft: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <XHeading
          level={3}
          responsive
          align="center"
          isLongText={textLengthProps.isLongText}
          isVeryLongText={textLengthProps.isVeryLongText}
        >
          <span className="group-card-connection">{group.connection}</span>
        </XHeading>
        <div className="group-card-items">
          {group.items.map((item, index) => {
            return (
              <XText key={item.id} responsive>
                {getDisplayTitle(item)}
                {index < group.items.length - 1 && ", "}
              </XText>
            );
          })}
        </div>
      </div>
    </XCard>
  );
}
