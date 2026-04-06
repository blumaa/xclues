import "./XHeading.css";

interface XHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "normal" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right";
  responsive?: boolean;
}

const DEFAULT_SIZE: Record<number, string> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs",
};

export function XHeading({
  level,
  size,
  weight = "bold",
  align,
  responsive,
  className = "",
  children,
  ...rest
}: XHeadingProps) {
  const Tag = `h${level}` as const;
  const resolvedSize = size ?? DEFAULT_SIZE[level];

  const classes = [
    "xheading",
    `xheading--${resolvedSize}`,
    weight && `xheading--${weight}`,
    align && `xheading--${align}`,
    responsive && "xheading--responsive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
