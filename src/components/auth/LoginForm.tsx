
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    try {
      setLoginInProgress(true);
      console.log("LoginForm: Attempting login with email:", email);
      await login(email, password);
      console.log("LoginForm: Login successful");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MoHero !",
      });
      navigate("/", { replace: true });
    } catch (err: any) {
      console.error("LoginForm: Login failed:", err);
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setLoginInProgress(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 p-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
          Email
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="w-full pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loginInProgress}
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
          Mot de passe
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginInProgress}
            placeholder="••••••••"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full tribal-btn-primary" 
        disabled={loginInProgress}
      >
        {loginInProgress ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};
