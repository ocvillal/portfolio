export interface ExperienceEntry {
  org: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    org: "Sloth Lab, UC Santa Cruz",
    location: "Santa Cruz, CA",
    role: "ML Research Lead",
    period: "October 2025 – Present",
    bullets: [
      "Led a 3-person team extending the Lyra opinion dynamics framework into a scalable multi-agent simulation system for personality-driven NPC interactions and emergent social behavior.",
      "Designed agent architectures with 23-dimensional state tracking and prospect-theory-based persuasion modeling, implementing per-agent Actor-Critic (A2C) RL policies across 5 personality archetypes.",
      "Developed clustering and behavioral-analysis pipelines using MLflow experiment tracking, validating emergent interaction patterns across 1,000+ large-scale simulation runs.",
      "Publishing a research paper submitted to AIIDE 2026 exploring emergent social behavior, conversational dynamics, reinforcement learning, and multi-agent interaction systems.",
    ],
  },
  {
    org: "Silicon Valley Certification Hub",
    location: "Palo Alto, CA",
    role: "AI Engineer Intern",
    period: "June 2025 – Present",
    bullets: [
      "Developed and deployed an LLM-powered coaching platform (Flask, AWS) built around a RAG-based retrieval pipeline that generates executive-style scenario assessments and coaching feedback.",
      "Engineered rubric-based scoring pipelines using structured prompt engineering and configurable grading curves to evaluate answer relevance, ethical risk coverage, and actionability.",
      "Fine-tuned Gemma-3-1B and LLaMA-3.2-1B via LoRA (PEFT), improving factual alignment up to 25% and response consistency up to 9% on held-out eval data.",
      "Implemented role-conditioned scenario generation and optional ElevenLabs text-to-speech integration, supporting realistic AI interview simulations across 12 industries.",
    ],
  },
  {
    org: "University of California, Santa Cruz",
    location: "Santa Cruz, CA",
    role: "Teaching Assistant",
    period: "September 2024 – June 2026",
    bullets: [
      "Delivered lectures on databases, AI, LLMs, and technical writing to 150+ students across 4 UCSC courses.",
      "Led weekly discussion sections for 30 students, developing instructional materials and hands-on lesson plans.",
      "Designed coursework, assignments, and exams across 6 courses to improve alignment between lectures.",
    ],
  },
];
