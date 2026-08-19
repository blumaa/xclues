import { useLocalStorage } from "../../hooks/useLocalStorage";
import { XText } from "../atoms";
import "./HowToPlayBanner.css";

const STORAGE_KEY = "xclues-how-to-play-seen";

export function HowToPlayBanner() {
  const [seen, setSeen, hydrated] = useLocalStorage(STORAGE_KEY, "0");

  // Wait for the read: until then `seen` is the default, so returning players
  // would see the banner flash back in on every load.
  if (!hydrated || seen !== "0") return null;

  return (
    <div className="how-to-play-banner">
      <XText size="sm" semantic="secondary">
        Select 4 items that share a connection, then tap Submit. You get 4 mistakes.
      </XText>
      <button
        className="how-to-play-banner__dismiss"
        onClick={() => setSeen("1")}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
