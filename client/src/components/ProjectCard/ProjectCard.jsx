import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  const imageUrl = getImageUrl(project.image);

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Screenshot of ${project.title}`}
          className={styles.image}
        />
      ) : (
        // Placeholder shown until you upload a real screenshot
        <div className={styles.placeholder} aria-hidden="true">
          {project.title.charAt(0)}
        </div>
      )}

      <div className={styles.body}>
        {project.featured ? (
          <span className={styles.badge}>Featured</span>
        ) : null}
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.tags}>
          {project.technologies.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link to={`/projects/${project.id}`} className={styles.primary}>
            View Details
          </Link>
          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
