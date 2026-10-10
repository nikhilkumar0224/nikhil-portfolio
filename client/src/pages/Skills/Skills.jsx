import PageSection from "../../components/PageSection/PageSection";
import SkillCard from "../../components/SkillCard/SkillCard";
import { skillCategories } from "../../data/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <PageSection
      title="Skills"
      intro="The technologies I work with while building full-stack projects."
    >
      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <SkillCard
            key={category.title}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>
    </PageSection>
  );
}
