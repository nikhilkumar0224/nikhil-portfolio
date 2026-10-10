import PageSection from "../../components/PageSection/PageSection";
import TimelineItem from "../../components/TimelineItem/TimelineItem";

export default function Education() {
  return (
    <PageSection title="Education" intro="My training and qualifications.">
      <TimelineItem
        title="[Full Stack Development Training]"
        place="[Mission Ready]"
        period="[july 2026– present]"
        points={[
          "Frontend: HTML, CSS, JavaScript, React",
          "Backend: Node.js, Express, REST APIs",
          "Database: MySQL and SQL",
        ]}
      />

      <TimelineItem
        title="[Diploma in Web Development and Design]"
        place="[ATC Vision College]"
        period="[2019 – 2020]"
      />
      <TimelineItem
        title="[Diploma in Software Development]"
        place="[ATC Vision College]"
        period="[2020 – 2021]"
      />
    </PageSection>
  );
}
