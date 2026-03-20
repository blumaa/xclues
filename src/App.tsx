import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mond-design-system/theme";
import { ToastProvider } from "./providers/ToastProvider";
import { ThemeContextProvider } from "./providers/ThemeContext";
import { useThemeContext } from "./providers/useThemeContext";
import { useSite } from "./providers/useSite";
import { StorageProvider } from "./providers/StorageProvider";
import { StatsProvider } from "./providers/StatsProvider";
import { SiteProvider } from "./providers/SiteProvider";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { AboutPage } from "./pages/AboutPage";
import { ThemeToggle } from "./components/ThemeToggle";
import { GenreSwitch } from "./components/GenreSwitch";
import { Footer } from "./components/Footer";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
});

function ThemedApp() {
  const { theme } = useThemeContext();
  const { genre } = useSite();

  return (
    <ThemeProvider colorScheme={theme}>
      <ToastProvider>
        <BrowserRouter>
          <div className="app-layout">
            <header className="app-header">
              <a href="/" className="app-header-brand" aria-label="xclues home">
                <span className="app-header-logo">xclues</span>
              </a>
              <GenreSwitch />
              <ThemeToggle />
            </header>
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage key={genre} />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

function App() {
  const [ready, setReady] = useState(!Capacitor.isNativePlatform());

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    async function setup() {
      try {
        await ScreenOrientation.lock({ orientation: "portrait" });
      } catch {
        // ScreenOrientation may not be supported on all devices (e.g., iPad)
      }
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.hide();
      } catch {
        // StatusBar APIs may fail on some OS versions
      }
      try {
        await SplashScreen.hide();
      } catch {
        // SplashScreen hide may fail if already dismissed
      }
      setReady(true);
    }
    setup();
  }, []);

  if (!ready) return null;

  return (
    <SiteProvider>
      <QueryClientProvider client={queryClient}>
        <StorageProvider>
          <StatsProvider>
            <ThemeContextProvider>
              <ThemedApp />
            </ThemeContextProvider>
          </StatsProvider>
        </StorageProvider>
      </QueryClientProvider>
    </SiteProvider>
  );
}

export default App;
