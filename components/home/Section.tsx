import type { ReactNode } from "react";
import { cx } from "../ui/cx";
import styles from "./Home.module.css";

/** Shared section chrome: full-bleed band, centred container, hairline rule,
 *  and the eyebrow / heading / lead header used by every homepage section. */
export function Section({
  id,
  tint = false,
  label,
  children,
}: {
  id?: string;
  tint?: boolean;
  label?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cx(styles.section, tint && styles.tint)} aria-label={label}>
      <div className={styles.sectionInner}>{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className={styles.head}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}
