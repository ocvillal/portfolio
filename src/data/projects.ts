import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "selma",
    name: "Selma",
    subtitle: "Framework for socially realistic NPCs",
    description:
      "A framework for creating realistic and socially aware RL NPC agents in video games. The accompanying paper, “Selma: Simulating Personality-Driven Discussion Among Agents,” has been submitted to AIIDE 2026.",
    tech: ["Python", "LLM", "RL"],
    coverImage: "/images/projects/selma/cover.webp",
    images: [{ src: "/images/projects/selma/cover.webp", alt: "Selma project preview" }],
    links: [],
    featured: true,
  },
  {
    slug: "french-english-mt",
    name: "French → English MT",
    subtitle: "Phrase-based decoder + Marian NMT",
    description:
      "A French-to-English machine translation system that combines a custom phrase-based decoder with a neural machine translation model trained using Marian NMT.",
    body: "Integrates IBM Model 1 word alignments, phrase table extraction, and an n-gram language model into a stack-based beam search decoder, and evaluates translation quality using BLEU and chrF metrics.",
    tech: [
      "Python",
      "Marian NMT",
      "IBM Model 1",
      "Phrase-based MT",
      "n-gram LM",
      "Beam Search",
      "BLEU/chrF",
    ],
    coverImage: "/images/projects/french-english-mt/cover.webp",
    images: [
      { src: "/images/projects/french-english-mt/cover.webp", alt: "French to English MT project preview" },
      { src: "/images/projects/french-english-mt/detail.webp", alt: "Translator interface" },
    ],
    links: [
      { label: "Repo", href: "https://github.com/ocvillal/LMs-for-fun", kind: "repo" },
      { label: "Video", href: "https://youtu.be/a4ptV0TBVAo", kind: "video" },
    ],
  },
  {
    slug: "insight-deck",
    name: "Insight Deck",
    subtitle: "Automatic IPO deck generator",
    description:
      "InsightDeck is an AI tool that automatically generates IPO presentations without human intervention — gathering, processing, and parsing information into a visually appealing slide deck while grounding the information to ensure accuracy.",
    tech: ["Python", "LangChain", "RAG", "LLMs", "Parsing", "Orchestration", "Vector DB"],
    coverImage: "/images/projects/insight-deck/cover.webp",
    images: [{ src: "/images/projects/insight-deck/cover.webp", alt: "Insight Deck project preview" }],
    links: [
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/18gyinlpYX6gSNGlk4oA5BBwcgGtA347S/view?resourcekey",
        kind: "demo",
      },
    ],
  },
  {
    slug: "formula-forecast",
    name: "Formula Forecast",
    subtitle: "Neural network Formula One predictor",
    description:
      "A predictive model for Formula 1 finishing positions, motivated by how difficult top-10 race outcomes are to forecast due to interacting factors like driver skill, car performance, track characteristics, weather, strategy, and unpredictable incidents.",
    body: "Matches the accuracy of top betting sites like Underdog.",
    tech: ["Neural Networks", "PyTorch", "Pandas", "Matplotlib", "Scikit-Learn"],
    coverImage: "/images/projects/formula-forecast/cover.webp",
    images: [{ src: "/images/projects/formula-forecast/cover.webp", alt: "Formula Forecast project preview" }],
    links: [
      { label: "Repo", href: "https://github.com/NihalErnest89/Formula-Forecast", kind: "repo" },
      { label: "Demo", href: "https://nihalernest89.github.io/Formula-Forecast/", kind: "demo" },
    ],
    featured: true,
  },
  {
    slug: "spindl",
    name: "Spindl",
    subtitle: "A music diary app — Letterboxd, but for music",
    description:
      "A music diary app to log albums, rate songs, and share with friends — browse charts and personalized recommendations, search albums and artists, and follow friends' activity feeds, all behind Supabase-backed accounts.",
    body: "Built with Expo SDK 54, React Native 0.81.5, and React 19, backed by Supabase for auth and data. Uses the Deezer and Spotify APIs for search, artist discovery, and metadata, and the Last.fm API for charts and recommendations.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Spotify API", "Deezer API", "Last.fm API"],
    coverImage: "/images/projects/spindl/cover.webp",
    images: [{ src: "/images/projects/spindl/cover.webp", alt: "Spindl project preview" }],
    links: [
      { label: "Repo", href: "https://github.com/ocvillal/Spindl", kind: "repo" },
      {
        label: "Demo",
        href: "https://github.com/ocvillal/Spindl/blob/main/README.md",
        kind: "video",
      },
    ],
    featured: true,
  },
  {
    slug: "llms-are-acds",
    name: "LLMs are ACDs",
    subtitle: "IEEE CAI 2025 · Autonomous Cyber Defense",
    description:
      "We show that large language models can act as autonomous cyber defenders (ACDs), detecting and responding to cyber attacks through reinforcement learning.",
    body: "Published at the IEEE Conference on Artificial Intelligence 2025. Collaborative work with Alvaro Cardenas.",
    tech: ["LLMs", "Cage Challenge", "CybORG", "GNN", "RL Agents"],
    coverImage: "/images/projects/llms-are-acds/cover.webp",
    images: [
      { src: "/images/projects/llms-are-acds/cover.webp", alt: "LLMs are ACDs project preview" },
      { src: "/images/projects/llms-are-acds/detail.webp", alt: "Cage Challenge environment" },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ocvillal/LLM-s-are-ACDs/blob/main/README.md",
        kind: "repo",
      },
      { label: "Paper", href: "https://arxiv.org/abs/2505.04843", kind: "paper" },
    ],
  },
  {
    slug: "home-gen-new-gen",
    name: "Home Gen New Gen",
    subtitle: "AI-powered layout generation for game environments",
    description:
      "A tool that automatically generates stylistic and functional interior room layouts for games using user-selected 3D furniture and decoration models.",
    body: "Uses genetic algorithms, pathfinding, and planning techniques to evolve unique room designs while ensuring navigable and coherent layouts.",
    tech: ["Python", "C#", "Java", "Unity"],
    coverImage: "/images/projects/home-gen-new-gen/cover.webp",
    images: [{ src: "/images/projects/home-gen-new-gen/cover.webp", alt: "Home Gen New Gen project preview" }],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ocvillal/AI-as-an-Interior-Designer",
        kind: "repo",
      },
      { label: "Video", href: "https://www.youtube.com/watch?v=P6nQ91sXMjA", kind: "video" },
    ],
  },
  {
    slug: "bird-tracker",
    name: "Bird Tracker",
    subtitle: "Map-driven birdwatching platform",
    description:
      "An interactive bird-watching platform inspired by eBird.org, built to support checklist submissions, personalized statistics, and regional birding insights — all wrapped in a dynamic, map-driven experience.",
    tech: ["JavaScript", "HTML", "SQL", "Python", "Flask", "Google Maps API"],
    coverImage: "/images/projects/bird-tracker/cover.webp",
    images: [
      { src: "/images/projects/bird-tracker/cover.webp", alt: "Bird Tracker project preview" },
      { src: "/images/projects/bird-tracker/detail.webp", alt: "Bird Tracker detail view" },
    ],
    links: [
      { label: "Repo", href: "https://github.com/ocvillal/birdtracker", kind: "repo" },
      {
        label: "Video",
        href: "https://drive.google.com/file/d/18DFIfYY8NEXVMSEZHH7OPE5cWgCnbUdf/view?usp=sharing",
        kind: "video",
      },
    ],
  },
  {
    slug: "portfolio-v1",
    name: "Portfolio V1",
    subtitle: "Game Boy Advance-styled personal site",
    description:
      "The first version of my personal site — a single-page portfolio styled after a Game Boy Advance, complete with a D-pad and buttons for navigating between About, Projects, Publications, Experience, and Contact.",
    body: "Built with vanilla HTML, CSS, and JavaScript and deployed on GitHub Pages, with no framework or build step.",
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    coverImage: "/images/projects/portfolio-v1/cover.webp",
    images: [{ src: "/images/projects/portfolio-v1/cover.webp", alt: "Portfolio V1 project preview" }],
    links: [
      { label: "Repo", href: "https://github.com/ocvillal/ocvillal.github.io", kind: "repo" },
      { label: "Demo", href: "https://ocvillal.github.io", kind: "demo" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
