
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import Catalogo from "./pages/Catalogo";
import Ambientes from "./pages/Ambientes";
import Materiais from "./pages/Materiais";
import Tutoriais from "./pages/Tutoriais";
import ARViewer from "./pages/ARViewer";
import Perfil from "./pages/Perfil";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/projetos" element={
              <ProtectedRoute>
                <Projetos />
              </ProtectedRoute>
            } />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/ambientes" element={<Ambientes />} />
            <Route path="/materiais" element={<Materiais />} />
            <Route path="/tutoriais" element={<Tutoriais />} />
            <Route path="/ar-viewer" element={<ARViewer />} />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
