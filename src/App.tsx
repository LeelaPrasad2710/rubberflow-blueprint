import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Quote from "./pages/Quote";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import InProgress from "./pages/InProgress";
import NotFound from "./pages/NotFound";
import Attendance from "@/pages/admin/Attendance"
import Salaries from "@/pages/admin/Salaries"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/salaries" element={<Salaries />} />
          <Route path="/admin/invoices" element={<InProgress />} />
          <Route path="/admin/production" element={<InProgress />} />
          <Route path="/admin/rawMaterial" element={<InProgress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
