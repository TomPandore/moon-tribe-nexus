
import { Program } from "@/types";

export const programs: Program[] = [
  {
    id: "origin",
    name: "MoHero Origin",
    description: "Programme d'introduction aux mouvements tribaux et fonctionnels",
    duration: 28,
    difficulty: "easy",
    focus: ["Mobilité", "Force", "Posture"],
    image: "/programs/origin.jpg"
  },
  {
    id: "warrior",
    name: "Warrior Flow",
    description: "Développez votre force et votre endurance avec des mouvements inspirés des guerriers",
    duration: 21,
    difficulty: "medium",
    focus: ["Force", "Endurance", "Coordination"],
    image: "/programs/warrior.jpg"
  },
  {
    id: "primal",
    name: "Primal Movement",
    description: "Reconnectez-vous avec vos mouvements naturels et instinctifs",
    duration: 14,
    difficulty: "medium",
    focus: ["Mobilité", "Agilité", "Coordination"],
    image: "/programs/primal.jpg"
  },
  {
    id: "breathe",
    name: "Breathe & Move",
    description: "Intégrez des techniques de respiration puissantes avec le mouvement",
    duration: 7,
    difficulty: "easy",
    focus: ["Respiration", "Récupération", "Conscience corporelle"],
    image: "/programs/breathe.jpg"
  },
  {
    id: "strength",
    name: "Tribal Strength",
    description: "Construisez une force fonctionnelle avec des mouvements simples mais puissants",
    duration: 42,
    difficulty: "hard",
    focus: ["Force", "Puissance", "Endurance"],
    image: "/programs/strength.jpg"
  }
];
