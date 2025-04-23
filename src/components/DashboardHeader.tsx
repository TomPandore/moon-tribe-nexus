
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface DashboardHeaderProps {
  onRitualClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onRitualClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-30">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
            onClick={() => navigate("/profile")} // À rendre fonctionnel quand page profil créée
            title="Voir ou modifier mon profil"
          >
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-gray-600">
              <User size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user.name || user.email}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="text-primary bg-primary/10 border border-primary hover:bg-primary/20 font-medium shadow-none"
          onClick={onRitualClick}
        >
          🔥 Rituel du jour
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;

