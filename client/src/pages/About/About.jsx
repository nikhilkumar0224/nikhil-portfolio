import PageSection from "../../components/PageSection/PageSection";
import { profile } from "../../data/profile";
import styles from "./About.module.css";

export default function About() {
  return (
    <PageSection
      title="About Me"
      intro={`I'm a Junior Full Stack Developer based in ${profile.location}.`}
    >
      <div className={styles.blocks}>
        <article>
          <h2>My Development Journey</h2>
          <p>
            I have a foundation in web development and software development, and
            I'm now building my full-stack skills by creating projects with
            React, Node.js, Express and MySQL.
          </p>
        </article>

        <article>
          <h2>What I'm Learning Now</h2>
          <p>
            Connecting React frontends to Express APIs, designing MySQL
            databases, and working in a team with Git and GitHub.
          </p>
        </article>

        <article>
          <h2>Career Goals</h2>
          <p>
            I'm looking for a junior developer role where I can contribute to
            real products, learn from experienced developers, and keep growing
            as a full-stack engineer.
          </p>
        </article>

        <article>
          <h2>Technical Interests</h2>
          <p>
            Building clean user interfaces, designing REST APIs, and
            understanding how the frontend, backend and database fit together.
          </p>
        </article>
      </div>
    </PageSection>
  );
}
