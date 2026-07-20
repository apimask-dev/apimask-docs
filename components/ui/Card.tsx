import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";
import { cx } from "./cx";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div";
  flat?: boolean;
  children: ReactNode;
}

export function Card({ as = "article", flat = false, className, children, ...rest }: CardProps) {
  const Tag = as;
  return (
    <Tag className={cx(styles.card, flat && styles.flat, className)} {...rest}>
      {children}
    </Tag>
  );
}

interface CardLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  children: ReactNode;
}

export function CardLink({ href, prefetch, className, children, ...rest }: CardLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} className={cx(styles.card, styles.interactive, className)} {...rest}>
      {children}
    </Link>
  );
}
