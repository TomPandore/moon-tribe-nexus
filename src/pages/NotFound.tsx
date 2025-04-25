
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-foreground mb-6">
          Oups ! La page que vous cherchez est introuvable
        </p>
        <p className="text-muted-foreground mb-8">
          Il semble que vous essayiez d'accéder à une page qui n'existe pas ou a été déplacée
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home size={18} />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
