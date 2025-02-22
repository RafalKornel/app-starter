import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import the generated route tree
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
