import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ExecutiveOverview from "./pages/ExecutiveOverview";
import DefectsPage from "./pages/DefectsPage";
import TestCasesPage from "./pages/TestCasesPage";
import ReleaseBoardPage from "./pages/ReleaseBoardPage";
import TrendsPage from "./pages/TrendsPage";
import StoriesTasksPage from "./pages/StoriesTasksPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/defects" element={<DefectsPage />} />
            <Route path="/test-cases" element={<TestCasesPage />} />
            <Route path="/release-board" element={<ReleaseBoardPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/stories-tasks" element={<StoriesTasksPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
