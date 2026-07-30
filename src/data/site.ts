export const site = {
  name: "Octavio Villalobos",
  githubUser: "ocvillal",
  tagline: "Computer scientist building AI systems, from research to production.",
  bio: [
    "I'm originally from Murrieta, a Southern California city about an hour north of San Diego. I attended UC Santa Cruz for both my grad and undergad, where I graduated with a an M.S. and B.S. in Computer Science with honors.",
    "I was initially drawn to the creative side of coding, especially building terminal games and websites, and have since expanded into designing AI systems for real-world problems. I'm currently doing AI research with Markus Eger. Prior to that, I worked with Alvaro Cardenas, building RL and LLM agents for cyber attack simulation, culminating in the publication “LLMs are ACDs.”",
    "I'm actively seeking entry-level roles in Product Design, SWE, and FDE. Explore my work in the projects and publications pages above. If you know of a team or project I might be a good fit for, feel free to reach out.",
  ],
  location: "Santa Cruz, CA",
  email: "octvillal@gmail.com",
  socials: {
    github: "https://github.com/ocvillal",
    linkedin: "https://www.linkedin.com/in/octavio-villalobos/",
  },
  resumeHref: "/documents/Main_resume_August.pdf",
  terminalIntro: {
    query: "who is octavio villalobos?",
    roleTags: ["Computer Scientist", "AI Engineer", "Terminal Kid"],
    currentLine: "Currently doing AI research with Markus Eger.",
    quirkyLine:
      "Shoots on a 2013 Fujifilm X100S. Long-term plan: shoot only film. Short-term plan: organize the archive.",
    availabilityLine: "Actively seeking entry-level roles in Product Design, SWE, and FDE.",
    cta: { label: "enter my work", href: "/projects/" },
  },
} as const;
