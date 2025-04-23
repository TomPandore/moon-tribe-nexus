
export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  focus: string[];
  image: string;
  illustration?: string;
  category?: "free" | "premium";
}
