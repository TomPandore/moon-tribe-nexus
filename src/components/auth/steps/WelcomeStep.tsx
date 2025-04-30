
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { ClanType } from "../RegisterFlow";
import { cn } from "@/lib/utils";

interface WelcomeStepProps {
  name: string;
  clan: ClanType;
  onComplete: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ name, clan, onComplete }) => {
  const clanColor = 
    clan === "ONOTKA" ? "bg-red-600" : 
    clan === "EKLOA" ? "bg-blue-600" : 
    "bg-green-600";
    
  const clanWelcomeMessage = () => {
    switch(clan) {
      case "ONOTKA":
        return (
          <p className="italic text-lg leading-relaxed mb-6">
            {name} ! Tu as choisi la Voie des Onotka.<br/>
            Une voie lente. Une voie dure. Une voie qui ne ment pas.<br/>
            Ici, on ne cherche pas à impressionner.<br/>
            On construit.<br/>
            Chaque mouvement que tu feras posera une pierre.<br/>
            Et à la fin, tu deviendras le mur.
          </p>
        );
      case "EKLOA":
        return (
          <p className="italic text-lg leading-relaxed mb-6">
            Tu n'es pas ici pour t'endurcir.<br/>
            Tu es ici pour traquer. Bondir. Frapper.<br/>
            Chez les Ekloa, on ne répète rien.<br/>
            On guette. On vise. On percute.<br/>
            Chaque mouvement est un piège. Chaque muscle, une lame prête à jaillir.<br/>
            Nous sommes l'éclair dans les feuilles. Le son que tu n'entends pas. Le choc que tu ne vois pas venir.<br/>
            Bienvenue chez les Ekloa {name}<br/>
            Le monde est lent. Mais toi tu es l'éclair.
          </p>
        );
      case "OKWÁHO":
        return (
          <p className="italic text-lg leading-relaxed mb-6">
            {name} ! Tu entres chez les Okwáho.<br/>
            Ici, personne ne t'attend.<br/>
            On avance, on glisse, on disparaît.<br/>
            Le monde veut que tu sois figé.<br/>
            Nous, on veut que tu sois fluide.<br/>
            Okwáho, c'est la voie du vent dans les feuilles.<br/>
            C'est le pas silencieux dans la forêt.<br/>
            C'est toi, quand plus rien ne te retient.
          </p>
        );
      default:
        return <p>Bienvenue dans la tribu MoHero, {name}.</p>;
    }
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto", clanColor)}>
          <Shield size={40} className="text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-tribal-green mt-4">
          Bienvenue au Clan {clan}
        </h2>
        
        <div className="mt-6 text-center max-w-md mx-auto">
          {clanWelcomeMessage()}
        </div>
      </div>
      
      <Button 
        onClick={onComplete} 
        className="tribal-btn-primary w-full"
      >
        Choisir mon programme
      </Button>
    </div>
  );
};

export default WelcomeStep;
