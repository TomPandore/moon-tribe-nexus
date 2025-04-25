
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("RegisterForm: Attempting registration with email:", email);
      await register(email, password, name);
      console.log("RegisterForm: Registration successful");
      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte",
      });
    } catch (err: any) {
      console.error("RegisterForm: Registration failed:", err);
      setError(err.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="register-name" className="block text-sm font-medium text-muted-foreground mb-1">
          Nom (optionnel)
        </label>
        <div className="relative">
          <User size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <Input
            id="register-name"
            type="text"
            autoComplete="name"
            className="tribal-input w-full pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label htmlFor="register-password" className="block text-sm font-medium text-muted-foreground mb-1">
          Mot de passe
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
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
        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </form>
  );
};
