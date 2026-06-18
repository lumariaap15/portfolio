import { experience, skills, learning, projects, credentials } from "#content";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return (
    <HomeSections
      experience={experience}
      skills={skills}
      learning={learning}
      projects={projects}
      credentials={credentials}
    />
  );
}
