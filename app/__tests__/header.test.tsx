import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";
import { ThemeContextProvider } from "../../src/providers/ThemeContext";
import { getAppStore, resetAppStore } from "../../src/store/appStore";

describe("Header", () => {
  beforeEach(() => resetAppStore());

  it("logo returns to the game of the genre you are on", () => {
    getAppStore().getState().setActiveGenre("music");
    render(
      <ThemeContextProvider>
        <Header />
      </ThemeContextProvider>,
    );
    expect(screen.getByRole("link", { name: "xClues home" })).toHaveAttribute("href", "/music");
  });
});
