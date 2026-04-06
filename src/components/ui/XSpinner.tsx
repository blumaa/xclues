import "./XSpinner.css";

interface XSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const SIZE_MAP = { sm: "16px", md: "24px", lg: "36px" };

export function XSpinner({ size = "md", label }: XSpinnerProps) {
  return (
    <div className="xspinner" role="status" aria-label={label ?? "Loading"}>
      <div
        className="xspinner__circle"
        style={{ width: SIZE_MAP[size], height: SIZE_MAP[size] }}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
