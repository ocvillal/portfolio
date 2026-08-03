import type { ReactNode } from "react";
import { skills } from "@/data/skills";
import { SkillRow } from "@/components/skills/SkillRow";
import { Reveal } from "@/components/motion/Reveal";

export function Skills({ heading }: { heading?: ReactNode }) {
  return (
    <>
      {heading}
      <div className="mt-4">
        {skills.map((skill, i) => (
          <Reveal key={skill.label} delay={i * 100}>
            <SkillRow skill={skill} index={i} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
