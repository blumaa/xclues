import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivacyPage } from "./PrivacyPage";

describe("PrivacyPage analytics disclosure", () => {
  it("lists every field sent with a game event", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/random id for that one game/)).toBeInTheDocument();
    expect(screen.getByText(/site that sent you here/)).toBeInTheDocument();
  });

  it("explains the per-game id is not a tracking identifier", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/deleted from your browser once the game ends/)).toBeInTheDocument();
  });
});
