import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ResearchPortal from "./pages/ResearchPortal";
import BiblioRecherche from "./pages/BiblioRecherche";
import Statistics from "./pages/Statistics";
import Events from "./pages/Events";
import EchoPods from "./pages/EchoPods";
import InstitutionDetail from "./pages/InstitutionDetail";
import ThesisDetail from "./pages/ThesisDetail";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/research-portal"} component={ResearchPortal} />
      <Route path={"/biblio-recherche"} component={BiblioRecherche} />
      <Route path={"/statistics"} component={Statistics} />
      <Route path={"/events"} component={Events} />
      <Route path={"/echopods"} component={EchoPods} />
      <Route path={"/institution/:id"} component={InstitutionDetail} />
      <Route path={"/thesis/:id"} component={ThesisDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
