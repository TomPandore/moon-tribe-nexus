
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ClanType } from "../RegisterFlow";
import { cn } from "@/lib/utils";

interface ClanStepProps {
  selectedClan: ClanType | null;
  onClanSelect: (clan: ClanType) => void;
  onNext: () => void;
  onBack: () => void;
}

const clans: {
  id: ClanType;
  name: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "ONOTKA",
    name: "CLAN ONOTKA",
    title: "La force brute. La résistance mentale.",
    description: "Pour ceux qui veulent prendre en masse, construire un corps solide et fiable. Tu forges ta structure. Tu deviens le socle.",
    image: "/placeholder.svg", // Replace with actual image
    icon: Shield,
    color: "bg-red-600",
  },
  {
    id: "EKLOA",
    name: "CLAN EKLOA",
    title: "La vitesse. L'explosivité.",
    description: "Pour ceux qui veulent bondir, frapper, performer. Un corps rapide, réactif, pensé pour l'action du sportif.",
    image: "/placeholder.svg", // Replace with actual image
    icon: Shield,
    color: "bg-blue-600",
  },
  {
    id: "OKWÁHO",
    name: "CLAN OKWÁHO",
    title: "La fluidité. L'adaptabilité. L'équilibre.",
    description: "Pour ceux qui veulent bouger mieux, plus librement, sans contrainte. Tu construis un corps souple, mobile, intelligent.",
    image: "/placeholder.svg", // Replace with actual image
    icon: Shield,
    color: "bg-green-600",
  }
];

const ClanStep: React.FC<ClanStepProps> = ({ selectedClan, onClanSelect, onNext, onBack }) => {
  const handleContinue = () => {
    if (selectedClan) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">🔥 ÉTAPE 2 – À quel clan appartiens-tu ?</h2>
      
      <div className="text-center mb-8">
        <div className="bg-tribal-green/10 rounded-lg p-4 mb-4">
          <p className="italic text-muted-foreground">
            "Écoute ton corps. Choisis ta voie."
          </p>
        </div>
      </div>
      
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {clans.map((clan) => (
              <CarouselItem key={clan.id}>
                <div className="p-1">
                  <div 
                    className={cn(
                      "rounded-lg p-6 flex flex-col items-center text-center border-2 transition-all",
                      selectedClan === clan.id 
                        ? "border-tribal-green bg-tribal-green/10" 
                        : "border-border hover:border-tribal-green/50"
                    )}
                  >
                    <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-4", clan.color)}>
                      <clan.icon size={48} className="text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-tribal-green mb-2">{clan.name}</h3>
                    <p className="font-medium mb-3">{clan.title}</p>
                    <p className="text-muted-foreground mb-4">{clan.description}</p>
                    
                    <div className="font-bold text-tribal-green">💥 Objectif:</div>
                    <div className="text-sm">
                      {clan.id === "ONOTKA" && "puissance, stabilité, endurance physique"}
                      {clan.id === "EKLOA" && "explosivité, coordination, athlétisme"}
                      {clan.id === "OKWÁHO" && "mobilité, posture, agilité fonctionnelle"}
                    </div>
                    
                    <Button 
                      className={cn(
                        "mt-6 w-full",
                        selectedClan === clan.id ? "tribal-btn-primary" : "tribal-btn-outline"
                      )}
                      onClick={() => onClanSelect(clan.id)}
                    >
                      {selectedClan === clan.id ? "Clan sélectionné" : "Choisir ce clan"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Retour
        </Button>
        <Button 
          onClick={handleContinue} 
          className="tribal-btn-primary"
          disabled={!selectedClan}
        >
          Suivant
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ClanStep;
