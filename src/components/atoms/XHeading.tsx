import "./XHeading.css";

interface XHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "normal" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right";
  responsive?: boolean;
  isLongText?: boolean;
  isVeryLongText?: boolean;
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
  isLongText,
  isVeryLongText,
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
    isLongText && "xtext--long",
    isVeryLongText && "xtext--very-long",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Create a type that strictly excludes our custom props
  type CleanHeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'isLongText' | 'isVeryLongText'>;

  return (
    <Tag className={classes} {...(rest as CleanHeadingProps)}>
      {children}
    </Tag>
  );
}
