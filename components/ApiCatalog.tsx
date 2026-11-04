import { useMemo, useState } from "react";
import Link from "next/link";
import {
  categoryCounts,
  docsHref,
  endpoints,
  getCategory,
  liveCategories,
  soonCategories,
} from "../lib/products";
import styles from "./ApiCatalog.module.css";

const ALL = "all";

/**
 * Searchable, filterable endpoint directory. Rendered from
 * pages/apis/index.mdx (which previously held three static markdown tables) so
 * the page keeps its Nextra sidebar entry, search indexing, and the
 * /apis -> /api rewrite — a sibling .tsx route would have broken all three.
 *
 * Filtering is client-side over lib/products.ts. At this catalog size that's
 * far cheaper than an index or a dependency.
 */
export function ApiCatalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(ALL);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return endpoints.filter((endpoint) => {
      if (active !== ALL && endpoint.category !== active) return false;
      if (!q) return true;
      const categoryName = getCategory(endpoint.category)?.name ?? "";
      return (
        endpoint.name.toLowerCase().includes(q) ||
        endpoint.description.toLowerCase().includes(q) ||
        endpoint.slug.toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  return (
    <div className={styles.catalog}>
      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search endpoints, e.g. regex, DNS, QR…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search APIs"
        />

        <div className={styles.chips} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={active === ALL ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            aria-pressed={active === ALL}
            onClick={() => setActive(ALL)}
          >
            All <span>{endpoints.length}</span>
          </button>
          {liveCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={
                active === category.slug ? `${styles.chip} ${styles.chipActive}` : styles.chip
              }
              aria-pressed={active === category.slug}
              onClick={() => setActive(category.slug)}
            >
              {category.name} <span>{categoryCounts[category.slug] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} role="status">
        {results.length} {results.length === 1 ? "API" : "APIs"}
        {active !== ALL && ` in ${getCategory(active)?.name}`}
        {query.trim() && ` matching "${query.trim()}"`}
      </p>

      {results.length === 0 ? (
        <p className={styles.empty}>
          No APIs match that search. Try a broader term, or{" "}
          <button type="button" className={styles.reset} onClick={() => { setQuery(""); setActive(ALL); }}>
            clear the filters
          </button>
          .
        </p>
      ) : (
        <ul className={styles.list}>
          {results.map((endpoint) => (
            <li key={endpoint.slug} className={styles.row}>
              <div className={styles.rowMain}>
                <h3>
                  <Link href={docsHref(endpoint.slug)}>{endpoint.name}</Link>
                  {endpoint.isCollection && <span className={styles.badge}>Collection</span>}
                  {endpoint.plan === "pro" && <span className={styles.badge}>Pro plan</span>}
                </h3>
                <p>{endpoint.description}</p>
                <span className={styles.rowCategory}>
                  {getCategory(endpoint.category)?.name ?? endpoint.category}
                </span>
              </div>
              <div className={styles.rowActions}>
                <Link href={docsHref(endpoint.slug)} className={styles.docsLink}>
                  View docs
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Roadmap categories are kept out of the searchable list so a filtered
          result never mixes shippable endpoints with things that don't exist. */}
      {soonCategories.length > 0 && (
        <section className={styles.roadmap} aria-label="Roadmap categories">
          <h2>Coming soon</h2>
          <p className={styles.roadmapLead}>In development. Not available yet.</p>
          <ul className={styles.roadmapList}>
            {soonCategories.map((category) => (
              <li key={category.slug}>
                <b>{category.name}</b>
                <span>{category.note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
