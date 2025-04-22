
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour le login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // États pour l'inscription
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error("Veuillez remplir tous les champs");
      }
      
      await login(loginEmail, loginPassword);
      navigate("/dashboard");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MoHero !",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!registerEmail || !registerPassword) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      
      await register(registerEmail, registerPassword, registerName);
      navigate("/programs");
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur MoHero ! Choisissez un programme pour commencer.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-tribal-darker to-tribal-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          Commencez votre voyage tribal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Transformez votre quotidien avec des rituels de mouvements fonctionnels
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="tribal-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="tribal-input w-full"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-300">
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="tribal-input w-full"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full tribal-btn-primary" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label htmlFor="register-name" className="block text-sm font-medium text-gray-300">
                    Nom (optionnel)
                  </label>
                  <div className="mt-1">
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="tribal-input w-full"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="tribal-input w-full"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-300">
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="tribal-input w-full"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full tribal-btn-primary" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Inscription..." : "S'inscrire"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
