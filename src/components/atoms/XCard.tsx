import { forwardRef } from "react";
import "./XCard.css";

/** Surface container with theme-driven background, radius and shadow. */
interface XCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation style. Default `"default"`. */
  variant?: "default" | "elevated";
  /** Fixed aspect ratio for the card box. Default `"auto"`. */
  aspectRatio?: "square" | "4/1" | "auto";
  /** Selected/active visual state. */
  isSelected?: boolean;
  /** Trigger the shake animation (e.g. wrong guess). */
  shake?: boolean;
  /** Trigger the jump animation (e.g. correct group). */
  jump?: boolean;
  /** Apply hover affordance styles. */
  hoverable?: boolean;
}

export const XCard = forwardRef<HTMLDivElement, XCardProps>(
  (
    {
      variant = "default",
      aspectRatio = "auto",
      isSelected,
      shake,
      jump,
      hoverable,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "xcard",
      `xcard--${variant}`,
      aspectRatio !== "auto" && `xcard--aspect-${aspectRatio === "square" ? "square" : "4-1"}`,
      isSelected && "xcard--selected",
      shake && "xcard--shake",
      jump && "xcard--jump",
      hoverable && "xcard--hoverable",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

XCard.displayName = "XCard";

export function XCardBody({
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`xcard__body ${className}`} {...rest}>
      {children}
    </div>
  );
}
