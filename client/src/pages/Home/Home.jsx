import { Link } from "react-router-dom";
import { profile } from "../../data/profile";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.greeting}>Hi, I'm {profile.name}</p>
        <h1 className={styles.title}>{profile.title}</h1>
        <p className={styles.location}>{profile.location}</p>
        <p className={styles.intro}>{profile.intro}</p>

        <div className={styles.buttons}>
          <Link to="/projects" className={styles.primary}>
            View Projects
          </Link>
          <Link to="/contact" className={styles.secondary}>
            Contact Me
          </Link>
          {/* "download" tells the browser to save the file instead of opening it */}
          <a href={profile.resume} download className={styles.secondary}>
            Download Resume
          </a>
        </div>

        <ul className={styles.social}>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </div>

      <img
        src="/profile-placeholder.svg"
        alt={`Profile placeholder for ${profile.name}`}
        className={styles.photo}
      />
    </section>
  );
}
