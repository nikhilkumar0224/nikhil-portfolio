import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById, getImageUrl } from "../../services/api";
import { withExtras } from "../../data/project";
import styles from "./ProjectDetails.module.css";

export default function ProjectDetails() {
  const { id } = useParams(); // reads the :id from /projects/:id
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Re-runs whenever the id in the URL changes
  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getProjectById(id);
        setProject(withExtras(data));
      } catch (err) {
        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) return <p className={styles.message}>Loading project...</p>;

  if (error || !project) {
    return (
      <div className={styles.message}>
        <p role="alert">{error || "Project not found."}</p>
        <Link to="/projects">← Back to projects</Link>
      </div>
    );
  }

  const imageUrl = getImageUrl(project.image);

  return (
    <article className={styles.page}>
      <Link to="/projects" className={styles.back}>
        ← Back to projects
      </Link>

      <h1 className={styles.title}>{project.title}</h1>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Screenshot of ${project.title}`}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          {project.title.charAt(0)}
        </div>
      )}

      <p className={styles.description}>{project.description}</p>

      <h2>Technologies</h2>
      <ul className={styles.tags}>
        {project.technologies.map((tech) => (
          <li key={tech} className={styles.tag}>
            {tech}
          </li>
        ))}
      </ul>

      {project.features.length > 0 && (
        <>
          <h2>Features</h2>
          <ul className={styles.list}>
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {project.learned.length > 0 && (
        <>
          <h2>What I Learned</h2>
          <ul className={styles.list}>
            {project.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <div className={styles.actions}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            GitHub
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
