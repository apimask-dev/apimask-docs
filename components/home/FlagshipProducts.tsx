import { productFamilies } from "../../lib/products";
import { spellCount } from "../../lib/format";
import { FlagshipProductCard } from "../ProductCard";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

export function FlagshipProducts() {
  return (
    <Section tint label="API families">
      <SectionHead
        eyebrow="Products"
        title={`${spellCount(productFamilies.length)} API families, one key.`}
        lead="Every plan, including Free, covers every family except AI. The AI endpoints are on Pro, because each call costs real money to run."
      />
      <div className={styles.productGrid}>
        {productFamilies.map((product) => (
          <FlagshipProductCard key={product.title} {...product} />
        ))}
      </div>
    </Section>
  );
}
