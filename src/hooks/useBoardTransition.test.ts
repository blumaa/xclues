import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { createElement, type FC } from "react";
import { useBoardTransition } from "./useBoardTransition";

const Harness: FC<{ transitionKey: string; isReady?: boolean }> = ({
  transitionKey,
  isReady = true,
}) => {
  const ref = useBoardTransition(transitionKey, isReady);
  return createElement("div", { ref, "data-testid": "board" }, transitionKey);
};

// GSAP animations are disabled pending animation system redesign.
// These tests verify the hook is a stable no-op that returns a ref.
describe("useBoardTransition (disabled)", () => {
  it("returns a ref that attaches to a DOM element", () => {
    const { getByTestId } = render(
      createElement(Harness, { transitionKey: "films" })
    );
    expect(getByTestId("board")).toBeInTheDocument();
  });

  it("does not modify opacity or transform", () => {
    const { getByTestId, rerender } = render(
      createElement(Harness, { transitionKey: "films" })
    );

    rerender(createElement(Harness, { transitionKey: "books" }));

    const el = getByTestId("board");
    expect(el.style.opacity).toBe("");
    expect(el.style.transform).toBe("");
  });
});
