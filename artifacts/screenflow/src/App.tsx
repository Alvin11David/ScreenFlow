import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ThankYou from "@/pages/ThankYou";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import LegalPage from "@/pages/LegalPage";
import { landingPages } from "@/lib/content";
import { legalPages } from "@/lib/legal";
import { usePresence } from "@/hooks/use-presence";
import { useWebVitals } from "@/hooks/use-web-vitals";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thanks" component={ThankYou} />
      <Route path="/dashboard" component={Dashboard} />
      {landingPages.map((page) => (
        <Route key={page.path} path={page.path}>
          <LandingPage path={page.path} />
        </Route>
      ))}
      {legalPages.map((page) => (
        <Route key={page.path} path={page.path}>
          <LegalPage path={page.path} />
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string }) {
  usePresence();
  useWebVitals();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="screenflow-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter
              base={import.meta.env.BASE_URL.replace(/\/$/, "")}
              ssrPath={ssrPath}
            >
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;