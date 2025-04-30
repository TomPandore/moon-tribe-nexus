
import React from "react";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import { Trophy, Target, Calendar, Flame, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
  const { user } = useAuth();
  const { currentProgram } = useProgram();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  // Determine clan colors based on the user's clan
  const getClanColor = () => {
    if (!user.clan) return "bg-primary/10";

    switch(user.clan) {
      case "ONOTKA": return "bg-red-600";
      case "EKLOA": return "bg-blue-600";
      case "OKWÁHO": return "bg-green-600";
      default: return "bg-primary/10";
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenue, {user.name}</h1>
        <p className="text-muted-foreground">
          Voici un aperçu de votre progression et de votre programme actuel
        </p>
        
        {user.clan && (
          <div className="flex items-center gap-3 mt-4">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getClanColor())}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">Clan {user.clan}</span>
          </div>
        )}
      </div>

      {currentProgram ? (
        <>
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Programme en cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{currentProgram.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Jour {user.progress.currentDay} sur {currentProgram.duration}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  Voir le rituel du jour
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de jours complétés</p>
                    <p className="text-2xl font-bold">{user.progress.totalCompletedDays}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Série en cours</p>
                    <p className="text-2xl font-bold">{user.progress.streak} jours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jours restants</p>
                    <p className="text-2xl font-bold">{currentProgram.duration - user.progress.currentDay}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Aucun programme sélectionné</h3>
              <p className="text-muted-foreground mb-4">
                Commencez votre aventure en choisissant un programme qui vous correspond
              </p>
              <Button onClick={() => navigate("/programs")}>
                Découvrir les programmes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
