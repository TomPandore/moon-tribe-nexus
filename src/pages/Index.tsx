
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-tribal-darker to-tribal-dark">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="animate-scale-in">
          <Logo size="lg" />
          <h1 className="mt-6 text-4xl font-bold">
            Redécouvrez votre <span className="text-tribal-orange">corps</span> et votre <span className="text-tribal-purple">puissance</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-xl mx-auto">
            Transformez votre quotidien avec des rituels de mouvements ancestraux répartis dans votre journée.
          </p>
        </div>
        
        <div className="mt-12 space-y-4 w-full max-w-md">
          <Button className="tribal-btn-primary w-full text-lg py-6" onClick={handleGetStarted}>
            Commencer l'aventure
          </Button>
          
          <div className="flex space-x-4">
            <Button variant="outline" className="tribal-btn-outline flex-1" onClick={() => navigate("/login")}>
              Connexion
            </Button>
            <Button variant="outline" className="tribal-btn-outline flex-1" onClick={() => navigate("/login")}>
              Créer un compte
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="tribal-card">
            <h3 className="text-lg font-bold mb-2">Des exercices simples</h3>
            <p className="text-gray-400">Des mouvements ancestraux adaptés à votre niveau et répartis dans votre journée.</p>
          </div>
          <div className="tribal-card">
            <h3 className="text-lg font-bold mb-2">Pas de longues séances</h3>
            <p className="text-gray-400">Intégrez le mouvement à votre quotidien sans devoir bloquer 1h dans votre journée.</p>
          </div>
          <div className="tribal-card">
            <h3 className="text-lg font-bold mb-2">Progressez à votre rythme</h3>
            <p className="text-gray-400">Suivez votre progression et montez en compétence jour après jour.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
