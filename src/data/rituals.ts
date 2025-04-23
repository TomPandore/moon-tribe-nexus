
import { DailyRitual } from "@/types";

export const getRitualsByProgram = (programId: string): DailyRitual[] => {
  if (programId === "origin") {
    return [
      {
        day: 1,
        title: "Éveil du Guerrier",
        description: "Commencez votre voyage avec des mouvements d'éveil corporel",
        completed: false,
        exercises: [
          {
            id: "squat-1",
            name: "Squats tribaux",
            description: "Pieds plus larges que les épaules, descendre profondément",
            reps: 30,
            type: "reps",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/DYEbUF4xs1Y"
          },
          {
            id: "pushup-1",
            name: "Pompes",
            description: "Commencez sur les genoux si nécessaire",
            reps: 10,
            type: "reps",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/_l3ySVKYVJ8"
          },
          {
            id: "plank-1",
            name: "Planche",
            description: "Maintenez une position de planche droite",
            duration: 30,
            type: "duration",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/pSHjTRCQxIw"
          },
          {
            id: "breath-1",
            name: "Respiration profonde",
            description: "Inspirez 4s, retenez 4s, expirez 8s",
            duration: 60,
            type: "duration",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/1ZcK5QK2KZc"
          }
        ]
      },
      {
        day: 2,
        title: "Mobilité Animale",
        description: "Explorez la mobilité naturelle de votre corps",
        completed: false,
        exercises: [
          {
            id: "bear-crawl",
            name: "Marche de l'ours",
            description: "Déplacez-vous comme un ours, opposés main-pied",
            duration: 45,
            type: "duration",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/IBqgRZGbv4E"
          },
          {
            id: "cossack-squats",
            name: "Squats cosaques",
            description: "Alternez de gauche à droite",
            reps: 20,
            type: "reps",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/uqLNxJe4L2I"
          },
          {
            id: "hip-circles",
            name: "Cercles de hanches",
            description: "Mobilisez vos hanches en cercles amples",
            reps: 20,
            type: "reps",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/bR5VWwYp-nY"
          },
          {
            id: "cat-cow",
            name: "Chat-vache",
            description: "Alternez entre arrondir et creuser le dos",
            duration: 60,
            type: "duration",
            completed: 0,
            image: "/placeholder.svg",
            video: "https://www.youtube.com/embed/kqnua4rHVVA"
          }
        ]
      },
      // Ajoutez d'autres jours selon besoin
    ];
  }
  
  // Template par défaut pour les autres programmes
  return Array(7).fill(null).map((_, index) => ({
    day: index + 1,
    title: `Jour ${index + 1}`,
    description: "Description du rituel",
    completed: false,
    exercises: [
      {
        id: `ex-${index}-1`,
        name: "Exercise 1",
        reps: 20,
        type: "reps",
        completed: 0
      },
      {
        id: `ex-${index}-2`,
        name: "Exercise 2",
        duration: 30,
        type: "duration",
        completed: 0
      }
    ]
  }));
};

