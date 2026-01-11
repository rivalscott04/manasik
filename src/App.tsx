import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { PWAInstallBanner } from "@/components/pwa/PWAInstallBanner";
import Index from "@/pages/Index";
import Onboarding from "@/pages/Onboarding";
import Manasik from "@/pages/Manasik";
import TahapanDetail from "@/pages/TahapanDetail";
import Peta from "@/pages/Peta";
import Doa from "@/pages/Doa";
import Lainnya from "@/pages/LainnyaPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PWAInstallBanner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/manasik" element={<Manasik />} />
            <Route path="/manasik/tahapan" element={<TahapanDetail />} />
            <Route path="/manasik/tahapan/:id" element={<TahapanDetail />} />
            <Route path="/peta" element={<Peta />} />
            <Route path="/doa" element={<Doa />} />
            <Route path="/lainnya" element={<Lainnya />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
