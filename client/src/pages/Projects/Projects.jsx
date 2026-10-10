import { useEffect, useState } from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { getProjects } from "../../services/api";
import { withExtras } from "../../data/project";
import styles from "./Projects.module.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Runs once when the page first loads
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data.map(withExtras)); // add technologies/features to each row
      } catch (err) {
        setError("Could not load projects. Please try again later.");
      } finally {
        setLoading(false); // runs whether it succeeded or failed
      }
    }

    loadProjects();
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Projects</h1>
      <p className={styles.intro}>
        A selection of projects I've built while learning full-stack
        development.
      </p>

      {loading && <p>Loading projects...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && projects.length === 0 && <p>No projects yet.</p>}

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
