export const PAGE_COLORS = {
  home: "var(--color-accent-2)",
  about: "var(--color-accent)",
  projects: "var(--color-accent-2)",
  publications: "var(--color-accent-3)",
  experience: "var(--color-accent-4)",
  pics: "var(--color-accent-5)",
  contact: "var(--color-accent)",
} as const;

export function getActivePageColor(pathname: string): string {
  if (pathname.startsWith("/projects")) return PAGE_COLORS.projects;
  if (pathname.startsWith("/about")) return PAGE_COLORS.about;
  if (pathname.startsWith("/publications")) return PAGE_COLORS.publications;
  if (pathname.startsWith("/experience")) return PAGE_COLORS.experience;
  if (pathname.startsWith("/pics")) return PAGE_COLORS.pics;
  if (pathname.startsWith("/contact")) return PAGE_COLORS.contact;
  return PAGE_COLORS.home;
}
