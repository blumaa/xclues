import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RouteError from "../error";

describe("route error boundary", () => {
  it("renders a recoverable fallback", () => {
    render(<RouteError error={new Error("boom")} reset={() => {}} />);
    expect(screen.getByText("Something went wrong")).toBeTruthy();
  });

  it("calls reset when 'Try again' is clicked", () => {
    const reset = vi.fn();
    render(<RouteError error={new Error("boom")} reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
