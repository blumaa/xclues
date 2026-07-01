import { forwardRef } from "react";
import "./XButton.css";

/**
 * Themed button. Spreads native button attributes, so `type`, `onClick`,
 * `aria-*`, and `disabled` work as expected.
 */
interface XButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Default `"primary"`. `"toggle"` reflects `aria-pressed`. */
  variant?: "primary" | "outline" | "ghost" | "toggle" | "link";
  /** Control size (padding + font). Default `"md"`. */
  size?: "sm" | "md" | "lg";
  /** Square icon button with no text padding. */
  iconOnly?: boolean;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
}

export const XButton = forwardRef<HTMLButtonElement, XButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      iconOnly,
      fullWidth,
      className = "",
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "xbtn",
      `xbtn--${variant}`,
      `xbtn--${size}`,
      iconOnly && "xbtn--icon-only",
      fullWidth && "xbtn--full-width",
      disabled && "xbtn--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
);

XButton.displayName = "XButton";
