import { forwardRef } from "react";
import "./XInput.css";

interface XInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md" | "lg";
}

export const XInput = forwardRef<HTMLInputElement, XInputProps>(
  ({ inputSize = "md", className = "", ...rest }, ref) => {
    const classes = ["xinput", `xinput--${inputSize}`, className]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} className={classes} {...rest} />;
  }
);

XInput.displayName = "XInput";
