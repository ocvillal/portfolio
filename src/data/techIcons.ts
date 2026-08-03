import type { ComponentType } from "react";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiDotnet,
  SiHtml5,
  SiReact,
  SiExpo,
  SiNextdotjs,
  SiFlutter,
  SiTailwindcss,
  SiFastapi,
  SiExpress,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiLangchain,
  SiLanggraph,
  SiHuggingface,
  SiClaude,
  SiOllama,
  SiMlflow,
  SiWeightsandbiases,
  SiPandas,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithubactions,
  SiPytest,
  SiFlask,
  SiUnity,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { FaAws } from "react-icons/fa6";
import {
  Database,
  Network,
  SlidersHorizontal,
  Boxes,
  ChartLine,
  Workflow,
  Sparkles,
  Bot,
} from "lucide-react";

type TagIcon = ComponentType<{ size?: number; color?: string }>;

// Brands whose mark is essentially black-on-white get var(--color-fg) so they
// stay legible in both themes; everything else uses its real brand hex.
export const techIcons: Record<string, { Icon: TagIcon; color: string }> = {
  // Languages
  Python: { Icon: SiPython, color: "#3776AB" },
  "C/C++": { Icon: SiCplusplus, color: "#00599C" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "C#": { Icon: SiDotnet, color: "#512BD4" },
  SQL: { Icon: Database, color: "var(--color-fg)" },
  "HTML/CSS": { Icon: SiHtml5, color: "#E34F26" },

  // Front-end
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiExpo, color: "var(--color-fg)" },
  "Next.js": { Icon: SiNextdotjs, color: "var(--color-fg)" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  HTML5: { Icon: SiHtml5, color: "#E34F26" },

  // Backend
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  "Express.js": { Icon: SiExpress, color: "var(--color-fg)" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "RESTful APIs": { Icon: Network, color: "var(--color-fg)" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  Flask: { Icon: SiFlask, color: "#3BABC3" },

  // AI & ML
  PyTorch: { Icon: SiPytorch, color: "#EE4C2C" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00" },
  "Scikit-learn": { Icon: SiScikitlearn, color: "#F7931E" },
  LangChain: { Icon: SiLangchain, color: "#7FC8FF" },
  LangGraph: { Icon: SiLanggraph, color: "#1C3C3C" },
  "Hugging Face": { Icon: SiHuggingface, color: "#FFD21E" },
  "OpenAI API": { Icon: RiOpenaiFill, color: "var(--color-fg)" },
  "Claude API": { Icon: SiClaude, color: "#D97757" },
  LoRA: { Icon: SlidersHorizontal, color: "var(--color-fg)" },
  Ollama: { Icon: SiOllama, color: "var(--color-fg)" },
  ChromaDB: { Icon: Boxes, color: "var(--color-fg)" },
  MLflow: { Icon: SiMlflow, color: "#0194E2" },
  "Weights & Biases": { Icon: SiWeightsandbiases, color: "#FFBE00" },
  Pandas: { Icon: SiPandas, color: "var(--color-fg)" },
  Matplotlib: { Icon: ChartLine, color: "var(--color-fg)" },
  "Claude Code": { Icon: SiClaude, color: "#D97757" },
  RAG: { Icon: Boxes, color: "var(--color-fg)" },
  "Prompt Engineering": { Icon: Sparkles, color: "var(--color-fg)" },
  "AI Workflow Automation": { Icon: Bot, color: "var(--color-fg)" },

  // Cloud
  AWS: { Icon: FaAws, color: "#FF9900" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Linux: { Icon: SiLinux, color: "var(--color-fg)" },

  // DevOps
  Git: { Icon: SiGit, color: "#F05032" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  "CI/CD Pipelines": { Icon: Workflow, color: "var(--color-fg)" },
  Pytest: { Icon: SiPytest, color: "#0A9EDC" },

  // Other
  Unity: { Icon: SiUnity, color: "var(--color-fg)" },
};
