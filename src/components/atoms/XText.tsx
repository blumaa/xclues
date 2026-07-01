import { forwardRef } from "react";
import "./XText.css";

/** Typographic text primitive. Renders one of a few intrinsic elements. */
interface XTextProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Default `"span"`. */
  as?: "span" | "p" | "label" | "div";
  /** Type-scale step. Default `"md"`. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Font weight token. */
  weight?: "light" | "normal" | "semibold" | "bold" | "extrabold";
  /** Text alignment. */
  align?: "left" | "center" | "right";
  /** Token-driven text color role. */
  semantic?: "primary" | "secondary";
  /** Scale the size down on small viewports. */
  responsive?: boolean;
  /** Shrink for long content (set by callers measuring text length). */
  isLongText?: boolean;
  /** Shrink further for very long content. */
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

    // Tag is one of several intrinsic elements; typing it as ElementType lets
    // the forwarded HTMLElement ref and the rest props attach without casting
    // ref to `never`.
    const Component = Tag as React.ElementType;

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  }
);

XText.displayName = "XText";
