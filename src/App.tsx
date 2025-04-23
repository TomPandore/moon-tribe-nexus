
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgramProvider } from "@/contexts/ProgramContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Programs from "./pages/Programs";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AppMenuBar from "@/components/AppMenuBar";

const queryClient = new QueryClient();

// Composant de garde pour les routes protégées
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Ici nous vérifions si l'utilisateur est connecté en regardant le localStorage
  const isAuthenticated = localStorage.getItem("mohero_user") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProgramProvider>
          <BrowserRouter>
            {/* Wrapper pour espace menu (padding bottom 64px pour le menu bas) */}
            <div className="min-h-screen pb-16 relative bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/programs" 
                  element={
                    <ProtectedRoute>
                      <Programs />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AppMenuBar />
            </div>
          </BrowserRouter>
        </ProgramProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
