
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onRitualClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onRitualClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Determine clan colors based on the user's clan
  const getClanBadge = () => {
    if (!user.clan) return null;

    const clanColors = {
      "ONOTKA": "bg-red-600",
      "EKLOA": "bg-blue-600",
      "OKWÁHO": "bg-green-600"
    };

    const clanColor = clanColors[user.clan] || "bg-primary/10";

    return (
      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", clanColor)}>
        <Shield size={12} className="text-white" />
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-30">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
            onClick={() => navigate("/profile")}
            title="Voir ou modifier mon profil"
          >
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-gray-600">
              <User size={22} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{user.name || user.email}</span>
                {user.clan && getClanBadge()}
              </div>
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
