
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import NameStep from "./steps/NameStep";
import ClanStep from "./steps/ClanStep";
import CredentialsStep from "./steps/CredentialsStep";
import WelcomeStep from "./steps/WelcomeStep";

export type ClanType = "ONOTKA" | "EKLOA" | "OKWÁHO";

export interface RegisterData {
  name: string;
  clan: ClanType | null;
  email: string;
  password: string;
}

interface RegisterFlowProps {
  onCancel: () => void;
}

const RegisterFlow: React.FC<RegisterFlowProps> = ({ onCancel }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState<number>(1);
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    clan: null,
    email: "",
    password: ""
  });
  const [isRegistering, setIsRegistering] = useState(false);
  
  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const handleSubmitRegistration = async () => {
    if (isRegistering) return;
    
    try {
      setIsRegistering(true);
      
      if (!registerData.email || !registerData.password || !registerData.name || !registerData.clan) {
        throw new Error("Veuillez remplir tous les champs");
      }
      
      await register(registerData.email, registerData.password, registerData.name, { 
        clan: registerData.clan
      });
      
      // After successful registration, go to the welcome step
      handleNextStep();
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCompleteRegistration = () => {
    navigate("/programs");
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
      <div className="absolute inset-0 tribal-pattern pointer-events-none"></div>
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="tribal-card glass-panel">
            {step === 1 && (
              <NameStep 
                name={registerData.name}
                onNameChange={(name) => updateRegisterData({ name })}
                onNext={handleNextStep}
                onCancel={handlePrevStep}
              />
            )}
            
            {step === 2 && (
              <ClanStep 
                selectedClan={registerData.clan}
                onClanSelect={(clan) => updateRegisterData({ clan })}
                onNext={handleNextStep}
                onBack={handlePrevStep}
              />
            )}
            
            {step === 3 && (
              <CredentialsStep 
                email={registerData.email}
                password={registerData.password}
                onEmailChange={(email) => updateRegisterData({ email })}
                onPasswordChange={(password) => updateRegisterData({ password })}
                onSubmit={handleSubmitRegistration}
                onBack={handlePrevStep}
                isRegistering={isRegistering}
              />
            )}
            
            {step === 4 && (
              <WelcomeStep 
                name={registerData.name}
                clan={registerData.clan as ClanType}
                onComplete={handleCompleteRegistration}
              />
            )}
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <button 
              onClick={onCancel}
              className="tribal-link"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFlow;
