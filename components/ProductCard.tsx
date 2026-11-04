import Link from "next/link";
import { Card, CardLink } from "./ui/Card";
import { ArrowIcon } from "./ui/ArrowIcon";
import styles from "./ProductCard.module.css";
import type { ApiEndpoint, productFamilies } from "../lib/products";
import { SIGNUP_HREF, docsHref } from "../lib/products";

type FlagshipProduct = (typeof productFamilies)[number];

export function FlagshipProductCard({ icon, count, title, copy, tags, docs, plan }: FlagshipProduct) {
  return (
    <Card>
      <div className={styles.top}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.count}>
          {count} endpoints{plan === "pro" ? " · Pro plan" : ""}
        </span>
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
        <Link href={plan === "pro" ? "/pricing" : SIGNUP_HREF} className={styles.keyLink} prefetch={false}>
          {plan === "pro" ? "See Pro pricing" : "Get a free key"}
          <ArrowIcon className={styles.icon16} />
        </Link>
      </div>
    </Card>
  );
}

/** Compact card for a single endpoint, used by the homepage catalog grid. */
export function EndpointCard({ slug, name, description }: ApiEndpoint) {
  return (
    <CardLink href={docsHref(slug)} className={styles.lite}>
      <h3 className={styles.liteTitle}>
        {name}
        <ArrowIcon className={styles.icon16} />
      </h3>
      <p className={styles.liteCopy}>{description}</p>
    </CardLink>
  );
}
