import type { ReactNode, CSSProperties } from "react";
import "./XIcon.css";

interface XIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  children: ReactNode;
}

export function XIcon({
  size = "md",
  color,
  className = "",
  children,
  ...rest
}: XIconProps) {
  const cssVars = color ? { "--xicon-color": color } as CSSProperties : undefined;

  return (
    <span
      className={`xicon xicon--${size} ${className}`}
      style={cssVars}
      {...rest}
    >
      {children}
    </span>
  );
}
