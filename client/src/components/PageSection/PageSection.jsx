import styles from "./PageSection.module.css";

export default function PageSection({ title, intro, children }) {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
      {children}
    </section>
  );
}
