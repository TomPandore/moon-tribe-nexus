
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Skeleton } from "@/components/ui/skeleton";

const Login: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // If user is logged in, redirect to home
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="absolute inset-0 tribal-pattern pointer-events-none"></div>
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <h2 className="text-3xl font-oswald text-center mb-2 text-tribal-green uppercase tracking-wider">
            Rejoins la communauté
          </h2>
          
          <p className="text-center text-muted-foreground mb-8">
            Transforme ton quotidien avec des rituels de mouvements
          </p>

          <div className="tribal-card glass-panel">
            {isLoading ? (
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-32 mx-auto mb-4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-tribal-green data-[state=active]:text-black">
                    <LogIn size={16} className="mr-2" />
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-tribal-green data-[state=active]:text-black">
                    <UserPlus size={16} className="mr-2" />
                    Inscription
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            )}
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <button 
              onClick={() => window.location.href = "/"}
              className="tribal-link"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
