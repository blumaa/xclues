import "./Stack.css";

type SpaceStep = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main-axis direction. Default `"column"`. */
  direction?: "row" | "column";
  /** Gap between children, from the spacing scale. Default `4`. */
  gap?: SpaceStep;
  /** Cross-axis alignment. */
  align?: "start" | "center" | "end" | "stretch";
  /** Main-axis distribution. */
  justify?: "start" | "center" | "end" | "between";
}

/**
 * Flexbox layout primitive. Spacing comes from the design scale; alignment and
 * direction are set via data attributes so all styling stays in CSS.
 */
export function Stack({
  direction = "column",
  gap = 4,
  align,
  justify,
  className = "",
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <div
      className={`xstack ${className}`.trim()}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      style={
        { "--xstack-gap": `var(--xclues-spacing-${gap})`, ...style } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
