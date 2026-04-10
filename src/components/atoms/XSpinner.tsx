import "./XSpinner.css";

interface XSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function XSpinner({ size = "md", label }: XSpinnerProps) {
  return (
    <div className="xspinner" role="status" aria-label={label ?? "Loading"}>
      <div className={`xspinner__circle xspinner__circle--${size}`} />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
