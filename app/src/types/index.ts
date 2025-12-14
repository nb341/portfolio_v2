export interface Skill {
  cat: 'Frontend' | 'Backend' | 'DevOps' | 'Database' | 'ML/AI' | 'Physics';
  color: number;
}

export interface Project {
  id: number;
  title: string;
  company?: string;
  category: 'fullstack' | 'devops' | 'frontend' | 'ml' | 'hpc';
  description: string;
  tags: string[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  code: string;
  icon: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  url: string;
}

export interface AppData {
  skills: Record<string, Skill>;
  projects: Project[];
  certificates: Certificate[];
  blogPosts: BlogPost[];
}
