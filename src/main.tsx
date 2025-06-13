
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Index from "./pages/Index.tsx";
import ARViewer from "./pages/ARViewer.tsx";
import Projetos from "./pages/Projetos.tsx";
import Catalogo from "./pages/Catalogo.tsx";
import Ambientes from "./pages/Ambientes.tsx";
import Materiais from "./pages/Materiais.tsx";
import Tutoriais from "./pages/Tutoriais.tsx";
import Perfil from "./pages/Perfil.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="ar-viewer" element={<ARViewer />} />
            <Route path="projetos" element={<Projetos />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="ambientes" element={<Ambientes />} />
            <Route path="materiais" element={<Materiais />} />
            <Route path="tutoriais" element={<Tutoriais />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="auth" element={<Auth />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
