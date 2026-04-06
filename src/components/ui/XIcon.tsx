import type { ReactNode } from "react";

interface XIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  children: ReactNode;
}

const SIZE_MAP = { sm: "16px", md: "20px", lg: "24px" };

export function XIcon({
  size = "md",
  color = "currentColor",
  className = "",
  children,
  style,
  ...rest
}: XIconProps) {
  return (
    <span
      className={`xicon ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: SIZE_MAP[size],
        height: SIZE_MAP[size],
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
