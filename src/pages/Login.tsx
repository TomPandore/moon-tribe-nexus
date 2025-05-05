
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn, Mail, Lock } from "lucide-react";
import RegisterFlow from "@/components/auth/RegisterFlow";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
  
  const { login, user, isLoading } = useAuth();
  const { toast } = useToast();
  const [showRegisterFlow, setShowRegisterFlow] = useState(false);

  // États pour le login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInProgress) return;

    try {
      setLoginInProgress(true);
      
      if (!loginEmail || !loginPassword) {
        throw new Error("Veuillez remplir tous les champs");
      }
      
      await login(loginEmail, loginPassword);
      // La redirection est gérée par l'useEffect ci-dessus
    } catch (error) {
      console.error("Login form error:", error);
    } finally {
      setLoginInProgress(false);
    }
  };

  if (isLoading && user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tribal-dark">
        <div className="text-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-lg text-white/70 animate-pulse">Chargement...</p>
        </div>
      </div>
    );
  }

  if (showRegisterFlow) {
    return <RegisterFlow onCancel={() => setShowRegisterFlow(false)} />;
  }

  // Style inline pour l'arrière-plan avec l'URL distante
  const backgroundStyle = {
    backgroundImage: `url('https://mohero.fr/wp-content/uploads/2025/05/arriereplan-screen1.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  console.log("Background image URL:", 'https://mohero.fr/wp-content/uploads/2025/05/arriereplan-screen1.png');

  return (
    <div className="min-h-screen text-white" style={backgroundStyle}>
      {/* Suppression de l'overlay noir */}
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md relative animate-fade-in">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <h2 className="text-3xl font-oswald text-center mb-1 text-tribal-green uppercase tracking-wider">Rejoindre la tribu</h2>
          
          <p className="text-center text-white/80 mb-6">
            Transforme ton quotidien avec des rituels de mouvements
          </p>

          <div className="tribal-card glass-panel">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/20 border border-white/10">
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
                    <label htmlFor="login-email" className="block text-sm font-medium text-white/80 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3.5 text-white/60" />
                      <Input id="login-email" name="email" type="email" autoComplete="email" required className="tribal-input w-full pl-10" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} disabled={loginInProgress} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-white/80 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3.5 text-white/60" />
                      <Input id="login-password" name="password" type="password" autoComplete="current-password" required className="tribal-input w-full pl-10" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} disabled={loginInProgress} />
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full tribal-btn-primary" disabled={loginInProgress}>
                      {loginInProgress ? "Connexion..." : "Se connecter"}
                    </Button>
                  </div>
                  
                  {from !== "/" && (
                    <div className="text-sm text-tribal-green">
                      Vous devez vous connecter pour accéder à cette page.
                    </div>
                  )}
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="text-center space-y-6">
                  <h3 className="text-lg font-bold text-white">Commencer ton aventure</h3>
                  
                  <p className="text-white/70">Mohero transforme le mouvement en mode de vie</p>
                  
                  <Button onClick={() => setShowRegisterFlow(true)} className="w-full tribal-btn-primary">
                    <UserPlus size={18} className="mr-2" />
                    Rejoindre la tribu
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
