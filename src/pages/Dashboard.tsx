
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bienvenue, {user.name || "Champion"} ! 👋</h1>
            <p className="text-muted-foreground">Prêt à commencer ta journée en force ?</p>
          </div>

          <div className="grid gap-4">
            <Button 
              size="lg" 
              className="w-full h-24 text-xl"
              onClick={() => navigate("/ritual")}
            >
              <Dumbbell className="mr-2 h-6 w-6" />
              Commencer mon rituel du jour
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
