
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Zap } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && user) {
      if (user.progress.currentProgram) {
        navigate("/dashboard");
      } else {
        navigate("/programs");
      }
    }
  }, [user, isLoading, navigate]);
  
  const handleGetStarted = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
      <div className="absolute inset-0 tribal-pattern pointer-events-none"></div>
      
      <div className="flex flex-col min-h-screen">
        <header className="relative z-10 container mx-auto pt-6 pb-4 px-4">
          <Logo variant="horizontal" size="lg" />
        </header>
        
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 relative z-10">
          <div className="animate-scale-in max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald tracking-wide text-tribal-green mb-6">
              RÉVEILLE TA PUISSANCE NATURELLE
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transforme ton quotidien avec des rituels de mouvements ancestraux
              répartis dans ta journée.
            </p>
          </div>
          
          <div className="mt-8 space-y-4 w-full max-w-md">
            <Button 
              className="tribal-btn-primary w-full text-lg py-6 flex items-center justify-center" 
              onClick={handleGetStarted}
            >
              <Zap size={20} className="mr-2" />
              Commencer l'aventure
            </Button>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="tribal-btn-outline flex-1 flex items-center justify-center" 
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} className="mr-2" />
                Connexion
              </Button>
              <Button 
                variant="outline" 
                className="tribal-btn-outline flex-1 flex items-center justify-center" 
                onClick={() => navigate("/login")}
              >
                <UserPlus size={18} className="mr-2" />
                Créer un compte
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="tribal-card glass-panel">
              <div className="bg-tribal-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap size={24} className="text-tribal-green" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-tribal-green">Des exercices simples</h3>
              <p className="text-muted-foreground">Des mouvements ancestraux adaptés à ton niveau et répartis dans ta journée.</p>
            </div>
            <div className="tribal-card glass-panel">
              <div className="bg-tribal-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap size={24} className="text-tribal-green" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-tribal-green">Pas de longues séances</h3>
              <p className="text-muted-foreground">Intègre le mouvement à ton quotidien sans devoir bloquer 1h dans ta journée.</p>
            </div>
            <div className="tribal-card glass-panel">
              <div className="bg-tribal-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap size={24} className="text-tribal-green" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-tribal-green">Progression continue</h3>
              <p className="text-muted-foreground">Suis ta progression et monte en compétence jour après jour.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

