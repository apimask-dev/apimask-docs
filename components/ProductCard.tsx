import Link from "next/link";
import { Card, CardLink } from "./ui/Card";
import { ArrowIcon } from "./ui/ArrowIcon";
import styles from "./ProductCard.module.css";
import type { flagshipProducts, quickTools } from "../lib/products";

type FlagshipProduct = (typeof flagshipProducts)[number];
type QuickTool = (typeof quickTools)[number];

export function FlagshipProductCard({ icon, count, title, copy, tags, docs, rapidapi }: FlagshipProduct) {
  return (
    <Card>
      <div className={styles.top}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.count}>{count} endpoints</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.copy}>{copy}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.actions}>
        <Link href={docs} className={styles.docsLink}>
          View docs
        </Link>
        <a href={rapidapi} className={styles.rapidLink} target="_blank" rel="noreferrer">
          Subscribe on RapidAPI
          <ArrowIcon className={styles.icon16} />
        </a>
      </div>
    </Card>
  );
}

export function QuickToolCard({ title, copy, docs }: QuickTool) {
  return (
    <CardLink href={docs} className={styles.lite}>
      <h3 className={styles.liteTitle}>
        {title}
        <ArrowIcon className={styles.icon16} />
      </h3>
      <p className={styles.liteCopy}>{copy}</p>
    </CardLink>
  );
}
