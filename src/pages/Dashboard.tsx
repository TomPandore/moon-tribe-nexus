
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Gauge, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentProgram } = useProgram();
  const { user } = useAuth();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue, {user.name || "Champion"} 👋
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de votre progression
          </p>
        </section>

        {/* Current Program Section */}
        {currentProgram ? (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Programme en cours</h2>
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-2">{currentProgram.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{currentProgram.description}</p>
                  <Button 
                    onClick={() => navigate("/")} 
                    className="bg-primary text-white"
                  >
                    Continuer le rituel
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Progression</p>
                  <p className="text-2xl font-bold">
                    Jour {user.progress.currentDay}/{currentProgram.duration}
                  </p>
                </div>
              </div>
            </Card>
          </section>
        ) : (
          <section className="mb-8">
            <Card className="p-6 bg-muted/50">
              <h2 className="text-xl font-medium mb-2">Aucun programme sélectionné</h2>
              <p className="text-muted-foreground mb-4">
                Commencez votre aventure en choisissant un programme qui vous correspond.
              </p>
              <Button onClick={() => navigate("/programs")}>
                Découvrir les programmes
              </Button>
            </Card>
          </section>
        )}

        {/* Stats Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Vos statistiques</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Série actuelle</p>
                  <p className="text-2xl font-bold">{user.progress.streak}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total des rituels</p>
                  <p className="text-2xl font-bold">{user.progress.totalCompletedDays}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dernier jour complété</p>
                  <p className="text-2xl font-bold">{user.progress.lastCompletedDay || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gauge className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux de complétion</p>
                  <p className="text-2xl font-bold">
                    {user.progress.totalCompletedDays > 0 && currentProgram
                      ? Math.round((user.progress.totalCompletedDays / currentProgram.duration) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
