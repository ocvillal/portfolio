export interface SkillCategory {
  label: string;
  description: string;
  tags: string[];
}

export const skills: SkillCategory[] = [
  {
    label: "Languages",
    description: "The languages I reach for across research code, services, and interfaces.",
    tags: ["Python", "C/C++", "JavaScript", "TypeScript", "C#", "SQL", "HTML/CSS"],
  },
  {
    label: "Front-end",
    description: "Building interfaces that make complex systems feel simple.",
    tags: ["React.js", "Next.js", "React Native", "Flutter", "Tailwind CSS", "HTML5"],
  },
  {
    label: "Backend",
    description: "APIs, data models, and the services that hold everything together.",
    tags: ["FastAPI", "Express.js", "Node.js", "RESTful APIs", "PostgreSQL", "Supabase"],
  },
  {
    label: "AI & ML",
    description: "Training, fine-tuning, and shipping LLM, RL, and neural-network systems.",
    tags: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "LangChain",
      "LangGraph",
      "Hugging Face",
      "OpenAI API",
      "Claude API",
      "LoRA",
      "Ollama",
      "ChromaDB",
      "MLflow",
      "Weights & Biases",
      "Pandas",
      "Matplotlib",
      "Claude Code",
      "RAG",
      "Prompt Engineering",
      "AI Workflow Automation",
    ],
  },
  {
    label: "Cloud",
    description: "Deploying and scaling workloads beyond my laptop.",
    tags: ["AWS", "Docker", "Linux"],
  },
  {
    label: "DevOps",
    description: "Automation and testing so the work stays reproducible.",
    tags: ["Git", "GitHub Actions", "CI/CD Pipelines", "Pytest"],
  },
];
