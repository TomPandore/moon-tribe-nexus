
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerInProgress, setRegisterInProgress] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerInProgress) return;
    
    try {
      setRegisterInProgress(true);
      
      if (!registerEmail || !registerPassword) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      
      await register(registerEmail, registerPassword, registerName);
      setRegisterInProgress(false);
      
    } catch (error) {
      console.error("Register form error:", error);
      setRegisterInProgress(false);
    }
  };

  return (
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
  );
};
