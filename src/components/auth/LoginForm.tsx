
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("LoginForm: Attempting login with email:", email);
      await login(email, password);
      console.log("LoginForm: Login successful");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MoHero !",
      });
    } catch (err: any) {
      console.error("LoginForm: Login failed:", err);
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
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
            className="tribal-input w-full pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="tribal-input w-full pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full tribal-btn-primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};
