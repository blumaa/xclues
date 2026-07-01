/**
 * True only when running inside the Capacitor native shell.
 *
 * Reads the global object Capacitor injects at runtime rather than importing
 * `@capacitor/core`, so web builds never pull the Capacitor packages into the
 * initial JS bundle. Native-only modules are loaded via dynamic import behind
 * this check (see NativeSetup), which keeps them in lazy chunks the web never
 * fetches.
 */
export function isNativePlatform(): boolean {
  if (typeof window === "undefined") return false;
  const cap = (
    window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }
  ).Capacitor;
  return typeof cap?.isNativePlatform === "function" && cap.isNativePlatform();
}
