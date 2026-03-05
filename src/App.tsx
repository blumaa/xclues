import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mond-design-system/theme";
import { ToastProvider } from "./providers/ToastProvider";
import { ThemeContextProvider } from "./providers/ThemeContext";
import { useThemeContext } from "./providers/useThemeContext";
import { StorageProvider } from "./providers/StorageProvider";
import { StatsProvider } from "./providers/StatsProvider";
import { SiteProvider } from "./providers/SiteProvider";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { AboutPage } from "./pages/AboutPage";
import { ThemeToggle } from "./components/ThemeToggle";
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

  return (
    <ThemeProvider colorScheme={theme}>
      <ToastProvider>
        <BrowserRouter>
          <div className="app-layout">
            <header className="app-header">
              <a href="/" className="app-header-brand" aria-label="xclues home">
                <span className="app-header-logo">xclues</span>
              </a>
              <ThemeToggle />
            </header>
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
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
