
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Cog } from "lucide-react";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="app-card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-gray-600">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name || user.email}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span>Adresse email</span>
            <span className="text-muted-foreground">{user.email}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span>Programme en cours</span>
            <span className="text-muted-foreground">Jour {user.progress.currentDay}</span>
          </div>
        </div>
      </div>

      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <LogOut className="mr-2" /> Déconnexion
      </Button>
    </div>
  );
};

export default Settings;
