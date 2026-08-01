import { liveCategories, liveEndpointCount } from "../../lib/products";
import styles from "./Home.module.css";

// Occupies the slot where a comparable site would put a customer logo wall.
// ApiMask has no public reference customers, so this states verifiable facts
// about the surface area instead of implying enterprise adoption.
const items = [
  { value: "RapidAPI", label: "distribution and billing" },
  { value: `${liveCategories.length}`, label: "live API categories" },
  { value: `${liveEndpointCount}`, label: "documented endpoints" },
  { value: "JSON", label: "consistent response envelope" },
];

export function DistributionStrip() {
  return (
    <section className={styles.strip} aria-label="At a glance">
      <div className={styles.stripInner}>
        {items.map((item) => (
          <p key={item.label} className={styles.stripItem}>
            <b>{item.value}</b>
            {item.label}
          </p>
        ))}
      </div>
    </section>
  );
}
