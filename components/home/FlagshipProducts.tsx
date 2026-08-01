import { flagshipProducts } from "../../lib/products";
import { FlagshipProductCard } from "../ProductCard";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

export function FlagshipProducts() {
  return (
    <Section tint label="Flagship products">
      <SectionHead
        eyebrow="Products"
        title="Three products with their own RapidAPI listing."
        lead="Each bundles a set of related endpoints behind a single subscription, with its own plans and quota."
      />
      <div className={styles.productGrid}>
        {flagshipProducts.map((product) => (
          <FlagshipProductCard key={product.title} {...product} />
        ))}
      </div>
    </Section>
  );
}
