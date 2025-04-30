
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Mail } from "lucide-react";

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
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "L'email est requis";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Dernière étape - Créer ton compte</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                onEmailChange(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              className="tribal-input w-full pl-10"
              placeholder="ton@email.com"
              disabled={isRegistering}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              value={password}
              onChange={(e) => {
                onPasswordChange(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className="tribal-input w-full pl-10"
              placeholder="Mot de passe (6 caractères minimum)"
              disabled={isRegistering}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack} disabled={isRegistering}>
            <ArrowLeft size={16} className="mr-2" />
            Retour
          </Button>
          <Button 
            type="submit" 
            className="tribal-btn-primary" 
            disabled={isRegistering}
          >
            {isRegistering ? "Création en cours..." : "Créer mon compte"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CredentialsStep;
