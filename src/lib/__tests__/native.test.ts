import { describe, it, expect, afterEach } from "vitest";
import { isNativePlatform } from "../native";

type WindowWithCapacitor = Window & {
  Capacitor?: { isNativePlatform?: () => boolean };
};

describe("isNativePlatform", () => {
  afterEach(() => {
    delete (window as WindowWithCapacitor).Capacitor;
  });

  it("returns false when no Capacitor global is present (web)", () => {
    expect(isNativePlatform()).toBe(false);
  });

  it("returns false when Capacitor is present but not native", () => {
    (window as WindowWithCapacitor).Capacitor = {
      isNativePlatform: () => false,
    };
    expect(isNativePlatform()).toBe(false);
  });

  it("returns true when Capacitor reports a native platform", () => {
    (window as WindowWithCapacitor).Capacitor = {
      isNativePlatform: () => true,
    };
    expect(isNativePlatform()).toBe(true);
  });
});
