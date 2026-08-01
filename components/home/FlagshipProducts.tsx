import { rapidapiProducts } from "../../lib/products";
import { FlagshipProductCard } from "../ProductCard";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

// The headline used to hardcode "Three products", which silently went stale as
// listings were added. Spelled out to match the display type elsewhere, with a
// numeral fallback so a tenth listing degrades to "10 products" rather than
// printing nothing.
const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

function spellCount(value: number): string {
  return NUMBER_WORDS[value] ?? String(value);
}

export function FlagshipProducts() {
  return (
    <Section tint label="Flagship products">
      <SectionHead
        eyebrow="Products"
        title={`${spellCount(rapidapiProducts.length)} products with their own RapidAPI listing.`}
        lead="Each bundles a set of related endpoints behind a single subscription, with its own plans and quota."
      />
      <div className={styles.productGrid}>
        {rapidapiProducts.map((product) => (
          <FlagshipProductCard key={product.title} {...product} />
        ))}
      </div>
    </Section>
  );
}
