import styles from "./SkillCard.module.css";

export default function SkillCard({ title, items }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
