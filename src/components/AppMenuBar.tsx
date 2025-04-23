
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cog, Calendar, List } from "lucide-react";
import { cn } from "@/lib/utils";

// (optionnel : on peut plus tard ajouter une prop pour rendre ce menu context-sensitive)
const navItems = [
  {
    label: "Paramètres",
    icon: Cog,
    to: "/settings",
    testId: "menu-settings"
  },
  {
    label: "Rituel du jour",
    icon: Calendar,
    to: "/dashboard",
    testId: "menu-ritual"
  },
  {
    label: "Programmes",
    icon: List,
    to: "/programs",
    testId: "menu-programs"
  }
];

const AppMenuBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pour gérer des focus/états actifs :
  const isActive = (to: string) =>
    location.pathname.startsWith(to) ||
    (to === "/dashboard" && location.pathname === "/");

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
                  // Spécificité : si on est déjà sur dashboard et clique sur Rituel → scroll section
                  if (item.to === "/dashboard" && location.pathname === "/dashboard") {
                    // scroll smooth vers le rituel
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
