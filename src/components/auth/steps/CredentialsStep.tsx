
import React, { useState } from "react";
import { ChevronLeft, Mail, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CredentialsStepProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isRegistering: boolean;
}

const CredentialsStep: React.FC<CredentialsStepProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onBack,
  isRegistering
}) => {
  // Form validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password && password.length >= 6;
  
  const emailError = emailTouched && !isEmailValid ? "Email invalide" : null;
  const passwordError = passwordTouched && !isPasswordValid ? "Le mot de passe doit contenir au moins 6 caractères" : null;
  
  const isFormValid = isEmailValid && isPasswordValid;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    
    if (isFormValid) {
      onSubmit();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-oswald text-tribal-green uppercase tracking-wide">Crée ton compte</h2>
        <p className="text-sm text-white/80">Entre tes identifiants pour finaliser ton inscription</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5 text-white/60" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className="tribal-input pl-10 text-white"
              placeholder="Ton email"
              disabled={isRegistering}
            />
          </div>
          {emailError && <p className="mt-1 text-sm text-red-400">{emailError}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5 text-white/60" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              className="tribal-input pl-10 text-white"
              placeholder="Ton mot de passe"
              disabled={isRegistering}
            />
          </div>
          {passwordError && <p className="mt-1 text-sm text-red-400">{passwordError}</p>}
        </div>
        
        <div className="space-y-4">
          <Button 
            type="submit" 
            className="w-full tribal-btn-primary" 
            disabled={isRegistering || !isFormValid}
          >
            {isRegistering ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Création du compte...
              </>
            ) : (
              "Finaliser l'inscription"
            )}
          </Button>
          
          <Button 
            type="button" 
            onClick={onBack} 
            className="w-full bg-transparent hover:bg-white/5 text-white border border-white/20"
            disabled={isRegistering}
          >
            <ChevronLeft size={16} className="mr-2" />
            Retour
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CredentialsStep;
