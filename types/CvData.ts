export type WorkExperienceOrProject = {
  title: string;
  company: string;
  date: string;
  responsibilities?: string[];
  details?: string[];
  location?: string;
  role?: string;
};

export type CvData = {
  fullName: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  about: string;
  workExperience: WorkExperienceOrProject[];
  education: { degree: string; institution: string; date: string }[];
  projects: WorkExperienceOrProject[];
  technologies: string[];
};