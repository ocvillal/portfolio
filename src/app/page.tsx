import { Hero } from "@/components/hero/Hero";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { ReadMyWork } from "@/components/sections/ReadMyWork";
import { HomeGithub } from "@/components/sections/HomeGithub";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeProjects />
      <ReadMyWork />
      <HomeGithub />
    </>
  );
}
