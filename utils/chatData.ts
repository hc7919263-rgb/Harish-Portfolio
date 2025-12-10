// chatData.ts
// Enriched dataset for the chatbot and UI.
// Clear, small objects. Use them directly in the chat and project pages.

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
  updatedAt?: string; // ISO date when the answer was last reviewed
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  outcomes?: string[]; // concrete results or learnings
  tech: string[];
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  status?: 'complete' | 'in-progress' | 'coming-soon';
  year?: number;
};

// Core quick responses used by the chat UI
export const responses = {
  greeting: "Hi, I'm Analytica. Ask me about Harish's projects, skills, or contact info.",
  contact:
    "You can reach Harish from the Contact page. Phone: +91 70304 30756, Email: hrchavan0402@gmail.com, GitHub: https://github.com/Harry-0402, LinkedIn: https://www.linkedin.com/in/harish-chavan-a4248738b",
  unknown: "I don't have a direct answer for that. Ask about projects, skills, the Creations section, or contact details."
};

// UI chips for quick filtering and navigation
export const chips = [
  { id: 'c_projects', label: 'Projects' },
  { id: 'c_skills', label: 'Skills' },
  { id: 'c_about', label: 'About' },
  { id: 'c_contact', label: 'Contact' },
  { id: 'c_foundation', label: 'Foundation' },
  { id: 'c_legal', label: 'Legal' },
  { id: 'c_collab', label: 'Collaboration' }
];

// Curated projects list. Concrete outcomes help users decide quickly.
export const projects: Project[] = [
  {
    id: 'p_superstore',
    title: 'SuperStore: Sales & Profit Analysis',
    summary: 'End-to-end analysis of sales and profit drivers for a retail dataset.',
    outcomes: [
      'Identified top 3 low-margin product lines',
      'Built KPI dashboard for monthly revenue and profit trends'
    ],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Excel'],
    githubUrl: 'https://github.com/Harry-0402/P102---SuperStore-Sales-and-Profits-Analysis',
    status: 'complete',
    year: 2024
  },
  {
    id: 'p_pandas_handbook',
    title: 'Pandas Handbook for Business Analytics',
    summary: 'Practical recipes for data cleaning, grouping, and feature engineering with Pandas.',
    outcomes: ['Reusable code snippets for common BI tasks', 'Step-by-step examples with sample data'],
    tech: ['Python', 'Pandas', 'Jupyter'],
    githubUrl: 'https://github.com/Harry-0402/HB101---Pandas-Handbook-for-Business-Analytics',
    status: 'complete',
    year: 2024
  },
  {
    id: 'p_customer_seg',
    title: 'Customer Segmentation Analysis',
    summary: 'Clustering-based segmentation to create targeted customer groups and action plans.',
    outcomes: ['3 segments with recommended marketing actions', 'Segment-level LTV estimate'],
    tech: ['Python', 'Scikit-learn', 'Pandas'],
    status: 'in-progress',
    year: 2025
  },
  {
    id: 'p_excel_basics',
    title: 'Excel Projects for Data Analysis',
    summary: 'Small, practical Excel reports for KPI tracking and quick analysis.',
    outcomes: ['Templates for monthly reports', 'Pivot + formula based dashboards'],
    tech: ['Excel'],
    githubUrl: 'https://github.com/Harry-0402/P101---Basic-Excel-Projects',
    status: 'complete',
    year: 2023
  },
  {
    id: 'p_portfolio_site',
    title: 'Portfolio Website',
    summary: 'Personal portfolio built with React and TypeScript to showcase projects and contact flows.',
    outcomes: ['Responsive UI', 'EmailJS integration for contact form'],
    tech: ['React', 'TypeScript', 'EmailJS', 'Figma'],
    liveUrl: '/',
    status: 'complete',
    year: 2025
  }
];

// Simple helper functions you can import in UI code.
// They are small and fast. Use them for FAQ lookups or project filters.

/**
 * Return projects filtered by tech tag.
 */
export function getProjectsByTech(tech: string): Project[] {
  const t = tech.toLowerCase();
  return projects.filter((p) => p.tech.some((x) => x.toLowerCase() === t));
}

// main export used by ChatbotPage and other UI components
export const chatData = {
  faqs: [] as FAQ[], // Initial empty state, populated via API
  projects,
  chips,
  responses,
  helpers: {
    getProjectsByTech
  }
};

export default chatData;
