import { forwardRef } from "react";
import "./XButton.css";

interface XButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
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
