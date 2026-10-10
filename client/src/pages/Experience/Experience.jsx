import { Link } from "react-router-dom";
import PageSection from "../../components/PageSection/PageSection";
import TimelineItem from "../../components/TimelineItem/TimelineItem";

export default function Experience() {
  return (
    <PageSection
      title="Experience"
      intro="Hands-on project experience from my full-stack development training."
    >
      <TimelineItem
        title="Mission X: Student Dashboard Team Project"
        place="Full-stack training team project"
        period="2026"
        points={[
          "Built the Submit Project and Project Submissions pages in React",
          "Created Express and MySQL routes for starting, submitting and completing projects",
          "Handled image uploads with Multer",
          "Built a shared student dashboard header component",
          "Reviewed teammates' code and gave feedback on their pages",
        ]}
      />

      <TimelineItem
        title="[Role or project title]"
        place="[Organisation]"
        period="[Start – End]"
        points={["[What you did]"]}
      />

      <p>
        See my <Link to="/education">education</Link> and{" "}
        <Link to="/projects">projects</Link>.
      </p>
    </PageSection>
  );
}
