import { forwardRef } from "react";
import "./XText.css";

interface XTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "span" | "p" | "label" | "div";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "normal" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right";
  semantic?: "primary" | "secondary";
  responsive?: boolean;
  isLongText?: boolean;
  isVeryLongText?: boolean;
}

export const XText = forwardRef<HTMLElement, XTextProps>(
  (
    {
      as: Tag = "span",
      size = "md",
      weight,
      align,
      semantic,
      responsive,
      isLongText,
      isVeryLongText,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "xtext",
      `xtext--${size}`,
      weight && `xtext--${weight}`,
      align && `xtext--${align}`,
      semantic && `xtext--${semantic}`,
      responsive && "xtext--responsive",
      isLongText && "xtext--long",
      isVeryLongText && "xtext--very-long",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Tag ref={ref as never} className={classes} {...rest}>
        {children}
      </Tag>
    );
  }
);

XText.displayName = "XText";
