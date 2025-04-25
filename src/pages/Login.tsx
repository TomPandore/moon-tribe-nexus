
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn, Mail, Lock, User } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, user, isLoading } = useAuth();
  const { toast } = useToast();
  
  // États pour le login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  // États pour l'inscription
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerInProgress, setRegisterInProgress] = useState(false);
  
  // Redirect if user is already logged in
  useEffect(() => {
    console.log("Login page - auth state:", { user, isLoading });
    
    if (user && !isLoading) {
      console.log("Redirecting to dashboard because user is logged in");
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginInProgress) return;
    
    try {
      setLoginInProgress(true);
      
      if (!loginEmail || !loginPassword) {
        throw new Error("Veuillez remplir tous les champs");
      }
      
      console.log("Submitting login form");
      await login(loginEmail, loginPassword);
      // La redirection est gérée par l'useEffect ci-dessus
      
    } catch (error) {
      console.error("Login form error:", error);
    } finally {
      setLoginInProgress(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerInProgress) return;
    
    try {
      setRegisterInProgress(true);
      
      if (!registerEmail || !registerPassword) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      
      await register(registerEmail, registerPassword, registerName);
      
    } catch (error) {
      console.error("Register form error:", error);
    } finally {
      setRegisterInProgress(false);
    }
  };
  
  if (isLoading && user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-lg text-muted-foreground animate-pulse">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
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
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="tribal-input w-full pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        disabled={loginInProgress}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-muted-foreground mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="tribal-input w-full pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={loginInProgress}
                      />
                    </div>
                  </div>

                  <div>
                    <Button 
                      type="submit" 
                      className="w-full tribal-btn-primary" 
                      disabled={loginInProgress}
                    >
                      {loginInProgress ? "Connexion..." : "Se connecter"}
                    </Button>
                  </div>
                  
                  {/* Debugging state */}
                  <div className="text-xs text-muted-foreground">
                    État: {loginInProgress ? "Connexion en cours" : "Prêt"} | 
                    Auth: {isLoading ? "Chargement" : (user ? "Connecté" : "Non connecté")}
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label htmlFor="register-name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Nom (optionnel)
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="tribal-input w-full pl-10"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        disabled={registerInProgress}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="tribal-input w-full pl-10"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        disabled={registerInProgress}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-muted-foreground mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="tribal-input w-full pl-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        disabled={registerInProgress}
                      />
                    </div>
                  </div>

                  <div>
                    <Button 
                      type="submit" 
                      className="w-full tribal-btn-primary" 
                      disabled={registerInProgress}
                    >
                      {registerInProgress ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <button 
              onClick={() => navigate("/")}
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
