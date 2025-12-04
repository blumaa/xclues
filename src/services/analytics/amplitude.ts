import * as amplitude from "@amplitude/analytics-browser";
import type { Genre } from "../../config/seoConfig";

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY as
  | string
  | undefined;

let isInitialized = false;
let currentGenre: Genre | null = null;

type ValidPropertyType =
  | number
  | string
  | boolean
  | Array<string | number>
  | { [key: string]: ValidPropertyType }
  | Array<{ [key: string]: ValidPropertyType }>;

export function initAnalytics(genre: Genre) {
  if (!AMPLITUDE_API_KEY) {
    console.warn("Amplitude API key not configured");
    return;
  }

  if (isInitialized) {
    return;
  }

  currentGenre = genre;

  amplitude.init(AMPLITUDE_API_KEY, {
    serverZone: "EU",
    autocapture: {
      attribution: true,
      pageViews: true,
      sessions: true,
    },
  });

  // Set genre as a user property so it's associated with all events
  const identifyEvent = new amplitude.Identify();
  identifyEvent.set("genre", genre);
  amplitude.identify(identifyEvent);

  isInitialized = true;
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  if (!isInitialized) {
    return;
  }
  // Include genre in every event for easy filtering/segmentation
  amplitude.track(eventName, {
    ...properties,
    genre: currentGenre,
  });
}

export function identifyUser(
  userId: string,
  properties?: Record<string, ValidPropertyType>,
) {
  if (!isInitialized) {
    return;
  }

  amplitude.setUserId(userId);

  if (properties) {
    const identifyEvent = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identifyEvent.set(key, value);
    });
    amplitude.identify(identifyEvent);
  }
}
