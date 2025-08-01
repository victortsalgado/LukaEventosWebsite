import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import BlogPage from "@/pages/BlogPage";
import Cop30Page from "@/pages/Cop30Page";
import CaseOkajima from "@/pages/posts/CaseOkajima";
import Cop30Guide from "@/pages/posts/Cop30Guide";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cop30" component={Cop30Page} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/case-okajima-supernorte-2024" component={CaseOkajima} />
      <Route path="/blog/guia-cop30-parceiro-local" component={Cop30Guide} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ScrollToTop />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
