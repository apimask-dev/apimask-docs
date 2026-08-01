import Link from "next/link";
import {
  categoryCounts,
  docsHref,
  endpointsByCategory,
  liveCategories,
  soonCategories,
} from "../../lib/products";
import { ArrowIcon } from "../ui/ArrowIcon";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

/** Deep-link a category card at its collection page when it has one, otherwise
 *  at its first endpoint, so no card is a dead end. */
function categoryHref(slug: string): string {
  const inCategory = endpointsByCategory(slug);
  const collection = inCategory.find((endpoint) => endpoint.isCollection);
  return docsHref((collection ?? inCategory[0]).slug);
}

export function CategoryGrid() {
  return (
    <Section id="categories" label="API categories">
      <SectionHead
        eyebrow="Catalog"
        title="Browse by category."
        lead="Seven live categories today, with more on the public roadmap. Every live category links straight into its documentation."
      />

      <div className={styles.categoryGrid}>
        {liveCategories.map((category) => (
          <Link
            key={category.slug}
            href={categoryHref(category.slug)}
            className={styles.categoryCard}
            prefetch={false}
          >
            <div className={styles.categoryTop}>
              <h3>{category.name}</h3>
              <span className={styles.countBadge}>{categoryCounts[category.slug] ?? 0}</span>
            </div>
            <p>{category.note}</p>
          </Link>
        ))}
      </div>

      <h3 className={styles.soonHeading}>On the roadmap</h3>
      <div className={styles.categoryGrid}>
        {soonCategories.map((category) => (
          <div key={category.slug} className={`${styles.categoryCard} ${styles.soon}`}>
            <div className={styles.categoryTop}>
              <h3>{category.name}</h3>
              <span className={styles.soonBadge}>Soon</span>
            </div>
            <p>{category.note}</p>
          </div>
        ))}
      </div>

      <Link href="/api" className={styles.moreLink} prefetch={false}>
        Browse the full API catalog
        <ArrowIcon />
      </Link>
    </Section>
  );
}
