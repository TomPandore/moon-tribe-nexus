
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Shield } from "lucide-react";
import { UserInfoEdit } from "@/components/UserInfoEdit";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleUpdateUserInfo = (data: { name: string; email: string }) => {
    // TODO: Implement user info update when backend is connected
    console.log("Updating user info:", data);
  };

  // Get clan badge color
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
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
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
              <span>Pseudo</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{user.name || '-'}</span>
                <UserInfoEdit 
                  currentName={user.name}
                  currentEmail={user.email}
                  onUpdate={handleUpdateUserInfo}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span>Adresse email</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span>Clan</span>
              {user.clan ? (
                <div className="flex items-center gap-2">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", getClanColor())}>
                    <Shield size={12} className="text-white" />
                  </div>
                  <span className="text-muted-foreground">Clan {user.clan}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Non défini</span>
              )}
            </div>
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span>Programme en cours</span>
              <span className="text-muted-foreground">Jour {user.progress.currentDay}</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
