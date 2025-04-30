
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, User } from "lucide-react";

interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ name, onNameChange, onNext, onCancel }) => {
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Veuillez entrer votre nom");
      return;
    }
    
    onNext();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">🧭 ÉTAPE 1 – Le Nom</h2>
      
      <div className="text-center">
        <p className="text-lg mb-8">Tout voyage commence par un nom. Quel est ton nom ?</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Ton prénom ou ton nom d'initié
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
              <Input
                value={name}
                onChange={(e) => {
                  onNameChange(e.target.value);
                  setError("");
                }}
                placeholder="Entre ton nom"
                className="tribal-input w-full pl-10"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-xs text-muted-foreground mt-2">
              Ce nom sera utilisé pour signer tes progrès et tes badges
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" className="tribal-btn-primary">
              Suivant
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameStep;
