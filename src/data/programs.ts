import { Program } from "@/types";

export const programs: Program[] = [
  // PROGRAMMES DÉCOUVERTE (gratuits)
  {
    id: "rituels-nomades",
    name: "Rituels Nomades",
    description: "Découvre les mouvements essentiels des MoHero, à faire partout, sans matériel.",
    duration: 5,
    difficulty: "easy",
    focus: ["Mobilité", "Conscience corporelle", "Posture"],
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    illustration: "/lovable-uploads/86814141-c70c-4c87-ab9d-70e6fdba4dd6.png",
    category: "free"
  },
  {
    id: "souffle-jaguar",
    name: "Souffle du Jaguar",
    description: "Un programme court et intense pour activer ton énergie vitale et ton ancrage.",
    duration: 7,
    difficulty: "easy",
    focus: ["Endurance", "Respiration", "Stress", "Force"],
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    category: "free"
  },

  // PROGRAMMES PREMIUM (MOHERO)
  {
    id: "origin",
    name: "MoHero Origin",
    description: "La fondation complète de l'héritier MoHero. Corps entier, mental focus, rituels ancestraux.",
    duration: 42,
    difficulty: "hard",
    focus: ["Force", "Endurance", "Respiration", "Posture", "Discipline"],
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    illustration: "/lovable-uploads/e868776b-601e-42cb-b122-0fa9e4c28a41.png",
    category: "premium"
  },
  {
    id: "corps-chene",
    name: "Le Corps du Chêne",
    description: "Mobilité, agilité et souffle. Un corps enraciné mais fluide, fort mais libre.",
    duration: 28,
    difficulty: "medium",
    focus: ["Mobilité", "Respiration", "Posture", "Agilité"],
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    illustration: "/lovable-uploads/2a0005ce-b4eb-45cc-801b-c82f727cd714.png",
    category: "premium"
  },
  {
    id: "fureur-jaguar",
    name: "Fureur du Jaguar",
    description: "Vitesse, explosivité, et précision animale. Deviens un chasseur insaisissable.",
    duration: 28,
    difficulty: "medium",
    focus: ["Agilité", "Explosivité", "Coordination", "Vitesse"],
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    illustration: "/lovable-uploads/a71438cc-e059-423f-9968-974d095c8b09.png",
    category: "premium"
  },
  {
    id: "maree-crocodile",
    name: "Marée du Crocodile",
    description: "Fluidité dans l'effort, relâchement dans l'intensité. Mouvement pur.",
    duration: 21,
    difficulty: "medium",
    focus: ["Souplesse", "Contrôle", "Respiration", "Conscience corporelle"],
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    illustration: "/lovable-uploads/5bff93d1-0e04-4995-87af-9fce87103940.png",
    category: "premium"
  }
];
