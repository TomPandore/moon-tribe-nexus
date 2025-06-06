
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flame, ArrowRight, Calendar, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  {
    label: "Totem",
    icon: Flame,
    to: "/",
    testId: "menu-home"
  },
  {
    label: "Voies",
    icon: ArrowRight,
    to: "/programs",
    testId: "menu-programs"
  },
  {
    label: "Rituel du jour",
    icon: Calendar,
    to: "/dashboard",
    testId: "menu-ritual"
  },
  {
    label: "Compte",
    icon: UserRound,
    to: "/settings",
    testId: "menu-settings"
  }
];

const AppMenuBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is not authenticated, don't render the menu bar
  if (!user) {
    return null;
  }

  const isActive = (to: string) =>
    location.pathname === to ||
    (to === "/" && location.pathname === "/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-safe">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <li key={item.to}>
              <button
                data-testid={item.testId}
                type="button"
                className={cn(
                  "flex flex-col items-center justify-center px-2 hover:text-primary transition-colors focus:outline-none",
                  active ? "text-primary font-semibold" : "text-gray-500"
                )}
                onClick={() => {
                  // Pour la page d'accueil, naviguer directement
                  if (item.to === "/") {
                    navigate("/");
                    return;
                  }
                  
                  // Pour le dashboard, gérer le défilement si déjà sur la page
                  if (item.to === "/dashboard" && location.pathname === "/dashboard") {
                    const el = document.getElementById("ritual-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      return;
                    }
                  }
                  
                  navigate(item.to);
                }}
                title={item.label}
              >
                <Icon size={24} className="mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AppMenuBar;
