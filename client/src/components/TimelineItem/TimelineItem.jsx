import styles from "./TimelineItem.module.css";

export default function TimelineItem({ title, place, period, points = [] }) {
  return (
    <article className={styles.item}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.meta}>
        {place} · {period}
      </p>
      {points.length > 0 && (
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
