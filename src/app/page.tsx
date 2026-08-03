import { Hero } from "@/components/hero/Hero";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeSkills } from "@/components/sections/HomeSkills";
import { ReadMyWork } from "@/components/sections/ReadMyWork";
import { HomeGithub } from "@/components/sections/HomeGithub";
import { HomeSectionRail } from "@/components/nav/HomeSectionRail";

export default function Home() {
  return (
    <>
      <HomeSectionRail />
      <Hero />
      <HomeProjects />
      <HomeSkills />
      <ReadMyWork />
      <HomeGithub />
    </>
  );
}
