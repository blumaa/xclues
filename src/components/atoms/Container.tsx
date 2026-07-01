import "./Container.css";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width preset. Default `"md"`. */
  size?: "sm" | "md" | "lg";
}

/**
 * Centered, max-width content container with consistent horizontal padding.
 * Width presets and padding live in CSS (data attribute), not inline styles.
 */
export function Container({
  size = "md",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={`xcontainer ${className}`.trim()} data-size={size} {...rest}>
      {children}
    </div>
  );
}
