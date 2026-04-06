import { forwardRef } from "react";
import "./XCard.css";

interface XCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  aspectRatio?: "square" | "4/1" | "auto";
  isSelected?: boolean;
  shake?: boolean;
  jump?: boolean;
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
