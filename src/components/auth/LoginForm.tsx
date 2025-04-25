
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginForm = ({ isLoading }: { isLoading: boolean }) => {
  const { login } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

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
      
    } catch (error) {
      console.error("Login form error:", error);
      setLoginInProgress(false);
    }
  };

  return (
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
      
      <div className="text-xs text-muted-foreground">
        État: {loginInProgress ? "En cours" : "Prêt"} | 
        Auth: {isLoading ? "Chargement" : "Non connecté"}
      </div>
    </form>
  );
};
