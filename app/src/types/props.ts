interface SkillsSectionProps {
  skills: Record<string, Skill>;
  loading: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
  loading: boolean;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
  loading: boolean;
}