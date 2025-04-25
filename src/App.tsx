
import React from "react";
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
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AppMenuBar from "@/components/AppMenuBar";
import AppHeader from "@/components/AppHeader";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
            <div className="min-h-screen pb-16 relative bg-background pt-20">
              <AppHeader />
              <Routes>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/programs" 
                  element={<Programs />} 
                />
                <Route 
                  path="/dashboard" 
                  element={<Dashboard />} 
                />
                <Route 
                  path="/settings" 
                  element={<Settings />} 
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
