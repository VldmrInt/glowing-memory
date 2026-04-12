export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  emoji: string;
}
